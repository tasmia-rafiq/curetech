import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router'
import { COLORS, FONT, SIZES } from '../../constants/theme';
import styles from '../../constants/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDays, faCircleCheck, faClose, faCross, faDroplet, faDumbbell, faExclamationTriangle, faHeartPulse, faKitMedical, faRadiation, faRulerVertical, faSkullCrossbones, faSmoking, faWarning, faWeightScale, faWineBottle } from '@fortawesome/free-solid-svg-icons';

import maleIcon from '../../assets/icon/male.png';
import femaleIcon from '../../assets/icon/female.png';
import { useState } from 'react';
import axios from 'axios';
import Btn from '../../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDropdown from '../../components/CustomDropdown';

const GenderOption = ({ gender, srcImg, selectedGender, handleGenderSelect }) => {
    const genderValue = gender === "Female" ? "1" : "2";
    return (
        <TouchableOpacity activeOpacity={0.9} style={{ alignItems: 'center' }} onPress={() => handleGenderSelect(gender)}>
            <View style={[styles.genderContainer, selectedGender === genderValue && { backgroundColor: "#f0f2f4" }]}>
                {selectedGender === genderValue && (
                    <FontAwesomeIcon icon={faCircleCheck} size={24} style={styles.checkIcon} />
                )}
                <Image source={srcImg} resizeMode='contain' style={styles.genderImg} />
            </View>
            <Text style={styles.genderText}>{gender}</Text>
        </TouchableOpacity>
    )
}

const InformationInput = ({ infoHead, infoIcon, placeholder, onChangeText, value }) => {
    return (
        <View style={{ paddingTop: 30, width: "100%", gap: 20 }}>
            <Text style={{ fontSize: SIZES.large, fontFamily: FONT.bold, color: COLORS.blue }}>{infoHead}</Text>

            <View style={styles.inputContainer}>
                <FontAwesomeIcon icon={infoIcon} color={COLORS.blue} size={SIZES.large} />
                <TextInput
                    placeholder={`Enter your ${placeholder}`}
                    keyboardType='numeric'
                    placeholderTextColor={COLORS.grey}
                    value={value}
                    style={styles.form}
                    onChangeText={onChangeText} />
            </View>
        </View>
    );
}

const PredictionModal = ({ visible, prediction, onClose }) => {
    const isSafe = prediction < 30;
    const warningMessage = isSafe
        ? "Your health status is relatively safe."
        : "Your health status is at high risk!";

    const warningColor = prediction < 30 ? 'orange' : 'red';
    const warningIcon = isSafe ? faExclamationTriangle : faSkullCrossbones;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: COLORS.white, padding: 30, borderRadius: 10, alignItems: 'flex-start', width: '90%' }}>
                    <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 20, right: 20 }}>
                        <FontAwesomeIcon icon={faClose} size={SIZES.large} />
                    </TouchableOpacity>

                    <Text style={[styles.header, { fontFamily: FONT.bold, fontSize: SIZES.xxLarge }]}>Results</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 }}>
                        <FontAwesomeIcon icon={warningIcon} size={50} color={warningColor} style={{ marginBottom: 20 }} />
                        <Text style={{ fontSize: SIZES.large, fontFamily: FONT.bold, color: warningColor, textAlign: 'center', marginBottom: 20 }}>
                            {warningMessage}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', marginBottom: 20, backgroundColor: "#f1ecfa", padding: 20, borderRadius: 10, }}>
                        <Text style={{ fontSize: SIZES.xxLarge, fontFamily: FONT.bold, paddingBottom: 10 }}>{`${prediction}%`}</Text>
                        <Text style={{ fontSize: SIZES.large, fontFamily: FONT.medium, lineHeight: 22 }}>Chances of having Cardiovascular Disease.</Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 7, paddingBottom: 20 }}>
                        <FontAwesomeIcon icon={faWarning} size={SIZES.medium} color={COLORS.yellow} style={{ marginTop: 4 }} />
                        <Text style={{ fontSize: SIZES.medium, fontFamily: FONT.medium, color: COLORS.grey }}>Consult a Doctor now and follow a balanced Diet Plan!</Text>
                    </View>
                    <Btn onPress={() => { }} btnTitle={'View Your Report'} customeStyleBtn={{ width: '100%' }} />
                </View>
            </View>
        </Modal>
    );
}

const HealthStatus = () => {
    const route = useRouter();
    const [prediction, setPrediction] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [data, setData] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        ap_hi: "",
        ap_lo: "",
        cholesterol: "",
        gluc: "",
        smoke: "",
        alco: "",
        active: "",
    });

    const handleChange = (key, value) => {
        setData({
            ...data,
            [key]: value,
        });
    };

    const handleGenderSelect = (value) => {
        const genderValue = value === "Female" ? "1" : "2";
        setData({
            ...data,
            gender: genderValue,
        });
    };

    const resetForm = () => {
        setData({
            age: "",
            gender: "",
            height: "",
            weight: "",
            ap_hi: "",
            ap_lo: "",
            cholesterol: "",
            gluc: "",
            smoke: "",
            alco: "",
            active: "",
        });
    }

    const validateForm = () => {
        for (let key in data) {
            if (data[key] === "") {
                return false;
            }
        }
        return true;
    }

    const handlePredict = () => {
        if (validateForm()) {
            axios
                .post("http://192.168.19.8:5000/predict", data)
                .then((response) => {
                    const result = response.data.probability;
                    console.log("Probability:", result);

                    setPrediction(result);
                    setModalVisible(true);
                    resetForm();
                })
                .catch((error) => {
                    console.error("Error making prediction:", error);
                    setPrediction("Failed to get prediction");
                });
        } else {
            Alert.alert("Error", "Please fill all the fields.");
        }
    }

    // Data for activity level
    const activityLevelData = [
        { label: "Sedentary", value: "Sedentary" },
        { label: "Moderately Active", value: "Moderately Active" },
        { label: "Active", value: "Active" },
    ];

    // Data for Binary Inputs
    const binaryInput = [
        { label: "Yes", value: "1" },
        { label: "No", value: "0" },
    ];

    // Examination Feature
    const examinationFeature = [
        { label: "Normal", value: "1" },
        { label: "Above Normal", value: "2" },
        { label: "Well Above Normal", value: "3" },
    ]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: StatusBar.currentHeight }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.container, { alignItems: 'flex-start' }]}>

                    <View style={styles.headerArea}>
                        <Text style={[styles.mainHeading, { fontSize: SIZES.xxLarge, fontFamily: FONT.medium }]}>What's your Health Status?</Text>
                    </View>

                    {/* SELECT GENDER */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: "100%" }}>
                        <GenderOption gender="Male" srcImg={maleIcon} selectedGender={data.gender} handleGenderSelect={handleGenderSelect} />
                        <GenderOption gender="Female" srcImg={femaleIcon} selectedGender={data.gender} handleGenderSelect={handleGenderSelect} />
                    </View>

                    {/* SELECT AGE */}
                    <InformationInput
                        infoHead={"Age"}
                        infoIcon={faCalendarDays}
                        placeholder={"age"}
                        value={data.age}
                        onChangeText={(text) => handleChange("age", text)}
                    />

                    {/* SELECT WEIGHT */}
                    <InformationInput
                        infoHead={"Weight"}
                        infoIcon={faWeightScale}
                        placeholder={"weight (in KGs)"}
                        value={data.weight}
                        onChangeText={(text) => handleChange("weight", text)}
                    />

                    {/* SELECT HEIGHT */}
                    <InformationInput
                        infoHead={"Height"}
                        infoIcon={faRulerVertical}
                        placeholder={"height (in cm)"}
                        value={data.height}
                        onChangeText={(text) => handleChange("height", text)}
                    />

                    {/* SELECT SYSTOLIC BP */}
                    <InformationInput
                        infoHead={"Systolic Blood Pressure"}
                        infoIcon={faDroplet}
                        placeholder={"bp"}
                        value={data.ap_hi}
                        onChangeText={(text) => handleChange("ap_hi", text)}
                    />

                    {/* SELECT HEIGHT */}
                    <InformationInput
                        infoHead={"Diastolic Blood Pressure"}
                        infoIcon={faDroplet}
                        placeholder={"bp"}
                        value={data.ap_lo}
                        onChangeText={(text) => handleChange("ap_lo", text)}
                    />

                    {/* SELECT ACTIVITY LEVEL */}
                    <CustomDropdown
                        placeholder={"Select Activity Level"}
                        infoHead={"Activity Level"}
                        infoIcon={faDumbbell}
                        selectedValue={data.active}
                        onValueChange={(itemValue) => handleChange("active", itemValue)}
                        data={binaryInput}
                    />

                    {/* CHOLESTROL LEVEL */}
                    <CustomDropdown
                        placeholder={"Select your Cholesterol Level"}
                        infoHead={"Cholesterol Level"}
                        infoIcon={faHeartPulse}
                        selectedValue={data.cholesterol}
                        onValueChange={(itemValue) => handleChange("cholesterol", itemValue)}
                        data={examinationFeature}
                    />

                    {/* Glucose LEVEL */}
                    <CustomDropdown
                        placeholder={"Select your Glucose Level"}
                        infoHead={"Glucose Level"}
                        infoIcon={faKitMedical}
                        selectedValue={data.gluc}
                        onValueChange={(itemValue) => handleChange("gluc", itemValue)}
                        data={examinationFeature}
                    />

                    {/* SMOKE */}
                    <CustomDropdown
                        placeholder={"Do you Smoke?"}
                        infoHead={"Smoking"}
                        infoIcon={faSmoking}
                        selectedValue={data.smoke}
                        onValueChange={(itemValue) => handleChange("smoke", itemValue)}
                        data={binaryInput}
                    />

                    {/* ALCOHOL */}
                    <CustomDropdown
                        placeholder={"Do you drink?"}
                        infoHead={"Alcohol Intake"}
                        infoIcon={faWineBottle}
                        selectedValue={data.alco}
                        onValueChange={(itemValue) => handleChange("alco", itemValue)}
                        data={binaryInput}
                    />

                    <Btn customeStyleBtn={{ marginTop: 30 }} btnTitle={"Show Status"} onPress={handlePredict} />

                    {/* Prediction Modal */}
                    <PredictionModal
                        visible={modalVisible}
                        prediction={prediction}
                        onClose={() => setModalVisible(false)}
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HealthStatus
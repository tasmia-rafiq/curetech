import { IP_ADDRESS } from '@env';
import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router'
import { COLORS, FONT, SIZES } from '../constants/theme';
import styles from '../constants/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDays, faCircleCheck, faDumbbell, faRulerVertical, faWeightScale } from '@fortawesome/free-solid-svg-icons';

import maleIcon from '../assets/icon/male.png';
import femaleIcon from '../assets/icon/female.png';
import { useState } from 'react';
import axios from 'axios';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import CustomDropdown from '../components/CustomDropdown';

const GenderOption = ({ gender, srcImg, selectedGender, handleGenderSelect }) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={{ alignItems: 'center' }} onPress={() => handleGenderSelect(gender)}>
      <View style={[styles.genderContainer, selectedGender === gender && { backgroundColor: "#f0f2f4" }]}>
        {selectedGender === gender && (
          <FontAwesomeIcon icon={faCircleCheck} size={24} style={styles.checkIcon} />
        )}
        <Image source={srcImg} resizeMode='contain' style={styles.genderImg} />
      </View>
      <Text style={styles.genderText}>{gender}</Text>
    </TouchableOpacity>
  )
}

const InformationInput = ({ infoHead, infoIcon, placeholder, onChange }) => {
  return (
    <View style={{ paddingTop: 30, width: "100%", gap: 20 }}>
      <Text style={{ fontSize: SIZES.large, fontFamily: FONT.bold, color: COLORS.blue }}>{infoHead}</Text>

      <View style={styles.inputContainer}>
        <FontAwesomeIcon icon={infoIcon} color={COLORS.blue} size={SIZES.large} />
        <TextInput
          placeholder={`Enter your ${placeholder}`}
          keyboardType='numeric'
          placeholderTextColor={COLORS.grey}
          style={styles.form}
          onChange={onChange} />
      </View>
    </View>
  );
}

const Yourdetails = () => {
  const route = useRouter();
  const [selectedGender, setSelectedGender] = useState(null);
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [activityLevel, setActivityLevel] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");

    const userData = {
      gender: selectedGender,
      age: age,
      weight: weight,
      height: height,
      activityLevel: activityLevel,
      token: token,
    }

    if (selectedGender && age && weight && height && activityLevel) {
      axios.post(`${IP_ADDRESS}:5001/submitpersonalinfo`, userData)
        .then(response => {
          console.log('User information submitted:', response.data);
          route.push('/home');
        })
        .catch(error => {
          console.error('Error submitting user information:', error);
          Alert.alert("Error submitting user information!");
        });
    } else {
      Alert.alert("Please fill out all fields.");
    }
  }

  const data = [
    { label: 'Sedentary', value: 'Sedentary' },
    { label: 'Moderately Active', value: 'Moderately Active' },
    { label: 'Active', value: 'Active' },
  ]

  console.log(activityLevel);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: StatusBar.currentHeight }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { alignItems: 'flex-start' }]}>

          <View style={styles.headerArea}>
            <Text style={[styles.mainHeading, { fontSize: SIZES.xxLarge, fontFamily: FONT.medium }]}>Give us some basic information</Text>
          </View>

          {/* SELECT GENDER */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: "100%" }}>
            <GenderOption gender="Male" srcImg={maleIcon} selectedGender={selectedGender} handleGenderSelect={handleGenderSelect} />
            <GenderOption gender="Female" srcImg={femaleIcon} selectedGender={selectedGender} handleGenderSelect={handleGenderSelect} />
          </View>

          {/* SELECT AGE */}
          <InformationInput
            infoHead={"Age"}
            infoIcon={faCalendarDays}
            placeholder={"age"}
            onChange={(e) => setAge(e.nativeEvent.text)}
          />

          {/* SELECT WEIGHT */}
          <InformationInput
            infoHead={"Weight"}
            infoIcon={faWeightScale}
            placeholder={"weight (in KGs)"}
            onChange={(e) => setWeight(e.nativeEvent.text)}
          />

          {/* SELECT HEIGHT */}
          <InformationInput
            infoHead={"Height"}
            infoIcon={faRulerVertical}
            placeholder={"height (in cm)"}
            onChange={(e) => setHeight(e.nativeEvent.text)}
          />

          {/* SELECT ACTIVITY LEVEL */}
          <CustomDropdown
            placeholder={"Set activity level"}
            infoHead={"Activity Level"}
            infoIcon={faDumbbell}
            selectedValue={activityLevel}
            data={data}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}
          />

          <Btn customeStyleBtn={{ marginTop: 30 }} btnTitle={"Continue"} onPress={() => handleSubmit()} />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Yourdetails
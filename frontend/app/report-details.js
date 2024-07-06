import { View, SafeAreaView, ScrollView, TouchableOpacity, Text } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faDroplet, faDumbbell, faHeartbeat, faKitMedical, faSmoking, faWarning, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import StatusInput from '../components/report/StatusInput';

const ReportDetails = () => {
    const route = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: COLORS.white },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => route.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} color={COLORS.blue} size={SIZES.xLarge} />
                        </TouchableOpacity>
                    ),
                    headerTitle: "Reports",
                    headerTitleStyle: {
                        fontSize: SIZES.xLarge,
                        fontFamily: FONT.bold,
                        color: COLORS.blue
                    },
                    headerTitleAlign: 'center',
                    headerBackButtonMenuEnabled: false,
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: 20 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcdce5', borderRadius: 30, width: 260, height: 260, margin: 'auto' }}>
                        <FontAwesomeIcon icon={faHeartbeat} size={180} color={COLORS.pink} />
                    </View>

                    <Text style={{ paddingVertical: 20, fontFamily: FONT.medium, fontSize: SIZES.large, color: COLORS.blue }}>Your Condition</Text>

                    {/* ALL INPUTS RECIEVED FROM HEALTH TAB AFTER SUBMIT */}
                    <StatusInput icon={faDroplet} statusName={'Blood Pressure'} value={'130/70'} unit={'mm/Hg'} />
                    <StatusInput icon={faDumbbell} statusName={'Activity Level'} value={'Sedentary'} />
                    <StatusInput icon={faHeartbeat} statusName={'Cholesterol Level'} value={'Above Normal'} />
                    <StatusInput icon={faKitMedical} statusName={'Glucose Level'} value={'Normal'} />
                    <StatusInput icon={faSmoking} statusName={'Smoking?'} value={'Yes'} />
                    <StatusInput icon={faWineBottle} statusName={'Alcohol Intake?'} value={'Yes'} />

                    <Text style={{ paddingVertical: 20, fontFamily: FONT.medium, fontSize: SIZES.large, color: COLORS.blue }}>Results</Text>

                    <StatusInput isResult={true} icon={faWarning} statusName={'Your heart health is at high Risk!'} value={'62.98%'} unit={'chances of Cardivasular Diseases'} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReportDetails;
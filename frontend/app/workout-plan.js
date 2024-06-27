import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ProfilePic from '../components/account/ProfilePic';
import UserDetailsOptions from '../components/account/UserDetailsOptions';
import UserDetailsNumOptions from '../components/account/UserDetailsNumOptions';
import styles from '../constants/style';
import useUserData from '../hooks/useUserData';
import useUserPersonalData from '../hooks/useUserPersonalData';

const WorkoutPlan = () => {
    const route = useRouter();
    const userData = useUserData();
    const userPersonalData = useUserPersonalData();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: COLORS.white },
                    headerShadowVisible: true,
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => route.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} color={COLORS.blue} size={SIZES.xLarge} />
                        </TouchableOpacity>
                    ),
                    headerTitle: "Your Details",
                    headerTitleStyle: {
                        fontSize: SIZES.xLarge,
                        fontFamily: FONT.bold,
                        color: COLORS.blue
                    },
                    headerTitleAlign: 'center',
                    headerBackButtonMenuEnabled: false,
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: StatusBar.currentHeight }}>
                <ProfilePic />

                <View>
                    <Text style={[styles.accountText, { textAlign: 'left', paddingHorizontal: 30 }]}>Account Info</Text>

                    <View style={[styles.container, { alignItems: "flex-start", gap: 10, backgroundColor: "#f7f7f7", marginHorizontal: 20, paddingBottom: 0, marginBottom: 20, borderRadius: 20 }]}>
                        <UserDetailsOptions label={"Name"} value={userData?.name} />
                        <UserDetailsOptions label={"Email"} value={userData?.email} />
                        <UserDetailsOptions label={"Password"} placeholder={"Change your password"} />
                    </View>
                </View>

                <View>
                    <Text style={[styles.accountText, { textAlign: 'left', paddingHorizontal: 30, paddingTop: 0 }]}>Personal Info</Text>

                    <View style={[styles.container, { alignItems: "flex-start", gap: 10, backgroundColor: "#f7f7f7", marginHorizontal: 20, paddingBottom: 0, marginBottom: 20, borderRadius: 20 }]}>
                        <UserDetailsOptions label={"Gender"} value={userPersonalData?.gender} />
                        <UserDetailsNumOptions label={"Age"} value={userPersonalData?.age?.toString()} />
                        <UserDetailsNumOptions label={"Weight"} value={userPersonalData?.weight?.toString()} />
                        <UserDetailsNumOptions label={"Height"} value={userPersonalData?.height?.toString()} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WorkoutPlan;
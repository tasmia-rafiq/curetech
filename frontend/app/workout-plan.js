import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faDumbbell, faPersonBiking, faPersonWalking, } from '@fortawesome/free-solid-svg-icons';
import styles from '../constants/style';
import { useState } from 'react';
import { useTime } from '../context/TimeContext';

const WorkoutPlan = () => {
    const route = useRouter();
    const { timeSpent } = useTime();

    const basicActivities = [
        { icon: faPersonWalking, text: "Walking" },
        { icon: faPersonBiking, text: "Cycling" },
        { icon: faPersonBiking, text: "Treadmill" },
        { icon: faDumbbell, text: "Gym" },
    ];

    const convertSecondsToMinutes = (totalSeconds) => {
        if (totalSeconds < 60) {
            return `${totalSeconds} sec`;
        } else {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            if (seconds === 0) {
                return `${minutes} min`;
            } else {
                return `${minutes} min`;
            }
        }
    };

    console.log("total spent: ", timeSpent);

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
                    headerTitle: "Workout Plan",
                    headerTitleStyle: {
                        fontSize: SIZES.xLarge,
                        fontFamily: FONT.bold,
                        color: COLORS.blue
                    },
                    headerTitleAlign: 'center',
                    headerBackButtonMenuEnabled: false,
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: StatusBar.currentHeight, paddingHorizontal: 10 }}>
                <View>
                    <Text style={[styles.welcomeText, { marginBottom: 10 }]}>My Activity</Text>
                    <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                                <Text style={styles.cardTitle}>Time spent</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
                                <Text style={[styles.mainHeading, { fontSize: SIZES.xLarge }]}>{convertSecondsToMinutes(timeSpent)}</Text>
                                {/* <Text style={styles.accountText}>min</Text> */}
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                                <Text style={styles.cardTitle}>Exercises done</Text>
                            </View>

                            <Text style={[styles.mainHeading, { fontSize: SIZES.xLarge }]}>5</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 15, justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 20 }}>
                        {basicActivities.map((item, index) => (
                            <TouchableOpacity activeOpacity={0.9} style={{ width: "45%" }} key={index} onPress={() => route.push({ pathname: '/ActivityDetail', params: { activity: item.text } })}>
                                <View style={[styles.card, styles.exerciseCard]}>
                                    <FontAwesomeIcon icon={item.icon} size={SIZES.xxLarge} color={COLORS.lightPurple} />
                                    <Text style={[styles.cardTitle, { color: COLORS.purple, fontFamily: FONT.regular, fontSize: SIZES.medium, marginTop: 15 }]}>{item.text}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WorkoutPlan;
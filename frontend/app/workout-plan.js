import { View, Text, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faClock, faDumbbell, faPersonBiking, faPersonWalking, faRefresh, } from '@fortawesome/free-solid-svg-icons';
import styles from '../constants/style';
import { useState } from 'react';
import { useTime } from '../context/TimeContext';

const WorkoutPlan = () => {
    const route = useRouter();
    const { timeSpent, setTimeSpent, exercisesDone, setExercisesDone } = useTime();

    const basicActivities = [
        { icon: faPersonWalking, text: "Walking" },
        { icon: faPersonBiking, text: "Cycling" },
    ];

    const convertSecondsToMinutes = (totalSeconds) => {
        if (totalSeconds < 60) {
            return `${totalSeconds}`;
        } else {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            if (seconds === 0) {
                return `${minutes}`;
            } else {
                return `${minutes}`;
            }
        }
    };

    const secMinUnit = (totalSeconds) => {
        if (totalSeconds < 60) {
            return 'sec';
        } else {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            if (seconds === 0) {
                return 'min';
            } else {
                return 'min';
            }
        }
    }

    const handleReset = () => {
        setTimeSpent(0);
        setExercisesDone(0);
    }

    console.log("total spent: ", timeSpent);
    console.log("total exercise: ", exercisesDone);

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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                        <Text style={[styles.welcomeText, { marginBottom: 10 }]}>My Activity</Text>
                        <TouchableOpacity onPress={handleReset} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Text style={[styles.accountText, { color: COLORS.grey, fontFamily: FONT.medium }]}>Reset</Text>
                            <FontAwesomeIcon icon={faRefresh} color={COLORS.grey} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.card}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
                                <Text style={[styles.mainHeading, { fontSize: SIZES.xLarge, color: COLORS.purple }]}>{convertSecondsToMinutes(timeSpent)}</Text>
                                <Text style={[styles.accountText, { color: COLORS.lightPurple }]}>{timeSpent === 0 ? "" : secMinUnit(timeSpent)}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                                <Text style={styles.cardTitle}>Time spent</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Text style={[styles.mainHeading, { fontSize: SIZES.xLarge, color: COLORS.purple }]}>{exercisesDone}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                                <Text style={styles.cardTitle}>Exercises done</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 0, marginVertical: 40, paddingHorizontal: 30, paddingVertical: 20, backgroundColor: "#faf7ff", borderRadius: 20, marginHorizontal: 10, shadowColor: "#000", elevation: 5 }} activeOpacity={0.9} onPress={() => route.push('/gym-exercises')}>
                        <View>
                            <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.xxLarge, color: COLORS.blue, paddingBottom: 10 }}>Gym</Text>
                            <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.blue, paddingBottom: 10 }}>Cardio Workout</Text>
                            <View style={styles.flex}>
                                <FontAwesomeIcon icon={faDumbbell} color={COLORS.purple} />
                                <Text style={styles.bannerText}>15 Exercises</Text>
                            </View>

                            <View style={styles.flex}>
                                <FontAwesomeIcon icon={faClock} color={COLORS.purple} />
                                <Text style={styles.bannerText}>15 Minutes</Text>
                            </View>
                        </View>
                        <Image source={require('../assets/gym.png')} resizeMode='contain' style={{ width: 180, height: 180 }} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: 15, justifyContent: 'center', alignItems: 'center', marginTop: 0, marginBottom: 20 }}>

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
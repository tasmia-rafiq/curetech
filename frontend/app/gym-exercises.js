import { RAPID_API_KEY } from '@env';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCheckCircle, faChevronRight, faCircle, faClock, faPersonRunning } from '@fortawesome/free-solid-svg-icons';
import Toast from 'react-native-toast-message';
import { useSelectedExercises } from '../context/SelectedExercisesContext';
import { useTime } from '../context/TimeContext';

const GymExercises = () => {
    const route = useRouter();
    const { selectedExercises, toggleExercise } = useSelectedExercises();
    const { incrementExercisesDone, updateTotalTime } = useTime();
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCardioExercises = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': `${RAPID_API_KEY}`,
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio?limit=50', options);
                const data = await response.json();
                console.log("Cardio exercises: ", data);

                setExercises(data);
            } catch (error) {
                console.error('Error fetching cardio exercises:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCardioExercises();
    }, []);

    useEffect(() => {
        if (selectedExercises.length === 15) {
            Toast.show({
                type: 'success',
                text1: "Hooray!",
                text2: "You have completed your today's goal."
            });
        }
    }, [selectedExercises]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const completedExercisesCount = selectedExercises.length;
    const completedMinutesCount = completedExercisesCount;

    const handleToggleExercise = (exerciseId) => {
        toggleExercise(exerciseId);
        incrementExercisesDone();
        updateTotalTime(60);
    };

    if (loading) {
        return (
            <View style={inStyles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.blue} />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: StatusBar.currentHeight }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10 }}>
                <View>
                    {/* HEADER */}
                    <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center', gap: 60, paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => route.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} color={COLORS.blue} size={SIZES.xLarge} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: SIZES.xLarge, fontFamily: FONT.bold, color: COLORS.blue }}>Cardio Workout</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 }}>
                        <View style={inStyles.tab}>
                            <FontAwesomeIcon icon={faClock} size={SIZES.medium} color={COLORS.purple} />
                            <Text style={inStyles.tabText}>{completedMinutesCount} / 15 min</Text>
                        </View>
                        <View style={inStyles.tab}>
                            <FontAwesomeIcon icon={faPersonRunning} size={SIZES.medium} color={COLORS.purple} />
                            <Text style={inStyles.tabText}>{completedExercisesCount} / 15 exercises</Text>
                        </View>
                    </View>

                    {exercises.map((exercise, index) => (
                        <TouchableOpacity key={index} onPress={() => route.push(`/exercise-details/${exercise.id}`)} activeOpacity={1}>
                            <View style={{ marginBottom: 20, paddingHorizontal: 5 }}>
                                <View style={inStyles.exerciseCard}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <TouchableOpacity onPress={() => handleToggleExercise(exercise.id)}>
                                            <FontAwesomeIcon
                                                icon={selectedExercises.includes(exercise.id) ? faCheckCircle : faCircle}
                                                size={SIZES.xLarge}
                                                color={selectedExercises.includes(exercise.id) ? "green" : "#eee"}
                                            />
                                        </TouchableOpacity>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                            <View style={{ borderColor: "#eee", borderWidth: 1, borderRadius: 10, padding: 3 }}>
                                                <Image
                                                    source={{ uri: exercise.gifUrl }}
                                                    style={{ width: 70, height: 70, backgroundColor: COLORS.white, borderRadius: 10 }}
                                                    resizeMode="contain"
                                                />
                                            </View>
                                            <View>
                                                <Text style={inStyles.exerciseName}>{capitalizeFirstLetter(exercise.name)}</Text>
                                                <Text style={inStyles.exerciseTarget}>2 sets x 30s</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => route.push(`/exercise-details/${exercise.id}`)} activeOpacity={0.8}>
                                        <FontAwesomeIcon icon={faChevronRight} size={SIZES.large} color={COLORS.lightPurple} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Toast />
        </SafeAreaView>
    );
};

const inStyles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#faf7ff",
        borderRadius: 20,
    },
    tabText: {
        color: COLORS.purple,
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
    },
    exerciseCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        elevation: 10,
        shadowColor: '#000',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 10,
        paddingRight: 15,
    },
    exerciseName: {
        color: COLORS.blue,
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        paddingBottom: 0
    },
    exerciseTarget: {
        fontFamily: FONT.regular,
        fontSize: SIZES.font14,
        paddingTop: 5
    }
});

export default GymExercises;

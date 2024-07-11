import { RAPID_API_KEY } from '@env';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Btn from '../../components/Btn';
import Toast from 'react-native-toast-message';
import { useSelectedExercises } from '../../context/SelectedExercisesContext';
import { useTime } from '../../context/TimeContext';

const ExerciseDetails = () => {
    const route = useRouter();
    const { id } = useLocalSearchParams();
    const { toggleExercise, selectedExercises } = useSelectedExercises();
    const { incrementExercisesDone, updateTotalTime } = useTime();

    const [loading, setLoading] = useState(true);
    const [exerciseDetails, setExerciseDetails] = useState('');
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const fetchExerciseDetails = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': `${RAPID_API_KEY}`,
                    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
                }
            };
            try {
                const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, options);
                const data = await response.json();

                setExerciseDetails(data);
                console.log("exerciseDetails: ", exerciseDetails);
            } catch (error) {
                console.error('Error fetching exercise details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExerciseDetails();
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    };

    const markAsCompleted = () => {
        if (selectedExercises.includes(id)) {
            alert("You have already marked this exercise as completed.");
        } else {
            toggleExercise(id);
            incrementExercisesDone();
            updateTotalTime(60);
            setCompleted(true);
            Toast.show({
                type: 'success',
                text1: "Hooray!",
                text2: "Exercise marked as completed."
            });
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.blue} />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f1ecfa", paddingTop: StatusBar.currentHeight }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
                <View style={{ paddingBottom: 80 }}>
                    <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center', gap: 60 }}>
                        <TouchableOpacity onPress={() => route.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} color={COLORS.blue} size={SIZES.xLarge} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: SIZES.xLarge, fontFamily: FONT.bold, color: COLORS.blue }}>Cardio Workout</Text>
                    </View>

                    <View style={{ alignItems: 'center', borderRadius: 20, width: 300, height: 300, margin: 'auto', marginBottom: 40, marginTop: 20, backgroundColor: COLORS.white, overflow: 'hidden' }}>
                        <Image
                            source={{ uri: exerciseDetails.gifUrl }}
                            style={{ width: 300, height: 300, borderRadius: 20 }}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={styles.exerciseTitle}>{capitalizeFirstLetter(exerciseDetails.name)}</Text>
                        {!completed ? (
                            <TouchableOpacity onPress={markAsCompleted} style={{ borderColor: "#ccc", borderWidth: 1, padding: 10, borderRadius: 20, paddingHorizontal: 15, marginBottom: 10 }}>
                                <Text style={[styles.exerciseTitle, { fontSize: SIZES.font14, paddingBottom: 0, marginBottom: 0 }]}>Mark as completed</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={{ borderColor: "#ccc", borderWidth: 1, padding: 10, borderRadius: 20, paddingHorizontal: 50, marginBottom: 10 }}>
                                <FontAwesomeIcon icon={faCheckCircle} color='green' size={SIZES.medium} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, rowGap: 10, marginVertical: 10, flexWrap: 'wrap' }}>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>{exerciseDetails.target}</Text>
                        </View>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>{exerciseDetails.equipment}</Text>
                        </View>
                        {exerciseDetails.secondaryMuscles?.map((sm, index) => (
                            <View style={styles.tab} key={index}>
                                <Text style={styles.tabText}>{sm}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.exerciseInstructionsTitle}>Steps</Text>
                    {exerciseDetails.instructions?.map((instruction, index) => (
                        <View key={index} style={styles.steps}>
                            <View style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: "#cbb0f7", borderRadius: 50, }}>
                                <Text style={{ color: COLORS.purple, fontFamily: FONT.bold }}>{index + 1}</Text>
                            </View>
                            <Text style={styles.exerciseInstruction}>{instruction}</Text>
                        </View>
                    ))}

                    {/* Conditional rendering based on completion state */}
                    {!completed ? (
                        <Btn btnTitle={"Mark as Completed"} onPress={markAsCompleted} customeStyleBtn={{ margin: 'auto', marginTop: 20 }} />
                    ) : (
                        <View style={{
                            alignItems: 'center', marginTop: 20, backgroundColor: COLORS.blue,
                            borderRadius: 32,
                            borderColor: COLORS.blue,
                            borderWidth: 1,
                            paddingVertical: 16,
                            width: 250,
                            alignItems: 'center', margin: 'auto'
                        }}>
                            <FontAwesomeIcon icon={faCheckCircle} color={"green"} size={SIZES.xLarge} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        paddingHorizontal: 15,
        backgroundColor: "#faf7ff",
        borderRadius: 20,
        elevation: 5,
        shadowColor: "#eee",
    },
    tabText: {
        color: COLORS.purple,
        fontFamily: FONT.medium,
        fontSize: SIZES.font14,
    },
    exerciseTitle: {
        fontSize: SIZES.xLarge,
        fontFamily: FONT.bold,
        color: COLORS.blue,
        marginBottom: 10
    },
    exerciseDetail: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS.gray,
        marginBottom: 5
    },
    exerciseInstructionsTitle: {
        fontSize: SIZES.large,
        fontFamily: FONT.bold,
        color: COLORS.blue,
        marginTop: 20,
        marginBottom: 10
    },
    exerciseInstruction: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS.gray,
        marginBottom: 5,
        width: '85%'
    },
    steps: {
        backgroundColor: "#e3d4fc",
        gap: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        elevation: 7,
        shadowColor: COLORS.purple,
    }
});

export default ExerciseDetails;
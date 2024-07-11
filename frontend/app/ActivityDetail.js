import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Vibration, StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { COLORS, FONT, SIZES } from '../constants/theme';
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { useTime } from '../context/TimeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const screen = Dimensions.get("window");

const formatNumber = number => `0${number}`.slice(-2);

const dataSource = Array.from({ length: 60 }, (_, i) => formatNumber(i));
const loopDataSource = [...dataSource, ...dataSource, ...dataSource];

const ActivityDetail = () => {
    const { activity } = useLocalSearchParams();
    const { updateTotalTime } = useTime();
    const [remainingSeconds, setRemainingSeconds] = useState(5);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedMinutes, setSelectedMinutes] = useState("00");
    const [selectedSeconds, setSelectedSeconds] = useState("00");
    const [totalTime, setTotalTime] = useState(null);
    const intervalRef = useRef(null);
    const minutesScrollRef = useRef(null);
    const secondsScrollRef = useRef(null);

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (isRunning && remainingSeconds > 0) {
            intervalRef.current = setInterval(() => {
                setRemainingSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (remainingSeconds === 0 && isRunning) {
            Vibration.vibrate();
            setIsRunning(false);
            clearInterval(intervalRef.current);
            const minutesText = parseInt(selectedMinutes, 10) > 0 ? `${parseInt(selectedMinutes, 10)} minute${parseInt(selectedMinutes, 10) > 1 ? 's' : ''}` : '';
            const secondsText = parseInt(selectedSeconds, 10) > 0 ? `${parseInt(selectedSeconds, 10)} second${parseInt(selectedSeconds, 10) > 1 ? 's' : ''}` : '';
            const timeText = `${minutesText && secondsText ? minutesText + ' and ' + secondsText : minutesText + secondsText}`;
            setTotalTime(timeText);
            const totalSeconds = parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10);
            updateTotalTime(totalSeconds);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, remainingSeconds]);



    const start = () => {
        const totalSeconds = parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10);
        setRemainingSeconds(totalSeconds);
        setIsRunning(true);
    };

    const stop = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setRemainingSeconds(5); // Reset timer to 5 seconds
    };

    const getRemaining = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
    };

    const onMinutesChange = (data, selectedIndex) => {
        const actualIndex = selectedIndex % dataSource.length;
        setSelectedMinutes(formatNumber(actualIndex));
    };

    const onSecondsChange = (data, selectedIndex) => {
        const actualIndex = selectedIndex % dataSource.length;
        setSelectedSeconds(formatNumber(actualIndex));
    };

    const renderPickerItem = (data, index, selectedIndex) => {
        const isSelected = index % dataSource.length === selectedIndex % dataSource.length;
        return (
            <Text key={index} style={[styles.pickerText, isSelected ? styles.selectedPickerText : styles.unselectedPickerText]}>
                {data}
            </Text>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: COLORS.white },
                    headerShadowVisible: false,
                    headerTitle: activity,
                    headerTitleStyle: {
                        fontSize: SIZES.xLarge,
                        fontFamily: FONT.bold,
                        color: COLORS.blue
                    },
                    headerTitleAlign: 'center',
                    headerBackButtonMenuEnabled: false,
                }}
            />

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', padding: 40 }}>
                    <View style={{padding: 7, backgroundColor: "#f1ebfc", borderRadius: 50}}>
                        <FontAwesomeIcon icon={faLightbulb} size={SIZES.large} color={COLORS.lightPurple} />
                    </View>
                    <View style={styles.recommendationText}>
                        <Text style={styles.totalTimeText}>Recommended three </Text>
                        <Text style={[styles.totalTimeText, { fontFamily: FONT.bold, color: COLORS.purple }]}>10-minute </Text>
                        <Text style={styles.totalTimeText}>{activity==="Walking" ? "Walks" : `${activity}`} a day</Text>
                    </View>
                </View>
                {totalTime && (
                    <View style={styles.totalTime}>
                        <Text style={styles.totalTimeText}>
                            Your total {activity} time is:
                        </Text>
                        <Text style={[styles.totalTimeText, { fontFamily: FONT.bold, paddingTop: 5 }]}>{totalTime}</Text>
                    </View>
                )}
                {!isRunning && (
                    <View style={styles.pickerContainer}>
                        <ScrollPicker
                            ref={minutesScrollRef}
                            dataSource={loopDataSource}
                            selectedIndex={parseInt(selectedMinutes, 10) + dataSource.length}
                            renderItem={(data, index) => renderPickerItem(data, index, parseInt(selectedMinutes, 10))}
                            onValueChange={onMinutesChange}
                            wrapperHeight={300}
                            wrapperBackground="#00000000"
                            itemHeight={60}
                            highlightColor="#444"
                        />
                        <ScrollPicker
                            ref={secondsScrollRef}
                            dataSource={loopDataSource}
                            selectedIndex={parseInt(selectedSeconds, 10) + dataSource.length}
                            renderItem={(data, index) => renderPickerItem(data, index, parseInt(selectedSeconds, 10))}
                            onValueChange={onSecondsChange}
                            wrapperHeight={300}
                            wrapperBackground="#00000000"
                            itemHeight={60}
                            highlightColor="#444"
                        />
                    </View>
                )}
                {isRunning && (
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>{`${getRemaining(remainingSeconds).minutes}:${getRemaining(remainingSeconds).seconds}`}</Text>
                        <Text style={{ color: 'grey', fontFamily: FONT.regular, fontSize: SIZES.medium }}>Total {selectedMinutes} minutes</Text>
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    {!isRunning ? (
                        <TouchableOpacity onPress={start} style={styles.button}>
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={stop} style={[styles.button, styles.buttonStop]}>
                            <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
    },
    button: {
        borderWidth: 10,
        borderColor: COLORS.purple,
        width: screen.width / 2,
        height: screen.width / 2,
        borderRadius: screen.width / 2,
        alignItems: "center",
        justifyContent: "center",
        margin: 'auto',
        marginTop: 30
    },
    buttonText: {
        fontSize: SIZES.size40,
        fontFamily: FONT.bold,
        color: COLORS.purple,
    },
    buttonTextStop: {
        fontSize: SIZES.size40,
        fontFamily: FONT.bold,
    },
    timerText: {
        color: COLORS.blue,
        fontSize: 80,
        fontFamily: FONT.medium,
        textAlign: 'center',
        marginTop: 40,
    },
    pickerItem: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        ...Platform.select({
            android: {
                marginLeft: 10,
                marginRight: 10,
            }
        })
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    pickerText: {
        fontSize: SIZES.xxLarge,
        fontFamily: FONT.medium,
    },
    selectedPickerText: {
        color: COLORS.blue,
    },
    unselectedPickerText: {
        color: "#ccc",
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: 300,
    },
    totalTime: {
        backgroundColor: "#faf7ff",
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    totalTimeText: {
        textAlign: 'center',
        fontFamily: FONT.medium,
        fontSize: SIZES.large,
        color: COLORS.blue,
    },
    recommendationText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingRight: 20,
    }
});

export default ActivityDetail;

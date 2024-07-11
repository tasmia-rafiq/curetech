import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faDroplet, faDumbbell, faHeartbeat, faKitMedical, faSmoking, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import StatusInput from '../../components/report/StatusInput';
import useUserData from '../../hooks/useUserData';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { IP_ADDRESS } from '@env';

const ReportDetails = () => {
    const route = useRouter();
    const { id } = useLocalSearchParams();
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const userData = useUserData();

    useEffect(() => {
        fetchReportData();
    }, []);

    const fetchReportData = async () => {
        try {
            const response = await fetch(`${IP_ADDRESS}:5001/report/${id}`);

            if (response.ok) {
                const data = await response.json();
                setReportData(data.data);
                console.log('reportData: ', reportData);
            } else {
                console.error('Failed to fetch report:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching report:', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
                <ActivityIndicator size="large" color={COLORS.blue} />
            </SafeAreaView>
        );
    }

    if (!reportData || !userData) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <Text style={{ color: COLORS.red, textAlign: 'center', marginTop: 20 }}>
                    Error loading report data.
                </Text>
            </SafeAreaView>
        );
    }

    const { data, prediction, createdAt } = reportData;

    const activityLevelMap = {
        "0": "Sedentary",
        "1": "Moderate",
        "2": "Active"
    };

    const cholesterolLevelMap = {
        "1": "Normal",
        "2": "Above Normal",
        "3": "Well Above Normal"
    };

    const glucoseLevelMap = {
        "1": "Normal",
        "2": "Above Normal",
        "3": "Well Above Normal"
    };

    const formattedCreatedAt = new Date(createdAt).toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

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
                    headerTitle: "Report",
                    headerTitleStyle: {
                        fontSize: SIZES.xLarge,
                        fontFamily: FONT.bold,
                        color: COLORS.blue
                    },
                    headerTitleAlign: 'center',
                    headerBackButtonMenuEnabled: false,
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ padding: 20, paddingTop: 0 }}>

                    {/* USER DETAILS */}
                    <View style={{ paddingBottom: 30 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>CureTech Report</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={styles.details}>
                                <Text style={styles.detailsTitle}>Name</Text>
                                <Text style={styles.detailsValue}>{userData.name}</Text>
                            </View>

                            <View style={styles.details}>
                                <Text style={styles.detailsTitle}>Report generated on</Text>
                                <Text style={styles.detailsValue}>{formattedCreatedAt}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderTopColor: "#eee", borderTopWidth: 1 }}>
                            <View style={[styles.details, { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10 }]}>
                                <Text style={styles.detailsTitle}>Age</Text>
                                <Text style={styles.detailsValue}>{data.age}</Text>
                            </View>

                            <View style={[styles.details, { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10 }]}>
                                <Text style={styles.detailsTitle}>Gender</Text>
                                <Text style={styles.detailsValue}>{data.gender === "1" ? 'Female' : 'Male'}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderTopColor: "#eee", borderTopWidth: 1 }}>
                            <View style={[styles.details, { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10 }]}>
                                <Text style={styles.detailsTitle}>Height</Text>
                                <Text style={styles.detailsValue}>{data.height}cm</Text>
                            </View>

                            <View style={[styles.details, { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10 }]}>
                                <Text style={styles.detailsTitle}>Weight</Text>
                                <Text style={styles.detailsValue}>{data.weight}kg</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: "#fcdce5", padding: 20, borderRadius: 20, gap: 20 }}>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 40, paddingVertical: 10, gap: 10 }}>
                            <FontAwesomeIcon icon={faHeartbeat} color={COLORS.pink} size={SIZES.xxLarge} />
                            <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.xLarge, textAlign: 'center' }}>Your heart health is at high Risk!</Text>
                        </View>
                        <View>
                            <AnimatedCircularProgress
                                size={150}
                                width={15}
                                fill={prediction.toFixed(2)}
                                tintColor={COLORS.purple}
                                backgroundColor={COLORS.lightPurple}
                            >
                                {
                                    (fill) => (
                                        <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.xLarge, color: COLORS.blue }}>
                                            {`${fill.toFixed(2)}%`}
                                        </Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>
                        <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.large, textAlign: 'center' }}>Chances of Cardiovascular Diseases</Text>
                    </View>

                    <Text style={styles.title}>Your Condition</Text>

                    <StatusInput icon={faDroplet} statusName={'Blood Pressure'} value={`${data.ap_hi}/${data.ap_lo}`} unit={'mm/Hg'} />
                    <StatusInput icon={faDumbbell} statusName={'Activity Level'} value={activityLevelMap[data.active] || 'Unknown'} />
                    <StatusInput icon={faHeartbeat} statusName={'Cholesterol Level'} value={cholesterolLevelMap[data.cholesterol] || 'Unknown'} />
                    <StatusInput icon={faKitMedical} statusName={'Glucose Level'} value={glucoseLevelMap[data.gluc] || 'Unknown'} />
                    <StatusInput icon={faSmoking} statusName={'Smoking?'} value={data.smoke === "1" ? 'Yes' : 'No'} />
                    <StatusInput icon={faWineBottle} statusName={'Alcohol Intake?'} value={data.alco === "1" ? 'Yes' : 'No'} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingVertical: 20,
        fontFamily: FONT.medium,
        fontSize: SIZES.large,
        color: COLORS.blue
    },
    detailsTitle: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
    },
    detailsValue: {
        fontFamily: FONT.regular,
        fontSize: SIZES.font14
    }
});

export default ReportDetails;

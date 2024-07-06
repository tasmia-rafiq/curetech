import { View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBell, faClock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Notifications = () => {
    const route = useRouter();
    const [notifications, setNotifications] = useState(true);

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
                    headerTitle: "Notifications",
                    headerTitleStyle: {
                        fontSize: SIZES.xLarge,
                        fontFamily: FONT.bold,
                        color: COLORS.blue
                    },
                    headerTitleAlign: 'center',
                    headerBackButtonMenuEnabled: false,
                }}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, justifyContent: notifications ? 'flex-start' : 'center', alignItems: notifications ? 'flex-start' : 'center', paddingHorizontal: 20, paddingTop: 20 }}>
                    {notifications ? (
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontSize: SIZES.font14, color: COLORS.grey, fontFamily: FONT.regular, marginBottom: 10 }}>Today</Text>

                            <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: "#f1ecfa", borderRadius: 10, padding: 15, flexDirection: 'row', gap: 10, paddingRight: 50, marginBottom: 20 }}>
                                <View style={{ width: 30, height: 30, backgroundColor: "#c8abff", alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                    <FontAwesomeIcon icon={faBell} color={COLORS.purple} size={SIZES.medium} />
                                </View>
                                <View>
                                    <Text style={{ color: COLORS.blue, fontFamily: FONT.medium, fontSize: SIZES.medium, lineHeight: 20, paddingBottom: 10 }}>Your report has been generated. Check now!</Text>

                                    <View style={{ flexDirection: 'row', gap: 7 }}>
                                        <FontAwesomeIcon icon={faClock} color={COLORS.purple} size={SIZES.font14} />
                                        <Text style={{ fontSize: SIZES.small, fontFamily: FONT.medium, color: COLORS.purple }}>3 min ago</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <Text style={{ fontSize: SIZES.font14, color: COLORS.grey, fontFamily: FONT.regular, marginBottom: 10 }}>Yesterday</Text>

                            <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: "#f1ecfa", borderRadius: 10, padding: 15, flexDirection: 'row', gap: 10, paddingRight: 50 }}>
                                <View style={{ width: 30, height: 30, backgroundColor: "#c8abff", alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                    <FontAwesomeIcon icon={faBell} color={COLORS.purple} size={SIZES.medium} />
                                </View>
                                <View>
                                    <Text style={{ color: COLORS.blue, fontFamily: FONT.medium, fontSize: SIZES.medium, lineHeight: 20, paddingBottom: 10 }}>Your report has been generated. Check now!</Text>

                                    <View style={{ flexDirection: 'row', gap: 7 }}>
                                        <FontAwesomeIcon icon={faClock} color={COLORS.purple} size={SIZES.font14} />
                                        <Text style={{ fontSize: SIZES.small, fontFamily: FONT.medium, color: COLORS.purple }}>3 min ago</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Image
                            source={require('../assets/empty-noti.png')}
                            style={{ width: '80%', height: undefined, aspectRatio: 1 }}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Notifications;

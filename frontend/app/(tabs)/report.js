import { View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import GeneralTab from '../../components/report/GeneralTab';

const Report = () => {
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
      <ScrollView>
        <GeneralTab day={'Today'} report={"General Report"} time={"1 hr ago"} onPress={() => route.push('/report-details')} />
        <GeneralTab report={"General Report"} time={"1 hr ago"} />
        <GeneralTab report={"General Report"} time={"3 hr ago"} />
        <GeneralTab day={'Last Week'} report={"General Report"} time={"Jun 19, 2024"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Report;
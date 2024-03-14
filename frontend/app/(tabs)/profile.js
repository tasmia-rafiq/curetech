import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { Stack, useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRightFromBracket, faCircleInfo, faComment, faFileMedical } from '@fortawesome/free-solid-svg-icons';

import { ProfileCard, ProfileOptions } from '../../components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserData from '../../hooks/useUserData';

const Profile = () => {
  const route = useRouter();
  const userData = useUserData();

  const logout = () => {
    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('token', '');
    route.push('/');
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.white },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => route.back()}>
              <FontAwesomeIcon icon={faArrowLeft} color={COLORS.blue} size={SIZES.xLarge} />
            </TouchableOpacity>
          ),
          headerTitle: "Profile",
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
        <ProfileCard username={userData.name} />

        <View style={{ paddingHorizontal: 40, paddingVertical: 30, gap: 15 }}>
          <ProfileOptions title={"Your Details"} leftIcon={faCircleInfo} onPress={() => route.push('/account')} />
          <ProfileOptions title={"My Reports"} leftIcon={faFileMedical} onPress={() => {}} />
          <ProfileOptions title={"FAQs"} leftIcon={faComment} onPress={() => {}} />
          <ProfileOptions title={"Logout"} leftIcon={faArrowRightFromBracket} onPress={() => logout()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
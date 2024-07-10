import { IP_ADDRESS } from '@env';
import { View, SafeAreaView, ScrollView, StatusBar, BackHandler, Alert, TouchableOpacity, Text } from 'react-native';

import { COLORS, FONT, SIZES } from '../../constants/theme';
import { Welcome, DietPlan, CheckHealth } from '../../components';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import Btn from '../../components/Btn';

const Home = () => {

  const [userData, setUserData] = useState('');

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    axios.post(`${IP_ADDRESS}:5001/userdata`, { token: token }).then(res => {
      console.log(res.data)
      setUserData(res.data.data);
    });
  }

  // After we are logged in, when we press back button, it should not go back to login page, hence we need to do the following
  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [{
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp(),
      },
      ]);
    return true;
  }

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }
    })
  )

  useEffect(() => {
    getData();
  }, []);

  const route = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: StatusBar.currentHeight }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, paddingTop: 40 }}>

          <Welcome username={userData.name} onPress={() => route.push('notifications')} />
          <CheckHealth />
          <DietPlan />

          <View style={{ alignItems: 'center', marginTop: -40, paddingHorizontal: 20, marginBottom: 60, backgroundColor: "#faf7ff", paddingVertical: 30, borderRadius: 10, }}>
            <Text style={{ fontFamily: FONT.medium, fontSize: SIZES.xLarge, lineHeight: 26, textAlign: 'center', paddingBottom: 20 }}>Is your health status poor? Get Medical Assistance now!</Text>
            <Btn btnTitle={"Look for nearby Hospitals"} onPress={() => route.push('/medical-assistance')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home
import { View, SafeAreaView, ScrollView, StatusBar, BackHandler, Alert } from 'react-native';

import { COLORS, SIZES } from '../../constants/theme';
import { Welcome, HealthReadings, DietPlan, LatestReport, CheckHealth } from '../../components';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import PredictionInputs from '../../components/home/PredictionInputs';

const Home = () => {

  const [userData, setUserData] = useState('');

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    axios.post("http://192.168.2.108:5001/userdata", { token: token }).then(res => {
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home
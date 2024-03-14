import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/theme';
import styles from '../constants/style';

import getStartedimg from '../assets/illustration.png';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import Toast from 'react-native-toast-message';

const GetStarted = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getData = async () => {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data);
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const route = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={getStartedimg} resizeMode='contain' style={{ width: "70%", alignItems: 'center', display: 'flex', justifyContent: 'center' }} />

          <Text style={styles.mainHeading}>CureTech</Text>
          <Text style={styles.welcomeText}>Let's get started!</Text>

          <View style={{ gap: 16 }}>
            {isLoggedIn ? (
              <Btn btnTitle="Continue" onPress={() => route.push('/home')} />
            ) : (
              <>
                <Btn btnTitle="Sign In" onPress={() => route.push('/signin')} />

                <Btn btnTitle="Sign Up" onPress={() => route.push('/signup')} customeStyleBtn={{ backgroundColor: COLORS.white }} customeStyleText={{ color: COLORS.blue }} />
              </>
            )}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default GetStarted
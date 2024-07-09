import { IP_ADDRESS } from '@env';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView, StatusBar, ScrollView, View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { COLORS, FONT, SIZES } from '../constants/theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import styles from '../constants/style';
import Btn from '../components/Btn';

import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ToastConfig from '../components/ToastMessage';

const SignIn = () => {
  const route = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log(email, password)
    const userData = {
      email: email,
      password: password,
    };
    if (email && password) {
      axios.post(`${IP_ADDRESS}:5001/login`, userData)
        .then(res => {
          console.log(res.data)
          if (res.data.status == "ok") {
            Alert.alert("Logged in Sucessfully");
            AsyncStorage.setItem("token", res.data.data); // storing the token
            AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));

            axios.post(`${IP_ADDRESS}:5001/userdata`, { token: res.data.data })
            .then(response => {
              const loginAttempts = response.data.data.loginAttempts;
              if (loginAttempts === 1) {
                route.push('/yourdetails');
              }
              else {
                route.push('/home');
              }
            })
            .catch(error => console.log(error));
          } else {
            Alert.alert("User does not exist.");
          }
        }).catch((e) => console.log(e));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Fill all the required fields.',
        visibilityTime: 5000,
      })
    }
  }

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState(faEyeSlash);

  const handlePasswordVisibility = () => {
    if (rightIcon === faEyeSlash) {
      setRightIcon(faEye);
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === faEye) {
      setRightIcon(faEyeSlash);
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"} style={{ paddingTop: StatusBar.currentHeight }}>
        <View style={styles.container}>
          {/* FOR ERROR MESSAGE */}
          <Toast config={ToastConfig} />

          <View style={styles.headerArea}>
            <TouchableOpacity onPress={() => route.back()}>
              <FontAwesomeIcon icon={faArrowLeft} color={COLORS.blue} size={SIZES.xLarge} />
            </TouchableOpacity>
            <Text style={styles.mainHeading}>Sign In</Text>
          </View>

          {/* FORM START */}
          <View>
            <View style={[styles.formContainer, { marginBottom: 25 }]}>
              <Image source={require('../assets/icon/email.png')} resizeMode='contain' style={styles.icon} />
              <TextInput
                placeholder='Enter your email'
                placeholderTextColor={"#a7a5a5"}
                style={styles.form}
                onChange={e => setEmail(e.nativeEvent.text)} />
            </View>

            <View style={styles.formContainer}>
              <Image source={require('../assets/icon/password.png')} resizeMode='contain' style={styles.icon} />
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={"#a7a5a5"}
                secureTextEntry={passwordVisibility}
                style={styles.form}
                onChange={e => setPassword(e.nativeEvent.text)} />

              { }
              <TouchableOpacity onPress={handlePasswordVisibility}>
                <FontAwesomeIcon icon={rightIcon} size={20} color='#a7a5a5' />
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: "flex-end", paddingVertical: 15 }}>
              <Text style={{ color: COLORS.blue, fontSize: 14, fontFamily: FONT.medium }}>Forgot password?</Text>
            </View>

            <Btn onPress={() => handleSubmit()} btnTitle={"Sign In"} customeStyleBtn={{ width: "300", marginTop: 50 }} customeStyleText={{ fontSize: SIZES.large }} />

            <Text style={styles.accountText}>Don't have an account? <Link href={"/signup"} style={styles.link}>Sign up</Link></Text>
          </View>
          {/* FORM END */}

          {/* SIGN IN WITH OTHER SOCIALS */}
          <View style={styles.separator}>
            <Text style={{ color: "#e9e9e9", fontFamily: FONT.medium, fontSize: SIZES.large }}>OR</Text>
          </View>

          <TouchableOpacity style={styles.googleBtn} onPress={() => route.push("/")}>
            <Image source={require('../assets/icon/Google.png')} resizeMode='contain' />
            <Text style={styles.googleBtnText}>Sign in with Google</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
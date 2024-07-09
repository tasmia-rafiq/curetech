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
import Toast from 'react-native-toast-message';
import ToastConfig from '../components/ToastMessage';

const SignUp = () => {
  const route = useRouter();

  // creating states for the signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    if (name && email && password) {
      axios.post(`${IP_ADDRESS}:5001/register`, userData)
        .then((res) => {
          console.log(res.data)
          if (res.data.status == "ok") {
            Alert.alert("Registered Succesfully!");
            route.push('/signin');
          } else {
            // Alert.alert("User Already Exists!");
            Toast.show({
              type: 'error',
              text1: 'Registration Failed!',
              text2: 'User Already Exists.',
              visibilityTime: 5000,
            })
          }
        })
        .catch((e) => console.log(e));
    } else {
      // Alert.alert("Fill all the field");
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: 'Fill all the required fields.',
        visibilityTime: 5000,
      })
    }
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setEmail(emailVar);
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
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

          <Toast config={ToastConfig} />

          <View style={styles.headerArea}>
            <TouchableOpacity onPress={() => route.back()}>
              <FontAwesomeIcon icon={faArrowLeft} color={COLORS.blue} size={SIZES.xLarge} />
            </TouchableOpacity>
            <Text style={styles.mainHeading}>Sign Up</Text>
          </View>

          {/* FORM START */}
          <View>
            <View style={[styles.formContainer, { marginBottom: 25 }]}>
              <Image source={require('../assets/icon/user.png')} resizeMode='contain' style={styles.icon} />
              <TextInput
                placeholder='Enter your name'
                placeholderTextColor={"#a7a5a5"}
                style={styles.form}
                onChange={e => handleName(e)} />
            </View>

            <View style={[styles.formContainer, { marginBottom: 25 }]}>
              <Image source={require('../assets/icon/email.png')} resizeMode='contain' style={styles.icon} />
              <TextInput
                placeholder='Enter your email'
                placeholderTextColor={"#a7a5a5"}
                style={styles.form}
                onChange={e => handleEmail(e)} />
            </View>

            <View style={styles.formContainer}>
              <Image source={require('../assets/icon/password.png')} resizeMode='contain' style={styles.icon} />
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={"#a7a5a5"}
                secureTextEntry={passwordVisibility}
                style={styles.form}
                onChange={e => handlePassword(e)} />

              { }
              <TouchableOpacity onPress={handlePasswordVisibility}>
                <FontAwesomeIcon icon={rightIcon} size={20} color='#a7a5a5' />
              </TouchableOpacity>
            </View>

            <Btn btnTitle={"Sign Up"} onPress={() => handleSubmit()} customeStyleBtn={{ width: "300", marginTop: 50 }} customeStyleText={{ fontSize: SIZES.large }} />

            <Text style={styles.accountText}>Already have an account? <Link href={"/signin"} style={styles.link}>Sign In</Link></Text>
          </View>
          {/* FORM END */}

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
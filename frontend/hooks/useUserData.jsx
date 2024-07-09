import { IP_ADDRESS } from '@env';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserData = () => {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.post(`${IP_ADDRESS}:5001/userdata`, { token: token })
          .then(res => {
            setUserData(res.data.data);
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
          });
      }
    }

    getData();
  }, []);

  return userData;
}

export default useUserData;
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserPersonalData = () => {
  const [userPersonalData, setUserPersonalData] = useState('');

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        axios.post("http://192.168.2.108:5001/userpersonaldata", { token: token })
          .then(res => {
            setUserPersonalData(res.data.data);
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
          });
      }
    }

    getData();
  }, []);

  return userPersonalData;
}

export default useUserPersonalData;
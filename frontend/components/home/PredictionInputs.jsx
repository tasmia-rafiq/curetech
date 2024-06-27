import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";

const PredictionInputs = () => {
  const [prediction, setPrediction] = useState("");
  const [data, setData] = useState({
    sex: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    work_type: "",
    Residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "",
  });

  const handleChange = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSelectSex = (value) => {
    setData({
      ...data,
      sex: value
    });
  };

  const handlePredict = () => {
    axios
      .post("http://192.168.2.108:5000/predict", data)
      .then((response) => {
        const result = response.data.prediction;
        if (result === 1) {
          setPrediction("You have chances of having a stroke :(( !!!!!");
        } else {
          setPrediction("You are safe, Hurrah");
        }
      })
      .catch((error) => {
        console.error("Error making prediction:", error);
        setPrediction("Failed to get prediction");
      });
  };

  return (
    <View>
      <Text>Sex:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            data.sex === 0 && styles.selectedButton,
          ]}
          onPress={() => handleSelectSex(0)}
        >
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            data.sex === 1 && styles.selectedButton,
          ]}
          onPress={() => handleSelectSex(1)}
        >
          <Text>Female</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="age"
        value={data.age}
        onChangeText={(text) => handleChange("age", text)}
      />
      <TextInput
        placeholder="hypertension (0 or 1)"
        value={data.hypertension}
        onChangeText={(text) => handleChange("hypertension", text)}
      />
      <TextInput
        placeholder="heart_disease (0 or 1)"
        value={data.heart_disease}
        onChangeText={(text) => handleChange("heart_disease", text)}
      />
      <TextInput
        placeholder="ever_married (0 or 1)"
        value={data.ever_married}
        onChangeText={(text) => handleChange("ever_married", text)}
      />
      <TextInput
        placeholder="work_type (0-4)"
        value={data.work_type}
        onChangeText={(text) => handleChange("work_type", text)}
      />
      <TextInput
        placeholder="Residence_type (0 or 1)"
        value={data.Residence_type}
        onChangeText={(text) => handleChange("Residence_type", text)}
      />
      <TextInput
        placeholder="avg_glucose_level"
        value={data.avg_glucose_level}
        onChangeText={(text) => handleChange("avg_glucose_level", text)}
      />
      <TextInput
        placeholder="bmi"
        value={data.bmi}
        onChangeText={(text) => handleChange("bmi", text)}
      />
      <TextInput
        placeholder="smoking_status (0 or 1)"
        value={data.smoking_status}
        onChangeText={(text) => handleChange("smoking_status", text)}
      />

      <Button
        title="Check Prediction"
        onPress={handlePredict}
        color="#841584"
      />
      <Text>Prediction: {prediction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    radioContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    radioButton: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      marginRight: 10,
    },
    selectedButton: {
      backgroundColor: '#841584',
    },
  });

export default PredictionInputs;

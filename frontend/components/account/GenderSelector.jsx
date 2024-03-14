import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../constants/style";

const GenderSelector = ({ value, onSelect }) => {
  return (
    <View style={styles.genderSelectorContainer}>
      <TouchableOpacity
        style={[
          styles.genderButton,
          value === "Male" && styles.selectedGenderButton,
        ]}
        onPress={() => onSelect("Male")}
      >
        <Text style={styles.genderButtonText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.genderButton,
          value === "Female" && styles.selectedGenderButton,
        ]}
        onPress={() => onSelect("Female")}
      >
        <Text style={styles.genderButtonText}>Female</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderSelector;
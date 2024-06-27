import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./profile.style";

const ProfileCard = ({ username, gender }) => {
  const iconSource =
    gender === "Female"
      ? require("../../assets/female-icon.jpg")
      : require("../../assets/male-icon.jpg");

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 40 }}>
      <Image
        source={iconSource}
        resizeMode="contain"
        style={styles.profileImg}
      />
      <Text style={styles.userName}>{username}</Text>
    </View>
  );
};

export default ProfileCard;

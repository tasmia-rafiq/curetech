import { Image, TouchableOpacity, View } from "react-native";
import styles from "../../constants/style";

const ProfilePic = ({ onPress, uri }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{ width: 140, height: 140, borderRadius: 70, borderWidth: 1, borderColor: "#e9e9e9" }}
          source={{ uri }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePic;

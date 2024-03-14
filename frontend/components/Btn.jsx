import { TouchableOpacity, Text } from "react-native";
import styles from "../constants/style";

const Btn = ({ btnTitle, customeStyleBtn, customeStyleText, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, customeStyleBtn]}
      activeOpacity={0.9}
    >
      <Text style={[styles.btnText, customeStyleText]}>{btnTitle}</Text>
    </TouchableOpacity>
  );
};

export default Btn;

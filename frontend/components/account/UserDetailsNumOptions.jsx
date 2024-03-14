import { Text, TextInput, View } from "react-native";
import styles from "../../constants/style";

const UserDetailsNumOptions = ({ label, value, placeholder }) => {
  return (
    <View>
      <View style={[styles.detailsContainer]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.form}
          value={value}
          placeholder={placeholder}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default UserDetailsNumOptions;

import { View, Text, TextInput } from "react-native";
import styles from "../../constants/style";

const UserDetailsOptions = ({ label, value, placeholder }) => {
  return (
    <View>
      <View style={[styles.detailsContainer]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.form} value={value} placeholder={placeholder} />
      </View>
    </View>
  );
};

export default UserDetailsOptions;

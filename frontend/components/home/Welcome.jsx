import { View, Text } from "react-native";

import styles from "./home.style";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS, SIZES } from "../../constants/theme";

const Welcome = ({ username }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeMessage}>Hello,</Text>
        <Text style={styles.userName}>{username}</Text>
      </View>

      {/* <View style={styles.warningContainer}>
        <Icon name="warning" color={COLORS.yellow} size={SIZES.medium} />
        <Text style={styles.warningText}>Please enter your Blood Pressure readings!</Text>
      </View> */}
    </View>
  );
};

export default Welcome;

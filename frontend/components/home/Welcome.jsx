import { View, Text, TouchableOpacity } from "react-native";

import styles from "./home.style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { COLORS, SIZES } from "../../constants/theme";

const Welcome = ({ username, onPress }) => {
  return (
    <View
      style={[
        styles.container,
        { flexDirection: "row", justifyContent: "space-between" },
      ]}
    >
      <View>
        <Text style={styles.welcomeMessage}>Hello,</Text>
        <Text style={styles.userName}>{username}</Text>
      </View>

      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <FontAwesomeIcon
            icon={faBell}
            size={SIZES.xLarge}
            color={COLORS.blue}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.warningContainer}>
        <Icon name="warning" color={COLORS.yellow} size={SIZES.medium} />
        <Text style={styles.warningText}>Please enter your Blood Pressure readings!</Text>
      </View> */}
    </View>
  );
};

export default Welcome;

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/theme";
import styles from "./profile.style";
import { useRouter } from "expo-router";

const ProfileOptions = ({ title, leftIcon, onPress }) => {
  const route = useRouter();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderBottomColor: "#e9e9e9",
        borderBottomWidth: 1,
        paddingBottom: 15
      }}
      activeOpacity={0.9}
    >
      <View style={styles.profileOption}>
        <View style={styles.icon}>
          <FontAwesomeIcon
            icon={leftIcon}
            color={"#d0c3e8"}
            size={20}
          />
        </View>

        <Text style={styles.optionText}>{title}</Text>
      </View>

      <View>
        <FontAwesomeIcon icon={faChevronRight} color={"#7a7979"} size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileOptions;

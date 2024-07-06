import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const StatusInput = ({ icon, statusName, value, unit, isResult }) => {
  return (
    <View
      style={{
        backgroundColor: "#fcfaff",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        gap: 15,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "#f1ecfa",
          height: 45,
          width: 45,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          color={COLORS.lightPurple}
          size={SIZES.xLarge}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: isResult ? FONT.bold : FONT.regular,
            fontSize: isResult ? SIZES.large : SIZES.font14,
            color: COLORS.blue,
            paddingBottom: 5,
            flexWrap: "wrap",
            flexShrink: 1,
          }}
        >
          {statusName}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", flexWrap: 'wrap', flexShrink: 1, gap: 5, }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: isResult ? SIZES.xxLarge : SIZES.medium,
              color: COLORS.blue,
            }}
          >
            {value}
          </Text>
          {unit && (
            <Text
              style={{
                fontFamily: FONT.regular,
                fontSize: isResult ? SIZES.medium : SIZES.font14,
                color: COLORS.grey,
                paddingRight: 30
              }}
            >
              {unit}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default StatusInput;
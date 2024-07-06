import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";
import {
  faClock,
  faEllipsis,
  faSquarePollHorizontal,
} from "@fortawesome/free-solid-svg-icons";

const GeneralTab = ({ day, report, time, onPress }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      <View style={{ width: "100%" }}>
        {day && (
          <Text
            style={{
              fontSize: SIZES.font14,
              color: COLORS.grey,
              fontFamily: FONT.regular,
              marginBottom: 10,
            }}
          >
            {day}
          </Text>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={{
            backgroundColor: "#f1ecfa",
            borderRadius: 10,
            padding: 15,
            flexDirection: "row",
            gap: 10,
            paddingRight: 50,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#c8abff",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <FontAwesomeIcon
              icon={faSquarePollHorizontal}
              color={COLORS.purple}
              size={SIZES.large}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <View>
              <Text
                style={{
                  color: COLORS.blue,
                  fontFamily: FONT.medium,
                  fontSize: SIZES.medium,
                  lineHeight: 20,
                  paddingBottom: 5,
                }}
              >
                {report}
              </Text>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <FontAwesomeIcon
                  icon={faClock}
                  color={COLORS.purple}
                  size={SIZES.font14}
                />
                <Text
                  style={{
                    fontSize: SIZES.small,
                    fontFamily: FONT.medium,
                    color: COLORS.purple,
                  }}
                >
                  {time}
                </Text>
              </View>
            </View>

            <TouchableOpacity>
              <FontAwesomeIcon
                icon={faEllipsis}
                size={SIZES.large}
                color={COLORS.blue}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GeneralTab;

import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
    },
    welcomeMessage: {
        fontFamily: FONT.medium,
        fontSize: SIZES.xxLarge,
        color: COLORS.blue,
        marginTop: 2,
    },
    userName: {
        fontSize: SIZES.size40,
        fontFamily: FONT.bold,
        color: COLORS.blue,
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        paddingVertical: 20,
    },
    warningText: {
        color: COLORS.grey,
        fontSize: 16,
        fontFamily: FONT.regular,
    }
});

export default styles;
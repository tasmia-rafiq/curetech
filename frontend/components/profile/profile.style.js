import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    profileImg: {
        width: 120,
        height: 120,
        borderRadius: 70,
    },
    userName: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.black,
        paddingTop: 10,
    },

    profileOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    },
    icon: {
        backgroundColor: COLORS.blue,
        borderRadius: 50,
        width: 43,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: SIZES.medium,
        fontFamily: FONT.bold,
        color: COLORS.black,
    }
});

export default styles;
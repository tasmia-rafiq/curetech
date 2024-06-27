import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    //WELCOME CSS
    container: {
        width: "100%",
        paddingHorizontal: 10,
    },
    welcomeMessage: {
        fontFamily: FONT.medium,
        fontSize: SIZES.large,
        color: COLORS.blue,
        marginTop: 2,
    },
    userName: {
        fontSize: SIZES.xLarge,
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
    },

    //HEALTH READINGS CSS
    purple: {
        color: COLORS.purple
    },
    pink: {
        color: COLORS.pink
    },
    container: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 24
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONT.bold,
    },
    lastUpdated: {
        color: COLORS.grey,
        fontSize: 14,
        fontFamily: FONT.regular,
    },
    readingsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    readingsBox: {
        borderRadius: 20,
        width: 150,
        height: 135,
        maxWidth: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
    readingsBoxTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },
    readingsBoxValue: {
        alignItems: 'center',
    },
    readingsTitle: {
        fontSize: 16,
        fontFamily: FONT.medium,
        lineHeight: 18
    },
    value: {
        fontSize: 28,
        fontFamily: FONT.bold,
    },

    //DIET PLAN SECTION CSS
    bgContainer: {
        backgroundColor: COLORS.lightPurple,
        borderRadius: 10,
        paddingVertical: 25,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 16,
        fontFamily: FONT.medium,
        lineHeight: 18,
        color: COLORS.white,
        marginBottom: 15,
    },

    //CHECK HEALTH STATUS
    largeTitle: {
        fontSize: SIZES.size40,
        fontFamily: FONT.bold,
        lineHeight: 42,
    },
    lightBgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 40,
        backgroundColor: '#f1ecfa',
        borderRadius: 10,
        borderTopLeftRadius: 120,
        marginTop: 30,
    },
    textMedium: {
        fontFamily: FONT.medium,
        fontSize: SIZES.large,
        lineHeight: 20,
        paddingBottom: 10,
        color: COLORS.blue,
    }
});

export default styles;
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    purple: {
        color: COLORS.purple
    },
    pink: {
        color: COLORS.pink
    },
    container: {
        width: "100%",
        paddingVertical: 20,
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
    }
});

export default styles;
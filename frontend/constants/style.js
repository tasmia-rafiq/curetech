import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "./theme";

const styles = StyleSheet.create({
    // FOR GET STARTED PAGE
    container: {
        padding: 30,
        paddingTop: 0,
        alignItems: 'center',
        paddingBottom: 40,
    },

    mainHeading: {
        fontSize: SIZES.size40,
        fontFamily: FONT.bold,
        color: COLORS.blue,
        paddingBottom: 10,
    },
    welcomeText: {
        fontSize: SIZES.large,
        fontFamily: FONT.bold,
        color: COLORS.black,
        lineHeight: 22,
        marginBottom: 30,
    },
    btn: {
       color: COLORS.black,
       backgroundColor: COLORS.blue,
       borderRadius: 32,
       borderColor: COLORS.blue,
       borderWidth: 1,
       paddingVertical: 16,
       width: 250,
       alignItems: 'center'
       
    },
    btnText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.bold
    },

    // FOR SIGN IN PAGE
    headerArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 75,
        width: "100%",
        height: 150,
        zIndex: -1,
    },
    formContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e9e9e9",
        paddingHorizontal: 20,
        gap: 15,
        width: "100%",
        height: 56,
    },
    form: {
        fontFamily: FONT.regular,
        fontSize: 14,
        width: 300,
        flex: 1, flexWrap: 'wrap'
    },
    icon: {
        width: 20,
        height: 20
    },
    accountText: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        textAlign: 'center',
        lineHeight: 20,
        paddingVertical: 12,
    },
    link: {
        color: "#AB8DE5",
        fontFamily: FONT.bold,
    },
    separator: {
        width: "100%",
        marginVertical: 40,
        alignItems: 'center'
    },
    googleBtn: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e9e9e9",
    },
    googleBtnText: {
        color: COLORS.black,
        fontFamily: FONT.medium,
        fontSize: SIZES.large,
    },

    //FOR INFORMATION PAGE
    genderContainer: {
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 24,
        width: 130,
        height: 130,
        borderColor: "#f0f2f4",
        borderWidth: 1,
    },
    genderImg: {
        width: 70,
        height: 70,
    },
    checkIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    genderText: {
        fontSize: SIZES.font14,
        fontFamily: FONT.medium,
        color: COLORS.blue,
        paddingTop: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        height: 56,
        paddingHorizontal: 20,
        gap: 25,
        borderRadius: 20,
        borderColor: "#e9e9e9",
        borderWidth: 1,
    },

    //ACCOUNT DETAILS PAGE
    label: {
        fontSize: SIZES.font14,
        fontFamily: FONT.medium,
        color: COLORS.blue,
        paddingRight: 10,
        width: 80,
        borderRightColor: "#e9e9e9",
        borderRightWidth: 1,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#e9e9e9",
        paddingHorizontal: 10,
        gap: 15,
        width: "100%",
        height: 48,
    },

    //FOR MEAL PLAN PAGE
    header: {
        fontFamily: FONT.medium,
        fontSize: SIZES.xLarge,
        paddingVertical: 10,
        paddingBottom: 20,
    },
    calorie: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    calorieVal: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        paddingBottom: 5,
    },
    calorieText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.font14,
        
    }
});

export default styles;
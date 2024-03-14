import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLORS, FONT, SIZES } from "../constants/theme";

const ToastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: 'green',
                borderLeftWidth: 7,
                width: '90%',
                height: 70,
                backgroundColor: COLORS.white,
                borderRightColor: 'green',
                borderRightWidth: 7,
            }}
            contentContainerStyle= {{paddingHorizontal: 15}}
            text1Style={{
                fontSize: 17,
                fontFamily: FONT.bold,
            }}
            text2Style={{
                fontSize: SIZES.font14,
            }}
        />
    ),

    error: (props) => (
        <ErrorToast
            {...props}
            text2NumberOfLines={3}
            style={{
                borderLeftColor: 'red',
                borderLeftWidth: 7,
                borderRightColor: 'red',
                borderRightWidth: 7,
                width: '90%',
                height: 70,
                backgroundColor: COLORS.white,
                zIndex: 1,
            }}
            contentContainerStyle={{paddingHorizontal: 15}}
            activeOpacity={0.8}
            text1Style={{
                fontSize: SIZES.large,
                fontFamily: FONT.bold,
                color: COLORS.blue,
            }}
            text2Style={{fontSize: SIZES.font14, fontFamily: FONT.medium}}
        />
    )
}

export default ToastConfig;
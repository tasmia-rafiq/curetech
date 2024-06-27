import { Image, Text, View } from "react-native";
import styles from "./home.style";
import Btn from "../Btn";
import { useRouter } from "expo-router";

const CheckHealth = () => {
    const route = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.largeTitle}>Check Your Health Status</Text>

      <View style={styles.lightBgContainer}>
        <View style={{ width: "30%", marginLeft: -20,}}>
          <Image
            source={require("../../assets/heart.png")}
            style={{ width: 190, height: 200 }}
          />
        </View>
        <View style={{ width: "70%", justifyContent: 'flex-start', paddingTop: 80, paddingLeft: 30, }}>
          <Text style={styles.textMedium}>
            Let's assess your health to avoid major risks
          </Text>
          <Btn btnTitle={'Get Started'} customeStyleBtn={{ width: 150, paddingVertical: 10 }} onPress={() => route.push('/health-status')} />
        </View>
      </View>
    </View>
  );
};

export default CheckHealth;

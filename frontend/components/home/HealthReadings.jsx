import { View, Text } from "react-native";

import styles from "./home.style";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faDroplet } from "@fortawesome/free-solid-svg-icons";

import { COLORS } from "../../constants/theme";

const HealthReadings = () => {
  return (
    <View style={styles.container}>
      {/* HEADER TITLE */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Data</Text>
        <Text style={styles.lastUpdated}>Last updated 3h ago</Text>
      </View>

      {/* BLOOD PRESSURE READINGS BOX */}
      <View style={styles.readingsContainer}>
        <View style={[styles.readingsBox, { backgroundColor: "#fbecf0" }]}>
          <View style={styles.readingsBoxTitle}>
            <FontAwesomeIcon icon={ faHeart } color={COLORS.pink} />
            <Text style={[styles.readingsTitle, styles.pink]}>Heart Rate</Text>
          </View>

          <View style={styles.readingsBoxValue}>
            <Text style={[styles.value, styles.pink]}>78</Text>
            <Text style={[styles.pink]}>bpm</Text>
          </View>
        </View>

        <View style={[styles.readingsBox, { backgroundColor: "#f1ecfa" }]}>
          <View style={styles.readingsBoxTitle}>
            <FontAwesomeIcon icon={ faDroplet } color={COLORS.purple} />
            <Text style={[styles.readingsTitle, styles.purple]}>Blood Pressure</Text>
          </View>

          <View style={styles.readingsBoxValue}>
            <Text style={[styles.value, styles.purple]}>120/80</Text>
            <Text style={styles.purple}>mmHg</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HealthReadings;
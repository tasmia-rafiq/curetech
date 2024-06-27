import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { COLORS, FONT } from "../../../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import Btn from "../../Btn";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({ item, index, onPress }) => {

  return (
    <LinearGradient
      colors={["#0b203f", "#0f2d63", "#253787", "#473fa9", "#7042c9"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ borderRadius: 20 }}
    >
      <View style={styles.container} key={index}>
        <View style={styles.flex}>
          <View style={styles.width50}>
            <Text style={styles.header}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
          <View>
            <Image source={item.imgUrl} />
          </View>
        </View>

        <Btn btnTitle={item.cta} onPress={onPress} customeStyleBtn={{ margin: 'auto', marginTop: 20, backgroundColor: COLORS.lightPurple }} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  width50: {
    width: "55%",
  },
  header: {
    color: "#fff",
    fontSize: 28,
    fontFamily: FONT.bold,
    paddingBottom: 10,
  },
  body: {
    color: "#fff",
    fontSize: 18,
    fontFamily: FONT.regular,
  },
});

export default CarouselCardItem;

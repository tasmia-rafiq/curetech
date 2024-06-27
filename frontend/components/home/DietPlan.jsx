import { View, Text, TouchableOpacity } from "react-native";
import CarouselCards from "./Carousel/CarouselCards";
import { useRouter } from "expo-router";

const DietPlan = () => {
  const route = useRouter();
  const handlePress = (target) => {
    route.push(target);
  }
  return (
    <View style={{ height: '50%', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
      <CarouselCards onPress={handlePress} />
    </View>
  );
};

export default DietPlan;
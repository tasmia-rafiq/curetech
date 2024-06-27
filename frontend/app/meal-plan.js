import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { COLORS, FONT, SIZES } from "../constants/theme";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import styles from "../constants/style";
import { faArrowLeft, faChartPie, faChevronDown, faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import useUserData from "../hooks/useUserData";
import useUserPersonalData from "../hooks/useUserPersonalData";
import Food from "../components/mealPlan/Food";

const Dropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: COLORS.purple, marginBottom: 15 }}>
                <Text style={[styles.header, { color: COLORS.blue, fontFamily: FONT.bold, paddingBottom: 15 }]}>{title}</Text>
                <TouchableOpacity onPress={toggleDropdown}>
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
                </TouchableOpacity>
            </View>
            {isOpen && (
                <View>
                    {children}
                </View>
            )}
        </View>
    );
};

const MealPlan = () => {
    const route = useRouter();
    const userPersonalData = useUserPersonalData();
    const [calories, setCalories] = useState("");

    const vegetables = [
        { name: "Leafy Greens", tag: "Spinach, Kale, Romaine Lettuce, Arugula", src: require('../assets/food/leafy-greens.png') },
        { name: "Sweet Potatoes", src: require('../assets/food/sweet-potato.jpeg') },
        { name: "Carrots", src: require('../assets/food/carrot.jpg') },
        { name: "Tomatoes", src: require('../assets/food/tomatoe.jpeg') },
    ];

    const fruits = [
        { name: "Banana", src: require('../assets/food/banana.jpg') },
        { name: "Berries", tag: "Blueberries, Raspberries, Strawberries", src: require('../assets/food/berries.jpg') },
        { name: "Citrus Fruits", tag: "Oranges, Grapefruits, Lemons, Limes", src: require('../assets/food/citrus.jpeg') },
        { name: "Apricots", src: require('../assets/food/apricot.jpeg') },
        { name: "Pomegranates", src: require('../assets/food/pomegranates.jpg') },
        { name: "Melons", tag: "Cantaloupe, Honeydew and Watermelon", src: require('../assets/food/melon.jpeg') }
    ];

    const wholeGrains = [
        { name: "Oats", src: require('../assets/food/oats.webp') },
        { name: "Brown Rice", src: require('../assets/food/brown-rice.jpg') },
        { name: "Quinoa", src: require('../assets/food/quinoa.webp') },
    ];
    const dairyProducts = [
        { name: "Yogurt", src: require('../assets/food/yogurt.jpg') },
        { name: "Skim Milk", tag: "Whole-milk with fat content removed", src: require('../assets/food/skim-milk.jpg') },
    ];

    const nutsSeeds = [
        { name: "Pumpkin Seeds", src: require('../assets/food/pumpkin-seeds.jpg') },
        { name: "Sunflower Seeds", src: require('../assets/food/sunflower.jpg') },
        { name: "Pistachio, Walnuts, Almonds", src: require('../assets/food/pistachio.jpg') },
    ];

    useEffect(() => {
        const calorieChart = {
            female: {
                '19-30': {
                    sedentary: 2000,
                    moderatelyActive: [2000, 2200],
                    active: 2400
                },
                '31-50': {
                    sedentary: 1800,
                    moderatelyActive: 2000,
                    active: 2200
                },
                '51+': {
                    sedentary: 1600,
                    moderatelyActive: 1800,
                    active: [2000, 2200]
                }
            },
            male: {
                '19-30': {
                    sedentary: 2400,
                    moderatelyActive: [2600, 2800],
                    active: 3000
                },
                '31-50': {
                    sedentary: 2200,
                    moderatelyActive: [2400, 2600],
                    active: [2800, 3000]
                },
                '51+': {
                    sedentary: 2000,
                    moderatelyActive: [2200, 2400],
                    active: [2400, 2800]
                }
            }
        };

        const getCalories = (age, gender, activityLevel) => {
            let ageRange;
            if (age >= 19 && age <= 30) {
                ageRange = '19-30';
            } else if (age >= 31 && age <= 50) {
                ageRange = '31-50';
            } else {
                ageRange = '51+';
            }

            const genderLowerCase = gender.toLowerCase();
            if (!['female', 'male'].includes(genderLowerCase)) {
                throw new Error('Invalid gender');
            }

            const chart = calorieChart[genderLowerCase];
            if (!chart) {
                throw new Error('Calorie data not found for the given gender');
            }

            const calories = chart[ageRange];
            if (!calories) {
                throw new Error('Calorie data not found for the given age range');
            }

            const level = activityLevel.toLowerCase();
            if (!['sedentary', 'moderately active', 'active'].includes(level)) {
                throw new Error('Invalid activity level');
            }

            const calorieRange = calories[level];
            if (!calorieRange) {
                throw new Error('Calorie data not found for the given activity level');
            }

            if (Array.isArray(calorieRange)) {
                // If it's a range, return the average
                return (calorieRange[0] + calorieRange[1]) / 2;
            } else {
                return calorieRange;
            }
        };


        if (userPersonalData) {
            try {
                const { age, gender, activityLevel } = userPersonalData;
                const calculatedCalories = getCalories(age, gender, activityLevel);
                setCalories(calculatedCalories);
            } catch (error) {
                console.error('Error calculating calories :(( ', error.message);
            }
        }
    }, [userPersonalData]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: COLORS.white },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => route.back()}>
                            <FontAwesomeIcon icon={faArrowLeft} color={COLORS.blue} size={SIZES.xLarge} />
                        </TouchableOpacity>
                    ),
                    headerTitle: "Meal Plan",
                    headerTitleStyle: {
                        fontSize: SIZES.xLarge,
                        fontFamily: FONT.bold,
                        color: COLORS.blue
                    },
                    headerTitleAlign: 'center',
                    headerBackButtonMenuEnabled: false,
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
                {/* DAILY CALORIES */}
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.header}>Daily Calories Intake</Text>
                    <TouchableOpacity style={styles.calorie}>
                        <View>
                            <Image source={require('../assets/healthy.png')} style={{ resizeMode: 'cover', width: 50, height: 50 }} />
                        </View>
                        <View style={{ width: '70%' }}>
                            <Text style={styles.calorieVal}>{calories} Calories</Text>
                            <Text style={styles.calorieText}>Your everyday goal to maintain hypertension.</Text>
                        </View>
                        <View>
                            <FontAwesomeIcon icon={faChevronRight} color={COLORS.blue} size={SIZES.medium} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* FOOD TO EAT AND AVOID */}
                <View style={{ marginTop: 30 }}>
                    {/* EAT THIS */}
                    <Dropdown title={'Eat this'}>
                        {/* VEGETABLES */}
                        <Food foodName={'Vegetables'} src={require('../assets/food/vegetable.jpg')} items={vegetables} />

                        {/* FRUITS */}
                        <Food foodName={'Fruits'} src={require('../assets/food/fruit.jpg')} items={fruits} />

                        {/* Whole Grains */}
                        <Food foodName={'Whole Grains'} src={require('../assets/food/whole-grains.webp')} items={wholeGrains} />

                        {/* Dairy */}
                        <Food foodName={'Low-Fat Dairy'} src={require('../assets/food/dairy.jpg')} items={dairyProducts} />

                        {/* Fish */}
                        <Food foodName={'Fish'} src={require('../assets/food/fish.jpg')} foodTag={'Salmon (Rawas), Mackerel (Surmai)'} />

                        {/* Poultry */}
                        <Food foodName={'Poultry Products'} src={require('../assets/food/poultry.jpg')} />

                        {/* Beans */}
                        <Food foodName={'Beans'} src={require('../assets/food/beans.jpg')} />

                        {/* Nuts */}
                        <Food foodName={'Nuts & Seeds'} src={require('../assets/food/poultry.jpg')} items={nutsSeeds} />

                        {/* Oil */}
                        <Food foodName={'Vegetable Oils'} src={require('../assets/food/oil.jpg')} />
                    </Dropdown>

                    {/* AVOID THIS */}
                    <Dropdown title={'Avoid this'}>
                        <Food foodName={'Fatty Meats'} src={require('../assets/food/fattymeat.jpg')} />
                        <Food foodName={'Full-fat Dairy'} src={require('../assets/food/full-fat.jpg')} foodTag={'Whole milk, Cream, Ice cream, Cheese, Cream cheese, Milkshakes'} />
                        <Food foodName={'Sugar Beverages'} src={require('../assets/food/beverages.jpg')} foodTag={'Energy drinks, Soda (Pepsi, Cola)'} />
                        <Food foodName={'Sweets'} src={require('../assets/food/sweets.jpg')} foodTag={'Mithai, Chocolate, Candy'} />
                        <Food foodName={'Sodium Intake'} src={require('../assets/food/sodium.jpg')} />
                    </Dropdown>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MealPlan;
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import { TimeProvider } from '../context/TimeContext';

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Fonts not loaded</Text>;
  }

  return (
    <TimeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='index' />
        <Stack.Screen name='signin' />
        <Stack.Screen name='meal-plan' options={{ title: 'Meal Plan' }} />
        <Stack.Screen name='workout-plan' options={{ title: 'Workout Plan' }} />
        <Stack.Screen name='medical-assistance' options={{ title: 'Medical Assistance' }} />
      </Stack>
    </TimeProvider>
  );
};

export default Layout;
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLORS, FONT, SIZES } from '../../constants/theme';


const TabsLayout = () => {
    const renderTabBarIcon = (name, focused) => {
        return <Icon name={name} color={focused ? COLORS.blue : COLORS.grey} size={SIZES.xLarge} />;
    };

    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: '#000000' },
                headerTintColor: COLORS.blue,
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 20,
                    paddingTop: 10,
                },
                backgroundColor: COLORS.blue,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: FONT.regular,
                },
            }}
        >
            <Tabs.Screen
                name='home' //it should be the filename (eg for hometab we have index.js page)
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => renderTabBarIcon('home', focused),
                    tabBarActiveTintColor: COLORS.blue,
                }}
            />
            <Tabs.Screen
                name='report'
                options={{
                    tabBarLabel: 'Report',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => renderTabBarIcon('pie-chart', focused),
                    tabBarActiveTintColor: COLORS.blue,
                }}
            />

            <Tabs.Screen
                name='notification'
                options={{
                    tabBarLabel: 'Notification',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => renderTabBarIcon('bell', focused),
                    tabBarActiveTintColor: COLORS.blue,
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => renderTabBarIcon('user', focused),
                    tabBarActiveTintColor: COLORS.blue,
                }}
            />

        </Tabs>
    )
}

export default TabsLayout
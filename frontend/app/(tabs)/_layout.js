import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeartCirclePlus, faHomeAlt, faPieChart, faUser } from '@fortawesome/free-solid-svg-icons';

import { COLORS, FONT, SIZES } from '../../constants/theme';


const TabsLayout = () => {
    const renderTabBarIcon = (icon, focused) => {
        return <FontAwesomeIcon icon={icon} color={focused ? COLORS.blue : COLORS.grey} size={SIZES.xLarge} />;
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
                    tabBarIcon: ({ focused }) => renderTabBarIcon(faHomeAlt, focused),
                    tabBarActiveTintColor: COLORS.blue,
                }}
            />

            <Tabs.Screen
                name='health-status'
                options={{
                    tabBarLabel: 'Health',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => renderTabBarIcon(faHeartCirclePlus, focused),
                    tabBarActiveTintColor: COLORS.blue,
                }}
            />

            <Tabs.Screen
                name='report'
                options={{
                    tabBarLabel: 'Report',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => renderTabBarIcon(faPieChart, focused),
                    tabBarActiveTintColor: COLORS.blue,
                }}
            />

            <Tabs.Screen
                name='profile'
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => renderTabBarIcon(faUser, focused),
                    tabBarActiveTintColor: COLORS.blue,
                }}
            />

        </Tabs>
    )
}

export default TabsLayout
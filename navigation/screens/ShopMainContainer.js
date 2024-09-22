import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeShopStack from './HomeShopStack'; // HomeShopStack including HomeScreenShop
import WorkShopScreen from './WorkScreenShop'; // Ensure correct path

const Tab = createBottomTabNavigator();

export default function ShopMainContainer() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="HomeShop"
                component={HomeShopStack}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#F44948' : 'gray' ,fontSize: 18,
                            fontFamily: 'SUT_Bold',}}>Home</Text>
                    ),
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="home-outline"
                            color={focused ? '#F44948' : color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="WorkShop"
                component={WorkShopScreen}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? '#F44948' : 'gray' ,fontSize: 18,
                            fontFamily: 'SUT_Bold',}}>Work</Text>
                    ),
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="newspaper-outline"
                            color={focused ? '#F44948' : color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

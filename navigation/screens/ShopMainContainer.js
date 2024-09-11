import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeShopStack from './HomeShopStack'; // HomeShopStack including HomeScreenShop
import WorkShopScreen from './WorkScreenShop'; // Ensure correct path
import MessageShopScreen from './MessageScreenShop'; // Ensure correct path

const Tab = createBottomTabNavigator();

export default function ShopMainContainer() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="HomeShop"
                component={HomeShopStack}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? 'tomato' : 'gray' }}>Home</Text>
                    ),
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="home-outline"
                            color={focused ? 'tomato' : color}
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
                        <Text style={{ color: focused ? 'tomato' : 'gray' }}>Work</Text>
                    ),
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="newspaper-outline"
                            color={focused ? 'tomato' : color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="MessageShop"
                component={MessageShopScreen}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? 'tomato' : 'gray' }}>Message</Text>
                    ),
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            color={focused ? 'tomato' : color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

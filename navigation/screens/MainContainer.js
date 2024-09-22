import * as React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from './HomeScreen';
import WorkScreen from './WorkScreen';
import MessageScreen from './MessageScreen';
import ProfileScreen from './ProfileScreen';
import EditProFileScreen from './EditProFileScreen';
import DetailScreen from './DetailScreen';

// Screen names
const homeName = 'Home';
const workName = 'Work';
const messageName = 'Message';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// สร้าง Stack สำหรับ Home ที่รวม HomeScreen และ ProfileScreen
function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProFileScreen" component={EditProFileScreen} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
    );
}
export default function MainContainer() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name={homeName}
                component={HomeStack}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? 'tomato' : 'gray' ,fontSize: 18,
                            fontFamily: 'SUT_Bold',}}>Home</Text>
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
                name={workName}
                component={WorkScreen}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? 'tomato' : 'gray' ,fontSize: 18,
                            fontFamily: 'SUT_Bold',}}>Work</Text>
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
            
        </Tab.Navigator>
    );
}

  


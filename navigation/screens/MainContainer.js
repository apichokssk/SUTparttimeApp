import * as React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            {/* เปลี่ยนชื่อ screen name ให้ไม่ซ้ำกัน */}
            <Stack.Screen
                name="HomeScreen"  // ใช้ชื่อ HomeScreen แทน Home เพื่อป้องกันการซ้ำกัน
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
                component={HomeStack}  // ใช้ HomeStack แทน HomeScreen
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
                name={workName}
                component={WorkScreen}
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
                name={messageName}
                component={MessageScreen}
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

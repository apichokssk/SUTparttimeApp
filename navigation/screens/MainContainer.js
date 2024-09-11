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
// Screen Shop
import HomeScreenShop from './HomeScreenShop';
import WorkScreenShop from './WorkScreenShop';
import MessageScreenShop from './MessageScreenShop';
import ProfileScreenShop from './ProfileScreenShop';
import EditProFileScreenShop from './EditProFileScreenShop';
import DetailScreenShop from './DetailScreenShop';

// Screen names
const homeName = 'Home';
const workName = 'Work';
const messageName = 'Message';
const homeShopName = 'HomeShop';
const workShopName = 'WorkShop';
const messageShopName = 'MessageShop';

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
function HomeShopStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreenShop"
                component={HomeScreenShop}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="ProfileScreenShop" component={ProfileScreenShop} />
            <Stack.Screen name="EditProFileScreenShop" component={EditProFileScreenShop} />
            <Stack.Screen name="DetailScreenShop" component={DetailScreenShop} />
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

  


import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screens
import HomeScreen from './HomeScreen';
import WorkScreen from './WorkScreen';
import MessageScreen from './MessageScreen';
import { faIls } from '@fortawesome/free-solid-svg-icons';

// Screen names
const homeName = 'Home';
const workName = 'Work';
const messageName = 'Message';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{headerShown:false}}
            >
                <Tab.Screen
                    name={homeName}
                    component={HomeScreen}
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
        </NavigationContainer>
    );
}

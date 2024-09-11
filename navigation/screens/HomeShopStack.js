import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenShop from './HomeScreenShop'; // Ensure correct path
import ProfileScreenShop from './ProfileScreenShop'; // Ensure correct path
import EditProfileScreenShop from './EditProFileScreenShop'; // Ensure correct path
import DetailScreenShop from './DetailScreenShop'; // Ensure correct path
import PostScreen from './PostScreen';

const Stack = createStackNavigator();

function HomeShopStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreenShop"
                component={HomeScreenShop}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="ProfileScreenShop" component={ProfileScreenShop} />
            <Stack.Screen name="EditProfileScreenShop" component={EditProfileScreenShop} />
            <Stack.Screen name="DetailScreenShop" component={DetailScreenShop} />
            <Stack.Screen
            name="PostScreen"
            component={PostScreen}
            options={{ headerShown: true, tabBarVisible: false }}  // Hide tab bar for PostScreen
          />
        </Stack.Navigator>
    );
}

export default HomeShopStack;

import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './navigation/screens/Login';  // Login Screen
import MainContainer from './navigation/screens/MainContainer'; // Main Container for Students
import ShopMainContainer from './navigation/screens/ShopMainContainer'; // Main Container for Shops
import PostScreen from './navigation/screens/PostScreen'; // PostScreen
import DetailScreenShop from './navigation/screens/DetailScreenShop'; // Detail Screen for Shops
import EditProfileScreenShop from './navigation/screens/EditProFileScreenShop'; // Edit Profile for Shops
import ProfileScreenShop from './navigation/screens/ProfileScreenShop'; // Profile Screen for Shops
import HomeScreenShop from './navigation/screens/HomeScreenShop'; // HomeScreen for Shops
import WorkScreenShop from './navigation/screens/WorkScreenShop';
import EditPostScreen from './navigation/screens/EditPostScreen'; // Add Edit Post Screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />

      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />

        {/* Shop Navigation */}
        <Stack.Screen 
          name="HomeScreenShop" 
          component={HomeScreenShop}  
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProfileScreenShop" 
          component={ProfileScreenShop} 
        />
        <Stack.Screen 
          name="EditProfileScreenShop" 
          component={EditProfileScreenShop} 
        />
        <Stack.Screen 
          name="DetailScreenShop" 
          component={DetailScreenShop} 
        />
        <Stack.Screen 
          name="PostScreen" 
          component={PostScreen} 
          options={{ headerShown: true, title: 'Create Post' }} // Show header with title
        />
        <Stack.Screen 
          name="EditPostScreen" 
          component={EditPostScreen}  // Add this screen to handle post editing
          options={{ headerShown: true, title: 'Edit Post' }}  // Show header with title
        />

        {/* Student Navigation */}
        <Stack.Screen 
          name="MainContainer" 
          component={MainContainer} 
          options={{ headerShown: false }} 
        />

        {/* Shop Main Container */}
        <Stack.Screen 
          name="ShopMainContainer" 
          component={ShopMainContainer} 
          options={{ headerShown: false }} 
        />

        {/* Work Screen for Shops */}
        <Stack.Screen 
          name="WorkScreenShop" 
          component={WorkScreenShop} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

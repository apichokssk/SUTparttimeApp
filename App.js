import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Login from './navigation/screens/Login';  // Login Screen
import MainContainer from './navigation/screens/MainContainer'; // Main Container for Students
import ShopMainContainer from './navigation/screens/ShopMainContainer'; // Main Container for Shops
import PostScreen from './navigation/screens/PostScreen'; // PostScreen
import DetailScreenShop from './navigation/screens/DetailScreenShop'; // Detail Screen for Shops
import EditProfileScreenShop from './navigation/screens/EditProFileScreenShop'; // Edit Profile for Shops
import ProfileScreenShop from './navigation/screens/ProfileScreenShop'; // Profile Screen for Shops
import HomeScreenShop from './navigation/screens/HomeScreenShop'; // Make sure to import HomeScreenShop here

// Prevent auto-hide of SplashScreen until loading is finished
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();


export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  // Function for loading fonts
  const loadFonts = async () => {
    await Font.loadAsync({
      'SUT_Regular': require('./assets/font/SUT_Regular.ttf'),
    });
    setFontsLoaded(true); 
  };

  // Load fonts when app starts
  React.useEffect(() => {
    loadFonts();
  }, []);

  // Hide SplashScreen once fonts are loaded
  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        {/* HomeShopStack moved from HomeShopStack.js */}
        <Stack.Screen 
          name="HomeScreenShop" 
          component={HomeScreenShop}  // This component was not imported before
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

        {/* PostScreen Stack: Ensures no tab bar is shown on this screen */}
        <Stack.Screen 
          name="PostScreen" 
          component={PostScreen} 
          options={{ headerShown: true }} 
        />
        <Stack.Screen 
          name="MainContainer" 
          component={MainContainer} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="ShopMainContainer" 
          component={ShopMainContainer} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

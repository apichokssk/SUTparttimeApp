import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font'; // Import the expo-font module
import * as FileSystem from 'expo-file-system';
import AppLoading from 'expo-app-loading'; // Import AppLoading component
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import theme from './theme'; // Import custom theme
import Login from './navigation/screens/Login';
import MainContainer from './navigation/screens/MainContainer';
import ShopMainContainer from './navigation/screens/ShopMainContainer';
import PostScreen from './navigation/screens/PostScreen';
import DetailScreenShop from './navigation/screens/DetailScreenShop';
import EditProfileScreenShop from './navigation/screens/EditProFileScreenShop';
import ProfileScreenShop from './navigation/screens/ProfileScreenShop';
import HomeScreenShop from './navigation/screens/HomeScreenShop';
import WorkScreenShop from './navigation/screens/WorkScreenShop';
import EditPostScreen from './navigation/screens/EditPostScreen';
import DetailScreen from './navigation/screens/DetailScreen';
import ForgotScreen from './navigation/screens/ForgotScreen';
import ApplicantScreen from './navigation/screens/ApplicantScreen';
import EmployeeScreen from './navigation/screens/EmployeeScreen';
import YourWorkScreen from './navigation/screens/YourWorkScreen';



const Stack = createStackNavigator();

const fetchFonts = async () => {
  console.log(await FileSystem.readDirectoryAsync(FileSystem.documentDirectory));
  return Font.loadAsync({
    'SUT_Bold': require('./assets/fonts/SUT_Bold.ttf'),
    'SUT_Regular': require('./assets/fonts/SUT_Regular.ttf'),
    'SUT_Light': require('./assets/fonts/SUT_Light.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      text: theme.colors.text,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="white-content" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgotScreen" component={ForgotScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreenShop" component={HomeScreenShop} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreenShop" component={ProfileScreenShop} />
        <Stack.Screen name="EditProfileScreenShop" component={EditProfileScreenShop} />
        <Stack.Screen name="DetailScreenShop" component={DetailScreenShop} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerShown: true, title: 'Create Post' }} />
        <Stack.Screen name="EditPostScreen" component={EditPostScreen} options={{ headerShown: true, title: 'Edit Post' }} />
        <Stack.Screen name="MainContainer" component={MainContainer} options={{ headerShown: false }} />
        <Stack.Screen name="ShopMainContainer" component={ShopMainContainer} options={{ headerShown: false }} />
        <Stack.Screen name="WorkScreenShop" component={WorkScreenShop} />
        <Stack.Screen name="ApplicantScreen" component={ApplicantScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="EmployeeScreen" component={EmployeeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="YourWorkScreen" component={YourWorkScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

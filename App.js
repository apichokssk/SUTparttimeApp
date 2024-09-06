import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font'; // สำหรับการโหลดฟอนต์
import * as SplashScreen from 'expo-splash-screen'; // สำหรับควบคุม Splash Screen
import Login from './navigation/screens/Login';  // นำเข้าหน้า Login
import MainContainer from './navigation/screens/MainContainer'; // นำเข้าหน้าหลัก

// ป้องกันการซ่อน Splash Screen โดยอัตโนมัติเมื่อแอปโหลดเสร็จ
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  // ฟังก์ชันสำหรับโหลดฟอนต์
  const loadFonts = async () => {
    await Font.loadAsync({
      'SUT_Regular': require('./assets/font/SUT_Regular.ttf'), // เส้นทางไปยังฟอนต์ของคุณ
    });
    setFontsLoaded(true); // ฟอนต์โหลดเสร็จ
  };

  React.useEffect(() => {
    async function prepare() {
      try {
        // โหลดฟอนต์
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // ซ่อน Splash Screen เมื่อโหลดฟอนต์เสร็จ
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
    }

    prepare(); // เรียกใช้เมื่อเริ่มแอป
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // ไม่แสดงอะไรเลยจนกว่าฟอนต์จะโหลดเสร็จ
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
        <Stack.Screen
          name="MainContainer"
          component={MainContainer}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

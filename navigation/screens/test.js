import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

function UserMain({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>user main!</Text>
      <Button title='Go to Profile' onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

function userprofile({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>user profile!</Text>
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function shopmain({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>shopmain!</Text>
      <Button title='Go to Settings' onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

function shopprofile({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>shopprofile!</Text>
    </View>
  );
}

function login({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>login!</Text>
      
      <Button title='Go to u' onPress={() => navigation.navigate('usertab2')} />
      
      <Button title='Go to s' onPress={() => navigation.navigate('shoptab2')} />
      <Button title='Go to r' onPress={() => navigation.navigate('regis')} />
    </View>
  );
}

function regis({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>regis!</Text>
      <Comm name="sssss" />
    </View>
  );
}



function Comm() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello! </Text>
    </View>
  );
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function usertab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UserMain" component={UserMain} />
      <Tab.Screen name="userprofile" component={userprofile} />
    </Tab.Navigator>
  );
}

function shoptab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="shopmain" component={shopmain} />
      <Tab.Screen name="shopprofile" component={shopprofile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="regis" component={regis} />
        <Stack.Screen name="shoptab2" component={shoptab} />
        <Stack.Screen name="usertab2" component={usertab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
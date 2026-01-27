import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false, // hide header on all screens
            animation: 'fade', // smooth fade transition
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />

          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

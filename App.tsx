import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import PinScreen from './components/PinScreen';
import BiometricScreen from './components/BiometricScreen';
import Home from './components/Home';

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Biometric"
          screenOptions={{
            headerShown: false, // hide header on all screens
            animation: 'fade', // smooth fade transition
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />

          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="Signup" component={SignupScreen} />

          <Stack.Screen name="Pin" component={PinScreen} />

          <Stack.Screen name="Biometric" component={BiometricScreen} />

          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

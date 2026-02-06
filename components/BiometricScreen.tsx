import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
import '../global.css';

type NavigationProp = {
  navigate: (screen: string) => void;
  goBack: () => void;
};

const rnBiometrics = new ReactNativeBiometrics();

export default function BiometricScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkFingerprintAvailability();
  }, []);

  // Check if fingerprint is available & enrolled
  const checkFingerprintAvailability = async () => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();

      // We only care if fingerprint is possible
      setIsBiometricAvailable(available);
    } catch (err) {
      console.log('Fingerprint check failed:', err);
      setIsBiometricAvailable(false);
    }
  };

  // Try fingerprint authentication
  const tryFingerprintLogin = async () => {
    if (!isBiometricAvailable) return;

    setLoading(true);

    try {
      const { success, error } = await rnBiometrics.simplePrompt({
        promptMessage: 'Verify with fingerprint',
        cancelButtonText: 'Cancel',
      });

      if (success) {
        // Fingerprint accepted → go to Home
        await AsyncStorage.setItem('@use_biometrics', 'true');
        navigation.navigate('Home');
      } else {
        // User pressed Cancel or failed
        if (error?.message?.includes('cancel')) {
          // Explicit cancel → go back to Login
          navigation.navigate('Login');
        } else {
          Alert.alert('Authentication Failed', 'Try again or use PIN.');
        }
      }
    } catch (err) {
      console.log('Fingerprint error:', err);
      Alert.alert('Error', 'Fingerprint login failed.');
    } finally {
      setLoading(false);
    }
  };

  // User wants to go back to login manually
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-600">
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      <LinearGradient
        colors={['#059669', '#0d9488']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center px-8">
          <View className="w-full max-w-md rounded-3xl bg-white/95 p-10 shadow-xl">
            <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
              Fingerprint Login
            </Text>

            <Text className="text-base text-center text-gray-600 mb-10">
              Place your finger on the sensor
            </Text>

            {isBiometricAvailable ? (
              <TouchableOpacity
                onPress={tryFingerprintLogin}
                disabled={loading}
                className={`rounded-xl py-5 items-center ${
                  loading
                    ? 'bg-gray-400'
                    : 'bg-emerald-600 active:bg-emerald-700'
                }`}
              >
                <Text className="text-white font-semibold text-xl">
                  {loading ? 'Verifying...' : 'Use Fingerprint'}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text className="text-center text-gray-700 text-lg mb-8">
                Fingerprint not available on this device
              </Text>
            )}

            <TouchableOpacity onPress={goToLogin} className="mt-6">
              <Text className="text-center text-gray-600 font-medium text-lg">
                Use Email & Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

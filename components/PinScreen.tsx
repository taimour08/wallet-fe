import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import '../global.css';

type NavigationProp = {
  navigate: (screen: string) => void;
};

export default function SetPinScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [step, setStep] = useState<'enter' | 'confirm'>('enter');
  const [error, setError] = useState<string | null>(null);

  const MAX_PIN_LENGTH = 6;

  // Reset error when user starts typing again
  useEffect(() => {
    if (error) setError(null);
  }, [pin, confirmPin, error]);

  const handleKeyPress = (value: string) => {
    if (step === 'enter') {
      if (pin.length < MAX_PIN_LENGTH) {
        setPin(prev => prev + value);
        Vibration.vibrate(10);
      }
    } else {
      if (confirmPin.length < MAX_PIN_LENGTH) {
        setConfirmPin(prev => prev + value);
        Vibration.vibrate(10);
      }
    }
  };

  const handleDelete = () => {
    if (step === 'enter') {
      setPin(prev => prev.slice(0, -1));
    } else {
      setConfirmPin(prev => prev.slice(0, -1));
    }
    Vibration.vibrate(10);
  };

  const handleContinue = async () => {
    if (step === 'enter') {
      if (pin.length < 4) {
        setError('PIN must be at least 4 digits');
        Vibration.vibrate([0, 120, 80, 120]);
        return;
      }
      if (pin.length > MAX_PIN_LENGTH) {
        setError('PIN cannot exceed 6 digits');
        return;
      }
      setStep('confirm');
      setError(null);
    } else {
      // Confirmation step
      if (confirmPin !== pin) {
        setError('PINs do not match');
        Vibration.vibrate([0, 150, 100, 150]);
        setConfirmPin('');
        return;
      }

      // Save PIN securely
      try {
        // In production → use react-native-keychain or similar for better security
        // Here we use AsyncStorage for simplicity (demo / dev purposes only)
        await AsyncStorage.setItem('@user_pin', pin);

        Alert.alert(
          'PIN Set Successfully',
          'Your PIN has been created.',
          [
            {
              text: 'Continue',
              onPress: () => {
                // Navigate to next screen in your flow
                navigation.navigate('BiometricSetup');
              },
            },
          ],
          { cancelable: false },
        );
      } catch (err) {
        console.error('Failed to save PIN:', err);
        Alert.alert('Error', 'Failed to save PIN. Please try again.');
      }
    }
  };

  const PinDots = ({ currentValue }: { currentValue: string }) => (
    <View className="flex-row justify-center space-x-4 my-8">
      {Array.from({ length: MAX_PIN_LENGTH }).map((_, index) => (
        <View
          key={index}
          className={`w-4 h-4 rounded-full border-2 ${
            index < currentValue.length
              ? 'bg-emerald-600 border-emerald-600'
              : 'border-gray-300 bg-white'
          }`}
        />
      ))}
    </View>
  );

  const renderTitle = () => {
    if (step === 'enter') {
      return 'Create your PIN';
    }
    return 'Confirm your PIN';
  };

  const renderSubtitle = () => {
    if (step === 'enter') {
      return 'This will be used for quick and secure access';
    }
    return 'Re-enter your PIN to confirm';
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-600">
      <StatusBar barStyle="light-content" backgroundColor="#0d9488" />

      <LinearGradient
        colors={['#059669', '#0d9488', '#0891b2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center px-8">
          {/* Card-like container */}
          <View className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-lg p-8 shadow-2xl border border-white/20">
            {/* Header */}
            <Text className="text-2xl font-bold text-center text-gray-800 mb-2">
              {renderTitle()}
            </Text>
            <Text className="text-base text-center text-gray-600 mb-8">
              {renderSubtitle()}
            </Text>

            {/* PIN display dots */}
            <PinDots currentValue={step === 'enter' ? pin : confirmPin} />

            {/* Error message */}
            {error && (
              <Text className="text-red-600 text-center mb-6 font-medium">
                {error}
              </Text>
            )}

            {/* Numeric Keypad */}
            <View className="flex-row flex-wrap justify-center gap-5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <TouchableOpacity
                  key={num}
                  onPress={() => handleKeyPress(num)}
                  className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center active:bg-gray-200"
                >
                  <Text className="text-3xl font-semibold text-gray-800">
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Spacer for alignment */}
              <View className="w-20 h-20" />

              <TouchableOpacity
                onPress={() => handleKeyPress('0')}
                className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center active:bg-gray-200"
              >
                <Text className="text-3xl font-semibold text-gray-800">0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDelete}
                className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center active:bg-gray-200"
              >
                <Text className="text-3xl font-semibold text-gray-800">⌫</Text>
              </TouchableOpacity>
            </View>

            {/* Action Button */}
            <TouchableOpacity
              onPress={handleContinue}
              disabled={
                (step === 'enter' && pin.length < 4) ||
                (step === 'confirm' && confirmPin.length < 4)
              }
              className={`mt-10 rounded-xl py-4 items-center ${
                (step === 'enter' && pin.length >= 4) ||
                (step === 'confirm' && confirmPin.length >= 4)
                  ? 'bg-emerald-600'
                  : 'bg-gray-300'
              }`}
            >
              <Text className="text-white font-semibold text-xl">
                {step === 'enter' ? 'Continue' : 'Confirm PIN'}
              </Text>
            </TouchableOpacity>

            {step === 'confirm' && (
              <TouchableOpacity
                onPress={() => {
                  setStep('enter');
                  setConfirmPin('');
                  setError(null);
                }}
                className="mt-4"
              >
                <Text className="text-center text-emerald-700 font-medium">
                  Start over
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

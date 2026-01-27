import React from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import '../global.css'; // NativeWind Tailwind import

export default function LoginScreen() {
  return (
    <View className="flex-1 items-center bg-teal-600 px-6 pt-12 pb-8">
      {/* Card */}
      <View className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl flex-1">
        {/* Header */}
        <View className="mb-4 mt-14">
          <View className="flex-row items-center gap-3">
            <Image
              source={require('./assets/logo.jpg')} // your app logo
              className="w-20 h-20 rounded-2xl"
            />
            <Text className="text-3xl font-bold text-teal-500">Rahi Pay</Text>
          </View>
          <Text className="text-xl mt-10 text-gray-600 text-center">
            Your Super Fintech App
          </Text>
        </View>

        {/* Form */}
        <View className="space-y-4">
          {/* Email */}
          <View>
            <Text className="mb-2 text-xl font-medium text-gray-700">
              Email
            </Text>
            <TextInput
              placeholder="user@example.com"
              defaultValue="demo@rahipay.com"
              keyboardType="email-address"
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </View>

          {/* Password */}
          <View>
            <Text className="mt-4 mb-2 text-xl font-medium text-gray-700">
              Password
            </Text>
            <TextInput
              placeholder="••••••••"
              defaultValue="password123"
              secureTextEntry
              className="w-full rounded-xl border border-gray-300 px-4 py-3"
            />
          </View>

          {/* Sign In Button */}
          <Pressable className="mt-5">
            <LinearGradient
              colors={['#059669', '#0d9488', '#0891b2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="w-full rounded-xl py-3 items-center"
            >
              <Text className="font-semibold text-white text-xl">Sign In</Text>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Biometric */}
        <View className="mt-6 items-center">
          <Pressable>
            <Text className="text-sm font-medium text-emerald-600 text-xl">
              Use Biometric Login
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View className="mt-6 border-t border-gray-200 pt-6 items-center">
          <Text className="text-xl text-gray-600">
            Don't have an account?{' '}
            <Text className="font-medium text-emerald-600">Sign Up</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

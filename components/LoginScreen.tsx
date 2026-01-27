import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import '../global.css'; // NativeWind Tailwind import

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const roles = ['User', 'Merchant', 'Admin'];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // small adjustment for Android
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center bg-teal-600 px-6 pt-12 pb-4">
          {/* Card */}
          <View className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            {/* Header */}
            <View className="mb-10 mt-12">
              <View className="flex-row items-center gap-3">
                <Text className="text-3xl font-bold text-black w-full text-center">
                  Welcome Back
                </Text>
              </View>
              <Text className="text-xl mt-2 text-gray-600 text-center">
                Sign in to access your account
              </Text>
            </View>

            {/* Role buttons */}
            <View className="mt-4 flex-row justify-center items-center gap-2">
              {roles.map(role => (
                <Pressable
                  key={role}
                  onPress={() => setSelectedRole(role)}
                  className={`
                    px-${role === 'Merchant' ? '4' : role === 'Admin' ? '7' : '8'}
                    py-2 rounded-2xl shadow-md transition-colors duration-200
                    ${selectedRole === role ? 'bg-emerald-600 shadow-lg' : 'bg-gray-200 shadow-md'}
                  `}
                >
                  <Text
                    className={`
                      text-md font-semibold
                      ${selectedRole === role ? 'text-white' : 'text-gray-800'}
                    `}
                  >
                    {role}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Form */}
            <View className="space-y-4 mt-8">
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
                  <Text className="font-semibold text-white text-xl">
                    Sign In
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>

            {/* Biometric */}
            <View className="mt-8 items-center">
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

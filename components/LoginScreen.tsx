import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import '../global.css';

export default function LoginScreen() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = ['User', 'Admin'] as const;

  const rolePadding: Record<(typeof roles)[number], string> = {
    User: 'px-8',
    Admin: 'px-7',
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'http://192.168.18.107:3000/api/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Successful',
          `Welcome back, ${data.user?.name || 'User'}!`,
        );
      } else {
        Alert.alert('Unsuccessful', data.error || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Unsuccessful', 'Network error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center bg-teal-600 px-6 pt-36">
          <View className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            {/* Header */}
            <View className="mb-10 mt-2">
              <Text className="text-3xl font-bold text-center text-black">
                Welcome Back
              </Text>
              <Text className="text-xl mt-2 text-gray-600 text-center">
                Sign in to access your account
              </Text>
            </View>

            {/* Roles */}
            <View className="flex-row justify-center gap-2">
              {roles.map(role => {
                const active = selectedRole === role;
                return (
                  <Pressable
                    key={role}
                    onPress={() => setSelectedRole(role)}
                    className={`
                      ${rolePadding[role]}
                      py-2 rounded-2xl
                      ${active ? 'bg-emerald-600' : 'bg-gray-200'}
                    `}
                  >
                    <Text
                      className={`font-semibold ${
                        active ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {role}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Form */}
            <View className="mt-8 space-y-4">
              <View>
                <Text className="mb-2 text-lg font-medium text-gray-700">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-black"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View>
                <Text className="mb-2 text-lg font-medium text-gray-700">
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="border border-gray-300 rounded-xl px-4 py-3 text-black"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Login Button */}
              <Pressable
                onPress={handleLogin}
                disabled={loading}
                className="mt-5"
              >
                <LinearGradient
                  colors={['#059669', '#0d9488', '#0891b2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="rounded-xl py-3 items-center"
                  style={{ opacity: loading ? 0.6 : 1 }}
                >
                  <Text className="text-white font-semibold text-xl">
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>

            {/* Footer */}
            <View className="mt-8 items-center">
              <Text className="text-gray-600 text-lg">
                Don’t have an account?{' '}
                <Text className="text-emerald-600 font-medium">Sign Up</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

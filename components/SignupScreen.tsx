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

export default function SignUpScreen() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = ['User', 'Admin'] as const;

  const rolePadding: Record<(typeof roles)[number], string> = {
    User: 'px-8',
    Admin: 'px-7',
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role');
      return;
    }

    // Optional: basic client-side phone check (E.164 starts with +)
    if (!phone.startsWith('+')) {
      Alert.alert(
        'Warning',
        'Phone should start with country code (e.g. +92...)',
      );
      // You can still proceed, backend will validate
    }

    setLoading(true);

    try {
      const response = await fetch(
        'http://192.168.18.107:3000/api/auth/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            role: selectedRole,
            platform: 'mobile', // ← Explicitly send "mobile" to match Postman
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        Alert.alert('Success', 'OTP sent to your phone number');
      } else {
        Alert.alert('Sign Up Failed', data.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error – please check your connection');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'http://192.168.18.107:3000/api/auth/verify-otp',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: otp.trim() }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success',
          'Account created successfully!\nYou can now sign in.',
        );
        // Reset form
        setOtpSent(false);
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setOtp('');
        setSelectedRole(null);
      } else {
        Alert.alert(
          'Verification Failed',
          data.error || 'Invalid or expired OTP',
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Network error – please try again');
      console.error('OTP verify error:', error);
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
        <View className="flex-1 items-center bg-teal-600 px-6 pt-8">
          <View className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            {/* Header */}
            <View className="mb-10 mt-2">
              <Text className="text-3xl font-bold text-center text-black">
                Create Account
              </Text>
              <Text className="text-xl mt-2 text-gray-600 text-center">
                Sign up to get started
              </Text>
            </View>

            {!otpSent ? (
              <>
                {/* Role Selection */}
                <View className="flex-row justify-center gap-3 mb-8">
                  {roles.map(role => {
                    const active = selectedRole === role;
                    return (
                      <Pressable
                        key={role}
                        onPress={() => setSelectedRole(role)}
                        className={`
                          ${rolePadding[role]}
                          py-3 rounded-2xl border
                          ${
                            active
                              ? 'bg-emerald-600 border-emerald-700'
                              : 'bg-gray-100 border-gray-300'
                          }
                        `}
                      >
                        <Text
                          className={`font-semibold text-base ${
                            active ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {role}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                {/* Form Fields */}
                <View className="space-y-5">
                  <View>
                    <Text className="mb-2 text-lg font-medium text-gray-700">
                      Full Name
                    </Text>
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      className="border border-gray-300 rounded-xl px-4 py-3.5 text-black bg-gray-50"
                      placeholder="Taimour Ahmed"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <View>
                    <Text className="mb-2 text-lg font-medium text-gray-700">
                      Email
                    </Text>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      className="border border-gray-300 rounded-xl px-4 py-3.5 text-black bg-gray-50"
                      placeholder="taimour.ahmed@example.com"
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
                      className="border border-gray-300 rounded-xl px-4 py-3.5 text-black bg-gray-50"
                      placeholder="••••••••••••"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <View>
                    <Text className="mb-2 text-lg font-medium text-gray-700">
                      Phone Number (with country code)
                    </Text>
                    <TextInput
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      className="border border-gray-300 rounded-xl px-4 py-3.5 text-black bg-gray-50"
                      placeholder="+923001234567"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  {/* Sign Up Button */}
                  <Pressable
                    onPress={handleSignUp}
                    disabled={loading}
                    className="mt-6"
                  >
                    <LinearGradient
                      colors={['#059669', '#0d9488', '#0891b2']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="rounded-xl py-4 items-center"
                      style={{ opacity: loading ? 0.7 : 1 }}
                    >
                      <Text className="text-white font-bold text-xl">
                        {loading ? 'Creating Account...' : 'Sign Up'}
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                {/* OTP Section */}
                <View className="mt-6 space-y-5">
                  <View>
                    <Text className="mb-2 text-lg font-medium text-gray-700 text-center">
                      Enter the 6-digit OTP sent to
                    </Text>
                    <Text className="text-center text-emerald-700 font-medium mb-4">
                      {phone || 'your phone'}
                    </Text>
                    <TextInput
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="number-pad"
                      maxLength={6}
                      className="border border-gray-300 rounded-xl px-5 py-4 text-black text-center text-2xl tracking-widest bg-gray-50"
                      placeholder="------"
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>

                  <Pressable
                    onPress={handleVerifyOtp}
                    disabled={loading}
                    className="mt-4"
                  >
                    <LinearGradient
                      colors={['#059669', '#0d9488', '#0891b2']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="rounded-xl py-4 items-center"
                      style={{ opacity: loading ? 0.7 : 1 }}
                    >
                      <Text className="text-white font-bold text-xl">
                        {loading ? 'Verifying...' : 'Verify & Create Account'}
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </>
            )}

            {/* Footer */}
            <View className="mt-10 items-center">
              <Text className="text-gray-600 text-base">
                Already have an account?{' '}
                <Text className="text-emerald-600 font-semibold">Sign In</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

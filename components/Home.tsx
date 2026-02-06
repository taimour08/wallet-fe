import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import '../global.css';

type Transaction = {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: string;
  title: string;
  date: string;
};

export default function DashboardScreen() {
  // State
  const [selectedCurrency, setSelectedCurrency] = useState<
    'USD' | 'EUR' | 'PKR'
  >('USD');

  // Mock balance (in real app → fetch from API / secure storage)
  const balances = {
    USD: 1248.75,
    EUR: 1142.3,
    PKR: 348750,
  };

  // Mock recent transactions
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      amount: 250,
      currency: selectedCurrency,
      title: 'Salary Deposit',
      date: 'Today, 09:32 AM',
    },
    {
      id: '2',
      type: 'debit',
      amount: 45.99,
      currency: selectedCurrency,
      title: 'Coffee Shop',
      date: 'Yesterday, 14:15',
    },
    {
      id: '3',
      type: 'debit',
      amount: 120,
      currency: selectedCurrency,
      title: 'Grocery Store',
      date: 'Yesterday, 11:40',
    },
    {
      id: '4',
      type: 'credit',
      amount: 85,
      currency: selectedCurrency,
      title: 'Freelance Payment',
      date: '2 days ago',
    },
  ];

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'PKR' ? 0 : 2,
    }).format(amount);
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
      <View className="flex-row items-center">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
            item.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <Text className="text-xl">{item.type === 'credit' ? '↑' : '↓'}</Text>
        </View>

        <View>
          <Text className="font-medium text-gray-800">{item.title}</Text>
          <Text className="text-sm text-gray-500">{item.date}</Text>
        </View>
      </View>

      <Text
        className={`font-semibold text-lg ${
          item.type === 'credit' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {item.type === 'credit' ? '+' : '-'}
        {formatAmount(item.amount, item.currency)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      {/* Header / Balance Section */}
      <LinearGradient
        colors={['#059669', '#0d9488']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-12 pb-16 px-6 rounded-b-3xl"
      >
        <Text className="text-white text-lg opacity-90 text-center mb-2">
          Total Balance
        </Text>

        {/* Balance */}
        <Text className="text-white text-4xl font-bold text-center tracking-tight">
          {formatAmount(balances[selectedCurrency], selectedCurrency)}
        </Text>

        {/* Currency Selector */}
        <View className="flex-row justify-center space-x-3 mb-5 mt-4">
          {(['USD', 'EUR', 'PKR'] as const).map(curr => (
            <TouchableOpacity
              key={curr}
              onPress={() => setSelectedCurrency(curr)}
              className={`px-5 py-2 rounded-full border ${
                selectedCurrency === curr
                  ? 'bg-white border-white'
                  : 'bg-transparent border-white/40'
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedCurrency === curr ? 'text-emerald-800' : 'text-white'
                }`}
              >
                {curr}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* Recent Transactions */}
      <View className="flex-1 px-5 pt-6">
        <Text className="text-xl font-semibold text-gray-800 mb-4 px-1">
          Recent Transactions
        </Text>

        <FlatList
          data={recentTransactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      {/* Bottom Tab Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <View className="flex-row justify-around items-center py-3">
          {/* Home (selected) */}
          <TouchableOpacity className="items-center">
            <Text className="text-2xl mb-1">🏠</Text>
            <Text className="text-xs font-medium text-emerald-600">Home</Text>
          </TouchableOpacity>

          {/* Send */}
          <TouchableOpacity className="items-center opacity-60">
            <Text className="text-2xl mb-1">↗</Text>
            <Text className="text-xs font-medium text-gray-600">Send</Text>
          </TouchableOpacity>

          {/* Transactions */}
          <TouchableOpacity className="items-center opacity-60">
            <Text className="text-2xl mb-1">📋</Text>
            <Text className="text-xs font-medium text-gray-600">History</Text>
          </TouchableOpacity>

          {/* Profile */}
          <TouchableOpacity className="items-center opacity-60">
            <Text className="text-2xl mb-1">👤</Text>
            <Text className="text-xs font-medium text-gray-600">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

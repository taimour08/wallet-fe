module.exports = {
  root: true,
  extends: [
    '@react-native', // this replaced @react-native-community
    'prettier', // turns off conflicting rules
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    // your custom rules here if any
  },
};

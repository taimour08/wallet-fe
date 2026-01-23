/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/dist/metro/index.js');

const defaultConfig = getDefaultConfig(__dirname);

const config = mergeConfig(defaultConfig, {});

module.exports = withNativeWind(config, { input: './global.css' });

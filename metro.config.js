/* eslint-disable @typescript-eslint/no-require-imports */
import { mergeConfig } from '@react-native/metro-config';
import { getDefaultConfig as getMetroDefaultConfig } from '@react-native/metro-config';

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

export default mergeConfig(getMetroDefaultConfig(__dirname), config);

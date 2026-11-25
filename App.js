import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { colors } from './src/styles/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <RootNavigator />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}

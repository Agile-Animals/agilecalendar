import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {LoginStack} from './src/navigation'
import {ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './config/custom-theme.json';
import * as eva from '@eva-design/eva';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

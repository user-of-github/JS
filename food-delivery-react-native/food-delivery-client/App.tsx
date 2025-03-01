import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <Text>Home!!!</Text>
      </SafeAreaProvider>
    </>
  );
}

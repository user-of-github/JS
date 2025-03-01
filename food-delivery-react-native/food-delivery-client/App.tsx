import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppNavigation } from '@/navigation/Navigation';
import './global.css';
import { RootLayout } from './RootLayout';

export default function App() {
  return (
      <SafeAreaProvider>
        <RootLayout/>
        <StatusBar style="light"/>
      </SafeAreaProvider>
  );
}

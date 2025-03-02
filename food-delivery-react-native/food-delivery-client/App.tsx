import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppNavigation } from '@/navigation/Navigation';
import { RootLayout } from './RootLayout';
import './global.css';
import { AuthProvider } from './app/features/auth/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootLayout />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

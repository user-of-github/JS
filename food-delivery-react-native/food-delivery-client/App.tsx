import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootLayout } from './RootLayout';
import './global.css';
import { AuthProvider } from '@/features/auth/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootLayout />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

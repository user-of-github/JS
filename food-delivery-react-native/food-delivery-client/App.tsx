import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/features/auth/AuthProvider';
import { RootLayout } from './RootLayout';
import './global.css';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootLayout />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

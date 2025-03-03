import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { RootLayout } from '@/RootLayout';
import { AuthProvider } from '@/features/auth/AuthProvider';
import './global.css';

export default function App() {
  return (
    <>
      <AuthProvider>
        <SafeAreaProvider>
          <RootLayout />
        </SafeAreaProvider>
      </AuthProvider>
      <StatusBar style="dark" />
      <Toast topOffset={50} />
    </>
  );
}

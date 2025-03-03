import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/features/auth/AuthProvider';
import { RootLayout } from '@/RootLayout';
import './global.css';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <AuthProvider>
        <SafeAreaProvider>
          <RootLayout />
        </SafeAreaProvider>
      </AuthProvider>
      <StatusBar style="dark"/>
      <Toast topOffset={50} />
    </>
  );
}

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigation } from '@/navigation/Navigation';
import './global.css';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <AppNavigation/>
      </SafeAreaProvider>
    </>
  );
}

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { RootLayout } from '@/RootLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/features/auth/AuthProvider';
import { NotificationToast } from '@/components/ui/Notification';
import './global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <RootLayout />
        </SafeAreaProvider>
      </AuthProvider>
      <StatusBar style="dark" />

      <NotificationToast />
    </QueryClientProvider>
  );
}

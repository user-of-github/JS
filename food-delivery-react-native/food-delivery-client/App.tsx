import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { RootLayout } from '@/RootLayout';
import { persistor, store } from '@/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BACKGROUND_COLOR } from '@/config/colors';
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
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SafeAreaProvider>
              <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_KEY}>
                <RootLayout />
              </StripeProvider>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </AuthProvider>

      <StatusBar style="dark" translucent={false} backgroundColor={BACKGROUND_COLOR} />

      <NotificationToast />
    </QueryClientProvider>
  );
}

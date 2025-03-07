import { AppRoutes } from '@/navigation/routes';
import { Navigation } from 'react-native-navigation';

export function registerScreens() {
  for (const key in AppRoutes) {
    const screen = AppRoutes[key as keyof typeof AppRoutes];
    Navigation.registerComponent(screen.name, () => screen.component);
  }
}
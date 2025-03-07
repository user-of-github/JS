import { Navigation } from 'react-native-navigation';
import { registerScreens } from '@/screens';
import { AppRoutes } from '@/navigation/routes';

export const start: VoidFunction = () => {
  registerScreens();

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'HomeScreen'
        }
      }
    });
  });
};

import { Navigation } from 'react-native-navigation';
import { AppRoutes } from '@/navigation/routes';
import { registerScreens } from '@/screens';





export const start: VoidFunction = () => {
  registerScreens();

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'HomeScreen',
        },
      },
    });
  });
};
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigationScreensListType } from '@/navigation/types';

export const useAppNavigation = () => useNavigation<NavigationProp<NavigationScreensListType>>();

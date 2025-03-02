import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TypeRootStackParamList } from '@/navigation/types';

export const useAppNavigation = () => useNavigation<NavigationProp<TypeRootStackParamList>>();

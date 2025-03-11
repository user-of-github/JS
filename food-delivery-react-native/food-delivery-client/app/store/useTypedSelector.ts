import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { TypeRootState } from '@/store/index';

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector;

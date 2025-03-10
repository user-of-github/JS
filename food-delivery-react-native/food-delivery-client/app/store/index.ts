import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  PersistConfig,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore
} from 'redux-persist';
import { cartSlice } from './slices/cart.slice';


const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart']
};


const rootReducer = combineReducers({
  cart: cartSlice.reducer
});

  const persistedReducer = persistReducer<TypeRootState>(
  persistConfig,
  rootReducer
);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER
      ]
    }
  })
});

export const persistor = persistStore(store);
export type TypeRootState = ReturnType<typeof rootReducer>;

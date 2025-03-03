import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { type AuthResponse, type AuthTokens, EnumAsyncStorage, EnumSecureStore } from '@/types/auth.i';
import { AppStorage } from '@/services/storage/index';
import Toast from 'react-native-toast-message';
import type { User } from '@/types/user.i';

export const getAccessTokenFromStorage = async (): Promise<string | null> => {
  const accessToken = await getItemAsync(EnumSecureStore.AccessToken);
  return accessToken || null;
};

export const geRefreshTokenFromStorage = async (): Promise<string | null> => {
  const refresh = await getItemAsync(EnumSecureStore.RefreshToken);
  return refresh || null;
};

export const saveTokensToStorage = async (data: AuthTokens): Promise<void> => {
  await Promise.all([
    setItemAsync(EnumSecureStore.AccessToken, data.accessToken),
    setItemAsync(EnumSecureStore.RefreshToken, data.refreshToken)
  ]);
};

export const deleteTokensToStorage = async (data: AuthTokens): Promise<void> => {
  await Promise.all([deleteItemAsync(EnumSecureStore.AccessToken), deleteItemAsync(EnumSecureStore.RefreshToken)]);
};

export const getUserFormStorage = async (): Promise<User | null> => {
  try {
    const fromMemory = AppStorage.getString(EnumAsyncStorage.User);
    if (!fromMemory) {
      return null;
    }
    return JSON.parse(fromMemory);
  } catch {
    return null;
  }
};

export const saveToStorage = async (data: AuthResponse): Promise<void> => {
  try {
    await saveTokensToStorage(data);

    AppStorage.set(EnumAsyncStorage.User, JSON.stringify(data.user));
  } catch {
    Toast.show({
      text1: 'Error',
      text2: 'saveToStorage()'
    });
  }
};
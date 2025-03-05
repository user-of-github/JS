import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { type AuthResponse, type AuthTokens, EnumAsyncStorage, EnumSecureStore } from '@/types/auth.i';
import { AppStorage } from '@/services/storage/storage';
import Toast from 'react-native-toast-message';
import type { User } from '@/types/user.i';

export class AuthDataStorageService {
  public static async getAccessToken (): Promise<string | null> {
    const accessToken = await getItemAsync(EnumSecureStore.AccessToken);
    return accessToken || null;
  };

  public static async getRefreshToken (): Promise<string | null> {
    const refresh = await getItemAsync(EnumSecureStore.RefreshToken);
    return refresh || null;
  };

  public static async saveTokens (data: AuthTokens): Promise<void> {
    await Promise.all([
      setItemAsync(EnumSecureStore.AccessToken, data.accessToken),
      setItemAsync(EnumSecureStore.RefreshToken, data.refreshToken)
    ]);
  };

  public static async deleteTokens (): Promise<void>  {
    await Promise.all([deleteItemAsync(EnumSecureStore.AccessToken), deleteItemAsync(EnumSecureStore.RefreshToken)]);
  };

  public static async getUser (): Promise<User | null>  {
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

  public static async saveToStorage (data: AuthResponse): Promise<void> {
    try {
      await AuthDataStorageService.saveTokens(data);

      AppStorage.set(EnumAsyncStorage.User, JSON.stringify(data.user));
    } catch {
      Toast.show({
        text1: 'Error',
        text2: 'saveToStorage()'
      });
    }
  };
}
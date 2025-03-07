import Toast from 'react-native-toast-message';
import { type AuthResponse, type AuthTokens, EnumAsyncStorage, EnumSecureStore } from '@/types/auth.i';
import type { User } from '@/types/user.i';
import type { IStorageService } from '@/services/storage/storage.i';
import { appStorageService, secureAppStorageService } from '@/services/storage/storage.service';

class AuthDataStorageService {
  public constructor(
    private readonly appStorage: IStorageService,
    private readonly secureAppStorage: IStorageService
  ) {}

  public async getAccessToken(): Promise<string | null> {
    const accessToken = await this.secureAppStorage.get(EnumSecureStore.AccessToken);
    return accessToken || null;
  }

  public async getRefreshToken(): Promise<string | null> {
    const refresh = await this.secureAppStorage.get(EnumSecureStore.RefreshToken);
    return refresh || null;
  }

  public async saveTokens(data: AuthTokens): Promise<void> {
    await Promise.all([
      this.secureAppStorage.set(EnumSecureStore.AccessToken, data.accessToken),
      this.secureAppStorage.set(EnumSecureStore.RefreshToken, data.refreshToken)
    ]);
  }

  public async deleteTokens(): Promise<void> {
    await Promise.all([
      this.secureAppStorage.delete(EnumSecureStore.AccessToken),
      this.secureAppStorage.delete(EnumSecureStore.RefreshToken)
    ]);
  }

  public async deleteUser(): Promise<void> {
    await this.appStorage.delete(EnumAsyncStorage.User);
  }

  public async getUser(): Promise<User | null> {
    try {
      const fromMemory = await this.appStorage.get(EnumAsyncStorage.User);
      if (!fromMemory) {
        return null;
      }
      return JSON.parse(fromMemory);
    } catch {
      return null;
    }
  }

  public async saveToStorage(data: AuthResponse): Promise<void> {
    try {
      await this.saveTokens(data);
      await this.appStorage.set(EnumAsyncStorage.User, JSON.stringify(data.user));
    } catch {
      Toast.show({
        text1: 'Error',
        text2: 'saveToStorage()'
      });
    }
  }
}

export const authDataStorageService = new AuthDataStorageService(appStorageService, secureAppStorageService);
export type AuthDataStorageServiceType = typeof authDataStorageService;

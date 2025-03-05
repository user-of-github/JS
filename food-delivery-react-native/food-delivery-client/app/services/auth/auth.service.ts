import { type AuthDto, type AuthResponse, EnumAsyncStorage, type RegisterDto } from '@/types/auth.i';
import { request } from '@/services/api/request';
import { getAuthUrl } from '@/config/api';
import { AuthDataStorageService } from '@/services/storage/auth-helper';
import { AppStorage } from '@/services/storage/storage';

export class AuthService {
  public static async login(data: AuthDto) {
    const response = await request<AuthResponse>({
      url: getAuthUrl('login'),
      data,
      method: 'POST',
    });

    if (response.accessToken) {
      await AuthDataStorageService.saveToStorage(response);
    }

    return response;
  }

  public static async register(data: RegisterDto) {
    const response = await request<AuthResponse>({
      url: getAuthUrl('register'),
      data,
      method: 'POST',
    });

    if (response.accessToken) {
      await AuthDataStorageService.saveToStorage(response);
    }

    return response;
  }

  public static async logout(): Promise<void> {
    await AuthDataStorageService.deleteTokens();
    AppStorage.delete(EnumAsyncStorage.User);
  }
}
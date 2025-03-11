import { API_URL, ApiUrls } from '@/config/api';
import { type AuthDto, type AuthResponse, type RegisterDto } from '@/types/auth.i';
import { request } from '@/services/api/request';
import { type AuthDataStorageServiceType, authDataStorageService } from './auth-data-storage.service';

class AuthService {
  public constructor(private readonly authDataStorage: AuthDataStorageServiceType) {}

  public async login(data: AuthDto) {
    const response = await request<AuthResponse>({
      url: ApiUrls.auth.login,
      data: data,
      method: 'POST'
    });

    if (response.accessToken) {
      await this.authDataStorage.saveToStorage(response);
    }

    return response;
  }

  public async register(data: RegisterDto) {
    const response = await request<AuthResponse>({
      url: ApiUrls.auth.register,
      data,
      method: 'POST'
    });
    debugger;

    if (response.accessToken) {
      await this.authDataStorage.saveToStorage(response);
    }

    return response;
  }

  public async logout(): Promise<void> {
    await this.authDataStorage.deleteTokens();
    await this.authDataStorage.deleteUser();
  }
}

export const authService = new AuthService(authDataStorageService);

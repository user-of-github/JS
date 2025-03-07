import { ApiUrls, getAuthUrl } from '@/config/api';
import { request } from '@/services/api/request';
import { type AuthDto, type AuthResponse, type RegisterDto } from '@/types/auth.i';
import { type AuthDataStorageServiceType, authDataStorageService } from './auth-data-storage.service';

class AuthService {
  public constructor(private readonly authDataStorage: AuthDataStorageServiceType) {}

  public async login(data: AuthDto) {
    debugger;
    console.log(data)
    const response = await request<AuthResponse>({
      url: ApiUrls.auth.login,
      data,
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

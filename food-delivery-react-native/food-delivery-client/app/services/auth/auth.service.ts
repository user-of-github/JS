import { API_URL, ApiUrls } from '@/config/api';
import { request } from '@/services/api/request';
import { type AuthDto, type AuthResponse, type RegisterDto } from '@/types/auth.i';
import { type AuthDataStorageServiceType, authDataStorageService } from './auth-data-storage.service';


class AuthService {
  public constructor(private readonly authDataStorage: AuthDataStorageServiceType) {}

  public async login(data: AuthDto) {
    const response = await request<AuthResponse>({
      url: `${API_URL}${ApiUrls.auth.login}`,
      data: data,
      method: 'POST'
    });


    console.log('RESPONSE', response?.accessToken)

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

import axios from 'axios';
import type { AuthResponse } from '@/types/auth.i';
import { API_URL, getAuthUrl } from '@/config/api';
import { AuthDataStorageService } from '@/services/storage/auth-helper';

export const getNewTokens = async () => {
  try {
    const refreshToken = await AuthDataStorageService.getRefreshToken();
    const response = await axios.post<string, { data: AuthResponse }>(
      API_URL + getAuthUrl('/login/access-token'),
      { refreshToken}, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response?.data?.accessToken) {
      await AuthDataStorageService.saveToStorage(response.data);
    }

    return response.data;
  } catch {}
};
import axios from 'axios';
import type { AuthResponse } from '@/types/auth.i';
import { API_URL, ApiUrls, getAuthUrl } from '@/config/api';
import { authDataStorageService } from '@/services/auth/auth-data-storage.service';

export const getNewTokens = async () => {
  try {
    const refreshToken = await authDataStorageService.getRefreshToken();

    const response = await axios.post<string, { data: AuthResponse }>(
      API_URL + ApiUrls.auth.accessToken,
      { refreshToken},
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response?.data?.accessToken) {
      await authDataStorageService.saveToStorage(response.data);
    }

    return response.data;
  } catch {}
};
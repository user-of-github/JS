import { geRefreshTokenFromStorage, saveToStorage } from '@/services/storage/auth-helper';
import axios from 'axios';
import type { AuthResponse } from '@/types/auth.i';
import { API_URL, getAuthUrl } from '@/config/api';

export const getNewToken = async () => {
  try {
    const refreshToken = await geRefreshTokenFromStorage();
    const response = await axios.post<string, { data: AuthResponse }>(
      API_URL + getAuthUrl('/login/access-token'),
      { refreshToken}, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (response?.data?.accessToken) {
      await saveToStorage(response.data);
    }

    return response.data;
  } catch {}
};
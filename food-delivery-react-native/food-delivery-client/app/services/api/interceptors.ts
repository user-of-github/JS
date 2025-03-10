import axios from 'axios';
import { API_URL, ApiUrls } from '@/config/api';
import { getNewTokens } from '@/services/api/helper';
import { authDataStorageService } from '@/services/auth/auth-data-storage.service';
import { authService } from '@/services/auth/auth.service';
import { useAuth } from '@/features/auth/AuthProvider';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await authDataStorageService.getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    console.log('INTERCEPTOR');
    console.log(error);

    if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
      // originalRequest._isRetry = true;
      //
      // try {
      //   await getNewTokens();
      //   return Promise.resolve(axiosInstance(originalRequest));
      // } catch (tokenError) {
      //   return Promise.reject(tokenError);
      // }

      await authService.logout();
    }

    return Promise.reject(error);
  }
);

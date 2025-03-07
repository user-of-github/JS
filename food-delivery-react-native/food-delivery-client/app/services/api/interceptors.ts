import axios from 'axios';
import { API_URL, ApiUrls } from '@/config/api';
import { getNewTokens } from '@/services/api/helper';
import { authDataStorageService } from '@/services/auth/auth-data-storage.service';

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

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._isRetry = true;

      try {
        await getNewTokens();
        return Promise.resolve(axiosInstance(originalRequest));
      } catch (tokenError) {
        await authDataStorageService.deleteTokens();

        return Promise.reject(tokenError);
      }
    }

    return Promise.reject(error);
  }
);

import { API_URL } from '@/config/api';
import axios from 'axios';
import { getAccessTokenFromStorage } from '@/services/auth/helper';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


instance.interceptors.request.use(async (config) => {
  const accessToken = await getAccessTokenFromStorage();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
import Toast from 'react-native-toast-message';
import { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { axiosInstance } from '@/services/api/interceptors';
import { getErrorText } from '@/services/api/utils';

export const request = async <ValueType>(config: AxiosRequestConfig) => {
  const onSuccess = async (response: AxiosResponse<ValueType>) => {
    console.log('RESPONSE', response)
    return response?.data
  };

  const onError = (error: AxiosError) => {
    Toast.show({
      type: 'error',
      text1: 'Request error',
      text2: getErrorText(error)
    });

    return Promise.reject(error);
  };

  const res = await fetch('http://localhost:4200/auth/login', {
    body: JSON.stringify(config.data)
  });

  console.log(res);

  return await res.json();
};

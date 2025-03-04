import Toast from 'react-native-toast-message';
import { getErrorText } from '@/services/api/utils';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance } from '@/services/api/interceptors';

export const request = async <ValueType>(config: AxiosRequestConfig) => {
  const onSuccess = async (response: AxiosResponse<ValueType>) => response.data;

  const onError = (error: AxiosError) => {
    Toast.show({
      type: 'error',
      text1: 'Request error',
      text2: getErrorText(error)
    });

    return Promise.reject(error);
  };

  return axiosInstance(config).then(onSuccess).catch(onError);
};

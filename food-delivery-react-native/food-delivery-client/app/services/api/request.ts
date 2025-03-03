import Toast from 'react-native-toast-message';
import { getErrorText } from '@/services/api/utils';
import { type AxiosError, type AxiosResponse } from 'axios';

export const request = async <ValueType>() => {
  const onSuccess = async (response: AxiosResponse<ValueType>) => response.data;

  const onError = (error: AxiosError) => {
    Toast.show({
      type: 'error',
      text1: 'Request error',
      text2: getErrorText(error)
    });

    return Promise.reject(error);
  };
};

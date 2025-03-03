export const getErrorText = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (!error || typeof error !== 'object') {
    return '';
  }

  const message = error?.response?.data?.message;

  if (message) {
    if (Array.isArray(message) || typeof message === 'object') {
      return message[0];
    } else {
      return message;
    }
  } else {
    return String(error);
  }
};

export const getErrorMessage = (error: unknown): string | null => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object' && error !== null) {
    if ('error' in error) {
      return String(error['error']);
    }

    if ('data' in error) {
      const data = error['data'];
      if (data === 'string') {
        return data;
      } else if (data !== null && typeof data === 'object' && 'error' in data) {
        return String(data['error']);
      }
    }
  }

  return null;
};
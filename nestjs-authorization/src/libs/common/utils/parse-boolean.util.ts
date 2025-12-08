export const parseBoolean = (value: unknown): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const lowerCase = value.trim().toLocaleLowerCase();

    if (lowerCase === 'true') {
      return true;
    } else if (lowerCase === 'false') {
      return false;
    }
  }

  throw new Error(`Unable to convert value "${value}" to Boolean`);
};
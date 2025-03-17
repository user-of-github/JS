const objectIdRegex = /^[a-fA-F0-9]{24}$/;
export const isObjectIdValid = (id: string): boolean => objectIdRegex.test(id);
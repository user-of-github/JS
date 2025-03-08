import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

export interface IStorageService {
  get: (key: string) => Promise<string | null | undefined>;
  set: (key: string, value: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
}

class AppStorageService implements IStorageService {
  public async set(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }

  public async get(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  public async delete(key: string) {
    await AsyncStorage.removeItem(key);
  }
}

class SecureAppStorageService implements IStorageService {
  public async set(key: string, value: string) {
    try {
      await setItemAsync(key, value);
    } catch {}
  }

  public async get(key: string) {
    try {
      return await getItemAsync(key);
    } catch (error) {
      return null;
    }
  }

  public async delete(key: string) {
    try {
      await deleteItemAsync(key);
    } catch {}
  }
}

export const appStorageService = new AppStorageService();
export const secureAppStorageService = new SecureAppStorageService();

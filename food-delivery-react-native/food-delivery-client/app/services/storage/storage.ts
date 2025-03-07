import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IStorage } from '@/services/storage/storage.i';


class AppStorageService implements IStorage {
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

class SecureAppStorageService implements IStorage {
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

  public async delete(key: string){
   try {
     await deleteItemAsync(key);
   } catch {}
  }
}

export const appStorageService = new AppStorageService();
export const secureAppStorageService = new SecureAppStorageService();
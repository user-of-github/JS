import Config from 'react-native-config';

export const SERVER_URL = Config.SERVER_URL;
export const API_URL = `${SERVER_URL}/api`;

export const ApiUrls = Object.freeze({
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    accessToken: '/auth/login/access-token'
  },
  users: {
    byId: (id: string) => `/users/${id}`
  },
  products: {
    byId: (id: string) => `/products/${id}`
  },
  categories: {
    byId: (id: string) => `/categories/${id}`
  },
  orders: {
    byId: (id: string) => `/orders/${id}`
  }
} as const);

export const getAuthUrl = (path: string) => `/auth/${path}`;
export const getUsersUrl = (path: string) => `/users/${path}`;
export const getProductsUrl = (path: string) => `/products/${path}`;
export const getCategoriesUrl = (path: string) => `/categories/${path}`;
export const getOrdersUrl = (path: string) => `/orders/${path}`;

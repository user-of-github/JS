
export const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
export const API_URL = `${SERVER_URL}`;

export const ApiUrls = Object.freeze({
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    accessToken: '/auth/login/access-token'
  },
  users: {
    byId: (id: string) => `/users/${id}`
  },
  profile: {
    path: '/user/profile',
    favourites: {
      toggleById: (productId: string) => `/user/profile/favourites/${productId}`
    }
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
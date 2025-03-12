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
    list: '/products',
    listByCategories: '/products/groupped-by-category',
    byId: (id: string) => `/products/${id}`,
    bySlug: (slug: string) => `/products/by-slug/${slug}`,
    byCategory: (slug: string) => `/products/by-category/${slug}`
  },
  categories: {
    list: '/categories',
    byId: (id: string) => `/categories/by-id/${id}`,
    bySlug: (slug: string) => `/categories/by-slug/${slug}`
  },
  orders: {
    path: '/orders',
    byUserId: '/orders/by-user'
  }
} as const);

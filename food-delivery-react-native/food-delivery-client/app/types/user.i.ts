import type { Product } from './product.i';

export interface User {
  email: string;
  password: string;
  name: string;
  phone: string;
  id: string;
  avatarPath: string;
  favourites: Product[];
}

import type { CartItem } from '@/types/cart.i';
import type { User } from '@/types/user.i';

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  user: User;
  total: number;
}
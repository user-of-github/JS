import type { Order } from '@/types/order.i';
import { request } from '@/services/api/request';
import { ApiUrls } from '@/config/api';

interface OrderData {
  items: Array<{
    count: number;
    price: number;
    productId: string;
  }>;
}

class OrderService {
  public async getAll(): Promise<Order[]> {
    return await request<Order[]>({
      url: ApiUrls.orders.path,
      method: 'GET'
    });
  }

  public async getByUserId(): Promise<Order[]> {
    return await request<Order[]>({
      url: ApiUrls.orders.byUserId,
      method: 'GET'
    });
  }

  public async placeOrder(data: OrderData) {
    return await request<{ clientSecret: string }>({
      url: ApiUrls.orders.path,
      method: 'POST',
      data
    });
  }
}

export const orderService = new OrderService();
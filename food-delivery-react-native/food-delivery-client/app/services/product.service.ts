import { ApiUrls } from '@/config/api';
import type { Product } from '@/types/product.i';
import { request } from '@/services/api/request';

class ProductService {
  public async getAll(searchTerm?: string): Promise<Product[]> {
    return request<Product[]>({
      url: ApiUrls.products.list,
      method: 'GET',
      params: searchTerm ? { searchTerm } : {}
    });
  }

  public async getBySlug(slug: string): Promise<Product> {
    return request<Product>({
      url: ApiUrls.products.bySlug(slug),
      method: 'GET'
    });
  }

  public async getByCategory(categorySlug: string): Promise<Product> {
    return request<Product>({
      url: ApiUrls.products.byCategory(categorySlug),
      method: 'GET'
    });
  }
}

export const productService = new ProductService();

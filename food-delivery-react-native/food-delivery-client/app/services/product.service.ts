import { ApiUrls } from '@/config/api';
import type { CategoryWithProducts } from '@/types/category.i';
import type { Product } from '@/types/product.i';
import { request } from '@/services/api/request';

class ProductService {
  public async getAll(params?: { searchTerm?: string; limit?: number }): Promise<Product[]> {
    return request<Product[]>({
      url: ApiUrls.products.list,
      method: 'GET',
      params: params || {}
    });
  }

  public async getAllByCategories(): Promise<CategoryWithProducts[]> {
    return request<CategoryWithProducts[]>({
      url: ApiUrls.products.listByCategories,
      method: 'GET'
    });
  }

  public async getBySlug(slug: string): Promise<Product> {
    return request<Product>({
      url: ApiUrls.products.bySlug(slug),
      method: 'GET'
    });
  }

  public async getByCategory(categorySlug: string): Promise<Product[]> {
    return request<Product[]>({
      url: ApiUrls.products.byCategory(categorySlug),
      method: 'GET'
    });
  }
}

export const productService = new ProductService();

import type { Category } from '@/types/category.i';
import { request } from '@/services/api/request';
import { ApiUrls } from '@/config/api';

class CategoryService {
  public async getAll(): Promise<Category[]> {
    return request<Category[]>({
      url: ApiUrls.categories.list,
      method: 'GET'
    });
  }

  public async getBySlug(slug: string): Promise<Category> {
    return request<Category>({
      url: ApiUrls.categories.bySlug(slug),
      method: 'GET'
    });
  }
}

export const categoryService = new CategoryService();
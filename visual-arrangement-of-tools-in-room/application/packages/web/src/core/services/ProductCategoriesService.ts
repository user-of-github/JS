import type { Category } from '@/core/types/domain/Category';
import type { Product } from '@/core/types/domain/Product';

export class ProductCategoriesService {
  private readonly categories: Map<string, Product[]>;

  public constructor(private readonly products: ReadonlyArray<Product>) {
    this.categories = new Map<string, Product[]>();

    this.products.forEach((product) => {
      const alreadyInCategory = this.categories.get(product.category) || [];
      this.categories.set(product.category, [...alreadyInCategory, product]);
    });
  }

  public get categoriesEntries(): ReadonlyArray<[string, ReadonlyArray<Product>]> {
    return [...this.categories.entries()];
  }
}

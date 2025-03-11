import { ProductCategoriesService } from '@/core/services/ProductCategoriesService';
import { joinPath } from '@/core/services/utils';
import type { Category } from '@/core/types/domain/Category';
import type { Collection } from '@/core/types/domain/Collection';
import type { TextureMaterial } from '@/core/types/domain/Material';
import type { Product } from '@/core/types/domain/Product';

class DatasetServiceClass {
  private _textures: TexturesPack = { wall: [], floor: [], floorTexturesRootPath: '', wallTexturesRootPath: '' };

  private _productsViewsRootPath = '/assets/models/products/';
  private _productsImagesRootPath = '/assets/images/products/';

  private _products: ReadonlyArray<Product> = [];
  private _collections: ReadonlyArray<Collection> = [];
  private _categories: ReadonlyArray<Category> = [];

  private _productsCategoriesService!: ProductCategoriesService;

  public readonly currency = 'BYN';

  public async init(): Promise<void> {
    const productsDataRaw = await fetch('/assets/dataset/products.json');
    const productsData = await productsDataRaw.json();

    const texturesDataRaw = await fetch('/assets/dataset/textures.json');
    const texturesData = await texturesDataRaw.json();

    this._products = productsData.products;
    this._collections = productsData.collections;
    this._categories = productsData.categories;
    this._textures = texturesData;

    this._productsCategoriesService = new ProductCategoriesService(this._products);

    this.postInit();
  }

  public get wallTextures(): ReadonlyArray<TextureMaterial> {
    return this._textures.wall;
  }

  public get floorTextures(): ReadonlyArray<TextureMaterial> {
    return this._textures.floor;
  }

  public get allProducts(): ReadonlyArray<Product> {
    return this._products;
  }

  public get products(): ReadonlyArray<[string, ReadonlyArray<Product>]> {
    return this._productsCategoriesService.categoriesEntries;
  }

  public get categories(): ReadonlyArray<Category> {
    return this._categories;
  }

  public get collections(): ReadonlyArray<Collection> {
    return this._collections;
  }

  private postInit(): void {
    this._textures.wall.forEach((wall) => {
      wall.view = joinPath(this._textures.wallTexturesRootPath, wall.view);
      wall.preview = joinPath(this._textures.wallTexturesRootPath, wall.preview);
    });

    this._textures.floor.forEach((wall) => {
      wall.view = joinPath(this._textures.floorTexturesRootPath, wall.view);
      wall.preview = joinPath(this._textures.floorTexturesRootPath, wall.preview);
    });

    this._products.forEach((product) => {
      product.view = joinPath(this._productsViewsRootPath, product.view);
      product.image = joinPath(this._productsImagesRootPath, product.image);
    });
  }
}

export const DatasetService = new DatasetServiceClass();

interface TexturesPack {
  wallTexturesRootPath: string;
  floorTexturesRootPath: string;

  wall: ReadonlyArray<TextureMaterial>;
  floor: ReadonlyArray<TextureMaterial>;
}

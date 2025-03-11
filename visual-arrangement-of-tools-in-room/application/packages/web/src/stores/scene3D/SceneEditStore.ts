import { action, computed, makeObservable, observable } from 'mobx';
import type { GroupedProductByCount } from '@/core/types/domain/GroupedByCount';
import type { Position } from '@/core/types/domain/Position';
import type { PositionedProduct } from '@/core/types/domain/PositionedProduct';
import type { Product } from '@/core/types/domain/Product';
import type { ConfiguratorStore } from '@/stores/ConfiguratorStore';
import type { SceneEditMode } from './types';

export class SceneEditStore {
  private _products: PositionedProduct[] = [];
  private _mode: SceneEditMode = { type: 'overview' };
  private _isProductLoading: boolean = false;

  public constructor(private readonly configuratorStore: ConfiguratorStore) {
    type PrivateFields = '_mode' | '_isProductLoading' | '_products';

    makeObservable<SceneEditStore, PrivateFields>(
      this,
      {
        _mode: observable,
        _isProductLoading: observable,
        _products: observable,

        mode: computed,
        isProductLoading: computed,
        products: computed.struct,
        reportItems: computed.struct,

        enterInstallationMode: action.bound,
        enterSelectedMode: action.bound,
        enterOverviewMode: action.bound,
        enterMovingMode: action.bound,

        setIsProductLoading: action.bound,
        init: action.bound,
        addProduct: action.bound
      },
      { deep: true }
    );
  }

  public init(products: PositionedProduct[]): void {
    this._products = products;
  }

  public get mode(): SceneEditMode {
    return this._mode;
  }

  public get isProductLoading(): boolean {
    return this._isProductLoading;
  }

  public get products(): PositionedProduct[] {
    return this._products;
  }

  public enterInstallationMode(product: Readonly<Product>): void {
    this._mode = { type: 'installation', item: product };
  }

  public enterOverviewMode(): void {
    this._mode = { type: 'overview' };
  }

  public setIsProductLoading(value: boolean): void {
    this._isProductLoading = value;
  }

  public addProduct(product: PositionedProduct): PositionedProduct {
    this._products.push(product);
    this.configuratorStore.updateWallsWithDataFromScene(this._products);

    return product;
  }

  public async saveChanges(snapshot?: string): Promise<void> {
    await this.configuratorStore.saveChanges(snapshot);
  }

  public enterSelectedMode(productId: string) {
    const product = this._products.find((product) => product.id === productId);

    if (!product) {
      this.enterOverviewMode();
      return;
    }

    this._mode = { type: 'selected', selected: product };
  }

  public enterMovingMode(): void {
    if (this._mode.type === 'selected') {
      this._mode = { type: 'moving', selected: this._mode.selected };
    } else {
      console.warn('Called SceneEditStore::enterMovingMode() when no item selected');
    }
  }

  public deleteProduct(positionedProductId: string): void {
    const index = this._products.findIndex((positionedProduct) => positionedProduct.id === positionedProductId);
    if (index >= 0) {
      this._products.splice(index, 1);
      this.configuratorStore.updateWallsWithDataFromScene(this._products);
    }
  }

  public saveDraggedProduct(position: Position): void {
    if (this._mode.type === 'moving') {
      this._mode.selected.position.angle = position.angle;
      this._mode.selected.position.coordinate = position.coordinate;
    }
  }

  public get reportItems(): ReadonlyArray<GroupedProductByCount> {
    const articleToProducts: Map<string, Product[]> = new Map<string, Product[]>();
    this._products.forEach((product) => {
      if (!articleToProducts.has(product.article)) {
        articleToProducts.set(product.article, []);
      }

      articleToProducts.set(product.article, [...articleToProducts.get(product.article)!, product]);
    });

    const response: GroupedProductByCount[] = [];

    for (const [article, products] of articleToProducts.entries()) {
      response.push({
        ...products[0],
        count: products.length
      });
    }

    return response;
  }
}

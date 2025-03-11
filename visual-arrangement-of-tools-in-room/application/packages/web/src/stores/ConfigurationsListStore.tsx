import { action, makeObservable, observable } from 'mobx';
import { type SynchronizationService, synchronizationService } from '@/core/services/SynchronizationService';
import type { LayoutPreview } from '@/core/types/domain/Layout';
import type { CreateLayoutDto } from '@/pages/LayoutsListPage/components/CreateLayoutModal';

export class ConfigurationsListStore {
  private _layoutsPreviews: LayoutPreview[] = [];

  public constructor(private readonly synchronizationService: SynchronizationService) {
    type PrivateFields = '_layoutsPreviews';

    makeObservable<ConfigurationsListStore, PrivateFields>(
      this,
      {
        _layoutsPreviews: observable,

        fetchLayouts: action.bound,
        createLayout: action.bound,
        removeLayout: action.bound
      },
      { deep: true }
    );
  }

  public async fetchLayouts(): Promise<void> {
    this._layoutsPreviews = await this.synchronizationService.fetchLayoutsList();
  }

  public async createLayout(dto: CreateLayoutDto): Promise<void> {
    const createdLayout = await this.synchronizationService.createLayout(dto);
    this._layoutsPreviews.push(createdLayout);
  }

  public async removeLayout(layout: LayoutPreview): Promise<void> {
    await synchronizationService.removeLayout(layout.id);
    this._layoutsPreviews = this._layoutsPreviews.filter((item) => item.id !== layout.id);
  }

  public get layoutsPreviews(): ReadonlyArray<LayoutPreview> {
    return this._layoutsPreviews;
  }
}

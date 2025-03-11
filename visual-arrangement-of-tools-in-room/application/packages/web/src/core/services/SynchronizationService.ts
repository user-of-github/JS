import { v4 } from 'uuid';
import { Layout, LayoutPreview } from '@/core/types/domain/Layout';
import type { CreateLayoutDto } from '@/pages/LayoutsListPage/components/CreateLayoutModal';

export interface ISynchronizationService {
  fetchLayoutsList(): void;
  fetchLayout(id: string | undefined | null): Promise<Layout | null>;
  createLayout(dto: CreateLayoutDto): Promise<LayoutPreview>;
  updateLayout(layout: Layout): Promise<void>;
  removeLayout(id: string): Promise<void>;
}

class SynchronizationService implements ISynchronizationService {
  private static readonly localStorageListKey: string = 'visualArrangementOfObjectsConfigurationsListKey';
  private static readonly localStorageLayoutKeyPrefix: string = 'visualArrangementOfObjectsConfigurationKey';
  private static readonly getLayoutKey = (id: string): string => `${SynchronizationService.localStorageLayoutKeyPrefix}${id}`;

  public constructor() {}

  public async fetchLayoutsList(): Promise<LayoutPreview[]> {
    const data = window.localStorage.getItem(SynchronizationService.localStorageListKey);
    try {
      // TODO: validation

      const parsed = JSON.parse(data || '');
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed;
    } catch {
      return [];
    }
  }

  public async fetchLayout(id: string | undefined | null): Promise<Layout | null> {
    const data = window.localStorage.getItem(SynchronizationService.getLayoutKey(id || ''));

    if (!data) {
      return null;
    }

    try {
      // @TODO: validation
      return JSON.parse(data || '');
    } catch {
      return null;
    }
  }

  public async createLayout(dto: CreateLayoutDto): Promise<LayoutPreview> {
    const newId = v4();
    const now = new Date().toISOString();
    const layout: Layout = {
      id: newId,
      name: dto.name,
      items: [],
      walls: [],
      createdDate: now,
      updatedDate: now
    };

    return await this.saveCreatedLayout(layout);
  }

  public async updateLayout(layout: Layout): Promise<void> {
    window.localStorage.setItem(SynchronizationService.getLayoutKey(layout.id), JSON.stringify(layout));
    await this.updateLayoutsPreview(layout);
  }

  public async removeLayout(id: string): Promise<void> {
    window.localStorage.removeItem(SynchronizationService.getLayoutKey(id));
    const list = (await this.fetchLayoutsList()).filter((item) => item.id !== id);
    window.localStorage.setItem(SynchronizationService.localStorageListKey, JSON.stringify(list));
  }

  private async saveCreatedLayout(layout: Layout): Promise<LayoutPreview> {
    const alreadyHere = await this.fetchLayoutsList();
    const { id, name, createdDate, preview } = layout;
    const updatedDate = new Date().toISOString();

    const newData: LayoutPreview[] = [...alreadyHere, { id, name, createdDate, preview, updatedDate }];

    window.localStorage.setItem(SynchronizationService.localStorageListKey, JSON.stringify(newData));
    window.localStorage.setItem(SynchronizationService.getLayoutKey(id), JSON.stringify(layout));

    return { id, name, createdDate, preview, updatedDate };
  }

  private async updateLayoutsPreview(layout: Layout): Promise<void> {
    const list = await this.fetchLayoutsList();
    for (const item of list) {
      if (item.id === layout.id) {
        item.preview = layout.preview;
        item.updatedDate = new Date().toISOString();
      }
    }

    window.localStorage.setItem(SynchronizationService.localStorageListKey, JSON.stringify(list));
  }
}

export const synchronizationService = new SynchronizationService();
export type { SynchronizationService };

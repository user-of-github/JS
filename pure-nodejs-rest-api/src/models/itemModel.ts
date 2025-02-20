import { DB } from '../database/db.ts';
import type { IItem } from '../types/item.i.ts';

export const ItemModel = {
    getAll: async (): Promise<IItem[]> => {
        return await new Promise((resolve, reject) => {
            DB.all<IItem>('SELECT * FROM items', [], (error, rows) => {
                if (error) {
                    reject(error);
                }

                resolve(rows);
            });
        });
    },

    getById: async (id: string): Promise<IItem> => {
        return await new Promise((resolve, reject) => {
            DB.get<IItem>('SELECT * FROM items WHERE id=?', [id], (error, row) => {
                if (error) {
                    reject(error);
                }

                resolve(row);
            });
        });
    },

    create: async (item: Omit<IItem, 'id'>): Promise<IItem> => {
        return await new Promise((resolve, reject) => {
            DB.run('INSERT INTO items (name, description) VALUES (?, ?)', [item.name, item.description], (error, row) => {
                if (error) {
                    reject(error);
                }

                resolve(row);
            });
        });
    }
} as const;
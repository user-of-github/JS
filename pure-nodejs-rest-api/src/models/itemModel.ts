import { DB, POSTS_TABLE } from '../database/db.ts';
import type { IPost } from '../types/post.i.ts';


export const ItemModel = {
  getAll: async (): Promise<IPost[]> => {
    return await new Promise((resolve, reject) => {
      DB.all<IPost>(`SELECT *FROM ${POSTS_TABLE}`, [], (error, rows) => {
        if (error) {
          reject(error);
        }

        resolve(rows);
      });
    });
  },

  getById: async (id: number | string): Promise<IPost | null | undefined> => {
    return await new Promise((resolve, reject) => {
      DB.get<IPost>(`SELECT * FROM ${POSTS_TABLE} WHERE id = ?`, [id], (error, row) => {
        if (error) {
          reject(error);
        }

        resolve(row);
      });
    });
  },

  create: async (item: Omit<IPost, 'id'>) => {
    return await new Promise((resolve, reject) => {
      DB.run(
        `INSERT INTO ${POSTS_TABLE} (name, description) VALUES (?, ?)`,
        [item.name, item.description],
        (error: Error | null) => {
          if (error) {
            reject(error);
          }

          const ref = this;
          resolve((ref && 'lastId' in ref) ? ref['lastId'] : null);
        }
      );
    });
  },

  update: async (id: number | string, item: Omit<IPost, 'id'>) => {
    return await new Promise((resolve, reject) => {
      DB.run(
        `UPDATE ${POSTS_TABLE} SET name=?, description=? WHERE id = ?`,
        [item.name, item.description, id],
        (error: Error | null) => {
          if (error) {
            reject(error);
          }

          const ref = this;

          resolve((ref && 'changes' in ref) ? ref['changes'] : null);
        }
      );
    });
  },

  delete: async (id: number | string) => {
    return await new Promise((resolve, reject) => {
      DB.run(`DELETE FROM ${POSTS_TABLE} WHERE id = ?`, [id], (error: Error | null) => {
        if (error) {
          reject(error);
        }

        const ref = this;

        resolve((ref && 'changes' in ref) ? ref['changes'] : null);
      });
    });
  }
} as const;
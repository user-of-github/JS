import type { ServerResponse } from 'node:http';
import { ItemModel } from '../models/itemModel.ts';


class Controller {
    public async getItems(response: ServerResponse) {
        try {
            const items = await ItemModel.getAll();
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(items));
        } catch (error) {
            response.statusCode = 500;
            response.end(`Error`);
        }
    }

    public async getItemById(id: string) {

    }
}


export const ItemController = new Controller();
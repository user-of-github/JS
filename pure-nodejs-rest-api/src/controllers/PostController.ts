import type { IncomingMessage, ServerResponse } from 'node:http';
import { ItemModel } from '../models/itemModel.ts';
import { StatusCodes } from '../constants.ts';
import { collectBodyChunkFromRequest } from '../utils/utils.ts';


class Controller {
    public async getAll(response: ServerResponse) {
        try {
            const items = await ItemModel.getAll();
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(items));
        } catch (error) {
            response.statusCode = StatusCodes.ServerError;
            response.end(`Error while accessing items list`);
        }
    }

    public async getById(id: number | string, response: ServerResponse) {
        try {
            const item = await ItemModel.getById(id);

            if (!item) {
                response.statusCode = StatusCodes.NotFound;
                response.end(`Item with id ${id} not found.`);
            } else {
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(item));
            }
        } catch (error) {
            response.statusCode = StatusCodes.ServerError;
            response.end(`Error while accessing item with id ${id}`);
        }
    }

    public async create(request: IncomingMessage, response: ServerResponse) {
        try {
            const requestBody = await collectBodyChunkFromRequest(request);

            const item = JSON.parse(requestBody);

            await ItemModel.create(item);

            response.statusCode = StatusCodes.Created;
            response.setHeader('Content-Type', 'application/json');
            response.end('Created');
        } catch (error) {
            response.statusCode = StatusCodes.ServerError;
            response.end(`Error while creating`);
        }
    }

    public async remove(id: number | string, response: ServerResponse) {
        try {
            await ItemModel.delete(id);

            response.statusCode = StatusCodes.NoContent;
            response.end(`Deleted`);
        } catch (error) {
            response.statusCode = StatusCodes.ServerError;
            response.end(`Error while deleting item with id ${id}`);
        }
    }


    public async update(id: number | string, request: IncomingMessage, response: ServerResponse) {
        try {
            const requestBody = await collectBodyChunkFromRequest(request);

            const item = JSON.parse(requestBody);

            await ItemModel.update(id, item);

            response.statusCode = StatusCodes.Created;
            response.setHeader('Content-Type', 'application/json');
            response.end('Updated');
        } catch (error) {
            response.statusCode = StatusCodes.ServerError;
            response.end(`Error while updating`);
        }
    }
}


export const PostController = new Controller();
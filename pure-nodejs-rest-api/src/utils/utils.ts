import type { IncomingMessage } from 'node:http';

export const trimLastSymbol = (source: string, symbol = ' '): string => {
    let response = source;
    while (response.length && response.at(response.length - 1) === symbol) {
        response = response.slice(0, response.length - 1);
    }
    return response;
};

export const collectBodyChunkFromRequest = async (request: IncomingMessage): Promise<string> => {
    return await new Promise<string>((resolve, reject) => {
        let builtBody = '';
        request.on('data', (chunk) => {
            builtBody += chunk.toString();
        });

        request.on('end', () => {
            resolve(builtBody);
        });
    });
};
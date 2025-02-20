import http from 'node:http';
import { PORT } from './constants.ts';
import { ItemController } from './controllers/itemController.ts';


const server = http.createServer(async (req, res) => {
    if (!req.url) {
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const { pathname } = url;
    const { method } = req;


    switch (pathname) {
        case  '/items': {
            switch (method) {
                case 'GET':
                    await ItemController.getItems(res);
                    break;
            }
            break;
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
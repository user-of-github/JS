import http from 'node:http';
import { PORT, RequestMethods, Routes, StatusCodes } from './constants.ts';
import { PostController } from './controllers/PostController.ts';
import { trimLastSymbol } from './utils/utils.ts';


const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) {
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = trimLastSymbol(url.pathname, '/');
    const {method} = req;

    const throwNotFound = () => {
      res.statusCode = StatusCodes.NotFound;
      res.end('Route or method not found');
    };

    switch (true) {
      case  pathname === `/${Routes.Posts}`: {
        switch (method) {
          case RequestMethods.GET:
            await PostController.getAll(res);
            break;
          case RequestMethods.POST:
            await PostController.create(req, res);
            break;
          default:
            throwNotFound();
            break;
        }
        break;
      }

      case pathname.startsWith(`/${Routes.Posts}/`): {
        const id = pathname.split('/')[2];

        switch (method) {
          case RequestMethods.GET:
            await PostController.getById(id, res);
            break;
          case RequestMethods.DELETE:
            await PostController.remove(id, res);
            break;
          case RequestMethods.PUT:
            await PostController.update(id, req, res);
            break;
          default:
            throwNotFound();
            break;
        }

        break;
      }

      default: {
        throwNotFound();
        break;
      }
    }
  } catch {
    res.statusCode = StatusCodes.ServerError;
    res.end('Unexpected error occurred');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import type { NextFunction, Request, Response } from 'express';
import { badRequest } from '../utils/response';
import { IdParam } from '../types/server/idParam';
import { isObjectIdValid } from '../utils/validateObjectId';

export const paramIdValidator = (req: Request<IdParam>, res: Response, next: NextFunction) => {
  const id = req.params.id;

  if (!isObjectIdValid(id)) {
    return badRequest(res, { error: 'Invalid ID format' });
  }
  next();
};
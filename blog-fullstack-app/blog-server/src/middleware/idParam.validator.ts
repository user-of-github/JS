import type { NextFunction, Request, Response } from 'express';
import { badRequest } from '../utils/response';
import { IdParam } from '../types/server/idParam';

const objectIdRegex = /^[a-fA-F0-9]{24}$/;
const isValidObjectId = (id: string): boolean => objectIdRegex.test(id);

export const paramIdValidator = (req: Request<IdParam>, res: Response, next: NextFunction) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return badRequest(res, { error: 'Invalid ID format' });
  }
  next();
};
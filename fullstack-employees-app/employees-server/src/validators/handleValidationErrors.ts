import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { StatusCode } from '../constants/server';
import { ErrorResponse } from '../types/AppResponse';

const validationErrors = (request: Request, response: Response, next: any): void | Promise<void> => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return void response.status(StatusCode.BadRequest).json({
      error: errors.array().map(err => err.msg).join('. ')
    });
  }

  next();
};

export default validationErrors;
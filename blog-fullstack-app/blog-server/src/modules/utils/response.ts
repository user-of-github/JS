import type { Response } from 'express';
import { StatusCode } from '../../config/server';

interface ErrorData {
  error?: string;
}

export const badRequest = (res: Response, data: ErrorData): void => {
  res.status(StatusCode.BadRequest).json(data);
};

export const notFound = (res: Response, data: ErrorData): void => {
  res.status(StatusCode.NotFound).json(data);
};

export const serverError = (res: Response, data: ErrorData): void => {
  res.status(StatusCode.InternalServerError).json(data);
};
import { Request } from 'express';

export interface CustomRequest<P = any, ResBody = any, ReqBody = any, ReqQuery = any> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    id: string;
  };
}
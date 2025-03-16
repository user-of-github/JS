import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../config/server';
import { AuthConfig } from '../config/auth';
import { CustomRequest } from '../types/RequestWithUser';


export const AuthGuard = (req: CustomRequest, res: Response, next: NextFunction) => {
  const bearerAndToken = req.headers.authorization?.split(' ') || [];

  if (bearerAndToken.length !== 2 || bearerAndToken[0] !== AuthConfig.bearerWord) {
    res.status(StatusCode.Unauthorized).json({ error: 'Unauthorized' });
    return;
  }

  const token = bearerAndToken[1];

  jwt.verify(token, AuthConfig.jwtSecret, (error, userId) => {
    if (error) {
      return void res.status(StatusCode.Unauthorized).json({ error: 'Unauthorized' });
    }

    req.user = { id: userId as string };
  });
};
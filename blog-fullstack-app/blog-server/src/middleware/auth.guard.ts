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

  jwt.verify(token, AuthConfig.jwtSecret, (error, user) => {
    if (error) {
      res.status(StatusCode.Unauthorized).json({ error: 'Unauthorized' });
      return;
    }

    req.user = { id: (user as { id: string}).id as string };

    next();
  });
};
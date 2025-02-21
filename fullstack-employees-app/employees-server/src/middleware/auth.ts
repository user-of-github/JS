import jwt from 'jsonwebtoken';
import { AppPrismaClient} from '../prisma';
import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../constants/server';

export const AuthGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerWord = 'Bearer';

    const bearerAndToken = req.headers.authorization?.split(' ') || [];

    if (bearerAndToken.length !== 2 || bearerAndToken.at(0) !== bearerWord) {
        res.status(StatusCode.Unauthorized).json({});
        return;
    }

    const token = bearerAndToken.at(1) || '';
    const secret = process.env.JWT_SECRET || '';

    const decoded = jwt.verify(token, secret) as { id: string };

    const user = await AppPrismaClient.user.findUnique({
      where: {
        id: decoded.id
      }
    });

    if (!user) {
      res.status(StatusCode.Unauthorized).json({});
      return;
    }

    (req as unknown as { user: any })['user'] = user;

    return void next();
  } catch (error) {
    res.status(StatusCode.Unauthorized).json({});
    return;
  }
};
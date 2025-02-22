import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginRequestDto, RegisterRequestDto } from '../routes/types';
import { AppPrismaClient } from '../prisma';
import { compareHash, hash } from '../utils';
import { StatusCode } from '../constants/server';
import { LoginResponse, RegisteredUser, RegisterResponse } from './types';
import { User } from '@prisma/client';
import { BaseController } from './BaseController';


export class UserController extends BaseController{
  public static async login(req: Request<{}, {}, LoginRequestDto>, res: Response<LoginResponse>): Promise<void> {
    const {email, password} = req.body;

    try {
      const user = await AppPrismaClient.user.findUnique({
        where: {email}
      });

      const isPasswordCorrect = user && (await compareHash(password, user.password));

      if (!isPasswordCorrect || !user) {
        res.status(StatusCode.Unauthorized).json({error: 'Unauthorized due to incorrect email or password'});
        return;
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        UserController.sendInternalServerError(res, 'Unable to login. Try again later');
        return;
      }

      const {password: _, ...restUserInfo} = user;
      res.status(StatusCode.Ok).json({ ...restUserInfo, token: jwt.sign({id: restUserInfo.id}, secret, { expiresIn: '10d'})} );
    } catch {
      UserController.sendInternalServerError(res, 'Unable to login. Try again later');
    }
  }

  public static async register(req: Request<{}, {}, RegisterRequestDto>, res: Response<RegisterResponse>): Promise<void> {
    const {email, password, name} = req.body;

    try {
      const registeredUser = await AppPrismaClient.user.findUnique({
        where: {email}
      });

      if (registeredUser) {
        res.status(StatusCode.BadRequest).json({ error: `User with email ${email} already exists` });
        return;
      }

      const hashedPassword = await hash(password);
      const createdUser = await AppPrismaClient.user.create({
        data: {
          name, email, password: hashedPassword
        }
      });

      const secret = process.env.JWT_SECRET;
      if (!secret || !createdUser) {
        res.status(StatusCode.InternalServerError).json({error: 'Unable to authorize created user. Try again later'});
        return;
      }

      const response: RegisteredUser = {
        name, email, id: createdUser.id, token: jwt.sign({id: createdUser.id}, secret, { expiresIn: '10d'})
      };

      res.status(StatusCode.Created).json(response);
    } catch {
      UserController.sendInternalServerError(res, 'Unable to register. Try again later');
    }
  }

  public static async current(req: Request, res: Response) {
    try {
      res.json((req as unknown as { user: User }).user);
    } catch {
      UserController.sendInternalServerError(res, 'Unable to get current user. Try again later');
    }
  }
}
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginRequestDto, RegisterRequestDto } from '../routes/types';
import { AppPrismaClient } from '../prisma';
import { compareHash, hash } from '../utils';
import { StatusCode } from '../constants/server';
import { LoginResponse, RegisteredUser, RegisterResponse } from './types';


export class UserController {
  public static async login(req: Request<{}, {}, LoginRequestDto>, res: Response<LoginResponse>): Promise<void> {
    const {email, password} = req.body;

    const user = await AppPrismaClient.user.findUnique({
      where: {email}
    });

    const isPasswordCorrect = user && (await compareHash(password, user.password));

    if (!isPasswordCorrect || !user) {
      res.status(StatusCode.Unauthorized).json({error: 'Unauthorized due to incorrect email or password'});
      return;
    }

    const {password: _, ...restUserInfo} = user;
    res.status(StatusCode.Ok).json(restUserInfo);
  }

  public static async register(req: Request<{}, {}, RegisterRequestDto>, res: Response<RegisterResponse>): Promise<void> {
    const {email, password, name} = req.body;
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
  }

  public static async current(req: Request, res: Response) {
    res.send('current');
  }
}
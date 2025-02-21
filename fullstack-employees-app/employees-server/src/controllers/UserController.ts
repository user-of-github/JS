import type { Request, Response } from 'express';
import { LoginRequestDto, RegisterRequestDto } from '../routes/types';
import { AppPrismaClient } from '../prisma';
import { compareHash, hash } from '../utils';
import { StatusCode } from '../constants/server';
import { LoginResponse, RegisterResponse } from './types';


export class UserController {
  public static async login(req: Request<{}, {}, LoginRequestDto>, res: Response<LoginResponse>): Promise<void> {
    const {email, password} = req.body;

    const user = await AppPrismaClient.user.findUnique({
      where: {email}
    });

    const isPasswordCorrect = user && (await compareHash(password, user.password));

    if (!isPasswordCorrect || !user) {
      res.status(StatusCode.Unauthorized).send({error: 'Unauthorized due to incorrect email or password'});
      return;
    }

    const {password: _, ...restUserInfo} = user;
    res.status(StatusCode.Ok).send(restUserInfo);
  }

  public static async register(req: Request<{}, {}, RegisterRequestDto>, res: Response<RegisterResponse>): Promise<void> {
    const {email, password, name} = req.body;
    const registeredUser = await AppPrismaClient.user.findUnique({
      where: {email}
    });

    if (registeredUser) {
      res.status(StatusCode.BadRequest).send({ error: `User with email ${email} already exists` });
      return;
    }

    const hashedPassword = await hash(password);
    const createdUser = await AppPrismaClient.user.create({
      data: {
        name, email, password: hashedPassword
      }
    });

  }

  public static async current(req: Request, res: Response) {
    res.send('current');
  }
}
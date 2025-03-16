import { type Request, type Response } from 'express';
import { toPng } from 'jdenticon';
import { compare, hash } from 'bcryptjs';
import path from 'node:path';
import fs from 'node:fs';
import jwt from 'jsonwebtoken';
import { type RegisterDto } from './dto/register.dto';
import { prismaService } from '../prisma/prisma.service';
import { badRequest, notFound, serverError } from '../utils/response';
import { StatusCode, UPLOADS_DIR_NAME, ROOT_DIRNAME } from '../../config/server';
import { prismaUserSelect } from '../../mappers/prismaUserSelect';
import { LoginDto } from './dto/login.dto';
import { toUserDtoObject } from '../../mappers/toUserDto';
import { AuthConfig } from '../../config/auth';


class AuthController {
  public async register(req: Request<{}, {}, RegisterDto>, res: Response) {
    const { name, email, password } = req.body;

    try {
      const existingUser = await prismaService.user.findUnique({ where: { email } });

      if (existingUser) {
        return badRequest(res, { error: 'User already exists' });
      }

      const hashedPassword = await hash(password, 10);
      const avatarPng = toPng(name, 200);
      const avatarFileName = `${name}_${Date.now()}.png`;
      const avatarFilePath = path.join(ROOT_DIRNAME, UPLOADS_DIR_NAME, avatarFileName);

      await fs.promises.writeFile(avatarFilePath, avatarPng, { flag: 'wx' });

      const user = await prismaService.user.create({
        data: { email, name, password: hashedPassword, avatarUrl: avatarFilePath },
        select: prismaUserSelect
      });

      res.status(StatusCode.Created).json({ user });
    } catch (error) {
      console.error('Error in AuthController::register()', error);
      return serverError(res);
    }
  }

  public async login(req: Request<{}, {}, LoginDto>, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prismaService.user.findUnique({ where: { email } });

      if (!user) {
        return notFound(res, { error: 'Invalid email or password' });
      }

      const isPassValid = await compare(password, user.password);

      if (!isPassValid) {
        return notFound(res, { error: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id}, AuthConfig.jwtSecret, { expiresIn: '10d' });

      res.send({ token, user: toUserDtoObject(user) });
    } catch (error) {
      console.error('Error in AuthController::login()', error);
      return serverError(res);
    }
  }
}

export const authController = new AuthController();
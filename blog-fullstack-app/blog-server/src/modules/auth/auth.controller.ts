import { type Request, type Response } from 'express';
import { toPng } from 'jdenticon';
import { hash } from 'bcryptjs';
import path from 'node:path';
import fs from 'node:fs';
import { type RegisterDto } from './dto/register.dto';
import { prismaService } from '../prisma/prisma.service';
import { badRequest, serverError } from '../utils/response';
import { StatusCode, UPLOADS_DIR_NAME } from '../../config/server';
import { __dirname } from '../../config/dirname';
import { toUserDtoObject } from '../../mappers/toUserDto';


class AuthController {
  public async register(req: Request<{}, {}, RegisterDto>, res: Response) {
    const {name, email, password} = req.body;
    try {
      const existingUser = await prismaService.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return badRequest(res, { error: 'User already exists' });
      }

      const hashedPassword = await hash(password, 10);
      const avatarPng = toPng(name, 200);
      const avatarFileName = `${name}_${Date.now()}.png`;
      const avatarFilePath = path.join(__dirname, UPLOADS_DIR_NAME, avatarFileName);

      await fs.promises.writeFile(avatarFilePath, avatarPng, { flag: 'wx' });

      const user = await prismaService.user.create({
        data: { email, name, password: hashedPassword, avatarUrl: avatarFilePath }
      });

      res.status(StatusCode.Created).json({ user: toUserDtoObject(user) });
    } catch (error) {
      console.error('Error in AuthController::register()', error);
      serverError(res, { error: 'Internal server error'});
    }
  }

  public async login(req: Request, res: Response) {
    res.send('login');
  }
}

export const authController = new AuthController();
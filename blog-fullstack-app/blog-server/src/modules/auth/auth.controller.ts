import { type Request, type Response } from 'express';


class AuthController {
  public async register(req: Request, res: Response) {
    res.send('register');
  }

  public async login(req: Request, res: Response) {
    res.send('login');
  }
}

export const authController = new AuthController();
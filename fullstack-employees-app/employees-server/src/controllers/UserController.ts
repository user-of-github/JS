import type { Request, Response } from 'express';


export class UserController {
  public static async login(req: Request, res: Response) {
    res.send('Login');
  }

  public static async register(req: Request, res: Response) {
    res.send('register');
  }

  public static async current(req: Request, res: Response) {
    res.send('current');
  }
}
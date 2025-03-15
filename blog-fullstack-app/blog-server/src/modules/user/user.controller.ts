import type { Request, Response } from 'express';

class UserController {
  public async getById(){}


  public async current(req: Request, res: Response) {
    res.send('current');
  }
}

export const userController = new UserController();
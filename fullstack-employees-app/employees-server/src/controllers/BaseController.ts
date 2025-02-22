import { Response } from 'express';
import { StatusCode } from '../constants/server';

export class BaseController {
  private static readonly internalServerErrorMessage = 'Internal Server Error.';

  public static sendInternalServerError(res: Response, text = '') {
    res
      .status(StatusCode.InternalServerError)
      .json({ error: `${BaseController.internalServerErrorMessage} ${text}` });
  }
}
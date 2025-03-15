import type { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { StatusCode } from '../config/server';


function extractErrorMessages(errors: ValidationError[]): string[] {
  return errors.flatMap((error) =>
    Object.values(error.constraints || {}) // Extract the error messages
  );
}

export const validateDto = <Dto extends object>(dtoClass: new () => Dto) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const errorMessages = extractErrorMessages(errors);
      return void res.status(StatusCode.BadRequest).json({ error: errorMessages[0] });
    }

    next();
  };
}
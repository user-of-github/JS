import { body } from 'express-validator';


export const UserValidator = {
  loginDto: [
    body('email', 'Email is absent or has invalid format').isString().isEmail(),
    body('password', 'Password length must be at least 5 symbols').isString().isLength({min: 5}),
  ]
};
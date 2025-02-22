import { body } from 'express-validator';

export const EmployeeValidator = {
  createDto: [
    body('firstName', 'First name must be at least 2 symbols').isString().isLength({ min: 2 }),
    body('lastName', 'Last name must be at least 2 symbols').isString().isLength({ min: 2 }),
    body('age', 'Age must be a number. Only people older than 18 are allowed').isInt({ lt: 100, gt: 17 }),
    body('address', 'Address must not stay empty').isString().isLength({ min: 2 }),
  ],
};
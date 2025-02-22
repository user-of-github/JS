import { ErrorResponse } from '../types/AppResponse';
import { Employee, User } from '@prisma/client';


/* UserController */

type TokenResponse = {
  token: string;
};

export type LoginResponse = ErrorResponse | (Omit<User, 'password'> & TokenResponse);

export type RegisteredUser = Omit<User, 'password'> & TokenResponse;

export type RegisterResponse = ErrorResponse | RegisteredUser;


/* EmployeeController */
export type GetEmployeesResponse = ErrorResponse | {
  employees: readonly Employee[];
};

export type GetEmployeeResponse = ErrorResponse | {
  employee: Employee;
};
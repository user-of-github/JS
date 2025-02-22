import { Employee, User } from '@prisma/client';
import { ErrorResponse } from '../types/AppResponse';


/* UserController */
export type LoginDto = Pick<User, 'email' | 'password'>;

export type RegisterDto = Pick<User, 'email' | 'password' | 'name'>;

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

export type EmployeeResponse = ErrorResponse | {
  employee: Employee;
};

export type CreateEmployeeDto = Pick<Employee, 'lastName' | 'firstName' | 'age' | 'address'>;

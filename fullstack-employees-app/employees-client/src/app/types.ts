/**
 * ATTENTION:
 * These types I manually copied from `employees-server\node_modules\.prisma\client\index.d.ts`
 * I suppose, there must be some more correct way to use types from server on client
 * (maybe, shared package or normal copying script)
 * */

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  userId: string;
}


/* End of copied types */

export type UserWithToken = Omit<User, 'password'> & { token: string; };
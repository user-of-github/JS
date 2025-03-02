import React from 'react';
import type { User } from '@/types/user.i';

export type UserState = User | null;

export interface AuthContextType {
  user: UserState;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
}

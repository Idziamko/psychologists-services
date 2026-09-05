import { createContext } from 'react';
import type { User } from 'firebase/auth';
import type {
  LoginCredentials,
  RegisterCredentials,
} from '../services/authApi';

export interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isReady: boolean;
  register: (credentials: RegisterCredentials) => Promise<User>;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

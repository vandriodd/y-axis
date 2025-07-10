import { createContext } from 'react';
import type { User } from '@/lib/types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: async (_username: string, _password: string) => null,
  signOut: async () => {},
});

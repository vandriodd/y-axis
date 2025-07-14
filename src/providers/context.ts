import { createContext } from "react";
import type { FormData, ProductList, UserWithData } from "@/lib/types";

interface AuthContextType {
  currentUser: string | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<string>;
  signOut: () => Promise<void>;
  signUp: (user: FormData) => Promise<UserWithData | null>;
  getUserData: () => Promise<UserWithData | null>;
  saveProfileData: (user: UserWithData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: async (_username: string, _password: string) => "",
  signOut: async () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp: async (_user) => {
    return null;
  },
  getUserData: async () => {
    return null;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveProfileData: async (_user: UserWithData) => {},
});

interface CartContextType {
  cart: ProductList;
  getItemQuantity: (id: string) => number;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  getItemQuantity: () => 0,
  updateItemQuantity: () => {},
  removeFromCart: () => {},
});

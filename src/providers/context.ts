import { createContext } from "react";
import type { ProductList } from "@/lib/types";

interface AuthContextType {
  currentUser: string | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<string>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: async (_username: string, _password: string) => "",
  signOut: async () => {},
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

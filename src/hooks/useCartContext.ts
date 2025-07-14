import { CartContext } from "@/providers/context";
import { useContext } from "react";

export default function useCartContext() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  const {
    cart,
    getItemQuantity,
    updateItemQuantity,
    removeFromCart,
    placeOrder,
  } = ctx;

  const isInCart = (productId: string): boolean => {
    return cart.some((item) => item.productId === productId);
  };

  return {
    cart,
    getItemQuantity,
    updateItemQuantity,
    removeFromCart,
    placeOrder,
    isInCart,
  };
}

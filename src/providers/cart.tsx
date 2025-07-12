import { useEffect, useState } from "react";
import { CartContext } from "./context";
import type { ProductList } from "@/lib/types";
import { cartService } from "@/services/localStorage/cart";

type CartContextProviderProps = {
  children: React.ReactNode;
  username: string;
};

export const CartContextProvider = ({
  children,
  username,
}: CartContextProviderProps) => {
  const [cart, setCart] = useState<ProductList>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = await cartService.getUserCart(username);
        setCart(cart);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, [username]);

  const getItemQuantity = (id: string) => {
    return cart.find((item) => item.productId === id)?.quantity || 0;
  };

  const updateItemQuantity = async (id: string, quantity: number) => {
    try {
      await cartService.updateCartItemQuantity(username, id, quantity);
    } catch (error) {
      console.error(error);
      return;
    }

    setCart((currItems) => {
      if (currItems.find((item) => item.productId === id) == null) {
        return [...currItems, { productId: id, quantity }];
      } else {
        return currItems.map((item) => {
          if (item.productId === id) {
            return { ...item, quantity };
          }
          return item;
        });
      }
    });
  };

  const removeFromCart = async (id: string) => {
    try {
      await cartService.removeFromUserCart(username, id);
    } catch (error) {
      console.error(error);
      return;
    }

    setCart((currItems) => {
      return currItems.filter((item) => item.productId !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getItemQuantity,
        updateItemQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

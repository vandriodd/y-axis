import { useEffect, useState } from "react";
import { CartContext } from "./context";
import type { ProductList } from "@/lib/types";
import { cartAndOrderService } from "@/services/localStorage/cart";

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
        const cart = await cartAndOrderService.getUserCart(username);
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
      await cartAndOrderService.updateCartItemQuantity(username, id, quantity);
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
      await cartAndOrderService.removeFromUserCart(username, id);
    } catch (error) {
      console.error(error);
      return;
    }

    setCart((currItems) => {
      return currItems.filter((item) => item.productId !== id);
    });
  };

  const placeOrder = async (totalAmount: number) => {
    try {
      const order = await cartAndOrderService.placeOrder(
        username,
        cart,
        totalAmount
      );
      await cartAndOrderService.clearUserCart(username);
      setCart([]);
      return order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getItemQuantity,
        updateItemQuantity,
        removeFromCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

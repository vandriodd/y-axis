export type User = {
  username: string;
  password: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  rating: number;
  reviews: number;
  isBestSeller?: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type ProductList = CartItem[];

export type Cart = Map<string, ProductList>;

export interface CartService {
  getUserCart: (username: string) => Promise<ProductList>;
  addToUserCart: (
    username: string,
    productId: Product["id"],
    quantity: number
  ) => Promise<void>;
  updateCartItemQuantity: (
    username: string,
    productId: Product["id"],
    quantity: number
  ) => Promise<void>;
  removeFromUserCart: (
    username: string,
    productId: Product["id"]
  ) => Promise<void>;
}

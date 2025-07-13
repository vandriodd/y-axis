import type {
  Cart,
  CartItem,
  CartService,
  Product,
  ProductList,
} from "@/lib/types";

const CART_KEY = "userCarts";

type Username = string;

const serializeCart = (cart: Cart): string => {
  return JSON.stringify(Object.fromEntries(cart.entries()));
};

const getOrCreateCart = (): Cart => {
  const cart = window.localStorage.getItem(CART_KEY) as string | null;

  if (!cart) {
    const newCart = new Map() as Cart;
    window.localStorage.setItem(CART_KEY, serializeCart(newCart));

    return newCart;
  }

  return new Map(Object.entries(JSON.parse(cart)));
};

function getOrCreateUserProductList(
  username: Username,
  userCarts: Cart
): ProductList {
  const userCart = userCarts.get(username);

  if (userCart) {
    return userCart;
  }

  const newUserCart = [] as ProductList;

  userCarts.set(username, newUserCart);

  window.localStorage.setItem(CART_KEY, serializeCart(userCarts));

  return newUserCart;
}

async function getUserCart(username: Username): Promise<ProductList> {
  const userCarts = getOrCreateCart();

  return getOrCreateUserProductList(username, userCarts);
}

async function addToUserCart(
  username: Username,
  productId: Product["id"],
  quantity: number = 1
): Promise<void> {
  const cart = getOrCreateCart();

  const userCart = getOrCreateUserProductList(username, cart);

  userCart.push({ productId, quantity });

  cart.set(username, userCart);

  window.localStorage.setItem(CART_KEY, serializeCart(cart));
}

async function removeFromUserCart(
  username: Username,
  productId: Product["id"]
): Promise<void> {
  const cart = getOrCreateCart();

  let userCart = getOrCreateUserProductList(username, cart);

  userCart = userCart.filter((item: CartItem) => item.productId !== productId);

  cart.set(username, userCart);

  window.localStorage.setItem(CART_KEY, serializeCart(cart));
}

async function updateCartItemQuantity(
  username: Username,
  productId: Product["id"],
  quantity: number
): Promise<void> {
  const cart = getOrCreateCart();

  const userCart = getOrCreateUserProductList(username, cart);

  const productIndex = userCart.findIndex(
    (item: CartItem) => item.productId === productId
  );

  if (productIndex !== -1) {
    userCart[productIndex].quantity = quantity;
  } else {
    userCart.push({ productId, quantity });
  }

  cart.set(username, userCart);

  window.localStorage.setItem(CART_KEY, serializeCart(cart));
}

export const cartService: CartService = {
  getUserCart,
  addToUserCart,
  updateCartItemQuantity,
  removeFromUserCart,
};

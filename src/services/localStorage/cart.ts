import type {
  Cart,
  CartItem,
  CartService,
  Product,
  ProductList,
  Order,
  OrderService,
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

// -------------------------------------------------------------------

const ORDERS_KEY = "userOrders";

function generateOrderId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function placeOrder(
  username: Username,
  items: CartItem[],
  totalAmount: number
): Promise<Order> {
  const order: Order = {
    id: generateOrderId(),
    items,
    totalAmount,
    orderDate: new Date(),
    status: "pending",
  };

  const orders = window.localStorage.getItem(ORDERS_KEY) as string | null;
  const parsedOrders = orders ? JSON.parse(orders) : {};

  if (!parsedOrders[username]) {
    parsedOrders[username] = [];
  }

  parsedOrders[username].push(order);
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(parsedOrders));

  return order;
}

async function getUserOrders(username: Username): Promise<Order[]> {
  const orders = window.localStorage.getItem(ORDERS_KEY) as string | null;

  if (!orders) {
    const newOrders = {} as Record<Username, Order[]>;
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(newOrders));
    return [];
  }

  const parsedOrders = JSON.parse(orders) as Record<Username, Order[]>;
  const userOrders = parsedOrders[username] || [];

  // Convert date strings back to Date objects
  return userOrders.map((order) => ({
    ...order,
    orderDate: new Date(order.orderDate),
    review: order.review
      ? {
          ...order.review,
          reviewDate: new Date(order.review.reviewDate),
        }
      : undefined,
  }));
}

async function reviewOrder(
  username: Username,
  orderId: string,
  rating: number,
  comment: string
): Promise<void> {
  const orders = window.localStorage.getItem(ORDERS_KEY) as string | null;

  if (!orders) return;

  const parsedOrders = JSON.parse(orders) as Record<Username, Order[]>;

  if (!parsedOrders[username]) return;

  const orderIndex = parsedOrders[username].findIndex(
    (order) => order.id === orderId
  );

  if (orderIndex !== -1) {
    parsedOrders[username][orderIndex].review = {
      rating,
      comment,
      reviewDate: new Date(),
    };

    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(parsedOrders));
  }
}

async function updateOrderStatus(
  username: Username,
  orderId: string,
  status: Order["status"]
): Promise<void> {
  const orders = window.localStorage.getItem(ORDERS_KEY) as string | null;

  if (!orders) return;

  const parsedOrders = JSON.parse(orders) as Record<Username, Order[]>;

  if (!parsedOrders[username]) return;

  const orderIndex = parsedOrders[username].findIndex(
    (order) => order.id === orderId
  );

  if (orderIndex !== -1) {
    parsedOrders[username][orderIndex].status = status;
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(parsedOrders));
  }
}

// Clear user cart after placing order
async function clearUserCart(username: Username): Promise<void> {
  const cart = getOrCreateCart();
  cart.set(username, []);
  window.localStorage.setItem(CART_KEY, serializeCart(cart));
}

export const orderService: OrderService = {
  placeOrder,
  getUserOrders,
  reviewOrder,
  updateOrderStatus,
};

// Combined service for cart and order operations
export const cartAndOrderService = {
  ...cartService,
  ...orderService,
  clearUserCart,
};

// Development/testing utilities
export const devUtils = {
  // Clear all orders for a user (useful for testing)
  clearUserOrders: async (username: string): Promise<void> => {
    const orders = window.localStorage.getItem(ORDERS_KEY) as string | null;
    if (orders) {
      const parsedOrders = JSON.parse(orders);
      delete parsedOrders[username];
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(parsedOrders));
    }
  },

  // Simulate order status progression (useful for testing)
  simulateOrderProgression: async (
    username: string,
    orderId: string
  ): Promise<void> => {
    const statuses: Order["status"][] = [
      "pending",
      "processing",
      "shipped",
      "delivered",
    ];
    const orders = window.localStorage.getItem(ORDERS_KEY) as string | null;

    if (!orders) return;

    const parsedOrders = JSON.parse(orders) as Record<Username, Order[]>;
    if (!parsedOrders[username]) return;

    const orderIndex = parsedOrders[username].findIndex(
      (order) => order.id === orderId
    );
    if (orderIndex === -1) return;

    const currentStatus = parsedOrders[username][orderIndex].status;
    const currentIndex = statuses.indexOf(currentStatus);

    if (currentIndex < statuses.length - 1) {
      parsedOrders[username][orderIndex].status = statuses[currentIndex + 1];
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(parsedOrders));
    }
  },
};

import { Link, useLocation } from "wouter";
import { Icon } from "@iconify/react/dist/iconify.js";
import useCartContext from "@/hooks/useCartContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { type CartItem, type Product } from "@/lib/types.d";
import { getProductsById } from "@/services/localStorage/products";
import useAuthContext from "@/hooks/useAuthContext";

type Products = (Product & {
  quantity: CartItem["quantity"];
})[];

export default function AppNavbar() {
  const { cart } = useCartContext();
  const { signOut } = useAuthContext();
  const [products, setProducts] = useState<Products>([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsById(
          cart.map((item) => item.productId)
        );

        setProducts(
          response.map((product) => ({
            ...product,
            quantity:
              cart.find((item) => item.productId === product.id)?.quantity || 1,
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [cart]);

  const CART_ITEMS_COUNT = cart.length;

  return (
    <nav className="flex flex-wrap items-center justify-between py-4 px-6 md:px-12 lg:px-36 bg-bg-secondary w-full border-b-gray border-b-[1px] relative">
      <Link to="/home" className="text-green">
        <h1 className="font-garamond text-2xl font-semibold">Y-Axis</h1>
      </Link>

      <div className="flex items-center gap-5">
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative group p-2 rounded-full hover:bg-gray-100 text-foreground hover:text-green transition-all duration-300 cursor-pointer">
              <Icon
                icon="solar:cart-large-minimalistic-bold"
                className="w-6 h-6"
              />
              {CART_ITEMS_COUNT > 0 && (
                <span className="absolute -top-1 -right-1 bg-green text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-bg-secondary group-hover:scale-110 transition-transform">
                  {CART_ITEMS_COUNT}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col space-y-4">
              <h2 className="text-lg font-semibold">Cart Items</h2>
              {products.map(({ id, name, quantity, img, price }) => (
                <div key={id} className="flex items-center justify-between">
                  <img
                    src={img}
                    alt={name}
                    className="w-12 h-12 object-cover border-[0.5px] border-gold/30s"
                  />
                  <span className="text-sm text-gray-700">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-sm text-accent/60">x{quantity}</span>
                  <span className="text-base font-garamond">{name}</span>
                </div>
              ))}
              <Button
                className="w-full"
                onClick={() => {
                  setLocation("/cart");
                }}
              >
                View Cart
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100 text-foreground hover:text-green transition-all duration-300 cursor-pointer">
              <Icon icon="solar:user-circle-bold" className="w-6 h-6" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col space-y-4">
              <h2 className="text-lg font-semibold">User Menu</h2>
              <Link
                to="/profile"
                className="hover:text-green transition-colors"
              >
                Profile
              </Link>
              <Link to="/orders" className="hover:text-green transition-colors">
                Orders
              </Link>
            </div>
            <hr className="my-4" />
            <div className="flex justify-end">
              <Button
                variant="destructive"
                className="w-full bg-transparent text-destructive shadow-none hover:text-white"
                onClick={signOut}
              >
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}

import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import PageLayout from "@/components/page-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { type CartItem, type Product } from "@/lib/types.d";
import { getProductsById } from "@/services/localStorage/products";
import useCartContext from "@/hooks/useCartContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const COLUMNS = ["Product", "Price", "Quantity", "Subtotal", ""];

type Products = (Product & {
  quantity: CartItem["quantity"];
})[];

export default function CartPage() {
  const { cart, updateItemQuantity, removeFromCart, placeOrder } =
    useCartContext();
  const [products, setProducts] = useState<Products>([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

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

  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleQuantityChange = (newQuantity: number): void => {
    if (newQuantity >= 1) {
      updateItemQuantity(cart[0].productId, newQuantity);
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    setIsPlacingOrder(true);
    try {
      await placeOrder(totalAmount);
      setLocation("/profile?tab=orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <PageLayout>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-accent">
            <BreadcrumbLink className="hover:text-accent/80" href={`/cart`}>
              Cart
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="container mx-auto px-4 py-8">
        <header>
          <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold font-garamond mb-6">
            Cart
            <span className="font-normal text-accent text-xl">
              ({CART_ITEMS_COUNT})
            </span>
          </h1>
        </header>

        <div className="flex flex-col items-center justify-center">
          <Table>
            <TableHeader>
              <TableRow>
                {COLUMNS.map((column) => (
                  <TableHead
                    key={column}
                    className="tracking-wider text-primary uppercase"
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="odd:bg-primary/6">
                  <TableCell>
                    <div className="flex items-center gap-2 p-2">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-16 h-16 object-cover border-[0.5px] border-gold/30"
                      />
                      <p>{product.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center border border-gold/30 rounded w-fit">
                      <button
                        onClick={() =>
                          updateItemQuantity(product.id, product.quantity - 1)
                        }
                        disabled={product.quantity <= 1}
                        className="px-3 py-1 text-gold disabled:text-gold/50 disabled:cursor-auto cursor-pointer"
                      >
                        <Icon icon="mdi:minus" />
                      </button>

                      <input
                        type="text"
                        pattern="[0-9]+"
                        value={product.quantity}
                        inputMode="numeric"
                        onChange={(e) =>
                          handleQuantityChange(Number(e.target.value) || 1)
                        }
                        className="px-4 py-1 border-x border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold w-20 text-center"
                      />

                      <button
                        onClick={() =>
                          updateItemQuantity(product.id, product.quantity + 1)
                        }
                        disabled={product.quantity >= 2500}
                        className="px-3 py-1 text-gold disabled:text-gold/50 disabled:cursor-auto cursor-pointer"
                      >
                        <Icon icon="mdi:plus" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>
                    ${(product.price * product.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghostDestructive"
                      size="icon"
                      className="ml-auto"
                      onClick={() => removeFromCart(product.id)}
                      aria-label="Remove item"
                    >
                      <Icon icon="gridicons:cross" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="w-full flex justify-between items-center border-t border-primary/30 pt-4">
            <Button
              variant="ghost"
              className="text-primary hover:bg-primary/20 hover:text-primary"
              onClick={() => setLocation("/home")}
            >
              <Icon icon="mdi:arrow-left" className="text-primary" />
              Back to Shopping
            </Button>

            <div className="flex gap-10 items-center">
              <div className="flex gap-2 items-center">
                <small className="text-primary uppercase tracking-wider">
                  Total price:
                </small>
                <p className="text-primary text-xl">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={cart.length === 0 || isPlacingOrder}
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

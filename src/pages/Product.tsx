import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { calculateStars } from "@/lib/utils";
import PageLayout from "@/components/page-layout";
import { getProductById } from "@/services/localStorage/products";
import useCartContext from "@/hooks/useCartContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const productImages = [
  "/products/glasses1.jpg",
  "/products/glasses2.jpg",
  "/products/glasses3.jpg",
  "/products/glasses4.jpg",
  "/products/glasses5.jpg",
];

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  img: string;
  description: string;
}

export default function ProductPage({ id }: { id: string }) {
  const { getItemQuantity, updateItemQuantity, removeFromCart, isInCart } =
    useCartContext();
  const [product, setProduct] = useState<Product | undefined>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isAlreadyInCart = isInCart(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        if (!product) {
          return;
        }
        setProduct(product);
        setQuantity(getItemQuantity(product.id) || 1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id, getItemQuantity]);

  const handleImageSelect = (index: number): void => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (newQuantity: number): void => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    updateItemQuantity(id, quantity);
  };

  const renderStars = () => {
    if (!product) return null;

    const rating = product.rating || 0;
    const starTypes = calculateStars(rating);

    return starTypes.map((type, index) => {
      if (type === "full") {
        return (
          <Icon
            key={`star-full-${index}`}
            icon="solar:star-bold"
            className="text-gold"
          />
        );
      } else if (type === "half") {
        return (
          <Icon
            key="star-half"
            icon="solar:star-half-bold"
            className="text-gold"
          />
        );
      } else {
        return (
          <Icon
            key={`star-empty-${index}`}
            icon="solar:star-linear"
            className="text-gold"
          />
        );
      }
    });
  };

  if (!product) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading product...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-accent">
            <BreadcrumbLink
              className="hover:text-accent/80"
              href={`/product/${product.id}`}
            >
              {product.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <div className="mb-4 aspect-square overflow-hidden border border-gold/50">
            <img
              src={selectedImage ? productImages[selectedImage] : product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-row gap-2 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onMouseEnter={() => handleImageSelect(index)}
                data-active={selectedImage === index}
                className={`flex-shrink-0 w-24 h-24 border ${
                  selectedImage === index
                    ? "border-gold border-2"
                    : "border-gold/50"
                } overflow-hidden transition-all duration-300 cursor-pointer data-[active=false]:opacity-70 data-[active=false]:scale-90`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-garamond font-bold mb-2">
                {product.name}
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars()}</div>
                  <span className="text-sm text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <span className="text-2xl font-medium text-gold">
                  ${product.price}
                </span>
              </div>
            </div>

            <div>
              <p className="text-foreground/80">{product.description}</p>
            </div>

            <div className="h-px bg-gold/30 w-full my-2"></div>

            <div>
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex gap-3">
                <button className="w-8 h-8 rounded-full bg-black border-2 border-transparent hover:border-gold focus:border-gold focus:outline-none cursor-pointer"></button>
                <button className="w-8 h-8 rounded-full bg-amber-800 border-2 border-transparent hover:border-gold focus:border-gold focus:outline-none cursor-pointer"></button>
                <button className="w-8 h-8 rounded-full bg-neutral-400 border-2 border-transparent hover:border-gold focus:border-gold focus:outline-none cursor-pointer"></button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center border border-gold/30 rounded w-fit">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="px-3 py-1 text-gold disabled:text-gold/50 disabled:cursor-auto cursor-pointer"
                >
                  <Icon icon="mdi:minus" />
                </button>

                <input
                  type="text"
                  pattern="[0-9]+"
                  value={quantity}
                  inputMode="numeric"
                  onChange={(e) =>
                    handleQuantityChange(Number(e.target.value) || 1)
                  }
                  className="px-4 py-1 border-x border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold w-20 text-center"
                />

                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 2500}
                  className="px-3 py-1 text-gold disabled:text-gold/50 disabled:cursor-auto cursor-pointer"
                >
                  <Icon icon="mdi:plus" />
                </button>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Button
                onClick={handleAddToCart}
                disabled={quantity <= 0}
                className="w-full md:w-auto px-8 py-2 bg-gold hover:bg-gold/90 text-white font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <Icon icon="solar:cart-plus-bold" />
                Add to Cart
              </Button>
              {isAlreadyInCart && (
                <Button
                  onClick={() => removeFromCart(id)}
                  variant="ghostDestructive"
                >
                  Remove from Cart
                </Button>
              )}
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-2 text-sm mb-2">
                <Icon icon="solar:verified-check-bold" className="text-gold" />
                <span>Premium handcrafted materials</span>
              </div>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Icon icon="solar:refresh-bold" className="text-gold" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon icon="la:shipping-fast" className="text-gold" />
                <span>Free shipping on orders over $1500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

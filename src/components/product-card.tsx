import { useContext, type JSX } from "react";
import { useLocation } from "wouter";
import { Icon } from "@iconify/react/dist/iconify.js";
import { calculateStars } from "@/lib/utils";
import { Button } from "./ui/button";
import { CartContext } from "@/providers/context";
import type { Product } from "@/lib/types";

interface ProductCardProps extends Product {
  isLanding?: boolean;
}

export default function ProductCard({
  isLanding,
  img,
  name,
  price,
  id,
  rating,
  reviews,
}: ProductCardProps) {
  const [, setLocation] = useLocation();
  const cartContext = useContext(CartContext);

  const handleClick = (): void => {
    setLocation(`/product/${id}`);
  };

  const handleAddToCart = (): void => {
    cartContext.updateItemQuantity(id.toString(), 1);
  };

  const renderStars = (): JSX.Element[] => {
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

  return (
    <div className="flex flex-col group">
      <div
        className={`relative overflow-hidden aspect-[3/4] mb-4 ${
          isLanding ? "cursor-default" : "cursor-pointer"
        }`}
        onClick={!isLanding ? handleClick : undefined}
      >
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={img}
          alt={`${name} eyeglasses`}
        />

        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="px-1 py-2">
        <div className="flex justify-between items-center mb-3">
          <h5 className="text-lg font-medium font-garamond tracking-wide">
            {name}
          </h5>
          {!isLanding && (
            <span className="text-gold font-medium">${price}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex mr-1 space-x-0.5">{renderStars()}</div>
            <span className="text-sm text-gray-400 ml-1">({reviews})</span>
          </div>

          {isLanding ? (
            <Button
              variant="ghost"
              className="px-4 text-green hover:text-green/80 hover:bg-green/10 transition-all duration-300 cursor-pointer"
            >
              Order Now
            </Button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full text-gold border border-gold/30 hover:bg-gold/5 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Add to cart"
            >
              <Icon icon="solar:cart-plus-bold" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

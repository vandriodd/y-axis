import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation } from "wouter";
import type { JSX, MouseEvent } from "react";

interface ProductCardProps {
  img: string;
  name: string;
  price: string;
  id: string | number;
  rating: number;
  reviews: number;
}

export default function ProductCard({ img, name, price, id, rating, reviews }: ProductCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = (): void => {
    setLocation(`/product/${id}`);
  };

  const handleAddToCart = (e: MouseEvent): void => {
    e.stopPropagation();
    console.log(`Añadido al carrito: ${name}`);
  };

  const renderStars = (): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`star-full-${i}`}
          icon="solar:star-bold"
          className="text-gold"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon
          key="star-half"
          icon="solar:star-half-bold"
          className="text-gold"
        />
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`star-empty-${i}`}
          icon="solar:star-linear"
          className="text-gold"
        />
      );
    }

    return stars;
  };

  return (
    <div className="flex flex-col group">
      <div
        className="relative overflow-hidden cursor-pointer aspect-[3/4] mb-4"
        onClick={handleClick}
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
          <h5 className="text-lg font-medium font-garamond tracking-wide">{name}</h5>
          <span className="text-gold font-medium">{price}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex mr-1 space-x-0.5">
              {renderStars()}
            </div>
            <span className="text-sm text-gray-400 ml-1">({reviews})</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full text-gold border border-gold/30 hover:bg-gold/5 transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Add to cart"
          >
            <Icon icon="solar:cart-plus-bold" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import PageLayout from "../components/layout";
import ProductCard from "../components/product-card";
import { Button } from '@/components/ui/button';

const productsData = [
  {
    id: "1",
    name: "Aviator Classic",
    price: "$129.99",
    img: "/products/glasses1.jpg",
    rating: 4.8,
    reviews: 125,
    isBestSeller: true
  },
  {
    id: "2",
    name: "Roundframe Gold",
    price: "$149.99",
    img: "/products/glasses2.jpg",
    rating: 4.6,
    reviews: 98,
    isBestSeller: true
  },
  {
    id: "3",
    name: "Rectangle Modern",
    price: "$119.99",
    img: "/products/glasses3.jpg",
    rating: 4.7,
    reviews: 112,
    isBestSeller: true
  },
  {
    id: "4",
    name: "Clubmaster Elite",
    price: "$159.99",
    img: "/products/glasses4.jpg",
    rating: 4.9,
    reviews: 156,
    isBestSeller: true
  },
  {
    id: "5",
    name: "Wayfarer Pro",
    price: "$139.99",
    img: "/products/glasses5.jpg",
    rating: 4.5,
    reviews: 87
  },
  {
    id: "6",
    name: "Cat-Eye Vintage",
    price: "$129.99",
    img: "/products/glasses6.jpg",
    rating: 4.3,
    reviews: 76
  },
  {
    id: "7",
    name: "Oval Titanium",
    price: "$179.99",
    img: "/products/glasses7.jpg",
    rating: 4.7,
    reviews: 93
  },
  {
    id: "8",
    name: "Square Modern",
    price: "$145.99",
    img: "/products/glasses8.jpg",
    rating: 4.4,
    reviews: 68
  },
  {
    id: "9",
    name: "Hexagon Wire",
    price: "$159.99",
    img: "/products/glasses9.jpg",
    rating: 4.6,
    reviews: 82
  },
  {
    id: "10",
    name: "Butterfly Elegant",
    price: "$169.99",
    img: "/products/glasses10.jpg",
    rating: 4.8,
    reviews: 104
  },
  {
    id: "11",
    name: "Retro Bold",
    price: "$149.99",
    img: "/products/glasses11.jpg",
    rating: 4.5,
    reviews: 79
  },
  {
    id: "12",
    name: "Minimalist Thin",
    price: "$129.99",
    img: "/products/glasses12.jpg",
    rating: 4.3,
    reviews: 65
  }
];

export default function Home() {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const bestSellers = productsData.filter(product => product.isBestSeller);
  const allProducts = productsData.slice(0, visibleProducts);

  const remainingProducts = productsData.length - visibleProducts;

  const handleLoadMore = () => {
    setVisibleProducts(prevCount =>
      Math.min(prevCount + 4, productsData.length)
    );
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-garamond mb-4">Eyewear Catalog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of premium eyewear, crafted with quality materials for style and comfort.
          </p>
        </header>

        <section id="best-seller" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold font-garamond mb-6">Best Sellers</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </section>

        <section id="all-products">
          <h2 className="text-2xl md:text-3xl font-bold font-garamond mb-6">All Products</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {allProducts.map(product => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>

          {remainingProducts > 0 && (
            <div className="text-center">
              <Button onClick={handleLoadMore}>Load more {remainingProducts}+</Button>
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
}

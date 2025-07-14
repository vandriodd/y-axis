import { useState } from "react";
import products from "../data/products.json";
import { Button } from "@/components/ui/button";
import PageLayout from "../components/page-layout";
import ProductCard from "../components/product-card";

export default function Home() {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const bestSellers = products.filter((product) => product.isBestSeller);
  const allProducts = products.slice(0, visibleProducts);

  const remainingProducts = products.length - visibleProducts;

  const handleLoadMore = () => {
    setVisibleProducts((prevCount) => Math.min(prevCount + 4, products.length));
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-garamond mb-4">
            Eyewear Catalog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of premium eyewear, crafted with quality
            materials for style and comfort.
          </p>
        </header>

        <section id="best-seller" className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold font-garamond mb-6">
            Best Sellers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        <section id="all-products">
          <h2 className="text-2xl md:text-3xl font-bold font-garamond mb-6">
            All Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {allProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {remainingProducts > 0 && (
            <div className="text-center">
              <Button onClick={handleLoadMore}>
                Load more {remainingProducts}+
              </Button>
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
}

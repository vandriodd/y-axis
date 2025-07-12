import products from "@/data/products.json";
import type { Product } from "@/lib/types";

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  return products.find((product) => product.id === id);
};

export const getBestSellers = (): Product[] => {
  return products.filter((product) => product.isBestSeller);
};

export const getAllProducts = (): Product[] => {
  return products;
};

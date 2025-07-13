import products from "@/data/products.json";
import type { Product } from "@/lib/types";

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  return products.find((product) => product.id === id);
};

export const getBestSellers = async (): Promise<Product[]> => {
  return products.filter((product) => product.isBestSeller);
};

export const getProductsById = async (ids: string[]): Promise<Product[]> => {
  return products.filter((product) => ids.includes(product.id));
};

export const getAllProducts = async (): Promise<Product[]> => {
  return products;
};

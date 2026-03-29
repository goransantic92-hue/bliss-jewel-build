import { MOCK_PRODUCTS } from "@/data/site";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const PRODUCT_IMAGES = [product1, product2, product3, product4, product5, product6, product7, product8];

export function getProductImageSrc(slug: string): string {
  const i = MOCK_PRODUCTS.findIndex((p) => p.slug === slug);
  if (i >= 0 && i < PRODUCT_IMAGES.length) return PRODUCT_IMAGES[i];
  return PRODUCT_IMAGES[0];
}

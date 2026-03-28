import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const products = [
  { name: "Lumière Pendant", price: "€189", category: "Necklaces", image: product1 },
  { name: "Aura Stacking Rings", price: "€145", category: "Rings", image: product2 },
  { name: "Perle Drop Earrings", price: "€225", category: "Earrings", image: product3 },
  { name: "Charm Chain Bracelet", price: "€165", category: "Bracelets", image: product4 },
  { name: "Heritage Signet Ring", price: "€275", category: "Rings", image: product5 },
  { name: "Opulence Necklace", price: "€340", category: "Necklaces", image: product6 },
  { name: "Sculptural Hoops", price: "€195", category: "Earrings", image: product7 },
  { name: "Diamond Tennis Bracelet", price: "€420", category: "Bracelets", image: product8 },
];

const FeaturedProducts = () => {
  return (
    <section id="new" className="py-20 md:py-28 px-6 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-14"
      >
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Curated For You</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Bestsellers</h2>
        </div>
        <a
          href="#"
          className="hidden md:inline-block text-xs tracking-[0.15em] uppercase text-primary border-b border-primary pb-1 hover:opacity-70 transition-opacity font-body"
        >
          View All
        </a>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-card mb-4">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={640}
                height={800}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button
                aria-label="Add to wishlist"
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100 duration-300"
              >
                <Heart size={16} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full bg-background/90 backdrop-blur-sm text-foreground text-xs tracking-[0.15em] uppercase py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors font-body">
                  Add to Bag
                </button>
              </div>
            </div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1 font-body">{product.category}</p>
            <h3 className="text-sm text-foreground mb-1 font-body">{product.name}</h3>
            <p className="text-sm text-primary font-body">{product.price}</p>
          </motion.div>
        ))}
      </div>

      <div className="md:hidden text-center mt-10">
        <a
          href="#"
          className="inline-block text-xs tracking-[0.15em] uppercase text-primary border-b border-primary pb-1 font-body"
        >
          View All Products
        </a>
      </div>
    </section>
  );
};

export default FeaturedProducts;

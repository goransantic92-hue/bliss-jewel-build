import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { LOREM_SHORT, MOCK_PRODUCTS } from "@/data/site";
import { useCart } from "@/context/CartContext";
import { getProductImageSrc } from "@/lib/productImages";

const FeaturedProducts = () => {
  const { addItem } = useCart();

  return (
    <section id="new" className="bg-card py-20 md:py-28">
      <div className="px-6 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Lorem curated</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">Lorem bestsellers</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md font-body hidden md:block">{LOREM_SHORT}</p>
          </div>
          <Link
            to="/collections"
            className="hidden md:inline-block text-xs tracking-[0.15em] uppercase text-primary border-b border-primary pb-1 hover:opacity-70 transition-opacity font-body"
          >
            Lorem view all
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {MOCK_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-background mb-4">
                <img
                  src={getProductImageSrc(product.slug)}
                  alt=""
                  loading="lazy"
                  width={640}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                />
                <Link
                  to={`/product/${product.slug}`}
                  className="absolute inset-0 z-[1]"
                  aria-label="Pogledaj proizvod"
                />
                <button
                  type="button"
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 z-[2] w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100 duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart size={16} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-3 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    type="button"
                    className="w-full bg-background/90 backdrop-blur-sm text-foreground text-xs tracking-[0.15em] uppercase py-2.5 font-body hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addItem(product.slug, 1);
                    }}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
              <Link to={`/product/${product.slug}`} className="block">
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1 font-body">{product.categoryLabel}</p>
                <p className="text-sm text-price font-body">{product.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden text-center mt-10">
          <Link
            to="/collections"
            className="inline-block text-xs tracking-[0.15em] uppercase text-primary border-b border-primary pb-1 font-body"
          >
            Lorem view all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

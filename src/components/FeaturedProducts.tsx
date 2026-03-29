import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LOREM_SHORT, MOCK_PRODUCTS } from "@/data/site";

const FeaturedProducts = () => {
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
            >
              <Link
                to={`/product/${product.slug}`}
                className="block border border-border bg-background p-6 md:p-8 min-h-[160px] flex flex-col justify-end hover:border-primary/40 transition-colors"
              >
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3 font-body">{product.categoryLabel}</p>
                <p className="text-lg text-primary font-body">{product.price}</p>
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

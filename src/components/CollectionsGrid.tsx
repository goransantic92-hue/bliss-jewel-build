import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ringsImg from "@/assets/collection-rings.jpg";
import necklacesImg from "@/assets/collection-necklaces.jpg";
import earringsImg from "@/assets/collection-earrings.jpg";
import braceletsImg from "@/assets/collection-bracelets.jpg";
import { CATEGORIES } from "@/data/site";
import type { CategorySlug } from "@/data/site";
import { LOREM_SHORT } from "@/data/site";

const images: Record<CategorySlug, string> = {
  rings: ringsImg,
  necklaces: necklacesImg,
  earrings: earringsImg,
  bracelets: braceletsImg,
};

const CollectionsGrid = () => {
  return (
    <section id="collections" className="py-20 md:py-28 px-6 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Lorem shop</p>
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">Lorem collections</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto font-body">{LOREM_SHORT}</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {CATEGORIES.map((col, i) => (
          <motion.div
            key={col.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link
              to={`/category/${col.slug}`}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer block"
            >
              <img
                src={images[col.slug]}
                alt=""
                loading="lazy"
                width={800}
                height={1000}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/75 via-charcoal-deep/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-display text-xl md:text-2xl text-primary-foreground drop-shadow-sm">{col.label}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsGrid;

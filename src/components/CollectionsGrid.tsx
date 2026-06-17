import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

const CollectionsGrid = () => {
  const { content } = useContent();
  const { categoriesSection, categories } = content;

  return (
    <section id="collections" className="py-20 md:py-28 px-6 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">{categoriesSection.eyebrow}</p>
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">{categoriesSection.title}</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto font-body">{categoriesSection.description}</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {categories.map((col, i) => (
          <motion.div
            key={col.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Link
              to={`/category/${col.slug}`}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer block"
            >
              <img
                src={col.image}
                alt={col.label}
                loading="lazy"
                width={800}
                height={1000}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/75 via-charcoal-deep/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-display text-lg md:text-xl text-primary-foreground drop-shadow-sm leading-tight">{col.label}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsGrid;

import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES, LOREM_LONG, LOREM_SHORT, MOCK_PRODUCTS, categoryLabel } from "@/data/site";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const valid = CATEGORIES.some((c) => c.slug === slug);
  const title = slug ? categoryLabel(slug) : "Category";

  const items = MOCK_PRODUCTS.filter((p) => p.category === slug);

  if (!slug || !valid) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-24 text-center">
        <p className="text-muted-foreground font-body mb-6">{LOREM_SHORT}</p>
        <Link to="/collections" className="text-primary text-sm uppercase tracking-widest font-body border-b border-primary">
          Back to collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-card/30">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-20">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Category</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">{title}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed font-body">{LOREM_LONG}</p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/product/${p.slug}`}
                className="block border border-border bg-card p-6 md:p-8 min-h-[140px] flex flex-col justify-between hover:border-primary/50 transition-colors"
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body">{p.categoryLabel}</p>
                <p className="text-lg text-primary font-body">{p.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;

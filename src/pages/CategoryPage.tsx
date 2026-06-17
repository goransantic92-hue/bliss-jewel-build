import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import { useCart } from "@/context/CartContext";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { content } = useContent();
  const { addItem } = useCart();

  const category = content.categories.find((c) => c.slug === slug);
  const items = content.products.filter((p) => p.category === slug);

  if (!slug || !category) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-24 text-center">
        <p className="text-muted-foreground font-body mb-6">Kategorija nije pronađena.</p>
        <Link to="/collections" className="text-primary text-sm uppercase tracking-widest font-body border-b border-primary">
          Pogledaj kolekcije
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-card/30">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-20">
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Kategorija</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">{category.label}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed font-body">{category.description}</p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        {items.length === 0 ? (
          <p className="text-muted-foreground font-body text-center">Nema proizvoda u ovoj kategoriji.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {items.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border border-border bg-card flex flex-col overflow-hidden hover:border-primary/50 transition-colors"
              >
                <Link to={`/product/${p.slug}`} className="block">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body">{p.categoryLabel}</p>
                    <p className="text-sm text-foreground font-body mt-1">{p.name}</p>
                    <p className="text-lg text-price font-body mt-1">{p.price}</p>
                  </div>
                </Link>
                <button
                  type="button"
                  className="border-t border-border py-3 text-[10px] tracking-[0.2em] uppercase text-foreground hover:bg-primary hover:text-primary-foreground transition-colors font-body"
                  onClick={() => addItem(p.slug, 1)}
                >
                  Dodaj u korpu
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;

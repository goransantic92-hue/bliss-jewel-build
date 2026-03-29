import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MOCK_COLLECTIONS, MOCK_PRODUCTS, LOREM_LONG } from "@/data/site";
import { useCart } from "@/context/CartContext";

const CollectionDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const col = MOCK_COLLECTIONS.find((c) => c.slug === slug);

  if (!col) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-24 text-center">
        <p className="text-muted-foreground font-body mb-6">Lorem ipsum — collection not found.</p>
        <Link to="/collections" className="text-primary text-sm uppercase tracking-widest font-body border-b border-primary">
          All collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-card/30">
        <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-20">
          <nav className="text-xs text-muted-foreground font-body mb-8 uppercase tracking-widest">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/collections" className="hover:text-primary">
              Collections
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{col.title}</span>
          </nav>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Collection</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">{col.title}</h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed font-body">{LOREM_LONG}</p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {MOCK_PRODUCTS.slice(0, 4).map((p, i) => (
            <motion.div
              key={`${col.slug}-${p.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border border-border bg-card flex flex-col overflow-hidden hover:border-primary/50 transition-colors"
            >
              <Link to={`/product/${p.slug}`} className="flex flex-col justify-between p-6 min-h-[100px] flex-1">
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body">{p.categoryLabel}</p>
                <p className="text-lg text-primary font-body">{p.price}</p>
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
      </section>
    </div>
  );
};

export default CollectionDetailPage;

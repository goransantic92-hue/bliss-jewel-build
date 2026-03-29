import { Link, useParams } from "react-router-dom";
import { LOREM_LONG, LOREM_PARA, MOCK_PRODUCTS } from "@/data/site";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-24 text-center">
        <p className="text-muted-foreground font-body mb-6">Lorem ipsum dolor sit amet — product not found.</p>
        <Link to="/" className="text-primary text-sm uppercase tracking-widest font-body border-b border-primary">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        <nav className="text-xs text-muted-foreground font-body mb-10 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category}`} className="hover:text-primary">
            {product.categoryLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Item</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="aspect-[4/5] bg-card border border-border flex items-center justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-body">Lorem · preview</span>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3 font-body">{product.categoryLabel}</p>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">Lorem ipsum product</h1>
            <p className="text-2xl text-primary font-body mb-8">{product.price}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-body">{LOREM_PARA}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-10 font-body">{LOREM_LONG}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/cart"
                className="inline-block bg-gold-gradient text-primary-foreground px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body hover:opacity-90 transition-opacity"
              >
                Add to bag
              </Link>
              <Link
                to={`/category/${product.category}`}
                className="inline-block text-xs tracking-[0.2em] uppercase text-primary border border-primary px-8 py-3.5 hover:bg-primary hover:text-primary-foreground transition-colors font-body"
              >
                View category
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

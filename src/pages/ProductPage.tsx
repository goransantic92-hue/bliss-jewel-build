import { Link, useParams } from "react-router-dom";
import { useContent } from "@/context/ContentContext";
import { useCart } from "@/context/CartContext";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getProductBySlug } = useContent();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-24 text-center">
        <p className="text-muted-foreground font-body mb-6">Proizvod nije pronađen.</p>
        <Link to="/" className="text-primary text-sm uppercase tracking-widest font-body border-b border-primary">
          Nazad na početnu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        <nav className="text-xs text-muted-foreground font-body mb-10 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary">
            Početna
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category}`} className="hover:text-primary">
            {product.categoryLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="aspect-[4/5] bg-card border border-border overflow-hidden">
            {product.video ? (
              <video src={product.video} className="w-full h-full object-cover" controls autoPlay muted loop playsInline />
            ) : (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" width={800} height={1000} />
            )}
          </div>

          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3 font-body">{product.categoryLabel}</p>
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">{product.name}</h1>
            {product.color && (
              <p className="text-xs text-muted-foreground font-body mb-2">
                Boja: <span className="text-foreground">{product.color}</span>
              </p>
            )}
            <p className="text-2xl text-price font-body mb-8">{product.price}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-body">{product.description}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-10 font-body">{product.descriptionLong}</p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                className="inline-block bg-gold-gradient text-primary-foreground px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body hover:opacity-90 transition-opacity"
                onClick={() => addItem(product.slug, 1)}
              >
                Dodaj u korpu
              </button>
              <Link
                to={`/category/${product.category}`}
                className="inline-block text-xs tracking-[0.2em] uppercase text-primary border border-primary px-8 py-3.5 hover:bg-primary hover:text-primary-foreground transition-colors font-body"
              >
                Pogledaj kategoriju
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

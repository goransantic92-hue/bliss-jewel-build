import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const CartPage = () => {
  const { getProductBySlug } = useContent();
  const { items, subtotalEur, setQuantity, removeItem } = useCart();

  const handleCheckout = () => {
    toast.info("Kontaktirajte nas za završetak porudžbine", {
      description: "Pošaljite nam listu proizvoda putem Instagrama ili e-maila.",
    });
  };

  return (
    <div className="bg-background min-h-[60vh]">
      <div className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">Korpa</h1>
        <p className="text-sm text-muted-foreground mb-12 max-w-xl font-body">
          Pregledajte izabrane proizvode i nastavite sa porudžbinom.
        </p>

        {items.length === 0 ? (
          <div className="border border-border bg-card/50 p-10 md:p-14 text-center">
            <p className="text-sm text-muted-foreground font-body mb-6">Korpa je prazna.</p>
            <Link
              to="/collections"
              className="inline-block bg-gold-gradient text-primary-foreground px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body hover:opacity-90 transition-opacity"
            >
              Nastavi kupovinu
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <ul className="divide-y divide-border border border-border bg-card/30">
              {items.map((line) => {
                const product = getProductBySlug(line.slug);
                if (!product) return null;
                const lineTotal = product.priceEur * line.quantity;
                return (
                  <li key={line.slug} className="flex gap-4 p-4 md:p-6">
                    <Link
                      to={`/product/${line.slug}`}
                      className="shrink-0 w-24 h-28 md:w-28 md:h-32 bg-background border border-border overflow-hidden"
                    >
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" width={112} height={128} />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body mb-1">{product.categoryLabel}</p>
                        <Link to={`/product/${line.slug}`} className="font-body text-foreground hover:text-primary">
                          {product.name}
                        </Link>
                        <p className="text-sm text-price font-body mt-1">{product.price} / kom</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label="Smanji količinu"
                            className="p-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setQuantity(line.slug, line.quantity - 1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center text-sm font-body tabular-nums">{line.quantity}</span>
                          <button
                            type="button"
                            aria-label="Povećaj količinu"
                            className="p-2 text-muted-foreground hover:text-foreground"
                            onClick={() => setQuantity(line.slug, line.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="text-sm font-body tabular-nums min-w-[4rem] text-right text-price">€{lineTotal}</p>
                        <button
                          type="button"
                          aria-label="Ukloni"
                          className="p-2 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(line.slug)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-primary pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body mb-1">Ukupno</p>
                <p className="font-display text-2xl text-price">€{subtotalEur}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="bg-gold-gradient text-primary-foreground px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body hover:opacity-90 transition-opacity w-full sm:w-auto"
                >
                  Završi porudžbinu
                </button>
                <Link
                  to="/kako-poruciti"
                  className="text-center text-xs tracking-[0.2em] uppercase text-primary border border-primary px-8 py-3.5 hover:bg-primary hover:text-primary-foreground transition-colors font-body"
                >
                  Kako poručiti
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

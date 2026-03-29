import { Link } from "react-router-dom";
import { LOREM_SHORT } from "@/data/site";

const CartPage = () => {
  return (
    <div className="bg-background min-h-[60vh]">
      <div className="max-w-[900px] mx-auto px-6 py-16 md:py-24">
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">Cart</h1>
        <p className="text-sm text-muted-foreground mb-12 max-w-xl font-body">{LOREM_SHORT}</p>

        <div className="border border-border bg-card/50 p-10 md:p-14 text-center">
          <p className="text-sm text-muted-foreground font-body mb-6">Lorem ipsum — your bag is empty.</p>
          <Link
            to="/collections"
            className="inline-block bg-gold-gradient text-primary-foreground px-10 py-3.5 text-xs tracking-[0.2em] uppercase font-body hover:opacity-90 transition-opacity"
          >
            Continue shopping
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-10 font-body leading-relaxed">{LOREM_SHORT}</p>
      </div>
    </div>
  );
};

export default CartPage;

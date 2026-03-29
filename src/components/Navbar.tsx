import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Instagram } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Collections", to: "/collections" },
  { label: "Rings", to: "/category/rings" },
  { label: "Necklaces", to: "/category/necklaces" },
  { label: "Earrings", to: "/category/earrings" },
  { label: "Bracelets", to: "/category/bracelets" },
];

const navLinksLeft = navLinks.slice(0, 3);
const navLinksRight = navLinks.slice(3);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalQuantity } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 md:h-20">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center h-full gap-2 md:gap-4">
          <div className="flex items-center justify-start gap-3 md:gap-8 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden shrink-0 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center justify-end gap-6 lg:gap-8 flex-1 pr-2">
              {navLinksLeft.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center min-w-0">
            <Link to="/" className="flex items-center justify-center">
              <img
                src="/bliss-logo.svg"
                alt="Bliss Nakit"
                className="h-8 md:h-10 w-auto max-w-[min(200px,42vw)]"
                width={200}
                height={48}
              />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4 min-w-0 w-full">
            <div className="hidden md:flex items-center gap-6 lg:gap-8 mr-auto pr-2">
              {navLinksRight.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 sm:gap-4 md:gap-5 shrink-0">
              <a
                href="https://www.instagram.com/bliss_nakit/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Bliss Nakit na Instagramu"
              >
                <Instagram size={18} />
              </a>
              <Link
                to="/cart"
                aria-label="Cart"
                className="text-muted-foreground hover:text-primary transition-colors relative shrink-0"
              >
                <ShoppingBag size={18} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[1rem] h-4 px-0.5 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-body tabular-nums">
                    {totalQuantity > 99 ? "99+" : totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors font-body"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, Heart, Instagram } from "lucide-react";

const navLinks = [
  { label: "New In", href: "#new" },
  { label: "Collections", href: "#collections" },
  { label: "Rings", href: "#" },
  { label: "Necklaces", href: "#" },
  { label: "Earrings", href: "#" },
  { label: "Bracelets", href: "#" },
];

const navLinksLeft = navLinks.slice(0, 3);
const navLinksRight = navLinks.slice(3);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar — sage (30%) + terracotta accent (10%) */}
      <div className="bg-secondary border-b border-border">
        <p className="text-center text-xs tracking-[0.2em] uppercase py-2.5 text-primary font-body">
          Complimentary Shipping on All Orders
        </p>
      </div>

      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 md:h-20">
          <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center h-full gap-2 md:gap-4">
            {/* Left: mobile menu + desktop links */}
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
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Center logo */}
            <div className="flex justify-center min-w-0">
              <a href="/" className="flex items-center justify-center">
                <img
                  src="/bliss-logo.svg"
                  alt="Bliss Nakit"
                  className="h-8 md:h-10 w-auto max-w-[min(200px,42vw)]"
                  width={200}
                  height={48}
                />
              </a>
            </div>

            {/* Right: desktop links (kod centra) + ikone + Instagram */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4 min-w-0 w-full">
              <div className="hidden md:flex items-center gap-6 lg:gap-8 mr-auto pr-2">
                {navLinksRight.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body whitespace-nowrap"
                  >
                    {link.label}
                  </a>
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
                <button type="button" aria-label="Search" className="text-muted-foreground hover:text-primary transition-colors">
                  <Search size={18} />
                </button>
                <button type="button" aria-label="Wishlist" className="hidden sm:block text-muted-foreground hover:text-primary transition-colors">
                  <Heart size={18} />
                </button>
                <button type="button" aria-label="Account" className="hidden md:block text-muted-foreground hover:text-primary transition-colors">
                  <User size={18} />
                </button>
                <button type="button" aria-label="Cart" className="text-muted-foreground hover:text-primary transition-colors relative">
                  <ShoppingBag size={18} />
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-body">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
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
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors font-body"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-border flex gap-6">
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary font-body">Account</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary font-body">Wishlist</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;

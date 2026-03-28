import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";

const navLinks = [
  { label: "New In", href: "#new" },
  { label: "Collections", href: "#collections" },
  { label: "Rings", href: "#" },
  { label: "Necklaces", href: "#" },
  { label: "Earrings", href: "#" },
  { label: "Bracelets", href: "#" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary/10 border-b border-gold-subtle">
        <p className="text-center text-xs tracking-[0.2em] uppercase py-2.5 text-primary font-body">
          Complimentary Shipping on All Orders
        </p>
      </div>

      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <h1 className="font-display text-2xl md:text-3xl tracking-[0.15em] text-gold-gradient uppercase">
              Bliss
            </h1>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 ml-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button aria-label="Search" className="text-muted-foreground hover:text-primary transition-colors">
              <Search size={18} />
            </button>
            <button aria-label="Wishlist" className="hidden md:block text-muted-foreground hover:text-primary transition-colors">
              <Heart size={18} />
            </button>
            <button aria-label="Account" className="hidden md:block text-muted-foreground hover:text-primary transition-colors">
              <User size={18} />
            </button>
            <button aria-label="Cart" className="text-muted-foreground hover:text-primary transition-colors relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-body">
                0
              </span>
            </button>
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

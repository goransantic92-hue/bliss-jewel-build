import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Instagram, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CATEGORIES, NAV_MAIN_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [desktopCategoriesOpen, setDesktopCategoriesOpen] = useState(false);
  const desktopWrapRef = useRef<HTMLDivElement>(null);
  const { totalQuantity } = useCart();

  const closeDesktopCategories = useCallback(() => setDesktopCategoriesOpen(false), []);

  useEffect(() => {
    if (!desktopCategoriesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDesktopCategories();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (desktopWrapRef.current && !desktopWrapRef.current.contains(e.target as Node)) {
        closeDesktopCategories();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [desktopCategoriesOpen, closeDesktopCategories]);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border overflow-visible">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 md:h-20 overflow-visible">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center h-full gap-2 md:gap-4 min-h-0">
          <div className="flex items-center justify-start gap-3 md:gap-8 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden shrink-0 text-foreground"
              aria-label="Meni"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden md:flex items-center justify-end gap-2.5 lg:gap-4 xl:gap-5 flex-1 pr-2 flex-wrap">
              {NAV_MAIN_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-[10px] lg:text-xs tracking-[0.12em] lg:tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center min-w-0 overflow-visible pointer-events-none md:pointer-events-auto">
            <Link
              to="/"
              className="flex items-center justify-center overflow-visible pointer-events-auto"
              aria-label="Bliss Nakit početna"
            >
              <img
                src="/bliss-logo.webp"
                alt="Bliss Nakit"
                className="h-10 md:h-12 w-auto max-w-[min(220px,58vw)] object-contain object-center"
                width={280}
                height={280}
                decoding="async"
              />
            </Link>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4 min-w-0 w-full">
            <div
              ref={desktopWrapRef}
              className="relative hidden md:block mr-auto pr-2"
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 font-body whitespace-nowrap py-2",
                  desktopCategoriesOpen && "text-primary"
                )}
                aria-expanded={desktopCategoriesOpen}
                aria-haspopup="true"
                onClick={() => setDesktopCategoriesOpen((v) => !v)}
              >
                Kategorije
                <ChevronDown
                  className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-200", desktopCategoriesOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {desktopCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-[60] -mt-1 pt-1 w-52"
                  >
                    <div className="rounded-md border border-border bg-background shadow-lg py-2 px-1">
                      <ul className="space-y-0.5">
                        {CATEGORIES.map((c) => (
                          <li key={c.slug}>
                            <Link
                              to={`/category/${c.slug}`}
                              className="block px-3 py-2 text-xs tracking-wide text-muted-foreground hover:text-primary hover:bg-muted/60 rounded-sm transition-colors font-body"
                              onClick={closeDesktopCategories}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                aria-label="Korpa"
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
            <div className="px-4 py-4 space-y-0">
              {NAV_MAIN_LINKS.map((link) => (
                <div key={link.label} className="border-b border-primary">
                  <Link
                    to={link.to}
                    className="block py-3.5 text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors font-body"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
              <div className="border-b border-primary">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3.5 text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors font-body text-left"
                  aria-expanded={mobileCategoriesOpen}
                  onClick={() => setMobileCategoriesOpen((v) => !v)}
                >
                  Kategorije
                  <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", mobileCategoriesOpen && "rotate-180")} />
                </button>
              </div>
              <AnimatePresence initial={false}>
                {mobileCategoriesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    {CATEGORIES.map((c) => (
                      <div key={c.slug} className="border-b border-primary pl-3">
                        <Link
                          to={`/category/${c.slug}`}
                          className="block py-3 text-sm tracking-[0.12em] text-muted-foreground hover:text-primary transition-colors font-body"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileCategoriesOpen(false);
                          }}
                        >
                          {c.label}
                        </Link>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

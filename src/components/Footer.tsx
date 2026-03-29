import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { LOREM_SHORT } from "@/data/site";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <p className="text-xs text-muted-foreground max-w-md mb-12 font-body leading-relaxed">{LOREM_SHORT}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/#new" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Lorem new
                </Link>
              </li>
              <li>
                <Link to="/category/rings" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/category/necklaces" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/category/earrings" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/category/bracelets" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Lorem</h3>
            <ul className="space-y-3">
              {["Lorem one", "Lorem two", "Lorem three", "Lorem four"].map((item) => (
                <li key={item}>
                  <span className="text-xs text-muted-foreground tracking-wide font-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Help</h3>
            <ul className="space-y-3">
              {["Lorem contact", "Lorem shipping", "Lorem size", "Lorem care", "Lorem faq"].map((item) => (
                <li key={item}>
                  <span className="text-xs text-muted-foreground tracking-wide font-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Follow Us</h3>
            <a
              href="https://www.instagram.com/bliss_nakit/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body"
            >
              <Instagram size={16} />
              @bliss_nakit
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-display text-xl tracking-[0.15em] text-gold-gradient uppercase">
            Bliss
          </Link>
          <p className="text-[10px] text-muted-foreground tracking-wide font-body">
            © {new Date().getFullYear()} Bliss Nakit. Lorem ipsum.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

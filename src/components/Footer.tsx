import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Shop</h3>
            <ul className="space-y-3">
              {["New Arrivals", "Rings", "Necklaces", "Earrings", "Bracelets", "Gift Guide"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">About</h3>
            <ul className="space-y-3">
              {["Our Story", "Craftsmanship", "Sustainability", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Help</h3>
            <ul className="space-y-3">
              {["Contact Us", "Shipping & Returns", "Size Guide", "Care Guide", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                    {item}
                  </a>
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
          <p className="font-display text-xl tracking-[0.15em] text-gold-gradient uppercase">Bliss</p>
          <p className="text-[10px] text-muted-foreground tracking-wide font-body">
            © {new Date().getFullYear()} Bliss Nakit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

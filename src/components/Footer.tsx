import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { CATEGORIES } from "@/data/site";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <p className="text-sm md:text-base text-foreground max-w-2xl mb-14 font-body leading-relaxed">
          Handmade nakit i aksesoari radjeni sa puno ljubavi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 mb-14">
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Pronađi ono što te inspiriše</h3>
            <ul className="space-y-3">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/category/${c.slug}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Informacije</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/collections"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body"
                >
                  Bliss kolekcija
                </Link>
              </li>
              <li>
                <Link
                  to="/kako-poruciti"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body"
                >
                  Kako poručiti
                </Link>
              </li>
              <li>
                <Link
                  to="/kontakt"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  to="/politika-privatnosti"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body"
                >
                  Politika privatnosti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Kontakt</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.instagram.com/bliss_nakit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body"
                >
                  <Instagram size={16} />
                  @bliss_nakit
                </a>
              </li>
              <li>
                <a
                  href="mailto:bliss.jewelry.tt@gmail.com"
                  className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body break-all"
                >
                  <Mail size={16} className="shrink-0" />
                  bliss.jewelry.tt@gmail.com
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2 text-xs text-muted-foreground tracking-wide font-body">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  Niš, Srbija
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="font-display text-xl tracking-[0.15em] text-gold-gradient uppercase">
            bliss nakit
          </Link>
          <p className="text-[10px] text-muted-foreground tracking-wide font-body text-center md:text-right">
            © 2026 bliss nakit. Copyright.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

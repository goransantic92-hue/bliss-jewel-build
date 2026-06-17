import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const Footer = () => {
  const { content } = useContent();
  const { categories, contact, footer, site } = content;

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <p className="text-sm md:text-base text-foreground max-w-2xl mb-14 font-body leading-relaxed">{footer.tagline}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 mb-14">
          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Pronađi ono što te inspiriše</h3>
            <ul className="space-y-3">
              {categories.map((c) => (
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
                <Link to="/collections" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Bliss kolekcija
                </Link>
              </li>
              <li>
                <Link to="/o-nama" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  O nama
                </Link>
              </li>
              <li>
                <Link to="/kako-poruciti" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Kako poručiti
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/dostava-i-povrat" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Dostava i povrat
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/politika-privatnosti" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Politika privatnosti
                </Link>
              </li>
              <li>
                <Link to="/uslovi-koriscenja" className="text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body">
                  Uslovi korišćenja
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-foreground mb-5">Kontakt</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body"
                >
                  <Instagram size={16} />
                  {contact.instagram}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors tracking-wide font-body break-all"
                >
                  <Mail size={16} className="shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2 text-xs text-muted-foreground tracking-wide font-body">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  {contact.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center justify-center" aria-label={`${site.name} početna`}>
            <img
              src="/bliss-logo.webp"
              alt={site.name}
              className="h-10 md:h-12 w-auto max-w-[min(220px,70vw)] object-contain object-center"
              width={280}
              height={280}
              decoding="async"
            />
          </Link>
          <p className="text-[10px] text-muted-foreground tracking-wide font-body text-center md:text-right">{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

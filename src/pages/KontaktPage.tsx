import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";

const KontaktPage = () => {
  return (
    <div className="bg-background min-h-[50vh]">
      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Bliss nakit</p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-10">Kontakt</h1>
        <ul className="space-y-8">
          <li>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 font-body">Instagram</p>
            <a
              href="https://www.instagram.com/bliss_nakit/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors font-body"
            >
              <Instagram size={20} />
              @bliss_nakit
            </a>
          </li>
          <li>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 font-body">E-mail</p>
            <a
              href="mailto:bliss.jewelry.tt@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors font-body break-all"
            >
              <Mail size={20} className="shrink-0" />
              bliss.jewelry.tt@gmail.com
            </a>
          </li>
          <li>
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2 font-body">Lokacija</p>
            <span className="inline-flex items-start gap-2 text-sm text-foreground font-body">
              <MapPin size={20} className="shrink-0 mt-0.5" />
              Niš, Srbija
            </span>
          </li>
        </ul>
        <Link to="/" className="inline-block mt-12 text-xs uppercase tracking-[0.2em] text-primary border-b border-primary font-body">
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
};

export default KontaktPage;

import { Link } from "react-router-dom";

const PolitikaPrivatnostiPage = () => {
  return (
    <div className="bg-background min-h-[50vh]">
      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Bliss nakit</p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-8">Politika privatnosti</h1>
        <div className="space-y-4 text-sm text-muted-foreground font-body leading-relaxed">
          <p>
            Poštujemo vašu privatnost. Lične podatke koje podelite sa nama (npr. prilikom poručivanja ili kontakta
            e-poštom) koristimo isključivo u svrhu obrade porudžbine i komunikacije, u skladu važećim propisima.
          </p>
          <p>
            Ne prodajemo vaše podatke trećim licima. Za sva pitanja u vezi privatnosti kontaktirajte nas na{" "}
            <a href="mailto:bliss.jewelry.tt@gmail.com" className="text-primary hover:underline">
              bliss.jewelry.tt@gmail.com
            </a>
            .
          </p>
        </div>
        <Link to="/" className="inline-block mt-10 text-xs uppercase tracking-[0.2em] text-primary border-b border-primary font-body">
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
};

export default PolitikaPrivatnostiPage;

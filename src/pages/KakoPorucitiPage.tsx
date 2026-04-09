import { Link } from "react-router-dom";

const KakoPorucitiPage = () => {
  return (
    <div className="bg-background min-h-[50vh]">
      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">Bliss nakit</p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-8">Kako poručiti</h1>
        <div className="space-y-4 text-sm text-muted-foreground font-body leading-relaxed">
          <p>
            Dodajte željene proizvode u korpu, proverite količine i nastavite na plaćanje kada bude dostupno. Za
            dodatna pitanja pišite nam na{" "}
            <a href="mailto:bliss.jewelry.tt@gmail.com" className="text-primary hover:underline">
              bliss.jewelry.tt@gmail.com
            </a>{" "}
            ili nas pronađite na Instagramu{" "}
            <a
              href="https://www.instagram.com/bliss_nakit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              @bliss_nakit
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

export default KakoPorucitiPage;

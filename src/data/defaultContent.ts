import type { SiteContent } from "@/types/content";
import heroImage from "@/assets/hero-main.jpg";
import brandImg from "@/assets/brand-story.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import ringsImg from "@/assets/collection-rings.jpg";
import necklacesImg from "@/assets/collection-necklaces.jpg";
import earringsImg from "@/assets/collection-earrings.jpg";
import braceletsImg from "@/assets/collection-bracelets.jpg";

export const DEFAULT_CONTENT: SiteContent = {
  version: 1,
  site: {
    name: "Bliss Nakit",
    tagline: "Handmade nakit i aksesoari rađeni sa puno ljubavi",
    copyright: "© 2026 bliss nakit. Sva prava zadržana.",
  },
  contact: {
    instagram: "@bliss_nakit",
    instagramUrl: "https://www.instagram.com/bliss_nakit/",
    email: "bliss.jewelry.tt@gmail.com",
    location: "Niš, Srbija",
  },
  theme: {
    background: "38 100% 97%",
    foreground: "25 18% 16%",
    primary: "27 26% 44%",
    card: "82 16% 73%",
    muted: "82 12% 70%",
    price: "#0c0c0c",
  },
  nav: [
    { label: "Početna", to: "/" },
    { label: "Bliss kolekcija", to: "/collections" },
    { label: "O nama", to: "/o-nama" },
    { label: "Kako poručiti", to: "/kako-poruciti" },
    { label: "Kontakt", to: "/kontakt" },
  ],
  categories: [
    { slug: "ogrlice", label: "Ogrlice", image: necklacesImg, description: "Elegantne ogrlice za svaki dan i posebne prilike." },
    { slug: "mindjuse", label: "Mindjuše", image: earringsImg, description: "Delikatne mindjuše koje upotpunjuju svaki stil." },
    { slug: "narukvice", label: "Narukvice", image: braceletsImg, description: "Narukvice ručno izrađene sa pažnjom prema detaljima." },
    { slug: "brosevi", label: "Broševi", image: ringsImg, description: "Jedinstveni broševi koji dodaju karakter outfitu." },
    { slug: "aksesoari", label: "Aksesoari", image: earringsImg, description: "Dodatni aksesoari koji upotpunjuju Bliss kolekciju." },
  ],
  products: [
    {
      slug: "zlatna-ogrlica-perla",
      name: "Zlatna ogrlica Perla",
      category: "ogrlice",
      categoryLabel: "Ogrlice",
      priceEur: 189,
      price: "€189",
      description: "Elegantna ogrlica sa perlicom, ručno izrađena od kvalitetnih materijala.",
      descriptionLong: "Ova ogrlica spaja klasičnu eleganciju sa modernim minimalizmom. Savršena je za svakodnevno nošenje ili posebne prilike. Svaki komad je jedinstven i pažljivo završen.",
      image: product1,
      color: "Zlatna",
      collectionSlugs: ["essentials"],
      featured: true,
    },
    {
      slug: "minimalisticka-ogrlica",
      name: "Minimalistička ogrlica",
      category: "ogrlice",
      categoryLabel: "Ogrlice",
      priceEur: 145,
      price: "€145",
      description: "Jednostavna i sofisticirana ogrlica za svaki dan.",
      descriptionLong: "Tanki lanac i diskretan detalj čine ovu ogrlicu idealnim izborom za one koji vole suptilan nakit. Lagana je i udobna za celodnevno nošenje.",
      image: product2,
      color: "Srebrna",
      collectionSlugs: ["essentials"],
      featured: true,
    },
    {
      slug: "mindjuse-kristal",
      name: "Mindjuše Kristal",
      category: "mindjuse",
      categoryLabel: "Mindjuše",
      priceEur: 225,
      price: "€225",
      description: "Mindjuše sa kristalnim detaljem koje privlače poglede.",
      descriptionLong: "Delikatne mindjuše sa sjajnim kristalom, ručno montirane. Savršene za večernje izlaske i posebne događaje.",
      image: product3,
      color: "Kristal",
      collectionSlugs: ["evening"],
      featured: true,
    },
    {
      slug: "mindjuse-luna",
      name: "Mindjuše Luna",
      category: "mindjuse",
      categoryLabel: "Mindjuše",
      priceEur: 165,
      price: "€165",
      description: "Oblik meseca u elegantnom dizajnu mindjuša.",
      descriptionLong: "Inspirisane lunarnim ciklusom, ove mindjuše donose romantičan i moderan izgled. Lagane su i udobne za celodnevno nošenje.",
      image: product4,
      color: "Zlatna",
      collectionSlugs: ["essentials", "evening"],
      featured: true,
    },
    {
      slug: "narukvica-elegance",
      name: "Narukvica Elegance",
      category: "narukvice",
      categoryLabel: "Narukvice",
      priceEur: 275,
      price: "€275",
      description: "Sofisticirana narukvica sa finim detaljima.",
      descriptionLong: "Ručno izrađena narukvica koja se lako kombinuje sa drugim komadima nakita. Podesiva je i prilagođava se svakom zglobu.",
      image: product5,
      color: "Zlatna",
      collectionSlugs: ["evening"],
      featured: true,
    },
    {
      slug: "narukvica-bogata",
      name: "Narukvica Bogata",
      category: "narukvice",
      categoryLabel: "Narukvice",
      priceEur: 340,
      price: "€340",
      description: "Izražajna narukvica za posebne prilike.",
      descriptionLong: "Bogat dizajn sa više slojeva i tekstura. Idealna za venčanja, proslave i večernje događaje.",
      image: product6,
      color: "Zlatna",
      collectionSlugs: ["bridal", "evening"],
      featured: true,
    },
    {
      slug: "bros-vintage",
      name: "Broš Vintage",
      category: "brosevi",
      categoryLabel: "Broševi",
      priceEur: 195,
      price: "€195",
      description: "Vintage inspirisan broš sa karakterom.",
      descriptionLong: "Jedinstven broš koji možete nositi na sakou, kaputiću ili torbi. Svaki komad ima svoju priču i ručno je završen.",
      image: product7,
      color: "Antik zlatna",
      collectionSlugs: ["bridal"],
      featured: true,
    },
    {
      slug: "lancic-torbica",
      name: "Lančić za torbicu",
      category: "aksesoari",
      categoryLabel: "Aksesoari",
      priceEur: 420,
      price: "€420",
      description: "Elegantan lančić za torbicu — praktičan i stilski.",
      descriptionLong: "Transformišite svoju torbicu u statement komad sa ovim ručno izrađenim lančićem. Dostupan u više dužina po želji.",
      image: product8,
      color: "Zlatna",
      collectionSlugs: ["essentials"],
      featured: true,
    },
  ],
  collections: [
    {
      slug: "essentials",
      title: "Essentials",
      description: "Osnovni komadi za svakodnevni stil — jednostavni, elegantni i laki za kombinovanje.",
      image: ringsImg,
      productSlugs: ["zlatna-ogrlica-perla", "minimalisticka-ogrlica", "mindjuse-luna", "lancic-torbica"],
    },
    {
      slug: "evening",
      title: "Evening",
      description: "Nakit za večernje izlaske i posebne prilike — sjaj, elegancija i izražajni detalji.",
      image: necklacesImg,
      productSlugs: ["mindjuse-kristal", "mindjuse-luna", "narukvica-elegance", "narukvica-bogata"],
    },
    {
      slug: "bridal",
      title: "Bridal",
      description: "Kolekcija za venčanja i svečane događaje — romantičan i nezaboravan nakit.",
      image: earringsImg,
      productSlugs: ["narukvica-bogata", "bros-vintage"],
    },
  ],
  hero: {
    image: heroImage,
    eyebrow: "Handmade nakit",
    title: "Bliss",
    titleAccent: "Nakit",
    description: "Ručno izrađeni komadi koji slave lepotu u svakom detalju. Otkrijte kolekciju stvorenu sa ljubavlju u srcu Niša.",
    ctaLabel: "Pogledaj kolekciju",
    ctaLink: "/collections",
  },
  categoriesSection: {
    eyebrow: "Kategorije",
    title: "Pronađi svoj stil",
    description: "Od ogrlica i mindjuša do narukvica i aksesoara — svaki komad je pažljivo izrađen.",
  },
  featuredSection: {
    eyebrow: "Izdvajamo",
    title: "Najtraženiji komadi",
    description: "Ručno birani favoriti naših kupaca — savršeni za poklon ili za vas.",
    viewAllLabel: "Pogledaj sve",
  },
  brandStory: {
    image: brandImg,
    eyebrow: "Naša priča",
    title: "Nakit sa",
    titleAccent: "dušom",
    paragraph1: "Bliss Nakit nastao je iz ljubavi prema ručnom radu i želje da svaki komad nosi deo naše priče. Svaki proizvod pravi se pažljivo, korak po korak, u našoj radionici u Nišu.",
    paragraph2: "Verujemo da nakit nije samo ukras — on je izraz ličnosti, uspomena i trenutka. Zato biramo kvalitetne materijale i posvećujemo vreme svakom detalju.",
    ctaLabel: "Saznaj više",
    ctaLink: "/o-nama",
  },
  newsletter: {
    eyebrow: "Budite u toku",
    title: "Prijavite se na novosti",
    description: "Budite prvi koji saznaju o novim kolekcijama, ekskluzivnim komadima i posebnim ponudama.",
    placeholder: "vaš@email.com",
    buttonLabel: "Prijavi se",
  },
  footer: {
    tagline: "Handmade nakit i aksesoari rađeni sa puno ljubavi",
  },
  pages: {
    kakoPoruciti: {
      eyebrow: "Bliss nakit",
      title: "Kako poručiti",
      paragraphs: [
        "Dodajte željene proizvode u korpu, proverite količine i pošaljite nam porudžbinu putem Instagrama ili e-maila. Kontaktiraćemo vas sa detaljima o plaćanju i dostavi.",
        "Za sva dodatna pitanja pišite nam na bliss.jewelry.tt@gmail.com ili nas pronađite na Instagramu @bliss_nakit.",
      ],
    },
    kontakt: {
      eyebrow: "Bliss nakit",
      title: "Kontakt",
      paragraphs: [
        "Rado ćemo odgovoriti na sva vaša pitanja o proizvodima, porudžbinama i saradnji. Pišite nam putem Instagrama ili e-maila.",
      ],
    },
    politika: {
      eyebrow: "Bliss nakit",
      title: "Politika privatnosti",
      paragraphs: [
        "Poštujemo vašu privatnost. Podaci koje nam pošaljete putem kontakt forme ili e-maila koriste se isključivo za odgovor na vaš upit i obradu porudžbine.",
        "Ne delimo vaše lične podatke sa trećim stranama bez vaše saglasnosti, osim kada je to zakonski obavezno.",
        "Za pitanja u vezi sa privatnošću pišite na bliss.jewelry.tt@gmail.com.",
      ],
    },
    oNama: {
      eyebrow: "Bliss nakit",
      title: "O nama",
      paragraphs: [
        "Bliss Nakit je mali studio za ručno izrađen nakit iz Niša. Svaki komad nastaje sa idejom da bude jedinstven, kvalitetan i nosiv u svakodnevnom životu.",
        "Koristimo pažljivo odabrane materijale i tradicionalne tehnike ručne izrade. Naš cilj je da svaki kupac dobije komad koji će dugo čuvati i rado nositi.",
        "Pratite nas na Instagramu @bliss_nakit za novosti, iza-kulisa sadržaj i najnovije komade iz radionice.",
      ],
    },
    dostava: {
      eyebrow: "Bliss nakit",
      title: "Dostava i povrat",
      paragraphs: [
        "Dostavu vršimo kurirskom službom na teritoriji Srbije. Rok isporuke je obično 2–5 radnih dana od potvrde porudžbine.",
        "Troškovi dostave zavise od težine i destinacije i biće vam saopšteni pre potvrde porudžbine.",
        "Ako proizvod ne odgovara vašim očekivanjima, kontaktirajte nas u roku od 14 dana od prijema. Proizvod mora biti nekorišćen i u originalnom pakovanju.",
      ],
    },
    uslovi: {
      eyebrow: "Bliss nakit",
      title: "Uslovi korišćenja",
      paragraphs: [
        "Korišćenjem sajta bliss nakit prihvatate ove uslove. Sadržaj sajta, uključujući fotografije i opise proizvoda, zaštićen je autorskim pravom.",
        "Cene su izražene u evrima i mogu se promeniti bez prethodne najave. Zadržavamo pravo da odbijemo porudžbinu u slučaju nedostupnosti proizvoda.",
        "Za sve sporove nadležan je sud u Nišu, Republika Srbija.",
      ],
    },
    faq: {
      eyebrow: "Bliss nakit",
      title: "Često postavljana pitanja",
      items: [
        {
          question: "Da li je nakit ručno rađen?",
          answer: "Da, svaki Bliss komad ručno je izrađen u našoj radionici u Nišu.",
        },
        {
          question: "Kako mogu da poručim?",
          answer: "Dodajte proizvode u korpu i kontaktirajte nas putem Instagrama ili e-maila sa listom željenih artikala.",
        },
        {
          question: "Koje metode plaćanja prihvatate?",
          answer: "Plaćanje je moguće uplatom na račun ili pouzećem, u zavisnosti od dogovora.",
        },
        {
          question: "Da li šaljete van Srbije?",
          answer: "Trenutno dostavu vršimo primarno na teritoriji Srbije. Za međunarodne porudžbine nas kontaktirajte direktno.",
        },
        {
          question: "Mogu li da vratim proizvod?",
          answer: "Da, u roku od 14 dana od prijema, pod uslovom da je proizvod nekorišćen i u originalnom pakovanju.",
        },
      ],
    },
    collections: {
      eyebrow: "Kolekcije",
      title: "Bliss kolekcija",
      paragraphs: [
        "Svaka kolekcija predstavlja drugačiji deo Bliss sveta — od svakodnevnih essentials komada do večernjeg i bridal nakita.",
      ],
    },
  },
};

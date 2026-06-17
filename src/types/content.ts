export type CategorySlug = string;

export interface Category {
  slug: string;
  label: string;
  image: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  priceEur: number;
  price: string;
  description: string;
  descriptionLong: string;
  image: string;
  video?: string;
  color: string;
  collectionSlugs: string[];
  featured: boolean;
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  image: string;
  productSlugs: string[];
}

export interface NavLink {
  label: string;
  to: string;
}

export interface HeroContent {
  image: string;
  video?: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}

export interface SectionHeader {
  eyebrow: string;
  title: string;
  description: string;
}

export interface BrandStoryContent {
  image: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  paragraph1: string;
  paragraph2: string;
  ctaLabel: string;
  ctaLink: string;
}

export interface NewsletterContent {
  eyebrow: string;
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
}

export interface ContactInfo {
  instagram: string;
  instagramUrl: string;
  email: string;
  location: string;
}

export interface PageContent {
  title: string;
  eyebrow: string;
  paragraphs: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  card: string;
  muted: string;
  price: string;
}

export interface SiteContent {
  version: number;
  site: {
    name: string;
    tagline: string;
    copyright: string;
  };
  contact: ContactInfo;
  theme: ThemeColors;
  nav: NavLink[];
  categories: Category[];
  products: Product[];
  collections: Collection[];
  hero: HeroContent;
  categoriesSection: SectionHeader;
  featuredSection: SectionHeader & { viewAllLabel: string };
  brandStory: BrandStoryContent;
  newsletter: NewsletterContent;
  footer: { tagline: string };
  pages: {
    kakoPoruciti: PageContent;
    kontakt: PageContent;
    politika: PageContent;
    oNama: PageContent;
    dostava: PageContent;
    uslovi: PageContent;
    faq: { eyebrow: string; title: string; items: FaqItem[] };
    collections: PageContent;
  };
}

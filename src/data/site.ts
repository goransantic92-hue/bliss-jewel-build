/** Shared placeholder copy */
export const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const LOREM_PARA =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

export const LOREM_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export type CategorySlug = "ogrlice" | "mindjuse" | "narukvice" | "brosevi" | "aksesoari";

export const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: "ogrlice", label: "Ogrlice" },
  { slug: "mindjuse", label: "Mindjuše" },
  { slug: "narukvice", label: "Narukvice" },
  { slug: "brosevi", label: "Broševi" },
  { slug: "aksesoari", label: "Aksesoari" },
];

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

/** Demo products for category / product / cart flows */
export const MOCK_PRODUCTS: {
  slug: string;
  category: CategorySlug;
  categoryLabel: string;
  price: string;
  priceEur: number;
}[] = [
  { slug: "item-1", category: "ogrlice", categoryLabel: "Ogrlice", price: "€189", priceEur: 189 },
  { slug: "item-2", category: "ogrlice", categoryLabel: "Ogrlice", price: "€145", priceEur: 145 },
  { slug: "item-3", category: "mindjuse", categoryLabel: "Mindjuše", price: "€225", priceEur: 225 },
  { slug: "item-4", category: "mindjuse", categoryLabel: "Mindjuše", price: "€165", priceEur: 165 },
  { slug: "item-5", category: "narukvice", categoryLabel: "Narukvice", price: "€275", priceEur: 275 },
  { slug: "item-6", category: "narukvice", categoryLabel: "Narukvice", price: "€340", priceEur: 340 },
  { slug: "item-7", category: "brosevi", categoryLabel: "Broševi", price: "€195", priceEur: 195 },
  { slug: "item-8", category: "aksesoari", categoryLabel: "Aksesoari", price: "€420", priceEur: 420 },
];

export function getProductBySlug(slug: string) {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export const MOCK_COLLECTIONS: { slug: string; title: string }[] = [
  { slug: "essentials", title: "Essentials" },
  { slug: "evening", title: "Evening" },
  { slug: "bridal", title: "Bridal" },
];

/** Navbar glavni linkovi (kategorije su u padajućem meniju „Kategorije”) */
export const NAV_MAIN_LINKS = [
  { label: "Home", to: "/" },
  { label: "Bliss kolekcija", to: "/collections" },
  { label: "Kako poručiti", to: "/kako-poruciti" },
  { label: "Kontakt", to: "/kontakt" },
] as const;

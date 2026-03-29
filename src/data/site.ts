/** Shared placeholder copy */
export const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const LOREM_PARA =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

export const LOREM_LONG =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export type CategorySlug = "rings" | "necklaces" | "earrings" | "bracelets";

export const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: "rings", label: "Rings" },
  { slug: "necklaces", label: "Necklaces" },
  { slug: "earrings", label: "Earrings" },
  { slug: "bracelets", label: "Bracelets" },
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
}[] = [
  { slug: "item-1", category: "necklaces", categoryLabel: "Necklaces", price: "€189" },
  { slug: "item-2", category: "rings", categoryLabel: "Rings", price: "€145" },
  { slug: "item-3", category: "earrings", categoryLabel: "Earrings", price: "€225" },
  { slug: "item-4", category: "bracelets", categoryLabel: "Bracelets", price: "€165" },
  { slug: "item-5", category: "rings", categoryLabel: "Rings", price: "€275" },
  { slug: "item-6", category: "necklaces", categoryLabel: "Necklaces", price: "€340" },
  { slug: "item-7", category: "earrings", categoryLabel: "Earrings", price: "€195" },
  { slug: "item-8", category: "bracelets", categoryLabel: "Bracelets", price: "€420" },
];

export const MOCK_COLLECTIONS: { slug: string; title: string }[] = [
  { slug: "essentials", title: "Essentials" },
  { slug: "evening", title: "Evening" },
  { slug: "bridal", title: "Bridal" },
];

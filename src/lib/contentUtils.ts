import type { Product, SiteContent } from "@/types/content";

export function formatPrice(eur: number): string {
  return `€${eur}`;
}

export function syncProductPrice(product: Product): Product {
  return { ...product, price: formatPrice(product.priceEur) };
}

export function syncCategoryLabels(content: SiteContent): SiteContent {
  const categoryMap = Object.fromEntries(content.categories.map((c) => [c.slug, c.label]));
  return {
    ...content,
    products: content.products.map((p) => ({
      ...syncProductPrice(p),
      categoryLabel: categoryMap[p.category] ?? p.categoryLabel,
    })),
  };
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

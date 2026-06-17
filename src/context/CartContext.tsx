import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { useContent } from "@/context/ContentContext";

const STORAGE_KEY = "bliss-cart";

export type CartLine = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  totalQuantity: number;
  subtotalEur: number;
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadFromStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is CartLine =>
        typeof row === "object" &&
        row !== null &&
        typeof (row as CartLine).slug === "string" &&
        typeof (row as CartLine).quantity === "number" &&
        (row as CartLine).quantity > 0
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { getProductBySlug } = useContent();
  const [items, setItems] = useState<CartLine[]>(() => loadFromStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback(
    (slug: string, quantity = 1) => {
      const product = getProductBySlug(slug);
      if (!product) {
        toast.error("Proizvod nije pronađen.");
        return;
      }
      const q = Math.max(1, Math.floor(quantity));
      setItems((prev) => {
        const existing = prev.find((l) => l.slug === slug);
        if (existing) {
          return prev.map((l) => (l.slug === slug ? { ...l, quantity: l.quantity + q } : l));
        }
        return [...prev, { slug, quantity: q }];
      });
      toast.success("Dodato u korpu", { description: `${product.name} · ${product.price}` });
    },
    [getProductBySlug]
  );

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    const next = Math.max(0, Math.floor(quantity));
    if (next === 0) {
      setItems((prev) => prev.filter((l) => l.slug !== slug));
      return;
    }
    setItems((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (!existing) return [...prev, { slug, quantity: next }];
      return prev.map((l) => (l.slug === slug ? { ...l, quantity: next } : l));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const { totalQuantity, subtotalEur } = useMemo(() => {
    let qty = 0;
    let sub = 0;
    for (const line of items) {
      const p = getProductBySlug(line.slug);
      if (!p) continue;
      qty += line.quantity;
      sub += p.priceEur * line.quantity;
    }
    return { totalQuantity: qty, subtotalEur: sub };
  }, [items, getProductBySlug]);

  const value = useMemo(
    () => ({
      items,
      totalQuantity,
      subtotalEur,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [items, totalQuantity, subtotalEur, addItem, removeItem, setQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

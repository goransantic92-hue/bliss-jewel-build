import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MediaInput } from "@/components/admin/MediaInput";
import { formatPrice } from "@/lib/contentUtils";
import type { Product, CategorySlug } from "@/types/content";
import { toast } from "sonner";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[čć]/g, "c")
    .replace(/[šś]/g, "s")
    .replace(/[žź]/g, "z")
    .replace(/đ/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptyProduct = (categories: { slug: CategorySlug; label: string }[]): Product => ({
  slug: "",
  name: "",
  category: categories[0]?.slug ?? "ogrlice",
  categoryLabel: categories[0]?.label ?? "Ogrlice",
  priceEur: 0,
  price: "€0",
  description: "",
  descriptionLong: "",
  image: "",
  color: "",
  collectionSlugs: [],
  featured: true,
});

export default function AdminProductsPage() {
  const { content, updateContent } = useContent();
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing(emptyProduct(content.categories));
    setIsNew(true);
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setIsNew(false);
  };

  const save = () => {
    if (!editing) return;
    const slug = editing.slug || slugify(editing.name);
    if (!editing.name.trim()) {
      toast.error("Unesite naziv proizvoda");
      return;
    }
    const product: Product = {
      ...editing,
      slug,
      priceEur: Number(editing.priceEur) || 0,
      price: formatPrice(Number(editing.priceEur) || 0),
      categoryLabel: content.categories.find((c) => c.slug === editing.category)?.label ?? editing.categoryLabel,
    };
    updateContent((prev) => {
      const exists = prev.products.some((p) => p.slug === product.slug);
      const products = exists
        ? prev.products.map((p) => (p.slug === product.slug ? product : p))
        : [...prev.products, product];
      return { ...prev, products };
    });
    toast.success(isNew ? "Proizvod dodat" : "Proizvod sačuvan");
    setEditing(null);
  };

  const remove = (slug: string) => {
    if (!confirm("Obrisati proizvod?")) return;
    updateContent((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.slug !== slug),
    }));
    toast.success("Proizvod obrisan");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-foreground">Proizvodi</h1>
          <p className="text-sm text-muted-foreground font-body mt-1">Upravljajte nazivima, cenama, slikama i bojama</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus size={16} />
          Novi proizvod
        </Button>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-left p-3 font-medium">Proizvod</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">Kategorija</th>
              <th className="text-left p-3 font-medium">Cena</th>
              <th className="text-left p-3 font-medium hidden sm:table-cell">Boja</th>
              <th className="text-right p-3 font-medium">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {content.products.map((p) => (
              <tr key={p.slug} className="border-t border-border">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {p.image && <img src={p.image} alt="" className="w-10 h-10 object-cover rounded" />}
                    <span>{p.name}</span>
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell text-muted-foreground">{p.categoryLabel}</td>
                <td className="p-3">{p.price}</td>
                <td className="p-3 hidden sm:table-cell text-muted-foreground">{p.color}</td>
                <td className="p-3 text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                    <Pencil size={14} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(p.slug)}>
                    <Trash2 size={14} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Novi proizvod" : "Uredi proizvod"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Naziv</Label>
                <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto iz naziva" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kategorija</Label>
                  <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v as CategorySlug })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {content.categories.map((c) => (
                        <SelectItem key={c.slug} value={c.slug}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cena (EUR)</Label>
                  <Input
                    type="number"
                    value={editing.priceEur}
                    onChange={(e) => setEditing({ ...editing, priceEur: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Boja</Label>
                <Input value={editing.color} onChange={(e) => setEditing({ ...editing, color: e.target.value })} placeholder="npr. Zlatna" />
              </div>
              <MediaInput label="Slika" value={editing.image} onChange={(image) => setEditing({ ...editing, image })} />
              <MediaInput label="Video (opciono)" value={editing.video ?? ""} onChange={(video) => setEditing({ ...editing, video })} accept="video/*" />
              <div className="space-y-2">
                <Label>Kratak opis</Label>
                <Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Detaljan opis</Label>
                <Textarea value={editing.descriptionLong} onChange={(e) => setEditing({ ...editing, descriptionLong: e.target.value })} rows={4} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={editing.featured} onCheckedChange={(featured) => setEditing({ ...editing, featured })} />
                <Label>Prikaži na početnoj</Label>
              </div>
              <Button onClick={save} className="w-full">
                Sačuvaj
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

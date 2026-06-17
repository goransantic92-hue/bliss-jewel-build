import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MediaInput } from "@/components/admin/MediaInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { slugify } from "@/lib/contentUtils";
import type { Category, Collection } from "@/types/content";
import { toast } from "sonner";

const emptyCategory = (): Category => ({
  slug: "",
  label: "",
  image: "",
  description: "",
});

export default function AdminCollectionsPage() {
  const { content, updateContent } = useContent();
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [isNewCat, setIsNewCat] = useState(false);
  const [editingCol, setEditingCol] = useState<Collection | null>(null);

  const openNewCategory = () => {
    setEditingCat(emptyCategory());
    setIsNewCat(true);
  };

  const openEditCategory = (cat: Category) => {
    setEditingCat({ ...cat });
    setIsNewCat(false);
  };

  const saveCat = () => {
    if (!editingCat) return;
    if (!editingCat.label.trim()) {
      toast.error("Unesite naziv kategorije");
      return;
    }

    const slug = editingCat.slug.trim() || slugify(editingCat.label);
    if (!slug) {
      toast.error("Unesite validan slug");
      return;
    }

    const category: Category = { ...editingCat, slug, label: editingCat.label.trim() };

    if (isNewCat && content.categories.some((c) => c.slug === slug)) {
      toast.error("Kategorija sa tim slugom već postoji");
      return;
    }

    updateContent((p) => {
      const categories = isNewCat
        ? [...p.categories, category]
        : p.categories.map((c) => (c.slug === editingCat.slug ? category : c));

      const products =
        !isNewCat && editingCat.slug !== slug
          ? p.products.map((prod) =>
              prod.category === editingCat.slug ? { ...prod, category: slug, categoryLabel: category.label } : prod
            )
          : p.products;

      return { ...p, categories, products };
    });

    toast.success(isNewCat ? "Kategorija dodata" : "Kategorija sačuvana");
    setEditingCat(null);
  };

  const removeCat = (slug: string) => {
    const used = content.products.filter((p) => p.category === slug).length;
    const msg =
      used > 0
        ? `Ova kategorija ima ${used} proizvod(a). Obrisati ipak?`
        : "Obrisati kategoriju?";
    if (!confirm(msg)) return;

    updateContent((p) => ({
      ...p,
      categories: p.categories.filter((c) => c.slug !== slug),
    }));
    toast.success("Kategorija obrisana");
  };

  const saveCol = () => {
    if (!editingCol) return;
    updateContent((p) => ({
      ...p,
      collections: p.collections.map((c) => (c.slug === editingCol.slug ? editingCol : c)),
    }));
    toast.success("Kolekcija sačuvana");
    setEditingCol(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-foreground">Kolekcije i kategorije</h1>
      </div>

      <Tabs defaultValue="categories">
        <TabsList className="mb-6">
          <TabsTrigger value="categories">Kategorije</TabsTrigger>
          <TabsTrigger value="collections">Kolekcije</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="flex justify-end mb-4">
            <Button onClick={openNewCategory} className="gap-2" size="sm">
              <Plus size={16} />
              Nova kategorija
            </Button>
          </div>
          <div className="space-y-3">
            {content.categories.length === 0 ? (
              <p className="text-sm text-muted-foreground font-body">Nema kategorija. Dodajte prvu.</p>
            ) : (
              content.categories.map((c) => (
                <div key={c.slug} className="flex items-center justify-between border border-border rounded p-4">
                  <div className="flex items-center gap-3">
                    {c.image && <img src={c.image} alt="" className="w-12 h-12 object-cover rounded" />}
                    <div>
                      <p className="font-body text-sm">{c.label}</p>
                      <p className="text-xs text-muted-foreground">{c.slug}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditCategory(c)}>
                      <Pencil size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeCat(c.slug)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="collections">
          <div className="space-y-3">
            {content.collections.map((c) => (
              <div key={c.slug} className="flex items-center justify-between border border-border rounded p-4">
                <div className="flex items-center gap-3">
                  {c.image && <img src={c.image} alt="" className="w-12 h-12 object-cover rounded" />}
                  <div>
                    <p className="font-body text-sm">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.productSlugs.length} proizvoda</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setEditingCol({ ...c })}>
                  <Pencil size={14} />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingCat} onOpenChange={(o) => !o && setEditingCat(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isNewCat ? "Nova kategorija" : "Uredi kategoriju"}</DialogTitle>
          </DialogHeader>
          {editingCat && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Naziv</Label>
                <Input
                  value={editingCat.label}
                  onChange={(e) => setEditingCat({ ...editingCat, label: e.target.value })}
                  placeholder="npr. Prstenje"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input
                  value={editingCat.slug}
                  onChange={(e) => setEditingCat({ ...editingCat, slug: e.target.value })}
                  placeholder={slugify(editingCat.label) || "auto iz naziva"}
                />
              </div>
              <div className="space-y-2">
                <Label>Opis</Label>
                <Textarea
                  value={editingCat.description}
                  onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })}
                />
              </div>
              <MediaInput label="Slika" value={editingCat.image} onChange={(image) => setEditingCat({ ...editingCat, image })} />
              <Button onClick={saveCat} className="w-full">
                {isNewCat ? "Dodaj kategoriju" : "Sačuvaj"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingCol} onOpenChange={(o) => !o && setEditingCol(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Uredi kolekciju</DialogTitle>
          </DialogHeader>
          {editingCol && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Naslov</Label>
                <Input value={editingCol.title} onChange={(e) => setEditingCol({ ...editingCol, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Opis</Label>
                <Textarea value={editingCol.description} onChange={(e) => setEditingCol({ ...editingCol, description: e.target.value })} />
              </div>
              <MediaInput label="Slika" value={editingCol.image} onChange={(image) => setEditingCol({ ...editingCol, image })} />
              <div className="space-y-2">
                <Label>Slugovi proizvoda (zarezom)</Label>
                <Input
                  value={editingCol.productSlugs.join(", ")}
                  onChange={(e) =>
                    setEditingCol({
                      ...editingCol,
                      productSlugs: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                />
              </div>
              <Button onClick={saveCol} className="w-full">
                Sačuvaj
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useState } from "react";
import { Pencil } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MediaInput } from "@/components/admin/MediaInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Category, Collection } from "@/types/content";
import { toast } from "sonner";

export default function AdminCollectionsPage() {
  const { content, updateContent } = useContent();
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [editingCol, setEditingCol] = useState<Collection | null>(null);

  const saveCat = () => {
    if (!editingCat) return;
    updateContent((p) => ({
      ...p,
      categories: p.categories.map((c) => (c.slug === editingCat.slug ? editingCat : c)),
    }));
    toast.success("Kategorija sačuvana");
    setEditingCat(null);
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
      <h1 className="font-display text-3xl text-foreground mb-8">Kolekcije i kategorije</h1>

      <Tabs defaultValue="categories">
        <TabsList className="mb-6">
          <TabsTrigger value="categories">Kategorije</TabsTrigger>
          <TabsTrigger value="collections">Kolekcije</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="space-y-3">
            {content.categories.map((c) => (
              <div key={c.slug} className="flex items-center justify-between border border-border rounded p-4">
                <div className="flex items-center gap-3">
                  {c.image && <img src={c.image} alt="" className="w-12 h-12 object-cover rounded" />}
                  <div>
                    <p className="font-body text-sm">{c.label}</p>
                    <p className="text-xs text-muted-foreground">{c.slug}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setEditingCat({ ...c })}>
                  <Pencil size={14} />
                </Button>
              </div>
            ))}
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
            <DialogTitle>Uredi kategoriju</DialogTitle>
          </DialogHeader>
          {editingCat && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Naziv</Label>
                <Input value={editingCat.label} onChange={(e) => setEditingCat({ ...editingCat, label: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Opis</Label>
                <Textarea value={editingCat.description} onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })} />
              </div>
              <MediaInput label="Slika" value={editingCat.image} onChange={(image) => setEditingCat({ ...editingCat, image })} />
              <Button onClick={saveCat} className="w-full">
                Sačuvaj
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

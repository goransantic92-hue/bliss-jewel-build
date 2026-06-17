import { useRef } from "react";
import { useContent } from "@/context/ContentContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { downloadJson } from "@/lib/contentUtils";
import { syncCategoryLabels } from "@/lib/contentUtils";
import type { SiteContent } from "@/types/content";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const { content, updateContent, resetContent } = useContent();
  const importRef = useRef<HTMLInputElement>(null);

  const handleImport = async (file: File | undefined) => {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = syncCategoryLabels(JSON.parse(text) as SiteContent);
      updateContent(() => parsed);
      toast.success("Sadržaj uvezen");
    } catch {
      toast.error("Neispravan JSON fajl");
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-8">Podešavanja</h1>

      <section className="space-y-4 mb-10">
        <h2 className="font-display text-xl">Kontakt i brend</h2>
        <div className="space-y-2">
          <Label>Naziv sajta</Label>
          <Input
            value={content.site.name}
            onChange={(e) => updateContent((p) => ({ ...p, site: { ...p.site, name: e.target.value } }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Tagline (footer)</Label>
          <Textarea
            value={content.footer.tagline}
            onChange={(e) => updateContent((p) => ({ ...p, footer: { tagline: e.target.value } }))}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input
              value={content.contact.instagram}
              onChange={(e) => updateContent((p) => ({ ...p, contact: { ...p.contact, instagram: e.target.value } }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Instagram URL</Label>
            <Input
              value={content.contact.instagramUrl}
              onChange={(e) => updateContent((p) => ({ ...p, contact: { ...p.contact, instagramUrl: e.target.value } }))}
            />
          </div>
          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input
              value={content.contact.email}
              onChange={(e) => updateContent((p) => ({ ...p, contact: { ...p.contact, email: e.target.value } }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Lokacija</Label>
            <Input
              value={content.contact.location}
              onChange={(e) => updateContent((p) => ({ ...p, contact: { ...p.contact, location: e.target.value } }))}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Copyright</Label>
          <Input
            value={content.site.copyright}
            onChange={(e) => updateContent((p) => ({ ...p, site: { ...p.site, copyright: e.target.value } }))}
          />
        </div>
      </section>

      <section className="space-y-4 border-t border-border pt-10">
        <h2 className="font-display text-xl">Export / Import</h2>
        <p className="text-sm text-muted-foreground font-body">
          Exportujte sadržaj kao JSON i postavite ga u <code className="text-xs">public/site-content.json</code> za objavu na serveru.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => downloadJson(content, "site-content.json")}>Export JSON</Button>
          <Button variant="outline" onClick={() => importRef.current?.click()}>
            Import JSON
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Vratiti sve na podrazumevane vrednosti?")) {
                resetContent();
                toast.success("Sadržaj resetovan");
              }
            }}
          >
            Reset na podrazumevano
          </Button>
        </div>
        <input ref={importRef} type="file" accept=".json" className="hidden" onChange={(e) => handleImport(e.target.files?.[0])} />
      </section>

      <section className="mt-10 p-4 bg-muted/30 rounded text-xs text-muted-foreground font-body">
        <p>
          Admin lozinka se postavlja u <code>.env</code> fajlu kao <code>VITE_ADMIN_PASSWORD</code>. Podrazumevana lozinka je{" "}
          <code>bliss2026</code>.
        </p>
      </section>
    </div>
  );
}

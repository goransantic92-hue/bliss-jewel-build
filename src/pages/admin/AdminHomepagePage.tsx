import { useContent } from "@/context/ContentContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MediaInput } from "@/components/admin/MediaInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function AdminHomepagePage() {
  const { content, updateContent } = useContent();

  const save = () => toast.success("Sačuvano");

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-2">Početna stranica</h1>
      <p className="text-sm text-muted-foreground font-body mb-8">Uredite hero, sekcije i newsletter</p>

      <Tabs defaultValue="hero">
        <TabsList className="mb-6">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="categories">Kategorije</TabsTrigger>
          <TabsTrigger value="featured">Izdvajamo</TabsTrigger>
          <TabsTrigger value="story">Priča</TabsTrigger>
          <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <MediaInput
            label="Hero slika"
            value={content.hero.image}
            onChange={(image) => {
              updateContent((p) => ({ ...p, hero: { ...p.hero, image } }));
              save();
            }}
          />
          <MediaInput
            label="Hero video (opciono, prekriva sliku)"
            value={content.hero.video ?? ""}
            onChange={(video) => {
              updateContent((p) => ({ ...p, hero: { ...p.hero, video: video || undefined } }));
              save();
            }}
            accept="video/*"
          />
          {["eyebrow", "title", "titleAccent", "description", "ctaLabel"].map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field}</Label>
              <Input
                value={content.hero[field as keyof typeof content.hero] as string}
                onChange={(e) => {
                  updateContent((p) => ({ ...p, hero: { ...p.hero, [field]: e.target.value } }));
                  save();
                }}
              />
            </div>
          ))}
          <div className="space-y-2">
            <Label>CTA link</Label>
            <Input
              value={content.hero.ctaLink}
              onChange={(e) => {
                updateContent((p) => ({ ...p, hero: { ...p.hero, ctaLink: e.target.value } }));
                save();
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {(["eyebrow", "title", "description"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field}</Label>
              <Input
                value={content.categoriesSection[field]}
                onChange={(e) => {
                  updateContent((p) => ({ ...p, categoriesSection: { ...p.categoriesSection, [field]: e.target.value } }));
                  save();
                }}
              />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          {(["eyebrow", "title", "description", "viewAllLabel"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field}</Label>
              <Input
                value={content.featuredSection[field]}
                onChange={(e) => {
                  updateContent((p) => ({ ...p, featuredSection: { ...p.featuredSection, [field]: e.target.value } }));
                  save();
                }}
              />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="story" className="space-y-4">
          <MediaInput
            label="Slika"
            value={content.brandStory.image}
            onChange={(image) => {
              updateContent((p) => ({ ...p, brandStory: { ...p.brandStory, image } }));
              save();
            }}
          />
          {(["eyebrow", "title", "titleAccent", "paragraph1", "paragraph2", "ctaLabel", "ctaLink"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field}</Label>
              {field.startsWith("paragraph") ? (
                <Textarea
                  value={content.brandStory[field]}
                  onChange={(e) => {
                    updateContent((p) => ({ ...p, brandStory: { ...p.brandStory, [field]: e.target.value } }));
                    save();
                  }}
                  rows={3}
                />
              ) : (
                <Input
                  value={content.brandStory[field]}
                  onChange={(e) => {
                    updateContent((p) => ({ ...p, brandStory: { ...p.brandStory, [field]: e.target.value } }));
                    save();
                  }}
                />
              )}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="newsletter" className="space-y-4">
          {(["eyebrow", "title", "description", "placeholder", "buttonLabel"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label>{field}</Label>
              <Input
                value={content.newsletter[field]}
                onChange={(e) => {
                  updateContent((p) => ({ ...p, newsletter: { ...p.newsletter, [field]: e.target.value } }));
                  save();
                }}
              />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

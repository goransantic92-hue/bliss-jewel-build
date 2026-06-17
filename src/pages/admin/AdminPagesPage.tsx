import { useContent } from "@/context/ContentContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PAGE_KEYS = [
  { key: "kakoPoruciti", label: "Kako poručiti" },
  { key: "kontakt", label: "Kontakt" },
  { key: "politika", label: "Politika privatnosti" },
  { key: "oNama", label: "O nama" },
  { key: "dostava", label: "Dostava i povrat" },
  { key: "uslovi", label: "Uslovi korišćenja" },
  { key: "collections", label: "Kolekcije" },
] as const;

export default function AdminPagesPage() {
  const { content, updateContent } = useContent();

  const save = () => toast.success("Sačuvano");

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-8">Stranice</h1>

      <Tabs defaultValue="kakoPoruciti">
        <TabsList className="mb-6 flex-wrap h-auto">
          {PAGE_KEYS.map(({ key, label }) => (
            <TabsTrigger key={key} value={key}>
              {label}
            </TabsTrigger>
          ))}
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        {PAGE_KEYS.map(({ key }) => {
          const page = content.pages[key];
          return (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="space-y-2">
                <Label>Eyebrow</Label>
                <Input
                  value={page.eyebrow}
                  onChange={(e) => {
                    updateContent((p) => ({ ...p, pages: { ...p.pages, [key]: { ...page, eyebrow: e.target.value } } }));
                    save();
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Naslov</Label>
                <Input
                  value={page.title}
                  onChange={(e) => {
                    updateContent((p) => ({ ...p, pages: { ...p.pages, [key]: { ...page, title: e.target.value } } }));
                    save();
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Paragrafi (jedan po liniji)</Label>
                <Textarea
                  value={page.paragraphs.join("\n\n")}
                  onChange={(e) => {
                    const paragraphs = e.target.value.split("\n\n").filter(Boolean);
                    updateContent((p) => ({ ...p, pages: { ...p.pages, [key]: { ...page, paragraphs } } }));
                    save();
                  }}
                  rows={8}
                />
              </div>
            </TabsContent>
          );
        })}

        <TabsContent value="faq" className="space-y-4">
          <div className="space-y-2">
            <Label>Naslov FAQ</Label>
            <Input
              value={content.pages.faq.title}
              onChange={(e) => {
                updateContent((p) => ({ ...p, pages: { ...p.pages, faq: { ...p.pages.faq, title: e.target.value } } }));
                save();
              }}
            />
          </div>
          {content.pages.faq.items.map((item, i) => (
            <div key={i} className="border border-border rounded p-4 space-y-2">
              <Input
                value={item.question}
                placeholder="Pitanje"
                onChange={(e) => {
                  const items = [...content.pages.faq.items];
                  items[i] = { ...item, question: e.target.value };
                  updateContent((p) => ({ ...p, pages: { ...p.pages, faq: { ...p.pages.faq, items } } }));
                  save();
                }}
              />
              <Textarea
                value={item.answer}
                placeholder="Odgovor"
                onChange={(e) => {
                  const items = [...content.pages.faq.items];
                  items[i] = { ...item, answer: e.target.value };
                  updateContent((p) => ({ ...p, pages: { ...p.pages, faq: { ...p.pages.faq, items } } }));
                  save();
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              updateContent((p) => ({
                ...p,
                pages: {
                  ...p.pages,
                  faq: { ...p.pages.faq, items: [...p.pages.faq.items, { question: "", answer: "" }] },
                },
              }));
            }}
          >
            Dodaj pitanje
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

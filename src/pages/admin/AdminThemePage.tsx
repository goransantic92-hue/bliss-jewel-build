import { useContent } from "@/context/ContentContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const THEME_FIELDS: { key: keyof import("@/types/content").ThemeColors; label: string; hint?: string }[] = [
  { key: "background", label: "Pozadina", hint: "HSL npr. 38 100% 97%" },
  { key: "foreground", label: "Tekst", hint: "HSL" },
  { key: "primary", label: "Primarna (zlatna)", hint: "HSL" },
  { key: "card", label: "Kartice", hint: "HSL" },
  { key: "muted", label: "Ivice / muted", hint: "HSL" },
  { key: "price", label: "Boja cene", hint: "Hex npr. #0c0c0c" },
];

export default function AdminThemePage() {
  const { content, updateContent } = useContent();

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-2">Boje teme</h1>
      <p className="text-sm text-muted-foreground font-body mb-8">
        Promene se primenjuju odmah na ceo sajt. HSL vrednosti bez hsl() omotača.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {THEME_FIELDS.map(({ key, label, hint }) => (
          <div key={key} className="space-y-2">
            <Label>{label}</Label>
            <div className="flex gap-2">
              <Input
                value={content.theme[key]}
                onChange={(e) => {
                  updateContent((p) => ({ ...p, theme: { ...p.theme, [key]: e.target.value } }));
                  toast.success("Boja ažurirana");
                }}
              />
              {key !== "price" && (
                <div
                  className="w-10 h-10 rounded border border-border shrink-0"
                  style={{ background: `hsl(${content.theme[key]})` }}
                />
              )}
              {key === "price" && (
                <div className="w-10 h-10 rounded border border-border shrink-0" style={{ background: content.theme.price }} />
              )}
            </div>
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

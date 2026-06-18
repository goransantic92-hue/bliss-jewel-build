import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { uploadMedia } from "@/lib/contentApi";
import { toast } from "sonner";

type MediaInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  hint?: string;
};

export function MediaInput({ label, value, onChange, accept = "image/*,video/*", hint }: MediaInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { getAdminPassword } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    const password = getAdminPassword();
    if (!password) {
      toast.error("Ponovo se prijavite u admin panel");
      return;
    }

    setUploading(true);
    const result = await uploadMedia(file, password);
    setUploading(false);

    if (result.ok && result.url) {
      onChange(result.url);
      return;
    }

    if (result.error === "file_too_large") {
      toast.error("Fajl je prevelik", { description: "Maksimum je oko 4 MB po slici." });
      return;
    }

    if (result.error === "unauthorized") {
      toast.error("Sesija je istekla", { description: "Odjavite se i prijavite ponovo." });
      return;
    }

    toast.error("Upload nije uspeo", { description: "Proverite konekciju i pokušajte ponovo." });
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL ili upload fajla" />
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? "Upload..." : "Upload"}
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            Obriši
          </Button>
        )}
      </div>
      <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {value && (
        <div className="mt-2 border border-border rounded overflow-hidden max-w-xs">
          {value.includes("video") || value.endsWith(".mp4") || value.endsWith(".webm") ? (
            <video src={value} className="w-full h-32 object-cover" controls muted />
          ) : (
            <img src={value} alt="" className="w-full h-32 object-cover" />
          )}
        </div>
      )}
    </div>
  );
}

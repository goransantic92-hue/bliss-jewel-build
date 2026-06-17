import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  useEffect(() => {
    if (isAdmin) navigate(from, { replace: true });
  }, [isAdmin, from, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Uspešna prijava");
      navigate(from, { replace: true });
    } else {
      toast.error("Pogrešna lozinka");
    }
  };

  if (isAdmin) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm border border-border bg-card p-8 rounded-lg">
        <p className="text-xs tracking-[0.2em] uppercase text-primary mb-2 font-body">Bliss Admin</p>
        <h1 className="font-display text-2xl text-foreground mb-6">Prijava</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Lozinka</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Unesite admin lozinku"
              autoFocus
            />
          </div>
          <Button type="submit" className="w-full">
            Prijavi se
          </Button>
        </form>
        <Link to="/" className="block text-center text-xs text-muted-foreground mt-6 hover:text-primary font-body">
          Nazad na sajt
        </Link>
      </div>
    </div>
  );
}

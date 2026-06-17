import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Home, Layers, FileText, Palette, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/admin", label: "Pregled", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Proizvodi", icon: Package },
  { to: "/admin/homepage", label: "Početna", icon: Home },
  { to: "/admin/collections", label: "Kolekcije", icon: Layers },
  { to: "/admin/pages", label: "Stranice", icon: FileText },
  { to: "/admin/theme", label: "Boje", icon: Palette },
  { to: "/admin/settings", label: "Podešavanja", icon: Settings },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const { saveStatus } = useContent();
  const navigate = useNavigate();
  const location = useLocation();

  const saveLabel =
    saveStatus === "saving"
      ? "Čuvanje na server..."
      : saveStatus === "saved"
        ? "Sačuvano — vidljivo svima na sajtu"
        : saveStatus === "error"
          ? "Greška pri čuvanju"
          : null;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-56 border-r border-border bg-card shrink-0 flex flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="font-display text-lg text-foreground">
            Bliss Admin
          </Link>
          <p className="text-[10px] text-muted-foreground mt-1 font-body">Upravljanje sadržajem</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, label, icon: Icon, end }) => {
            const active = end ? location.pathname === to : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded text-sm font-body transition-colors",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-2">
          <Link to="/" className="block text-xs text-muted-foreground hover:text-primary font-body px-3">
            ← Nazad na sajt
          </Link>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut size={14} />
            Odjavi se
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        {saveLabel && (
          <div
            className={cn(
              "px-6 py-2 text-xs font-body border-b",
              saveStatus === "error" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-primary/10 text-primary border-primary/20"
            )}
          >
            {saveLabel}
          </div>
        )}
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

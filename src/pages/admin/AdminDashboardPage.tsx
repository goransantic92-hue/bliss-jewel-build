import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  const { content } = useContent();

  return (
    <div>
      <h1 className="font-display text-3xl text-foreground mb-2">Pregled</h1>
      <p className="text-sm text-muted-foreground font-body mb-8">
        Dobrodošli u Bliss admin panel. Ovde možete menjati tekst, slike, cene, boje i sav sadržaj sajta.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-body">Proizvodi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-display">{content.products.length}</p>
            <Link to="/admin/products" className="text-xs text-primary hover:underline font-body">
              Uredi proizvode →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-body">Kolekcije</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-display">{content.collections.length}</p>
            <Link to="/admin/collections" className="text-xs text-primary hover:underline font-body">
              Uredi kolekcije →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-body">Kategorije</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-display">{content.categories.length}</p>
            <Link to="/admin/collections" className="text-xs text-primary hover:underline font-body">
              Uredi kategorije →
            </Link>
          </CardContent>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground mt-8 font-body">
        Promene se automatski čuvaju na server i vide ih svi posetioci sajta. Prvi put u Vercel dashboardu dodaj Blob storage (Storage → Blob).
      </p>
    </div>
  );
}

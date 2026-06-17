import { Link } from "react-router-dom";
import type { PageContent } from "@/types/content";

type StaticPageProps = {
  page: PageContent;
};

export default function StaticPageLayout({ page }: StaticPageProps) {
  return (
    <div className="bg-background min-h-[50vh]">
      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3 font-body">{page.eyebrow}</p>
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-8">{page.title}</h1>
        <div className="space-y-4 text-sm text-muted-foreground font-body leading-relaxed">
          {page.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <Link to="/" className="inline-block mt-10 text-xs uppercase tracking-[0.2em] text-primary border-b border-primary font-body">
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
}

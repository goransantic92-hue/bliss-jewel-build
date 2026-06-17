import { useContent } from "@/context/ContentContext";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function UsloviKoriscenjaPage() {
  const { content } = useContent();
  return <StaticPageLayout page={content.pages.uslovi} />;
}

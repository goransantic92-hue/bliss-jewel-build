import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";
import StaticPageLayout from "@/components/StaticPageLayout";

export default function DostavaPovratPage() {
  const { content } = useContent();
  return <StaticPageLayout page={content.pages.dostava} />;
}

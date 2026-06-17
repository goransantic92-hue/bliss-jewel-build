import { useContent } from "@/context/ContentContext";
import StaticPageLayout from "@/components/StaticPageLayout";

const PolitikaPrivatnostiPage = () => {
  const { content } = useContent();
  return <StaticPageLayout page={content.pages.politika} />;
};

export default PolitikaPrivatnostiPage;

import { PhotographyWeddingTemplate } from "@/components/templates/PhotographyWeddingPage";
import { ROUTES } from "@/lib/routes";

export const metadata = { title: "Wedding Portfolio — G10 Studio" };

export default function PortfolioWeddingsPage() {
  return (
    <PhotographyWeddingTemplate
      eyebrow="Destination weddings · Aruba & worldwide"
      portfolioLink={ROUTES.portfolio}
      imagePage="portfolio-weddings"
    />
  );
}

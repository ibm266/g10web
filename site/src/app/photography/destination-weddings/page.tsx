import { PhotographyWeddingTemplate } from "@/components/templates/PhotographyWeddingPage";

export const metadata = {
  title: "Destination Wedding Photographer Worldwide | G10 Studio",
};

export default function PhotographyDestinationWeddingsPage() {
  return (
    <PhotographyWeddingTemplate
      eyebrow="Destination weddings · Aruba & worldwide"
      headline={[
        { text: "Luxury", italic: true, gold: true },
        { text: "destination wedding" },
        { text: "photographer" },
        { text: "worldwide", italic: true, gold: true },
      ]}
      imagePage="portfolio-weddings"
      galleryHeading={
        <>
          Capturing your special moments with{" "}
          <span className="italic">destination wedding photography</span>
        </>
      }
    />
  );
}

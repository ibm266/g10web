import { SessionPage } from "@/components/templates/SessionPage";

export const metadata = { title: "Family Photography in Aruba — G10 Studio" };

export default function PhotographyFamilyPage() {
  return (
    <SessionPage
      config={{
        page: "photography-family",
        eyebrow: "Joy, love & togetherness — in every frame",
        headline: [
          { text: "Family photoshoots" },
          { text: "in Aruba", italic: true, gold: true },
        ],
        intro:
          "Capture joyful family moments on Aruba's stunning beaches. From mini sessions to full family portraits — I'll make everyone feel comfortable, especially the little ones!",
        chips: ["30 min mini (max 6 ppl)", "1hr sessions (3-15+ ppl)"],
        closingTitle: (
          <>
            Cherish memories with a <span className="italic">family photographer in Aruba</span>
          </>
        ),
        closingBody:
          "Family photos are priceless memories. I'll help coordinate outfits, poses, and locations so everyone has fun — and the photos look natural and vibrant.",
      }}
    />
  );
}

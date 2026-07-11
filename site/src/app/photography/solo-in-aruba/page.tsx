import { SessionPage } from "@/components/templates/SessionPage";

export const metadata = { title: "Solo Photography in Aruba | G10 Studio" };

export default function PhotographySoloPage() {
  return (
    <SessionPage
      config={{
        page: "photography-solo",
        eyebrow: "Capture your moment: beaches or desert-scape",
        headline: [
          { text: "Solo photoshoot" },
          { text: "in Aruba", italic: true, gold: true },
        ],
        intro:
          "Treat yourself to a stunning solo photoshoot in Aruba. You choose the location, whether beach, desert-scape, or somewhere in between, and I'll handle the rest with pro edits included.",
        chips: ["You choose the location", "Beach or desert-scape", "Pro edits included"],
        closingTitle: (
          <>
            Experience a stunning beach <span className="italic">solo photographer in Aruba</span>
          </>
        ),
        closingBody:
          "Whether it's for social media, a personal milestone, or just because, I'll make you feel confident and capture photos you'll actually want to share.",
      }}
    />
  );
}

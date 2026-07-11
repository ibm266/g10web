import { SessionPage } from "@/components/templates/SessionPage";

export const metadata = { title: "Couple Photography in Aruba — G10 Studio" };

export default function PhotographyCouplePage() {
  return (
    <SessionPage
      config={{
        page: "photography-couple",
        eyebrow: "Proposals · anniversaries · maternity — celebrate love!",
        headline: [
          { text: "Couple sunrise or sunset" },
          { text: "photoshoots in Aruba", italic: true, gold: true },
        ],
        intro:
          "Whether it's a proposal at sunrise, an anniversary at sunset, or a maternity session on the beach — I'll capture your love story with timeless, vibrant photos you'll treasure forever.",
        chips: ["30 min mini", "1hr sessions", "Proposals / engagements", "2hr deluxe", "4hr adventure"],
        closingTitle: (
          <>
            Couple&apos;s engagement, proposal & maternity{" "}
            <span className="italic">photographer in Aruba</span>
          </>
        ),
        closingBody:
          "From Flamingo Beach to the desert-scape, we'll find the perfect spot and make you feel like you're hanging with a friend — not posing for a stiff photoshoot.",
      }}
    />
  );
}

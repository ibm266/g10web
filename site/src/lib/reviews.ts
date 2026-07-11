export const REVIEW_STATS = {
  count: 250,
  stars: 5,
  platformsLabel: "4 platforms · 6 years",
  shortLabel: "five-star reviews",
} as const;

/** Primary profile couples can verify reviews on */
export const REVIEW_PRIMARY_URL =
  "https://www.weddingwire.com/biz/g10-studio/426f7c53258ae264.html";

export const reviewPlatforms = [
  {
    name: "WeddingWire",
    url: "https://www.weddingwire.com/biz/g10-studio/426f7c53258ae264.html",
  },
  {
    name: "Google",
    url: "https://www.google.com/maps/search/?api=1&query=G10+Studio+Aruba+photographer",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/p/G10-Studio-Aruba-Photographer-100094378973239/",
  },
  {
    name: "The Knot",
    url: "https://www.theknot.com/marketplace/wedding-photographers-aruba",
  },
] as const;

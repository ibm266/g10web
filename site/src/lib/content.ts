import { ROUTES } from "./routes";
import { REVIEW_PRIMARY_URL } from "./reviews";

export const testimonials = [
  {
    text: "He was the perfect photographer to capture our big day. From the moment we had our first Zoom call, I totally vibed with his energy. Jiten brought so much fun and energy to the day, making everyone feel comfortable and relaxed in front of the camera.",
    name: "Annamarie & Anthony Vanderstar",
    venue: "Eagle Beach, The Little One Aruba",
    year: "2024",
  },
  {
    text: "Thank you so much for capturing our day perfectly. We felt so heard and understood and you made us both feel at ease. We couldn't be happier with the results and with our experience with you! It truly felt like we were hanging with a friend.",
    name: "Zach & Rachel Heil",
    venue: "Marriott Stellaris Aruba",
    year: "2024",
  },
  {
    text: "Our best investment was working with G10 Studio. Jiten was so incredibly easy to work with, fun, and professional. He has us laughing the entire time. He has an incredible eye for detail and I am so grateful that he was able to capture such a special time for us.",
    name: "Erin & William Wesnofske",
    venue: "Marriott Stellaris Aruba",
    year: "2024",
  },
];

export const processSteps = [
  {
    num: "01",
    title: "Inquiry email",
    body: "Once you inquire you will receive more information with packages and prices…then we will chat over emails or a zoom call, to discuss the vision and decide if I am the photographer for you! We'll get into the details of the session or your wedding; who, what, where, when and how?",
  },
  {
    num: "02",
    title: "Booking process",
    body: "Booking can be done online, it's quick and easy! I take an online deposit for each and every session or wedding booked, and I work on a first-come, first-served basis. For weddings, we recommend you book at least 6 months prior to your date to avoid disappointment. Photoshoots can be booked ideally 4 weeks prior!",
  },
  {
    num: "03",
    title: "Preparations / the day has come!!!",
    body: "After discussing the plan, we will meet on the day (for weddings, a zoom call upon booking and an in-person meeting before the big day!), loosen up and chat first before we start taking any photos! I will help pose you, help with any outfit choices and do whatever I can to bring our vision to reality.",
  },
  {
    num: "04",
    title: "Receive your photos / videos!",
    body: "You will receive an online link to all your photos stored in a personal online gallery. You can easily download your photos! Share them with friends, print canvases and design albums in the highest quality possible all through your final gallery link and the G10 Studio Shop!",
  },
];

export const homeServices = [
  {
    tab: "Weddings",
    title: "Wedding Photography & Videography",
    href: ROUTES.photographyWedding,
    price: "Packages from $2,000",
    items: [
      "Professional Wedding Photography (2-10+ hrs)",
      "Professional Wedding Videography (2-10+ hrs)",
      "Drone",
      "Content Creator",
    ],
  },
  {
    tab: "Couples",
    title: "Couple's Portraits",
    href: ROUTES.photographyCouple,
    price: "Sessions from $700",
    items: [
      "30 mins mini sessions",
      "1hr sessions",
      "Proposals / Engagements",
      "2hr Deluxe Sessions",
      "4hr Adventure Sessions",
    ],
  },
  {
    tab: "Families",
    title: "Family Portraits",
    href: ROUTES.photographyFamily,
    price: "Sessions from $700",
    items: [
      "30 mins mini sessions (recommended max. 6 ppl)",
      "1hr sessions (3 - 15+ ppl)",
    ],
  },
];

export const homeFaq = [
  {
    q: "What services do you offer?",
    a: "Professional Wedding Photography & Videography (worldwide), plus Family & Couple's photoshoots in Aruba.",
  },
  {
    q: "What are your prices like?",
    a: "Please Inquire to receive access to prices and packages! Wedding Photography Packages starting at $2,000. Couples & Family Photoshoots starting at $700. Custom Packages & Pricing available upon request!",
  },
  {
    q: "How do I book you for my Wedding?",
    a: "Click here to Inquire for Wedding Photography. I'll reply with packages and prices within 72 hours.",
  },
  {
    q: "How do I book you for a couple's photoshoot?",
    a: "Click here to inquire for your photography session, including engagement, maternity, anniversary and more.",
  },
  {
    q: "How do I book you for a family photoshoot?",
    a: "Click here to inquire for your family session, including mini and full sessions available in Aruba.",
  },
];

export const whyG10Cards = [
  {
    title: "250+ Testimonials",
    body: "Because why take it from me? I'm proud to say I have Over 250+ 5-star reviews across 4 platforms and 6 years. Couples, Families & Friends alike all trust G10 Studio with their priceless memories!",
    cta: {
      label: "Read reviews for yourself",
      href: REVIEW_PRIMARY_URL,
      external: true,
    },
  },
  {
    title: "My Personality",
    body: "I love to make jokes, have a good conversation, and I don't take life too seriously. I'm always talking to you behind the lens so there's never a time that you can feel awkward!",
    cta: { label: "About me", href: ROUTES.about },
  },
  {
    title: "YOUR Experience",
    body: "It's about YOU. From the initial Zoom call, to the booking process, to the wedding day, to final gallery delivery, I guarantee a stress-free experience from start to finish.",
    cta: { label: "How does it all work?", href: "/#how-it-works" },
  },
  {
    title: "Timeless, Vibrant, & Authentic Style",
    body: "Never ever ever going out of style… only ever delivering photos that look natural with a WOW factor that makes your eyes pop. You'll look back with your grandkids in 30 years and still be amazed…",
    cta: { label: "See the full gallery", href: ROUTES.portfolio },
  },
];

export const featuredLogos = [
  { name: "THE KNOT", style: "serif" },
  { name: "WEDDINGWIRE", style: "sans" },
  { name: "Weddingz.in", style: "italic" },
  { name: "NATIONAL ASIAN WEDDING SHOW", style: "sans-sm" },
];

export const blogPosts = [
  {
    slug: "wedding-photographer-booked-what-to-do-next",
    title: "Wedding Photographer Booked? Here's What to Do Next",
    date: "6/11/26",
    featured: true,
  },
  {
    slug: "professional-couple-photography-tips-first-shoot",
    title: "Professional Couple Photography Tips for Your First Shoot",
    date: "6/10/26",
  },
  {
    slug: "family-pictures-photographer-stress-free-shoot",
    title: "Family Pictures Photographer: Tips for a Stress-Free Shoot",
    date: "6/9/26",
  },
  {
    slug: "choose-best-aruba-photographers-for-your-trip",
    title: "How to Choose the Best Aruba Photographers for Your Trip",
    date: "6/8/26",
  },
  {
    slug: "golden-hour-sunset-wedding-pictures-aruba",
    title: "Best Golden Hour Tips for Sunset Wedding Pictures",
    date: "5/21/26",
  },
  {
    slug: "creative-outdoor-poses-wedding-picture-ideas",
    title: "Creative Outdoor Poses for Wedding Picture Ideas",
    date: "5/20/26",
  },
];

export const sessionNotes = [
  "Prices start at $600 for mini sessions.",
  'Please include your "dates in Aruba". Flexibility helps!',
  "Book ideally 4 weeks prior to your session.",
  "No same-day bookings available.",
  "After inquiring, you'll receive a booking link and deposit instructions.",
  "Sessions are Aruba-only locations (beaches, desert-scape, etc.).",
  "Custom packages and exotic locations available upon request.",
];

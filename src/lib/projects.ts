/**
 * Every project on the site. Add a video = add an object here; the home grid,
 * /projects and /projects/[slug] all read from this list, in this order.
 *
 * youtubeId is the part after "youtu.be/", "shorts/" or "v=". The card
 * thumbnail is pulled from YouTube automatically, so no image upload is needed.
 * Set vertical: true for Shorts so the player is 9:16 instead of letterboxed.
 */
export type Project = {
  slug: string;
  title: string;
  category: string;
  youtubeId: string;
  vertical?: boolean;
  /** Paragraphs shown on the project page. */
  story: string[];
  client?: string;
  industry?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "ai-criminal-series",
    title: "AI Criminal Series — 11 FPS",
    category: "AI Series",
    youtubeId: "ppMHGHaQFr8",
    story: [
      "One of the most atmospheric AI films we’ve created to date. This one challenged us to maintain character consistency, visual continuity and suspense across an entirely illustrated cinematic world—areas where generative AI still tends to reveal its limits.",
      "The approach was simple: mystery first. Establish the clues, control what the audience sees, and let every document, glance and location quietly build the tension. We explored several visual directions before arriving at this restrained, graphic-novel-inspired style. The final film came together as a dark, carefully paced investigative story that feels far bigger than its runtime.",
    ],
    industry: "Entertainment",
  },
  {
    slug: "ai-ads-reel",
    title: "AI Ads Reel",
    category: "AI Ads",
    youtubeId: "KKgRedPOVQk",
    vertical: true,
    story: [],
  },
  {
    slug: "ipg-property-film",
    title: "IPG Property Film",
    category: "Real Estate",
    youtubeId: "OtSrZAMqIn8",
    vertical: true,
    story: [
      "One of the most location-driven real-estate films we’ve created for IPG. The challenge was to present more than just the property—we needed to communicate its surroundings, road connectivity and development potential within a short visual journey.",
      "The approach was simple: context first. Begin with the wider neighbourhood, gradually move closer to the site, and let the aerial perspectives reveal its scale and accessibility. With controlled drone movements, seamless transitions and clean pacing, the final film gives viewers a clear sense of not only the property, but the opportunity around it.",
    ],
    client: "IPG",
    industry: "Real Estate",
  },
  {
    slug: "ipgx-corporate-film",
    title: "IPGX Corporate Film",
    category: "Corporate Film",
    youtubeId: "pJRVe9h42NA",
    vertical: true,
    story: [
      "One of the most comprehensive corporate films we’ve created for Inscape Projects Group. The challenge was to communicate the company’s growth, process and credibility within a minute—without making it feel like a conventional real-estate presentation.",
      "The approach was simple: build the story like the projects themselves. Begin with the land, move through planning and construction, and finish with the moment a property becomes someone’s home. By combining aerial cinematography, real client interactions and minimal motion graphics, we created a film that presents IPG not simply as a developer, but as a team building trust from the ground up.",
    ],
    client: "Inscape Projects Group",
    industry: "Real Estate",
  },
  {
    slug: "hd-florals-mirror-bouquet",
    title: "HD Florals — Mirror Bouquet",
    category: "Process Film",
    youtubeId: "VT7OU-PlV_U",
    vertical: true,
    story: [
      "One of the most satisfying process films we’ve created for HD Florals. The challenge was to capture the making of a custom mirror bouquet without losing the delicacy, patience and detail that go into arranging every single flower.",
      "The approach was simple: let the craft lead. Start with an empty mirror, follow each layer as it takes shape, and save the complete transformation for the final reveal. With clean framing, gentle pacing and a touch of playful storytelling, the film turns a handmade floral arrangement into a small piece of visual magic.",
    ],
    client: "HD Florals",
    industry: "Florals",
  },
  {
    slug: "admk-video-song",
    title: "ADMK Video Song",
    category: "Political Campaign",
    youtubeId: "nJKDPJJxVPQ",
    story: [
      "One of the most direct political conversation films we’ve worked on for R. Manoharan. The challenge here wasn’t creating spectacle—it was shaping a detailed conversation into a clear, engaging campaign story while preserving the candidate’s natural voice and conviction.",
      "The approach was simple: message first. Keep the interview authentic, support it with real moments from the ground, and build towards a strong electoral call to action. Through focused editing, relevant campaign footage and clean visual branding, we turned the conversation into a film that feels personal, credible and purposeful.",
    ],
    client: "R. Manoharan",
    industry: "Politics",
  },
  {
    slug: "om-mills-identity",
    title: "OM Mills Identity Film",
    category: "Brand Identity",
    youtubeId: "9A3GWeeDFZo",
    vertical: true,
    story: [
      "One of the most minimal identity films we’ve created for Erode OM Mills. The challenge was to communicate the company’s connection to textiles through motion without adding unnecessary elements or overexplaining the idea.",
      "The approach was simple: let the thread build the identity. A single strand moves, bends and gradually weaves itself into the OM Mills symbol before revealing the complete brand. Through restrained movement, tactile fabric detailing and a clean visual space, the animation turns the company’s core craft into its identity—quite literally.",
    ],
    client: "Erode OM Mills",
    industry: "Textiles",
  },
  {
    slug: "om-mills-hiring",
    title: "OM Mills Hiring Film",
    category: "Recruitment",
    youtubeId: "XXIk-qleoiA",
    vertical: true,
    story: [
      "One of the most people-focused recruitment films we’ve created for Erode OM Mills. The challenge was to communicate a senior-level hiring requirement clearly while keeping the content approachable, local and authentic to the textile industry.",
      "The approach was simple: speak directly to the right candidate. We combined a natural Tamil presentation with glimpses of the factory, machinery and work environment, while keeping the experience requirement and opportunity easy to understand. The final film feels less like a conventional job advertisement and more like a genuine invitation to become part of a growing textile company.",
    ],
    client: "Erode OM Mills",
    industry: "Textiles",
  },
  {
    slug: "admk-campaign",
    title: "ADMK Campaign Film",
    category: "Political Campaign",
    youtubeId: "XwC1JGlZBEE",
    vertical: true,
    story: [
      "One of the most direct political conversation films we’ve worked on for R. Manoharan. The challenge here wasn’t creating spectacle—it was shaping a detailed conversation into a clear, engaging campaign story while preserving the candidate’s natural voice and conviction.",
      "The approach was simple: message first. Keep the interview authentic, support it with real moments from the ground, and build towards a strong electoral call to action. Through focused editing, relevant campaign footage and clean visual branding, we turned the conversation into a film that feels personal, credible and purposeful.",
    ],
    client: "R. Manoharan",
    industry: "Politics",
  },
  {
    slug: "ipg-vijaya-nivas-reel",
    title: "IPG Property Reel",
    category: "Real Estate",
    youtubeId: "m1cHFJSY9uU",
    vertical: true,
    story: [
      "One of the most transformation-focused real-estate films we’ve created for IPG’s Vijaya Nivas. The challenge was to market an open plot while helping viewers clearly imagine the homes and lifestyle that could eventually take shape there.",
      "The approach was simple: show the reality, then reveal the possibility. We combined an on-location presentation, aerial views, kinetic typography and AI-assisted architectural visualisation to turn an empty site into a visible opportunity. The final film communicates the location, infrastructure, pricing and future potential in a fast, engaging format designed for today’s property buyer.",
    ],
    client: "IPG — Vijaya Nivas",
    industry: "Real Estate",
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const youtubeThumb = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

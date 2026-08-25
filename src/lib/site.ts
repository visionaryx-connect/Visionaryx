export const SITE = {
  name: "Visionary X",
  byline: "BY IPG",
  email: "visionaryx.connect@gmail.com",

  // !! PLACEHOLDER !! Swap in the real WhatsApp business number before launch.
  // Full international format: country code first, digits only — no "+",
  // spaces or dashes. India example: "919876543210".
  whatsapp: "9994140525",

  tagline: "Make the world stop scrolling.",
};

/** wa.me deep link that opens a chat with the message already typed out. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

/** mailto: link that opens the user's mail app with the draft prefilled. */
export const mailtoLink = (subject: string, body: string) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Gen-AI Studio", href: "#genai" },
  { label: "Work", href: "#work" },

  {
    label: "Projects",
    href: "https://visionaryx-project.mohammedriyazs0506.workers.dev/",
    external: true,
  },

  { label: "Process", href: "#process" },
];
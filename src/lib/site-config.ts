/** Production defaults — override via env on Netlify if needed */
const PRODUCTION = {
  email: "corelogicweblab@gmail.com",
  phone: "0915 244 4480",
  phoneTel: "+639152444480",
  location: "Philippines",
  siteUrl: "https://corelogic-web.netlify.app",
} as const;

export const SITE = {
  name: "CoreLogic Web Lab",
  tagline: "Web Lab",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? PRODUCTION.email,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? PRODUCTION.phone,
  phoneTel: process.env.NEXT_PUBLIC_CONTACT_PHONE_TEL ?? PRODUCTION.phoneTel,
  location: process.env.NEXT_PUBLIC_CONTACT_LOCATION ?? PRODUCTION.location,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION.siteUrl,
  logoSrc: "/corelogic.png",
} as const;

export const MAILTO_LINK = `mailto:${SITE.email}?subject=${encodeURIComponent("Project Inquiry — CoreLogic Web Lab")}`;

export const TEL_LINK = `tel:${SITE.phoneTel}`;

export const SITE = {
  name: "CoreLogic Web Lab",
  tagline: "Web Lab",
  email: process.env.CONTACT_EMAIL ?? "corelogicweblab@gmail.com",
  phone: process.env.CONTACT_PHONE ?? "+63 912 345 6789",
  phoneTel: process.env.CONTACT_PHONE_TEL ?? "+639123456789",
  location: "Philippines · Remote Global",
  logoSrc: "/corelogic.png",
} as const;

export const MAILTO_LINK = `mailto:${SITE.email}?subject=${encodeURIComponent("Project Inquiry — CoreLogic Web Lab")}`;

# CoreLogic Web Lab

Enterprise-grade, AI-powered technology company website built with Next.js, React, Tailwind CSS, Framer Motion, GSAP, and Three.js.

## Getting Started

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion, GSAP
- **3D:** Three.js, React Three Fiber, Drei
- **Icons:** Lucide React

## Sections

1. Fullscreen Hero — neural network, particles, HUD dashboard
2. Services — 10 interactive service cards
3. Featured Solutions — 5 project showcases
4. Technology Stack — animated tech grid
5. Why CoreLogic — 8 enterprise feature cards
6. Contact — form, direct email, live chat UI, 3D globe
7. Footer — navigation and social links

## Deployment

Optimized for Vercel:

```bash
npm run build
```

## Logo

Place `corelogic.png` in `public/` (copied from project root). Used in navbar, footer, and favicon.

## Functional Systems

| Feature | How it works |
|--------|----------------|
| **Contact form** | `POST /api/contact` — validates, saves to `data/inquiries.json`, optional email via [Resend](https://resend.com) (`RESEND_API_KEY`) |
| **Live chat** | Floating widget → `POST /api/chat` — intelligent auto-replies, persisted server-side |
| **Email** | Direct `mailto:corelogicweblab@gmail.com` on Get Started, contact, and hero CTAs |
| **Contact pills** | Working `mailto:`, `tel:`, and maps links |
| **Hero HUD** | Polls `GET /api/health` every 30s for live uptime & service status |
| **Solution demos** | “Request Demo” pre-fills contact form with project name |

Default email: **corelogicweblab@gmail.com**

## Customization

- Contact email: `src/lib/site-config.ts` or `CONTACT_EMAIL` in `.env.local`
- Social URLs: `src/lib/constants.ts`

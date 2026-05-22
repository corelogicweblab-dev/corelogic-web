import { SITE } from "@/lib/site-config";

export interface ChatRule {
  /** Higher = checked first when multiple match */
  priority: number;
  match: RegExp;
  reply: string;
}

const EMAIL = SITE.email;

export const CHAT_RULES: ChatRule[] = [
  // —— Website / Web development (EN + TL) ——
  {
    priority: 100,
    match:
      /website|web\s*app|web\s*site|gumawa\s*ng\s*website|magpagawa\s*ng\s*website|gawain\s*ng\s*website|paano\s*(mag)?(gawa|pagawa)\s*ng\s*website|custom\s*site|company\s*site|landing\s*page/i,
    reply: `**Paano magpagawa ng website sa CoreLogic Web Lab**

1. **Consultation** — I-email kami sa ${EMAIL} o gamitin ang contact form. Ilahad ang goals, target users, at timeline.
2. **Discovery** — Tinitingnan namin ang scope: corporate site, government portal, e-commerce, dashboard, o web app.
3. **Design & Build** — Ginagamit namin ang Next.js, React, Tailwind — mobile-ready, mabilis, at enterprise-grade.
4. **Launch & Support** — Deployment sa Vercel/AWS/Cloudflare, security hardening, at ongoing maintenance kung kailangan.

**Kasama sa web projects:**
• Responsive UI (desktop, tablet, mobile)
• CMS / admin panels kung kailangan
• API integration, auth, payments
• SEO at performance optimization

**Typical timeline:** 2–8 linggo depende sa complexity.
**Next step:** Email ${EMAIL} with "Website Project" sa subject, o i-type dito ang brief ng project mo.`,
  },
  {
    priority: 95,
    match: /mobile\s*app|android|ios|flutter|app\s*development|mobile\s*application/i,
    reply: `**Mobile App Development**

Gumagawa kami ng native at cross-platform apps gamit ang **Flutter** at modern APIs.

**Pwede namin gawin:**
• Government / LGU citizen apps
• Field monitoring & emergency apps
• Enterprise dashboards on mobile
• Offline-capable systems

**Process:** Discovery → UI/UX → Build → Test → Publish (Play Store / App Store).

Email ${EMAIL} with your app idea, target users, and preferred platforms (Android/iOS/both).`,
  },
  {
    priority: 90,
    match:
      /^(paano|how)\??$|paano\s*ko|paano\s*ba|how\s*do\s*i\s*start|paano\s*magsimula|paano\s*umuusad|process|proseso|steps|ano\s*ang\s*process/i,
    reply: `**Paano magsimula sa CoreLogic Web Lab**

**Option 1 — Email (pinakamabilis)**
→ ${EMAIL}
→ Ilagay: project type, budget range (kung meron), at deadline

**Option 2 — Contact form**
→ Scroll sa "Get In Touch" section sa site
→ Fill up name, email, message

**Option 3 — Dito sa Live Support**
→ I-describe ang project mo (website, app, AI, government system, etc.)

**Ano ang susunod?**
1. Reply within **24 hours** (business days)
2. Free discovery call / requirements discussion
3. Formal proposal with scope, timeline, at quote

**Services namin:** Enterprise software, AI & automation, government/LGU platforms, smart city, cloud, cybersecurity, GIS, emergency/DRRM systems, mobile apps, real-time monitoring.`,
  },
  {
    priority: 88,
    match:
      /magkano|presyo|price|cost|quote|budget|rate|bayad|hm\b|how\s*much|quotation/i,
    reply: `**Pricing & Quotes**

Custom ang bawat project — depende sa:
• Scope (pages, features, integrations)
• Design complexity
• Timeline (rush vs standard)
• Maintenance & hosting needs

**Ballpark ranges (PHP, indicative only):**
• Corporate / portfolio website: custom quote
• Government / enterprise platform: project-based
• AI copilot / automation: module-based
• Mobile app: per platform + backend

Para sa **accurate quote**, email ${EMAIL} with:
✓ Project description
✓ Must-have features
✓ Target launch date

Walang obligation sa initial inquiry.`,
  },
  {
    priority: 85,
    match:
      /serbisyo|services|ano\s*ang\s*(ginagawa|offer|services)|what\s*do\s*you\s*(do|offer)|list\s*of\s*services|offering/i,
    reply: `**CoreLogic Web Lab — Services**

1. **Enterprise Software Development** — Scalable, compliant business platforms
2. **Government Digital Platforms** — LGU portals, citizen services, audit-ready
3. **AI & Automation** — Copilots, workflows, OpenAI/LangChain integrations
4. **Smart City Systems** — Sensors, urban dashboards, citizen engagement
5. **Cloud Infrastructure** — AWS, Cloudflare, Docker, Kubernetes
6. **Cybersecurity Solutions** — Zero-trust, monitoring, hardening
7. **GIS & Mapping Systems** — Maps, spatial analytics, location intelligence
8. **Emergency Response / DRRM** — Command centers, dispatch, live monitoring
9. **Mobile App Development** — Flutter, iOS, Android
10. **Real-Time Monitoring** — Dashboards, alerts, telemetry

**Featured solutions:** DRRM Command Center, Smart LGU Platform, FOI AI Assistant, Emergency Dispatch, Governance Dashboard.

Tanungin mo kami about any service — or email ${EMAIL}.`,
  },
  {
    priority: 82,
    match: /ai|automation|chatbot|gpt|openai|llm|machine\s*learning|intelligent|copilot/i,
    reply: `**AI & Automation**

• **AI copilots** — FOI assistants, internal knowledge bots, customer support
• **Workflow automation** — Document processing, approvals, data pipelines
• **Integrations** — OpenAI APIs, LangChain, TensorFlow
• **Government-ready** — Audit trails, policy-aware responses

**Tech:** LangChain, OpenAI, custom models, secure API gateways.

**Use cases:** LGU inquiry bots, document search, report generation, smart dashboards.

Email ${EMAIL} with your AI use case — we'll suggest architecture and timeline.`,
  },
  {
    priority: 80,
    match: /government|lgu|gov|public\s*sector|foi|freedom\s*of\s*information|barangay|municipal/i,
    reply: `**Government & LGU Platforms**

• Smart LGU portals — citizen services, permits, announcements
• **FOI AI Assistant** — natural language search sa public records
• Accessibility & compliance-ready design
• GIS layers para sa maps at boundaries
• Secure hosting at audit logs

**Built for:** Local government units, agencies, public institutions.

Contact ${EMAIL} — we support procurement-ready documentation kung kailangan.`,
  },
  {
    priority: 78,
    match: /emergency|drrm|disaster|dispatch|rescue|calamity|bagyo|earthquake|crisis/i,
    reply: `**Emergency & DRRM Systems**

• **DRRM Command Center** — multi-screen monitoring, live incidents
• **Emergency Dispatch** — responder tracking, routing, multi-agency
• Real-time alerts & GIS maps
• 99.99% uptime engineering

Ideal para sa LGUs, disaster councils, at response agencies.

Request demo via email: ${EMAIL} (subject: DRRM / Emergency System).`,
  },
  {
    priority: 76,
    match: /cloud|aws|hosting|deploy|kubernetes|docker|infrastructure|server/i,
    reply: `**Cloud Infrastructure**

• **AWS**, Cloudflare, Firebase
• Docker & **Kubernetes** orchestration
• Multi-region, auto-scaling, failover
• CI/CD pipelines

Sakop namin ang setup mula development hanggang production monitoring.

Email ${EMAIL} for infrastructure assessment or migration planning.`,
  },
  {
    priority: 74,
    match: /security|cyber|hack|protect|secure|vulnerability|zero\s*trust/i,
    reply: `**Cybersecurity Solutions**

• Zero-trust architecture
• Threat monitoring & alerting
• Encryption, access control, audit logs
• Government-grade security posture

Pwede naming i-audit ang existing system o i-build secure from day one.

Contact ${EMAIL} for security review inquiries.`,
  },
  {
    priority: 72,
    match: /gis|map|mapping|geospatial|location|spatial/i,
    reply: `**GIS & Mapping Systems**

• Interactive maps & dashboards
• Real-time location tracking
• Spatial analytics para sa LGU / enterprise
• Integration sa existing data sources

Gamit sa smart city, asset management, at emergency response.

Email ${EMAIL} with your mapping requirements.`,
  },
  {
    priority: 70,
    match: /monitor|dashboard|real\s*time|telemetry|alert|analytics/i,
    reply: `**Real-Time Monitoring Systems**

• Live operational dashboards
• Alerts & notifications
• Sensor / API data ingestion
• Enterprise-scale telemetry

Perfect para sa command centers, IoT, at infrastructure monitoring.

Describe your data sources sa ${EMAIL} — we'll propose architecture.`,
  },
  {
    priority: 68,
    match: /smart\s*city|urban|sensor|citizen/i,
    reply: `**Smart City Systems**

Urban intelligence: sensors, citizen apps, city operations dashboards, at integrated GIS.

Connects agencies, data, at real-time city insights.

Email ${EMAIL} for smart city pilot or full rollout planning.`,
  },
  {
    priority: 65,
    match:
      /tech|stack|technology|next\.?js|react|flutter|laravel|nestjs|tools|ginagamit/i,
    reply: `**Technology Stack**

**Frontend:** Next.js, React, Flutter, Tailwind CSS
**Backend:** Node.js, NestJS, Laravel, Go
**Cloud:** AWS, Cloudflare, Docker, Kubernetes, Firebase
**AI:** OpenAI APIs, LangChain, TensorFlow
**Database:** PostgreSQL, MongoDB, Redis

Enterprise-grade, modern, at production-ready — hindi template-based.

May specific tech requirement? Mention it sa ${EMAIL}.`,
  },
  {
    priority: 62,
    match: /demo|portfolio|sample|project|drrm|smart\s*lgu|foi/i,
    reply: `**Featured Solutions (pwede naming i-demo)**

• **DRRM Command Center** — disaster monitoring, multi-screen ops
• **Smart LGU Platform** — citizen services + analytics + GIS
• **FOI AI Assistant** — AI-powered public records search
• **Emergency Dispatch System** — live routing & responder tracking
• **Intelligent Governance Dashboard** — executive KPIs & insights

Para mag-request ng demo: email ${EMAIL} with project name sa subject, o punta sa #solutions section sa site.`,
  },
  {
    priority: 60,
    match:
      /contact|email|tawag|phone|reach|message|talk|usap|kumontak|send|inquiry/i,
    reply: `**Contact CoreLogic Web Lab**

📧 **Email:** ${EMAIL}
📱 **Phone:** ${SITE.phone}
📍 **Location:** ${SITE.location}

**Pinakamabilis:** Direct email with project details.
**Sa site:** Contact form sa "Get In Touch" section.

Response time: typically within **24 hours** on business days.`,
  },
  {
    priority: 55,
    match:
      /salamat|thank|thanks|ty|maraming\s*salamat/i,
    reply: `Walang anuman! Kung may follow-up questions pa about services, pricing, o website projects — type lang dito o email ${EMAIL}. Good luck sa project mo!`,
  },
  {
    priority: 50,
    match:
      /hello|hi|hey|good\s*(morning|afternoon|evening)|kamusta|musta|magandang|kumusta/i,
    reply: `Kumusta! Welcome sa **CoreLogic Web Lab** Live Support.

Pwede kitang tulungan ng details about:
• **Website / web app** development
• **Mobile apps** (Flutter)
• **AI & automation**
• **Government / LGU** systems
• **Emergency / DRRM** platforms
• **Pricing** at **paano magsimula**

Halimbawa, try: *"paano magpagawa ng website?"* o *"ano ang services ninyo?"*

📧 Direct email: ${EMAIL}`,
  },
  {
    priority: 40,
    match: /who|sino|about|company|corelogic|web\s*lab|kayo\s*ba|ano\s*kayo/i,
    reply: `**CoreLogic Web Lab** — next-generation systems engineering company.

We build:
• Enterprise software & cloud infrastructure
• AI-powered platforms
• Government-ready digital systems
• Smart city & emergency response technology

**Mission:** Engineering intelligent digital infrastructure for organizations that cannot afford to fail.

📧 ${EMAIL}`,
  },
];

export function getChatReply(message: string): string {
  const normalized = message.trim();
  if (!normalized) {
    return `Type your question here — halimbawa: "paano magpagawa ng website?" o "ano ang services?"\n\nEmail: ${EMAIL}`;
  }

  const matches = CHAT_RULES.filter((rule) => rule.match.test(normalized));
  if (matches.length > 0) {
    matches.sort((a, b) => b.priority - a.priority);
    return matches[0].reply;
  }

  // Smart fallback — still helpful, not generic
  return `Salamat sa message mo!

Hindi ko exact na nakuha ang topic — pero eto quick guide:

**Website / App** → I-describe ang gusto mong gawin (corporate, LGU, e-commerce, etc.)
**Services** → Type *"services"* para sa full list
**Pricing** → Type *"magkano"* o *"price"*
**Paano magsimula** → Type *"paano"*

**CoreLogic specialties:** Enterprise software, AI, government platforms, DRRM, GIS, cloud, cybersecurity, mobile apps.

📧 **Direct email (recommended):** ${EMAIL}
Include: project type, features, timeline — reply within 24hrs.`;
}

import { SITE } from "@/lib/site-config";

export interface ChatRule {
  priority: number;
  match: RegExp;
  reply: string;
}

const EMAIL = SITE.email;

export const CHAT_RULES: ChatRule[] = [
  {
    priority: 100,
    match: /website|web\s*app|landing\s*page|company\s*site|build\s*a\s*site/i,
    reply: `**How to Build a Website with CoreLogic Web Lab**

1. **Send inquiry** — Use the contact form on this site (messages go directly to ${EMAIL}).
2. **Discovery** — We define scope: corporate site, government portal, dashboard, or web app.
3. **Design & Build** — Next.js, React, Tailwind — fast, secure, mobile-ready.
4. **Launch** — Deploy on Netlify/AWS with ongoing support available.

**Includes:** Responsive UI, APIs, auth, SEO, admin panels when needed.
**Timeline:** Typically 2–8 weeks depending on scope.

Use the **contact form** below to start — no email app required.`,
  },
  {
    priority: 95,
    match: /mobile\s*app|android|ios|flutter/i,
    reply: `**Mobile App Development**

We build Flutter and native apps for government, enterprise, and field operations.

**Capabilities:** Citizen apps, monitoring, offline mode, API integration.

Submit your idea via the **contact form** — delivered straight to ${EMAIL}.`,
  },
  {
    priority: 90,
    match: /^(how|what)\??$|how\s*do\s*i\s*start|get\s*started|process|steps/i,
    reply: `**How to Get Started**

1. Fill out the **contact form** on this page — sends directly to ${EMAIL}.
2. Include: project type, features, timeline, and budget range (optional).
3. We reply within **24 business hours** with next steps and a discovery call.

**Phone:** ${SITE.phone}`,
  },
  {
    priority: 88,
    match: /price|cost|quote|budget|pricing|how\s*much/i,
    reply: `**Pricing**

Every project is custom-scoped. Factors: features, design, integrations, timeline.

**Get a quote:** Submit the contact form with your requirements — we email you a tailored proposal.

No obligation on the first inquiry.`,
  },
  {
    priority: 85,
    match: /services|what\s*do\s*you\s*do|offerings|capabilities/i,
    reply: `**Our Services**

1. Enterprise Software Development
2. Government Digital Platforms
3. AI & Automation
4. Smart City Systems
5. Cloud Infrastructure
6. Cybersecurity
7. GIS & Mapping
8. Emergency Response / DRRM
9. Mobile Apps
10. Real-Time Monitoring

**Featured:** DRRM Command Center, Smart LGU Platform, FOI AI Assistant.

Ask about any service here or use the contact form.`,
  },
  {
    priority: 82,
    match: /ai|automation|chatbot|gpt|openai|llm|copilot/i,
    reply: `**AI & Automation**

Copilots, workflow automation, OpenAI/LangChain integrations, government-ready audit trails.

Describe your use case in the **contact form** — sent directly to our engineering team.`,
  },
  {
    priority: 80,
    match: /government|lgu|gov|foi|public\s*sector/i,
    reply: `**Government & LGU Platforms**

Smart LGU portals, FOI AI Assistant, GIS, compliance-ready security.

Use the contact form for procurement-ready discussions.`,
  },
  {
    priority: 78,
    match: /emergency|drrm|disaster|dispatch/i,
    reply: `**Emergency & DRRM Systems**

Command centers, dispatch, real-time monitoring, multi-agency coordination.

Request a demo via the contact form (subject: DRRM).`,
  },
  {
    priority: 65,
    match: /tech|stack|next\.?js|react|tools/i,
    reply: `**Technology Stack**

Frontend: Next.js, React, Flutter, Tailwind
Backend: Node.js, NestJS, Laravel, Go
Cloud: AWS, Cloudflare, Docker, Kubernetes
AI: OpenAI, LangChain, TensorFlow
Database: PostgreSQL, MongoDB, Redis`,
  },
  {
    priority: 60,
    match: /contact|email|phone|call|reach|message/i,
    reply: `**Contact CoreLogic Web Lab**

📧 **Email (via form):** ${EMAIL} — use the contact section (direct delivery)
📱 **Phone:** ${SITE.phone}
📍 **Location:** ${SITE.location}

The contact form sends straight to our inbox — no mail app needed.`,
  },
  {
    priority: 55,
    match: /thank|thanks/i,
    reply: `You're welcome! Ask anything else here or send a project inquiry through the contact form.`,
  },
  {
    priority: 50,
    match: /hello|hi|hey|good\s*(morning|afternoon|evening)/i,
    reply: `Hello! Welcome to **CoreLogic Web Lab** Live Support.

I can help with:
• Website & web app development
• Mobile apps, AI, government systems
• Pricing and how to get started

Try: *"How do I build a website?"* or *"What services do you offer?"*

**Direct inquiry:** Use the contact form — messages go to ${EMAIL} instantly.`,
  },
];

export function getChatReply(message: string): string {
  const normalized = message.trim();
  if (!normalized) {
    return `Ask a question — e.g. "How do I build a website?" or "What are your services?"\n\nProject inquiries: use the **contact form** (sent directly to ${EMAIL}).`;
  }

  const matches = CHAT_RULES.filter((rule) => rule.match.test(normalized));
  if (matches.length > 0) {
    matches.sort((a, b) => b.priority - a.priority);
    return matches[0].reply;
  }

  return `Thanks for your message!

Try asking about:
• **Website** — "How do I build a website?"
• **Services** — "What services do you offer?"
• **Pricing** — "How much does it cost?"
• **Getting started** — "How do I get started?"

**Fastest path:** Use the **contact form** on this site — your message is delivered directly to ${EMAIL}.`;
}

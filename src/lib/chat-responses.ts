import { SITE } from "@/lib/site-config";

export interface ChatRule {
  priority: number;
  match: RegExp;
  reply: string;
}

const EMAIL = SITE.email;
const SEND_EMAIL_HINT =
  "Open **Live Support** (bottom right) → **Send Email** tab to message our team.";

export const CHAT_RULES: ChatRule[] = [
  {
    priority: 100,
    match: /website|web\s*app|landing\s*page|company\s*site|build\s*a\s*site/i,
    reply: `**How to Build a Website with CoreLogic Web Lab**

1. **Send inquiry** — ${SEND_EMAIL_HINT}
2. **Discovery** — We define scope: corporate site, government portal, dashboard, or web app.
3. **Design & Build** — Next.js, React, Tailwind — fast, secure, mobile-ready.
4. **Launch** — Deploy on Netlify/AWS with ongoing support available.

**Includes:** Responsive UI, APIs, auth, SEO, admin panels when needed.
**Timeline:** Typically 2–8 weeks depending on scope.`,
  },
  {
    priority: 95,
    match: /mobile\s*app|android|ios|flutter/i,
    reply: `**Mobile App Development**

We build Flutter and native apps for government, enterprise, and field operations.

**Capabilities:** Citizen apps, monitoring, offline mode, API integration.

${SEND_EMAIL_HINT}`,
  },
  {
    priority: 90,
    match: /^(how|what)\??$|how\s*do\s*i\s*start|get\s*started|process|steps/i,
    reply: `**How to Get Started**

1. ${SEND_EMAIL_HINT}
2. Include: project type, features, timeline, and budget range (optional).
3. We reply within **24 business hours** with next steps and a discovery call.

**Phone:** ${SITE.phone}`,
  },
  {
    priority: 88,
    match: /price|cost|quote|budget|pricing|how\s*much/i,
    reply: `**Pricing**

Every project is custom-scoped. Factors: features, design, integrations, timeline.

**Get a quote:** ${SEND_EMAIL_HINT} Include your requirements for a tailored proposal.

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

Ask about any service here or ${SEND_EMAIL_HINT.toLowerCase()}`,
  },
  {
    priority: 82,
    match: /ai|automation|chatbot|gpt|openai|llm|copilot/i,
    reply: `**AI & Automation**

Copilots, workflow automation, OpenAI/LangChain integrations, government-ready audit trails.

${SEND_EMAIL_HINT}`,
  },
  {
    priority: 80,
    match: /government|lgu|gov|foi|public\s*sector/i,
    reply: `**Government & LGU Platforms**

Smart LGU portals, FOI AI Assistant, GIS, compliance-ready security.

${SEND_EMAIL_HINT}`,
  },
  {
    priority: 78,
    match: /emergency|drrm|disaster|dispatch/i,
    reply: `**Emergency & DRRM Systems**

Command centers, dispatch, real-time monitoring, multi-agency coordination.

${SEND_EMAIL_HINT} Mention DRRM in your message for a demo request.`,
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

📧 **Email:** ${EMAIL} — ${SEND_EMAIL_HINT}
📱 **Phone:** ${SITE.phone}
📍 **Location:** ${SITE.location}

You can also use the contact form on this page.`,
  },
  {
    priority: 55,
    match: /thank|thanks/i,
    reply: `You're welcome! Ask anything else here or send us a message via **Send Email** in Live Support.`,
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

**Project inquiries:** ${SEND_EMAIL_HINT}`,
  },
];

export function getChatReply(message: string): string {
  const normalized = message.trim();
  if (!normalized) {
    return `Ask a question — e.g. "How do I build a website?" or "What are your services?"\n\nProject inquiries: ${SEND_EMAIL_HINT}`;
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

**Project inquiries:** ${SEND_EMAIL_HINT}`;
}

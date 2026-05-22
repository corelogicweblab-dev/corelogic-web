import { SITE } from "@/lib/site-config";

export interface ChatRule {
  priority: number;
  match: RegExp;
  reply: string;
}

const EMAIL = SITE.email;
const PHONE = SITE.phone;
const SEND_EMAIL =
  "Tap **Send Email** in Live Support (bottom right), or use the **Contact** form on this page.";

export const CHAT_RULES: ChatRule[] = [
  {
    priority: 100,
    match:
      /website|web\s*app|landing\s*page|company\s*site|build\s*a\s*site|e[\s-]?commerce|online\s*store|portal/i,
    reply: `**Building a Website with CoreLogic Web Lab**

**What we deliver**
• Corporate & brand websites
• Web apps with dashboards, auth, and APIs
• Government & LGU portals
• E-commerce and booking systems

**Our process**
1. **Discovery** — Goals, users, features, timeline, and budget
2. **UX/UI** — Wireframes and futuristic, mobile-first design
3. **Development** — Next.js, React, Tailwind; fast and SEO-ready
4. **Testing & launch** — Netlify/AWS hosting, SSL, monitoring
5. **Support** — Updates, security patches, and enhancements

**Typical timeline:** 2–8 weeks (simple site) · 2–4 months (complex platform)

**Tech:** Next.js 15+, React, TypeScript, PostgreSQL/MongoDB, REST/GraphQL

**Next step:** ${SEND_EMAIL}
Include: business type, pages/features needed, deadline, and sample references if any.`,
  },
  {
    priority: 98,
    match: /mobile\s*app|android|ios|flutter|react\s*native|play\s*store|app\s*store/i,
    reply: `**Mobile App Development**

**Platforms:** Flutter (iOS + Android from one codebase), plus native modules when required.

**Use cases we build**
• Citizen / LGU service apps
• Field data collection & offline sync
• Monitoring, alerts, and push notifications
• Integration with your existing APIs or new backends

**Included**
• UI aligned with your brand
• Secure login (OTP, email, SSO options)
• App store deployment support
• API integration & admin web panel (optional)

**Timeline:** ~6–14 weeks for MVP · longer for enterprise scope

**Next step:** ${SEND_EMAIL}
Tell us: target users, must-have features, and iOS/Android/both.`,
  },
  {
    priority: 96,
    match: /ai|artificial|automation|chatbot|gpt|openai|llm|copilot|machine\s*learning|nlp/i,
    reply: `**AI & Automation Solutions**

**What we implement**
• Custom chatbots & support assistants (like this Live Support, tailored to your business)
• Document Q&A, FOI, and knowledge-base search
• Workflow automation (approvals, routing, notifications)
• OpenAI, LangChain, and on-prem options for sensitive data

**Government-ready**
• Audit logs, role-based access, data retention policies
• Integration with existing LGU/enterprise systems

**Typical projects**
• FOI AI Assistant · internal copilots · ticket classification · report generation

**Pricing:** Scoped per use case (API usage, training data, integrations).

**Next step:** ${SEND_EMAIL}
Describe: problem to solve, data sources, and expected users.`,
  },
  {
    priority: 94,
    match: /government|lgu|gov|municipal|barangay|foi|public\s*sector|bir|procurement/i,
    reply: `**Government & LGU Digital Platforms**

**Solutions**
• Smart LGU citizen portals (permits, payments, announcements)
• FOI request management + AI-assisted responses
• GIS maps, zoning, and asset tracking
• Document workflow & e-signature ready architectures

**Compliance focus**
• Security hardening, backups, access control
• Scalable cloud deployment (AWS, Netlify, hybrid)

**References on this site:** Smart LGU Platform, FOI AI Assistant — see **Solutions** section.

**Procurement:** We can provide technical proposals and scope documents for bidding.

**Next step:** ${SEND_EMAIL}
Mention agency/LGU name, system type, and target go-live date.`,
  },
  {
    priority: 92,
    match: /emergency|drrm|disaster|dispatch|rescue|command\s*center|relief|evacuation/i,
    reply: `**Emergency & DRRM Systems**

**CoreLogic DRRM Command Center** includes:
• Real-time incident map & resource tracking
• Multi-agency dispatch and status updates
• Alerting (SMS/email/push integrations available)
• Dashboards for leadership and operations rooms

**Ideal for:** LGU DRRM offices, regional councils, utilities, and large facilities.

**Deployment:** Cloud or on-premise; training and handover documentation included.

**Demo:** ${SEND_EMAIL} with subject line **DRRM Demo** and your organization name.

**Phone for urgent inquiries:** ${PHONE}`,
  },
  {
    priority: 90,
    match: /price|cost|quote|budget|pricing|how\s*much|rate|fee|estimate/i,
    reply: `**Pricing & Quotes**

We **do not use one fixed price** — every project is scoped to your requirements.

**What affects cost**
• Number of features & integrations
• Design complexity & content volume
• AI, GIS, payment gateways, legacy system links
• Timeline (rush delivery may adjust scope/fees)

**Ballpark (PHP, indicative only)**
• Business website: often mid five figures and up
• Web app / portal: higher based on modules
• Mobile app MVP: scoped after discovery call
• AI/automation: setup + optional monthly API/hosting

**Free first consultation** — no obligation.

**Get a formal quote:** ${SEND_EMAIL}
List features, deadline, and budget range if you have one — we respond within **24 business hours**.`,
  },
  {
    priority: 88,
    match: /services|what\s*do\s*you\s*do|offerings|capabilities|solutions|help\s*with/i,
    reply: `**CoreLogic Web Lab — Full Service List**

1. **Enterprise Software** — ERP modules, internal tools, workflows
2. **Government Platforms** — LGU, FOI, citizen services
3. **AI & Automation** — Chatbots, copilots, process automation
4. **Smart City** — IoT dashboards, utilities, urban data
5. **Cloud Infrastructure** — AWS, Docker, CI/CD, monitoring
6. **Cybersecurity** — Hardening, audits, secure SDLC
7. **GIS & Mapping** — Layers, field capture, public maps
8. **Emergency / DRRM** — Command center, dispatch
9. **Mobile Apps** — Flutter iOS/Android
10. **Real-Time Monitoring** — Alerts, KPIs, live feeds

**Featured builds:** DRRM Command Center · Smart LGU · FOI AI Assistant

Ask me: *"How do I build a website?"* · *"Mobile app?"* · *"AI?"* · *"Pricing?"*

**Start a project:** ${SEND_EMAIL}`,
  },
  {
    priority: 86,
    match: /how\s*do\s*i\s*start|get\s*started|begin|first\s*step|hire|work\s*with|partner/i,
    reply: `**How to Get Started**

**Step 1 — Send your inquiry**
${SEND_EMAIL}

**Include (helps us quote faster)**
• Organization name & project type
• Main features or problems to solve
• Preferred timeline
• Budget range (optional but useful)

**Step 2 — We respond within 24 business hours**
• Clarifying questions if needed
• Discovery call (video or phone)

**Step 3 — Proposal**
• Scope, milestones, timeline, and investment

**Step 4 — Kickoff**
• Design → build → test → launch → support

**Phone:** ${PHONE}
**Email inbox:** ${EMAIL}`,
  },
  {
    priority: 84,
    match: /tech|stack|next\.?js|react|tools|framework|language|database|hosting/i,
    reply: `**Technology Stack**

**Frontend:** Next.js, React, TypeScript, Tailwind CSS, Flutter

**Backend:** Node.js, NestJS, Laravel, Go, REST & GraphQL APIs

**Data:** PostgreSQL, MongoDB, Redis, Supabase-compatible stacks

**Cloud & DevOps:** AWS, Netlify, Cloudflare, Docker, Kubernetes

**AI:** OpenAI API, LangChain, custom RAG pipelines, TensorFlow where needed

**Why this stack:** Fast performance, SEO, maintainability, and talent availability in the Philippines market.

**We choose tools per project** — not one-size-fits-all.

Want architecture advice for your idea? ${SEND_EMAIL}`,
  },
  {
    priority: 82,
    match: /hosting|domain|deploy|netlify|aws|server|maintenance|support|sla/i,
    reply: `**Hosting, Deployment & Maintenance**

**Deployment**
• Netlify / Vercel for modern web apps
• AWS (EC2, RDS, S3, Lambda) for enterprise & government
• SSL, CDN, and environment staging (dev → production)

**Maintenance packages (optional)**
• Security updates & dependency patches
• Uptime monitoring & backups
• Small feature tweaks and content support

**Domains:** We guide DNS setup; you retain domain ownership.

**SLA:** Defined per contract for government/enterprise clients.

**Discuss hosting needs:** ${SEND_EMAIL}`,
  },
  {
    priority: 80,
    match: /security|secure|hack|penetration|ssl|compliance|data\s*privacy|gdpr/i,
    reply: `**Security & Compliance**

**Practices**
• HTTPS everywhere, secure headers, input validation
• Role-based access, audit logs for sensitive systems
• Secrets in environment variables — never in client code
• Regular dependency updates

**Government projects**
• Alignment with your IT policies and procurement security requirements
• Documentation for handover and operations teams

**We do not store passwords in chat** — use official channels for credentials.

**Security review for your project:** ${SEND_EMAIL}`,
  },
  {
    priority: 78,
    match: /contact|email|phone|call|reach|message|talk|speak/i,
    reply: `**Contact CoreLogic Web Lab**

📧 **Email:** ${EMAIL}
📱 **Phone:** ${PHONE}
📍 **Location:** ${SITE.location}

**Fastest for project details:** ${SEND_EMAIL}

**Live chat:** You're already here — ask about services, pricing, websites, AI, or government systems.

**Contact page:** Scroll to **Get In Touch** for the full form and globe view.`,
  },
  {
    priority: 76,
    match: /who\s*are\s*you|about|company|corelogic|team|experience|portfolio/i,
    reply: `**About CoreLogic Web Lab**

We engineer **intelligent digital infrastructure** for enterprises and government in the Philippines.

**Focus areas**
• High-performance web & mobile applications
• AI-powered workflows and citizen services
• Mission-critical monitoring and DRRM systems

**Approach**
• Modern stack (Next.js, React, cloud-native)
• Clear communication and documented delivery
• Long-term support options

Explore **Solutions** and **Services** on this website.

**Discuss your project:** ${SEND_EMAIL}`,
  },
  {
    priority: 74,
    match: /timeline|how\s*long|duration|weeks|months|deadline|fast|rush/i,
    reply: `**Project Timelines (Typical)**

| Project type | Indicative duration |
|--------------|---------------------|
| Marketing / corporate website | 2–6 weeks |
| Web app with auth & dashboard | 6–16 weeks |
| Mobile app MVP | 6–14 weeks |
| Government portal | 3–6+ months (scope-dependent) |
| AI / automation pilot | 4–10 weeks |

**Rush delivery:** Possible when scope is fixed and team capacity allows — mention your deadline in your inquiry.

**Accurate timeline** comes after discovery.

${SEND_EMAIL}`,
  },
  {
    priority: 72,
    match: /demo|sample|see\s*work|portfolio|showcase|project\s*example/i,
    reply: `**See Our Work**

On this site, open **Featured Solutions** for examples:
• National Command & Control Platform
• Smart LGU Platform
• FOI AI Assistant
• Emergency dispatch & monitoring concepts

These represent the **type of systems** we build — your project is customized.

**Request a tailored demo or deck:** ${SEND_EMAIL}
Tell us your industry (private / LGU / NGO) and area of interest.`,
  },
  {
    priority: 70,
    match: /payment|pay|installment|billing|invoice|contract/i,
    reply: `**Payment & Contracts**

• Milestone-based billing is standard (e.g., design deposit → development → launch)
• Government/LGU: aligned with procurement and ORS processes where applicable
• Invoices and official receipts per Philippine business practice

**Exact terms** are in your project proposal after scoping.

**Questions:** ${SEND_EMAIL} or ${PHONE}`,
  },
  {
    priority: 68,
    match: /hour|open|available|support\s*time|when|asap|urgent/i,
    reply: `**Availability & Response Times**

• **Chat:** Instant automated answers here 24/7
• **Email / form:** Human reply within **24 business hours** (often sooner)
• **Phone:** ${PHONE} — business hours; leave a message if we miss you

**Urgent production issues** for existing clients: use your project support channel or call.

**New projects:** ${SEND_EMAIL}`,
  },
  {
    priority: 55,
    match: /thank|thanks|salamat|appreciate/i,
    reply: `You're very welcome!

If you have more questions, just type them here.

When you're ready to move forward, use **Send Email** in this widget or the contact form — our team will give you a detailed, personal response within 24 business hours.`,
  },
  {
    priority: 50,
    match: /hello|hi|hey|good\s*(morning|afternoon|evening)|help|assist/i,
    reply: `Hello! Welcome to **CoreLogic Web Lab** Live Support.

I'm here to give **detailed answers** about:

• Websites & web applications
• Mobile apps (Flutter / iOS / Android)
• AI, chatbots & automation
• Government / LGU systems
• DRRM & emergency platforms
• Pricing, timelines & how to start

**Try asking:**
• "How do I build a website?"
• "What services do you offer?"
• "How much does it cost?"
• "What is your tech stack?"

**Ready to talk to our team?** ${SEND_EMAIL}`,
  },
];

const KEYWORD_HINTS: { keywords: string[]; hint: string }[] = [
  {
    keywords: ["design", "ui", "ux", "logo", "brand"],
    hint: `**Design & UX**\n\nWe provide UI/UX for web and mobile: wireframes, design systems, and futuristic interfaces.\n\n${SEND_EMAIL}`,
  },
  {
    keywords: ["api", "integration", "sync", "erp", "crm"],
    hint: `**Integrations**\n\nWe connect to payment gateways, SMS, email, ERP, legacy databases, and third-party APIs.\n\n${SEND_EMAIL} with systems you need to connect.`,
  },
  {
    keywords: ["training", "documentation", "manual", "handover"],
    hint: `**Training & Handover**\n\nWe deliver documentation and training sessions for admins and end users on government/enterprise projects.\n\n${SEND_EMAIL}`,
  },
  {
    keywords: ["bug", "error", "broken", "fix", "issue"],
    hint: `**Existing project support**\n\nIf you're already our client, contact your project lead or ${EMAIL} with the issue details.\n\n**New project?** Describe the system you need built — ${SEND_EMAIL}`,
  },
];

function keywordFallback(message: string): string | null {
  const lower = message.toLowerCase();
  let best: { score: number; hint: string } | null = null;

  for (const entry of KEYWORD_HINTS) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, hint: entry.hint };
    }
  }

  return best?.hint ?? null;
}

export function getChatReply(message: string): string {
  const normalized = message.trim();
  if (!normalized) {
    return `Type your question — for example:\n• "How do I build a website?"\n• "What services do you offer?"\n• "How much does pricing work?"\n\n**Send a project inquiry:** ${SEND_EMAIL}`;
  }

  const matches = CHAT_RULES.filter((rule) => rule.match.test(normalized));
  if (matches.length > 0) {
    matches.sort((a, b) => b.priority - a.priority);
    return matches[0].reply;
  }

  const hint = keywordFallback(normalized);
  if (hint) return hint;

  return `Thanks for your message — here's how I can help in more detail:

**Popular topics**
• **Website / web app** — "How do I build a website?"
• **Mobile** — "Do you build mobile apps?"
• **AI** — "What AI solutions do you offer?"
• **Government** — "LGU or government systems"
• **Pricing** — "How much does it cost?"
• **Timeline** — "How long does a project take?"
• **Contact** — "How do I reach your team?"

**Talk to our engineers**
${SEND_EMAIL}

We'll reply with a **personalized, detailed** response within **24 business hours**.

**Phone:** ${PHONE}`;
}

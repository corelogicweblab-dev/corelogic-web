import {
  Brain,
  Building2,
  Cloud,
  Cpu,
  Globe2,
  Map,
  Monitor,
  Radio,
  Shield,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Technology", href: "#technology" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Enterprise Software Development",
    description: "Mission-critical platforms engineered for scale, compliance, and long-term evolution.",
    icon: Building2,
  },
  {
    title: "Government Digital Platforms",
    description: "Secure, accessible systems for public service delivery and digital governance.",
    icon: Globe2,
  },
  {
    title: "AI & Automation",
    description: "Intelligent workflows, copilots, and decision engines powered by modern AI stacks.",
    icon: Brain,
  },
  {
    title: "Smart City Systems",
    description: "Urban intelligence layers connecting sensors, citizens, and city operations.",
    icon: Building2,
  },
  {
    title: "Cloud Infrastructure",
    description: "Resilient, multi-region architectures on AWS, Cloudflare, and Kubernetes.",
    icon: Cloud,
  },
  {
    title: "Cybersecurity Solutions",
    description: "Zero-trust design, threat monitoring, and enterprise-grade security posture.",
    icon: Shield,
  },
  {
    title: "GIS & Mapping Systems",
    description: "Geospatial dashboards, spatial analytics, and real-time location intelligence.",
    icon: Map,
  },
  {
    title: "Emergency Response Platforms",
    description: "Command centers and dispatch systems for disaster and crisis management.",
    icon: Radio,
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform experiences with Flutter and modern web stacks.",
    icon: Smartphone,
  },
  {
    title: "Real-Time Monitoring Systems",
    description: "Live telemetry, alerting, and operational dashboards at enterprise scale.",
    icon: Monitor,
  },
];

export const SHOWCASE_PROJECTS = [
  {
    title: "DRRM Command Center",
    description:
      "Unified disaster risk reduction monitoring with multi-screen situational awareness and live incident feeds.",
    gradient: "from-cyan-500/20 via-blue-600/10 to-purple-600/20",
    accent: "#00F5FF",
    visual: "command",
  },
  {
    title: "Smart LGU Platform",
    description:
      "Intelligent local government unit portal with analytics, citizen services, and integrated GIS layers.",
    gradient: "from-blue-500/20 via-indigo-600/10 to-cyan-500/20",
    accent: "#38BDF8",
    visual: "dashboard",
  },
  {
    title: "FOI AI Assistant",
    description:
      "Freedom of Information copilot with natural language retrieval, policy-aware responses, and audit trails.",
    gradient: "from-purple-500/20 via-violet-600/10 to-cyan-500/20",
    accent: "#7C3AED",
    visual: "ai",
  },
  {
    title: "Emergency Dispatch System",
    description:
      "Real-time dispatch routing, responder tracking, and multi-agency coordination under pressure.",
    gradient: "from-emerald-500/15 via-cyan-600/10 to-blue-600/20",
    accent: "#00FFB3",
    visual: "dispatch",
  },
  {
    title: "Intelligent Governance Dashboard",
    description:
      "Executive intelligence layer aggregating KPIs, compliance metrics, and predictive policy insights.",
    gradient: "from-sky-500/20 via-blue-700/10 to-purple-700/20",
    accent: "#38BDF8",
    visual: "governance",
  },
] as const;

export const TECH_STACK = {
  Frontend: ["Next.js", "React", "Flutter", "Tailwind CSS"],
  Backend: ["Node.js", "NestJS", "Laravel", "Go"],
  Infrastructure: ["AWS", "Cloudflare", "Docker", "Kubernetes", "Firebase"],
  AI: ["OpenAI APIs", "LangChain", "TensorFlow"],
  Database: ["PostgreSQL", "MongoDB", "Redis"],
} as const;

export const WHY_FEATURES = [
  {
    title: "AI-First Architecture",
    description: "Systems designed around intelligent automation from day one—not bolted on later.",
    icon: Brain,
  },
  {
    title: "Enterprise Security",
    description: "Defense in depth, encryption, and compliance aligned with government standards.",
    icon: Shield,
  },
  {
    title: "Real-Time Infrastructure",
    description: "Sub-second data pipelines for monitoring, alerting, and operational visibility.",
    icon: Zap,
  },
  {
    title: "Cloud-Native Systems",
    description: "Containerized, observable, and horizontally scalable across global regions.",
    icon: Cloud,
  },
  {
    title: "Government-Ready Platforms",
    description: "Accessibility, auditability, and procurement-ready delivery methodologies.",
    icon: Globe2,
  },
  {
    title: "High Availability Engineering",
    description: "99.99% uptime targets with redundancy, failover, and chaos-tested resilience.",
    icon: Cpu,
  },
  {
    title: "Scalable Architecture",
    description: "Modular services that grow from pilot deployments to nationwide rollouts.",
    icon: Building2,
  },
  {
    title: "Mission-Critical Reliability",
    description: "Engineered for emergencies—when systems cannot afford to fail.",
    icon: Radio,
  },
] as const;

export const HERO_STATS = [
  { label: "Uptime SLA", value: 99.99, suffix: "%" },
  { label: "Systems Deployed", value: 120, suffix: "+" },
  { label: "Response Time", value: 45, suffix: "ms" },
] as const;

export const HERO_INDICATORS = [
  { label: "AI Powered Systems", status: "online" },
  { label: "Enterprise Security", status: "secured" },
  { label: "Cloud Native Infrastructure", status: "active" },
] as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
] as const;

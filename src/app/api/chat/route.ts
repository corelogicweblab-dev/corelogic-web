import { NextRequest, NextResponse } from "next/server";
import { appendJsonRecord } from "@/lib/storage";
import { SITE } from "@/lib/site-config";

const REPLIES: { match: RegExp; reply: string }[] = [
  {
    match: /price|cost|quote|budget/i,
    reply:
      "We provide custom quotes based on scope. Email us at corelogicweblab@gmail.com or use the contact form — our team will prepare a tailored proposal.",
  },
  {
    match: /ai|automation|machine|llm/i,
    reply:
      "We build AI-first systems including copilots, automation pipelines, and LangChain/OpenAI integrations. Would you like to discuss a specific use case?",
  },
  {
    match: /government|lgu|public|foi/i,
    reply:
      "We specialize in government-ready platforms: Smart LGU, FOI assistants, and compliance-focused architectures. Tell us about your agency requirements.",
  },
  {
    match: /emergency|drrm|dispatch|disaster/i,
    reply:
      "Our emergency response and DRRM command center solutions support real-time monitoring and multi-agency coordination. We can walk you through a demo.",
  },
  {
    match: /hello|hi|hey|good/i,
    reply: `Welcome to ${SITE.name}. How can we help you today — enterprise software, AI systems, or government platforms?`,
  },
  {
    match: /contact|email|call|meet|schedule/i,
    reply: `Email us directly at ${SITE.email} or submit the project inquiry form on the contact section.`,
  },
];

function getAutoReply(message: string) {
  for (const { match, reply } of REPLIES) {
    if (match.test(message)) return reply;
  }
  return `Thanks for reaching out. A CoreLogic specialist will follow up shortly. For urgent projects, email ${SITE.email} directly.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body.message?.trim();
    const sessionId = body.sessionId?.trim() || "anonymous";

    if (!message || message.length < 1) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    await appendJsonRecord("chat-messages.json", {
      sessionId,
      message,
      role: "user",
    });

    const reply = getAutoReply(message);

    await appendJsonRecord("chat-messages.json", {
      sessionId,
      message: reply,
      role: "assistant",
    });

    return NextResponse.json({
      success: true,
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Chat is temporarily unavailable." }, { status: 500 });
  }
}

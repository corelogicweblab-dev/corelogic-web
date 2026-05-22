import { NextRequest, NextResponse } from "next/server";
import { getChatReply } from "@/lib/chat-responses";
import { appendJsonRecord } from "@/lib/storage";

export const runtime = "nodejs";

function logChat(sessionId: string, userMessage: string, reply: string) {
  return Promise.all([
    appendJsonRecord("chat-messages.json", { sessionId, message: userMessage, role: "user" }),
    appendJsonRecord("chat-messages.json", { sessionId, message: reply, role: "assistant" }),
  ]).catch((err) => console.error("[chat] log failed", err));
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

    const reply = getChatReply(message);
    const timestamp = new Date().toISOString();

    void logChat(sessionId, message, reply);

    return NextResponse.json({
      success: true,
      reply,
      timestamp,
    });
  } catch (error) {
    console.error("[chat]", error);
    return NextResponse.json({ error: "Chat is temporarily unavailable." }, { status: 500 });
  }
}

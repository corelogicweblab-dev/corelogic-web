import { NextRequest, NextResponse } from "next/server";
import { getChatReply } from "@/lib/chat-responses";
import { appendJsonRecord } from "@/lib/storage";

export const runtime = "nodejs";

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

    const reply = getChatReply(message);

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
  } catch (error) {
    console.error("[chat]", error);
    return NextResponse.json({ error: "Chat is temporarily unavailable." }, { status: 500 });
  }
}

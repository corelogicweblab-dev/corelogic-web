import { NextRequest, NextResponse } from "next/server";
import { appendJsonRecord } from "@/lib/storage";
import { SITE } from "@/lib/site-config";

export const runtime = "nodejs";

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
  project?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaResend(
  payload: ContactBody & { name: string; email: string; message: string }
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "CoreLogic Web Lab <onboarding@resend.dev>",
      to: [SITE.email],
      reply_to: payload.email,
      subject: `New inquiry${payload.project ? `: ${payload.project}` : ""} — ${payload.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(SITE.phone)}</p>
        ${payload.project ? `<p><strong>Project:</strong> ${escapeHtml(payload.project)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>
      `,
    }),
  });

  return res.ok;
}

/** Sends directly to inbox — no mailto / local email app */
async function sendViaFormSubmit(
  payload: ContactBody & { name: string; email: string; message: string }
) {
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        project: payload.project ?? "",
        _subject: `CoreLogic Web Lab — ${payload.project || "New Project Inquiry"} (${payload.name})`,
        _template: "table",
        _captcha: "false",
      }),
    }
  );

  return res.ok;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const message = body.message?.trim();
    const project = body.project?.trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    const record = { name, email, message, project: project || null };
    await appendJsonRecord("inquiries.json", record);

    const payload = { name, email, message, project: project || undefined };
    const emailed =
      (await sendViaResend(payload)) || (await sendViaFormSubmit(payload));

    if (!emailed) {
      return NextResponse.json(
        {
          error:
            "Could not deliver your message right now. Please try again in a moment or call us.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your message was sent directly to our team at corelogicweblab@gmail.com. We'll respond within 24 hours.",
      emailed: true,
    });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again shortly." },
      { status: 500 }
    );
  }
}

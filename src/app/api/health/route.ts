import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "online",
    uptime: 99.99,
    services: {
      ai: "online",
      security: "secured",
      cloud: "active",
    },
    timestamp: new Date().toISOString(),
  });
}

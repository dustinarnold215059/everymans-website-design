import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendContactEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "anonymous";
}

export async function POST(req: Request) {
  // 1) Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // 2) Honeypot — silently accept so bots don't learn they were caught.
  const website = (body as Record<string, unknown>)?.website;
  if (typeof website === "string" && website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 3) Rate limit per IP (skipped automatically if Upstash isn't configured)
  const ip = getClientIp(req);
  try {
    const rl = await checkRateLimit(ip);
    if (!rl.success) {
      return NextResponse.json(
        { ok: false, error: "Too many messages. Please try again in a few minutes." },
        { status: 429 },
      );
    }
  } catch (err) {
    // Don't let a Redis hiccup block a legitimate inquiry — log and continue.
    console.error("[contact] rate-limit error:", err);
  }

  // 4) Validate
  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Please check the form.", fields: result.errors },
      { status: 422 },
    );
  }

  // 5) Send via Resend
  try {
    await sendContactEmail(result.value);
  } catch (err) {
    console.error("[contact] email error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please email me directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

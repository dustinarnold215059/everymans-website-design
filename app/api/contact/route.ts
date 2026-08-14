import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendContactEmail, sendContactAutoReply } from "@/lib/resend";
import { saveLead } from "@/lib/leads";

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

  // 4) Turnstile — the real spam gate. Runs before validation so a bot never
  //    reaches the mailer, and after the honeypot so obvious bots cost nothing.
  //    No-ops until TURNSTILE_SECRET is set.
  const turnstile = await verifyTurnstile(
    (body as Record<string, unknown>)?.turnstileToken,
    ip === "anonymous" ? undefined : ip,
  );
  if (!turnstile.ok) {
    console.warn("[contact] turnstile rejected:", turnstile.reason);
    return NextResponse.json(
      { ok: false, error: "Couldn't verify you're human. Please try again." },
      { status: 403 },
    );
  }

  // 5) Validate
  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Please check the form.", fields: result.errors },
      { status: 422 },
    );
  }

  // 6) Persist the lead FIRST. The database is the durable record: if Resend is
  //    down, a stored row means the lead still exists and can be answered by
  //    hand. Doing it after the email meant an email failure lost the inquiry
  //    entirely — no message, no row, no trace it ever arrived.
  //    Still best-effort: a database problem must not cost the email.
  const stored = await saveLead({
    name: result.value.name,
    organization: result.value.organization,
    email: result.value.email,
    need: result.value.need,
    message: result.value.message,
    sourcePath: result.value.sourcePath,
  });
  if (!stored.saved && stored.reason !== "DATABASE_URL not set") {
    console.error("[contact] lead not stored:", stored.reason);
  }

  // 7) Send the inquiry to the owner via Resend
  try {
    await sendContactEmail(result.value);
  } catch (err) {
    console.error("[contact] email error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please email me directly." },
      { status: 500 },
    );
  }

  // 8) Best-effort confirmation to the sender — never fail the request for this
  try {
    await sendContactAutoReply({ name: result.value.name, email: result.value.email });
  } catch (err) {
    console.error("[contact] auto-reply error:", err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

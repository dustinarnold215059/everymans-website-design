import { NextResponse } from "next/server";
import { codeMatches, issueSession, adminConfigured } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "anonymous";
}

export async function POST(req: Request) {
  // Closed unless configured — an unset access code must never mean "open".
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "Admin is not configured." }, { status: 503 });
  }

  // Rate limit BEFORE comparing, so the code cannot be brute forced.
  try {
    const rl = await checkRateLimit(`admin-login:${clientIp(req)}`);
    if (!rl.success) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Try again in a few minutes." },
        { status: 429 },
      );
    }
  } catch {
    // A Redis hiccup must not lock the owner out of his own admin.
  }

  let code = "";
  try {
    const body = (await req.json()) as { code?: unknown };
    code = typeof body.code === "string" ? body.code : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!codeMatches(code)) {
    // Deliberately vague: never reveal whether the code was close.
    return NextResponse.json({ ok: false, error: "That code isn't right." }, { status: 401 });
  }

  const issued = await issueSession();
  if (!issued) {
    return NextResponse.json({ ok: false, error: "Admin is not configured." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}

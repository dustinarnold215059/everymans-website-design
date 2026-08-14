import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"] as const;
type Status = (typeof STATUSES)[number];

/** Updates a lead's pipeline fields. Admin session required. */
export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: false, error: "No database configured." }, { status: 503 });
  }

  const { id } = await ctx.params;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const data: Record<string, unknown> = {};

  if (typeof body.status === "string") {
    if (!STATUSES.includes(body.status as Status)) {
      return NextResponse.json({ ok: false, error: "Unknown status." }, { status: 422 });
    }
    const status = body.status as Status;
    data.status = status;
    // Stamp the transition so the pipeline has real dates to report on later.
    if (status === "CONTACTED") data.contactedAt = new Date();
    if (status === "WON") data.wonAt = new Date();
    if (status === "LOST") data.lostAt = new Date();
  }

  if ("notes" in body) {
    data.notes = typeof body.notes === "string" && body.notes.trim() ? body.notes.slice(0, 5000) : null;
  }

  if ("quotedCents" in body) {
    const v = body.quotedCents;
    if (v === null) data.quotedCents = null;
    else if (typeof v === "number" && Number.isFinite(v) && v >= 0) data.quotedCents = Math.round(v);
    else return NextResponse.json({ ok: false, error: "Invalid quote." }, { status: 422 });
  }

  if (!Object.keys(data).length) {
    return NextResponse.json({ ok: false, error: "Nothing to update." }, { status: 400 });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.lead.update({ where: { id }, data });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin] lead update failed:", err);
    return NextResponse.json({ ok: false, error: "Update failed." }, { status: 500 });
  }
}

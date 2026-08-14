import { cities } from "@/config/cities";
import type { LeadAudience } from "@/lib/generated/prisma";

/**
 * Persisting inquiries.
 *
 * An inquiry used to exist only as an email. If Resend hiccupped, or the message
 * got deleted, the lead was gone with no record it ever arrived — and there was
 * no way to answer "which city page actually produces work?"
 *
 * Storing is deliberately BEST-EFFORT and never blocks the email. Losing a row
 * costs a record; losing the email costs the lead. If DATABASE_URL is unset the
 * whole thing no-ops, matching how Turnstile and rate limiting behave here.
 */

export type LeadInput = {
  name: string;
  organization: string;
  email: string;
  need: string;
  message: string;
  sourcePath: string;
};

/** Which side of the site the form was on, derived from the path. */
export function audienceFromPath(path: string): LeadAudience {
  if (path.startsWith("/business")) return "BUSINESS";
  if (path.startsWith("/ministries") || path === "/work") return "MINISTRIES";
  return "UNKNOWN";
}

/** City slug when the lead came from a city page, else null. */
export function citySlugFromPath(path: string): string | null {
  const m = /^\/business\/([^/]+)/.exec(path);
  if (!m) return null;
  const slug = m[1]!;
  return cities.some((c) => c.slug === slug) ? slug : null;
}

export async function saveLead(input: LeadInput): Promise<{ saved: boolean; reason?: string }> {
  if (!process.env.DATABASE_URL) return { saved: false, reason: "DATABASE_URL not set" };

  try {
    // Imported lazily so a build without a generated client, or a deploy with no
    // database configured, cannot break the contact route at module load.
    const { prisma } = await import("@/lib/prisma");
    await prisma.lead.create({
      data: {
        name: input.name,
        organization: input.organization || null,
        email: input.email,
        need: input.need,
        message: input.message,
        sourcePath: input.sourcePath || null,
        audience: audienceFromPath(input.sourcePath),
        citySlug: citySlugFromPath(input.sourcePath),
      },
    });
    return { saved: true };
  } catch (err) {
    return { saved: false, reason: err instanceof Error ? err.message : "unknown" };
  }
}

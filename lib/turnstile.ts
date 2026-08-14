import { siteConfig } from "@/config/site.config";

/**
 * Cloudflare Turnstile verification for the contact form.
 *
 * The honeypot alone was the only spam defense here, and a honeypot is exactly
 * what got beaten on the other two sites this was modelled on. Rate limiting
 * exists in lib/rateLimit.ts but is inert without Upstash credentials, so this
 * is the real gate.
 *
 * Fails OPEN when TURNSTILE_SECRET is unset — matching how lib/rateLimit.ts
 * behaves — so deploying this cannot break a working form before the secret is
 * in place. Once the secret is set, verification is enforced.
 */

const SITEVERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** Must match `data-action` on the widget. */
export const TURNSTILE_ACTION = "contact";

export type TurnstileResult = {
  /** Whether the request may proceed. */
  ok: boolean;
  /** False when TURNSTILE_SECRET is unset, i.e. the gate is not yet enforcing. */
  configured: boolean;
  reason?: string;
};

type SiteverifyResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

/** Hostnames the token is allowed to have come from. */
function allowedHostnames(): string[] {
  const fromEnv = (process.env.TURNSTILE_HOSTNAMES ?? "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  if (fromEnv.length) return fromEnv;

  // Sensible default: this site's own host, with and without www, so the check
  // works without extra configuration.
  const host = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url).hostname.toLowerCase();
  const bare = host.replace(/^www\./, "");
  return [host, bare, `www.${bare}`];
}

export async function verifyTurnstile(
  token: unknown,
  remoteip?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return { ok: true, configured: false, reason: "TURNSTILE_SECRET not set" };

  if (typeof token !== "string" || token.length === 0) {
    return { ok: false, configured: true, reason: "missing token" };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteip) body.set("remoteip", remoteip);

  let data: SiteverifyResponse;
  try {
    const res = await fetch(SITEVERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    data = (await res.json()) as SiteverifyResponse;
  } catch {
    // Cloudflare unreachable. Let the submission through rather than lose a real
    // lead to an outage — the honeypot and validation still apply.
    return { ok: true, configured: true, reason: "siteverify unreachable" };
  }

  if (data.success !== true) {
    return {
      ok: false,
      configured: true,
      reason: `rejected: ${(data["error-codes"] ?? []).join(",") || "unknown"}`,
    };
  }

  // A valid token from a different widget or a different site is still a valid
  // token — bind it to this form and this host.
  if (data.action && data.action !== TURNSTILE_ACTION) {
    return { ok: false, configured: true, reason: `action mismatch: ${data.action}` };
  }
  if (data.hostname && !allowedHostnames().includes(data.hostname.toLowerCase())) {
    return { ok: false, configured: true, reason: `hostname mismatch: ${data.hostname}` };
  }

  return { ok: true, configured: true };
}

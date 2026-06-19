import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Upstash Redis rate limiting for the contact form: 5 requests / 10 minutes per IP.
 *
 * If the Upstash env vars are not set (e.g. local dev), this returns null and the
 * route treats every request as allowed — the form still works without Redis.
 */

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  if (limiter) return limiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    prefix: "emwd:contact",
    analytics: false,
  });
  return limiter;
}

export type RateResult = { success: boolean; remaining: number; configured: boolean };

export async function checkRateLimit(identifier: string): Promise<RateResult> {
  const l = getLimiter();
  if (!l) return { success: true, remaining: Infinity, configured: false };

  const { success, remaining } = await l.limit(identifier);
  return { success, remaining, configured: true };
}

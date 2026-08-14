import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

/**
 * Admin authentication.
 *
 * Same shape AAM uses: a single access code exchanged for a short-lived JWT in
 * an httpOnly cookie, with the code compared in constant time and the attempt
 * rate limited. AAM also carries a users table with bcrypt, which this site has
 * no use for — one operator, one code.
 *
 * jose rather than jsonwebtoken because it works in both runtimes and has no
 * CommonJS baggage; the design is unchanged.
 *
 * Both ADMIN_ACCESS_CODE and ADMIN_JWT_SECRET must be set or the admin is
 * simply closed. It fails CLOSED — unlike Turnstile or the lead store, an
 * unconfigured auth check must never let anyone in.
 */

const COOKIE = "emwd_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours, as AAM does

function secretKey(): Uint8Array | null {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

/** Constant-time compare that does not leak length. */
export function codeMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_ACCESS_CODE;
  if (!expected) return false;
  const max = Math.max(candidate.length, expected.length);
  const a = Buffer.alloc(max);
  const b = Buffer.alloc(max);
  Buffer.from(candidate, "utf8").copy(a);
  Buffer.from(expected, "utf8").copy(b);
  return candidate.length === expected.length && timingSafeEqual(a, b);
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_ACCESS_CODE && secretKey());
}

export async function issueSession(): Promise<boolean> {
  const key = secretKey();
  if (!key) return false;

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(key);

  const store = await cookies();
  store.set({
    name: COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
  return true;
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

/** True only for a valid, unexpired admin session. */
export async function isAdmin(): Promise<boolean> {
  const key = secretKey();
  if (!key) return false;
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

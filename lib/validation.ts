import { siteConfig } from "@/config/site.config";
import { businessContent } from "@/config/business.config";

/** Shape the contact form posts to /api/contact. */
export type ContactPayload = {
  name: string;
  organization?: string;
  email: string;
  need: string;
  message: string;
  /** Honeypot — must be empty. Real users never see this field. */
  website?: string;
  /**
   * Page the form was submitted from, e.g. "/business/dearborn". Included in
   * the inquiry email so a lead arrives with the page that produced it — the
   * only way to tell which city page is actually working.
   */
  sourcePath?: string;
};

export type ValidationResult =
  | {
      ok: true;
      value: Required<Omit<ContactPayload, "website" | "sourcePath">> & {
        sourcePath: string;
      };
    }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/**
 * Every audience's "what do you need" options, not just one.
 *
 * This validated against the ministries list alone, so three of the five
 * options the BUSINESS form offers — including "Fix or rebuild my current
 * site" — were rejected with "Please choose what you need." The visitor sees a
 * form that refuses its own dropdown and leaves. Any new audience must add its
 * options here.
 */
const NEED_OPTIONS: readonly string[] = [
  ...siteConfig.contact.needOptions,
  ...businessContent.contact.needOptions,
];

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Same-origin path only — never trust a full URL from the client. */
const cleanPath = (v: unknown) => {
  const p = clean(v);
  return /^\/[A-Za-z0-9\-._~/]{0,120}$/.test(p) ? p : "";
};

/**
 * Validates a contact submission on both client and server.
 * Keep this dependency-free so it runs anywhere.
 */
export function validateContact(input: unknown): ValidationResult {
  const data = (input ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = clean(data.name);
  const organization = clean(data.organization);
  const email = clean(data.email);
  const need = clean(data.need);
  const message = clean(data.message);

  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 120) errors.name = "That name is too long.";

  if (organization.length > 160) errors.organization = "That's a bit too long.";

  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > 200) errors.email = "That email is too long.";

  if (!NEED_OPTIONS.includes(need)) errors.need = "Please choose what you need.";

  if (message.length < 10) errors.message = "Tell me a little more (10+ characters).";
  else if (message.length > 4000) errors.message = "That message is too long.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: { name, organization, email, need, message,
      sourcePath: cleanPath(data.sourcePath),
    },
  };
}

import { siteConfig } from "@/config/site.config";

/** Shape the contact form posts to /api/contact. */
export type ContactPayload = {
  name: string;
  organization?: string;
  email: string;
  need: string;
  message: string;
  /** Honeypot — must be empty. Real users never see this field. */
  website?: string;
};

export type ValidationResult =
  | { ok: true; value: Required<Omit<ContactPayload, "website">> }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEED_OPTIONS = siteConfig.contact.needOptions as readonly string[];

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

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
    value: { name, organization, email, need, message },
  };
}

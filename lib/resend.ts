import { Resend } from "resend";
import { siteConfig } from "@/config/site.config";

type ContactEmailInput = {
  name: string;
  organization: string;
  email: string;
  need: string;
  message: string;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Sends a formatted contact submission to EMAIL_TO via Resend.
 * Throws if RESEND_API_KEY / EMAIL_TO are missing so the route can surface a 500.
 */
export async function sendContactEmail(input: ContactEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.EMAIL_TO;
  const from =
    process.env.EMAIL_FROM ?? `Every Man's Website Design <onboarding@resend.dev>`;

  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  if (!to) throw new Error("EMAIL_TO is not set");

  const resend = new Resend(apiKey);
  const org = input.organization || "—";

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Organization", org],
    ["Email", input.email],
    ["Need", input.need],
  ];

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1A1A17">
    <div style="background:#13302A;color:#F4EFE6;padding:20px 24px;border-radius:12px 12px 0 0">
      <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#AEC2B8">
        New inquiry — ${escapeHtml(siteConfig.name)}
      </div>
      <div style="font-size:20px;font-weight:600;margin-top:4px">${escapeHtml(input.name)}</div>
    </div>
    <div style="border:1px solid #E2D8C5;border-top:none;border-radius:0 0 12px 12px;padding:8px 24px 20px">
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:10px 0;color:#5F584C;width:120px;vertical-align:top">${k}</td>
              <td style="padding:10px 0;font-weight:500">${escapeHtml(v)}</td>
            </tr>`,
          )
          .join("")}
      </table>
      <div style="margin-top:8px;color:#5F584C;font-size:13px">Message</div>
      <div style="margin-top:6px;padding:14px 16px;background:#FBF8F2;border:1px solid #E2D8C5;border-radius:10px;white-space:pre-wrap;line-height:1.55">${escapeHtml(
        input.message,
      )}</div>
    </div>
  </div>`;

  const text = `New inquiry — ${siteConfig.name}
Name: ${input.name}
Organization: ${org}
Email: ${input.email}
Need: ${input.need}

Message:
${input.message}`;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `New inquiry: ${input.name}${org !== "—" ? ` (${org})` : ""}`,
    html,
    text,
  });

  if (error) throw new Error(error.message ?? "Resend failed to send the email");
}

/**
 * Sends a friendly confirmation to the person who submitted the form.
 * Best-effort: callers should not fail the request if this throws.
 */
export async function sendContactAutoReply(input: {
  name: string;
  email: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM ?? `Every Man's Website Design <onboarding@resend.dev>`;
  const replyTo = process.env.EMAIL_TO;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const resend = new Resend(apiKey);
  const firstName = input.name.split(" ")[0] || "there";

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:540px;margin:0 auto;color:#1A1A17;line-height:1.6">
    <div style="background:#13302A;color:#F4EFE6;padding:20px 24px;border-radius:12px 12px 0 0;font-weight:600">
      ${escapeHtml(siteConfig.name)}
    </div>
    <div style="border:1px solid #E2D8C5;border-top:none;border-radius:0 0 12px 12px;padding:22px 24px">
      <p style="margin:0 0 14px">Hi ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 14px">Thanks for reaching out — your message came through and I'll get back to you personally, usually within a day or two.</p>
      <p style="margin:0 0 14px">If anything's urgent in the meantime, just reply to this email.</p>
      <p style="margin:18px 0 0">— Dustin<br/><span style="color:#5F584C">${escapeHtml(siteConfig.name)}</span></p>
    </div>
  </div>`;

  const text = `Hi ${firstName},

Thanks for reaching out — your message came through and I'll get back to you personally, usually within a day or two. If anything's urgent, just reply to this email.

— Dustin
${siteConfig.name}`;

  const { error } = await resend.emails.send({
    from,
    to: input.email,
    ...(replyTo ? { replyTo } : {}),
    subject: `Thanks — I got your message`,
    html,
    text,
  });

  if (error) throw new Error(error.message ?? "Resend failed to send the auto-reply");
}

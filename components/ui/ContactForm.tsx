"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site.config";
import { validateContact } from "@/lib/validation";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const initial = { name: "", organization: "", email: "", need: "", message: "", website: "" };

const cardCls = "rounded-[20px] border border-line bg-surface p-7 shadow-form sm:px-8 sm:py-[34px]";
const labelCls = "block text-[13px] font-bold text-fg";
const fieldCls =
  "mt-1.5 w-full rounded-[10px] border border-line bg-paper px-3.5 py-3 text-[15px] font-medium text-fg transition-colors placeholder:text-faint/70 focus:border-accent focus:bg-surface focus:outline-none";
const errCls = "mt-1 text-xs font-semibold text-accent";

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const set = (key: keyof typeof initial) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        fields?: Record<string, string>;
      };
      if (!res.ok || !data.ok) {
        if (data.fields) setErrors(data.fields);
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setValues(initial);
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(cardCls, "flex min-h-[380px] flex-col items-center justify-center gap-3.5 text-center")}
      >
        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-ink-soft">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12.5l4 4 10-10" stroke="#EFE6D2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-[28px] font-medium">{siteConfig.contact.successTitle}</h3>
        <p className="max-w-[24em] text-[15px] leading-[1.6] text-muted">{siteConfig.contact.successBody}</p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-1 break-words text-sm font-bold text-accent hover:text-accent-hover"
        >
          {siteConfig.email}
        </a>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className={cn(cardCls, "relative flex flex-col gap-4")}>
      <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={set("name")}
            className={cn(fieldCls, errors.name && "border-accent")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
          />
          {errors.name && (
            <p id="name-err" className={errCls}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="organization" className={cn(labelCls, "whitespace-nowrap")}>
            Organization <span className="font-medium text-faint">(optional)</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="Your org"
            value={values.organization}
            onChange={set("organization")}
            className={cn(fieldCls, errors.organization && "border-accent")}
          />
          {errors.organization && <p className={errCls}>{errors.organization}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={set("email")}
          className={cn(fieldCls, errors.email && "border-accent")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
        />
        {errors.email && (
          <p id="email-err" className={errCls}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="need" className={labelCls}>
          What do you need?
        </label>
        <select
          id="need"
          name="need"
          value={values.need}
          onChange={set("need")}
          className={cn(
            fieldCls,
            "appearance-none bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10",
            errors.need && "border-accent",
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23837C6E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          }}
          aria-invalid={!!errors.need}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {siteConfig.contact.needOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.need && <p className={errCls}>{errors.need}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={set("message")}
          className={cn(fieldCls, "resize-y", errors.message && "border-accent")}
          placeholder="Tell me a little about your organization and what you need."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {errors.message && (
          <p id="message-err" className={errCls}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from humans, catches bots. Contained so it never affects layout. */}
      <div aria-hidden className="pointer-events-none absolute h-px w-px -translate-x-[9999px] overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set("website")}
        />
      </div>

      {serverError && (
        <p className="rounded-lg border border-accent/40 bg-accent/5 px-4 py-3 text-sm text-ink" role="alert">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-1 w-full shadow-cta-lg"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site.config";
import { validateContact } from "@/lib/validation";
import { Button } from "./Button";
import { cn } from "@/lib/cn";
import { IconCheck } from "./icons";

type Status = "idle" | "submitting" | "success" | "error";

const initial = { name: "", organization: "", email: "", need: "", message: "", website: "" };

const labelCls = "block text-sm font-medium text-ink";
const fieldCls =
  "mt-1.5 w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-[15px] text-fg shadow-sm transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";
const errCls = "mt-1 text-xs font-medium text-accent";

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

    // Client-side validation (server re-validates regardless)
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
      <div className="rounded-xl2 border border-line bg-paper p-8 text-center shadow-soft">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <IconCheck width={26} height={26} />
        </div>
        <h3 className="mt-4 text-2xl">{siteConfig.contact.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-sm text-muted">{siteConfig.contact.successBody}</p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-5 inline-block text-sm font-semibold text-accent hover:text-accent-soft"
        >
          {siteConfig.email}
        </a>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-xl2 border border-line bg-paper p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
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
          <label htmlFor="organization" className={labelCls}>
            Organization <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            value={values.organization}
            onChange={set("organization")}
            className={cn(fieldCls, errors.organization && "border-accent")}
          />
          {errors.organization && <p className={errCls}>{errors.organization}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={labelCls}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
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

      <div className="mt-5">
        <label htmlFor="need" className={labelCls}>
          What do you need?
        </label>
        <select
          id="need"
          name="need"
          value={values.need}
          onChange={set("need")}
          className={cn(fieldCls, "appearance-none bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10", errors.need && "border-accent")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235F584C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
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

      <div className="mt-5">
        <label htmlFor="message" className={labelCls}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          className={cn(fieldCls, "resize-y", errors.message && "border-accent")}
          placeholder="Tell me about your organization and what you're hoping to build."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {errors.message && (
          <p id="message-err" className={errCls}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from humans, catches bots. Do not remove. */}
      <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden>
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
        <p className="mt-5 rounded-lg border border-accent/40 bg-accent/5 px-4 py-3 text-sm text-ink" role="alert">
          {serverError}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
        <p className="text-xs text-muted">
          Or email me at{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-ink underline">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </form>
  );
}

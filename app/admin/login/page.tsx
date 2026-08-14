"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Couldn't sign in.");
        setBusy(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error — try again.");
      setBusy(false);
    }
  }

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md rounded-[20px] border border-line bg-surface p-8 shadow-form">
        <h1 className="font-display text-[28px] font-medium tracking-[-0.015em]">Admin</h1>
        <p className="mt-2 text-[14.5px] text-muted">Enter the access code to see inquiries.</p>

        <form onSubmit={onSubmit} className="mt-6">
          <label htmlFor="code" className="block text-[13px] font-bold text-fg">
            Access code
          </label>
          <input
            id="code"
            name="code"
            type="password"
            autoComplete="current-password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1.5 w-full rounded-[10px] border border-line bg-paper px-3.5 py-3 text-[15px] font-medium text-fg focus:border-accent focus:bg-surface focus:outline-none"
          />
          {error && (
            <p className="mt-2 text-xs font-semibold text-accent-ink" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" size="lg" className="mt-5 w-full" disabled={busy}>
            {busy ? "Checking…" : "Sign in"}
          </Button>
        </form>
      </div>
    </Container>
  );
}

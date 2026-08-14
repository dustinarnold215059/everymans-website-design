"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type AdminLead = {
  id: string;
  createdAt: string;
  name: string;
  organization: string | null;
  email: string;
  need: string;
  message: string;
  sourcePath: string | null;
  audience: string;
  citySlug: string | null;
  status: string;
  notes: string | null;
  quotedCents: number | null;
};

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"] as const;

const statusStyle: Record<string, string> = {
  NEW: "bg-accent text-on-ink-bright",
  CONTACTED: "bg-accent-tint text-accent-ink",
  QUOTED: "bg-amber/30 text-fg",
  WON: "bg-ink text-on-ink-bright",
  LOST: "bg-sand text-faint",
};

function money(cents: number | null): string {
  if (cents == null) return "";
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function LeadTable({ leads }: { leads: AdminLead[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("ALL");
  const [open, setOpen] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const shown = useMemo(
    () => (filter === "ALL" ? leads : leads.filter((l) => l.status === filter)),
    [leads, filter],
  );

  async function patch(id: string, body: Record<string, unknown>) {
    setSaving(id);
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.refresh();
    } finally {
      setSaving(null);
    }
  }

  if (!leads.length) {
    return (
      <p className="rounded-[18px] border border-line bg-surface px-6 py-10 text-center text-[15px] text-muted">
        No inquiries yet. They appear here the moment someone submits the form.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {["ALL", ...STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={
              filter === s
                ? "rounded-full bg-ink px-4 py-2 text-[13px] font-bold text-on-ink-bright"
                : "rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-muted transition-colors hover:border-accent hover:text-accent-ink"
            }
          >
            {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {shown.map((l) => {
          const isOpen = open === l.id;
          return (
            <article key={l.id} className="rounded-[16px] border border-line bg-surface">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : l.id)}
                aria-expanded={isOpen}
                className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 text-left"
              >
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] ${statusStyle[l.status] ?? "bg-sand"}`}
                >
                  {l.status}
                </span>
                <span className="text-[15.5px] font-bold">{l.name}</span>
                {l.organization && <span className="text-[14px] text-muted">{l.organization}</span>}
                <span className="text-[13.5px] text-muted">{l.need}</span>
                {l.citySlug && (
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-[12px] font-semibold text-muted">
                    {l.citySlug}
                  </span>
                )}
                {l.quotedCents != null && (
                  <span className="text-[13.5px] font-bold text-ink">{money(l.quotedCents)}</span>
                )}
                <span className="ml-auto text-[12.5px] text-faint">
                  {new Date(l.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-line-faint px-5 py-5">
                  <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    <div>
                      <dt className="text-[12px] font-bold uppercase tracking-[0.08em] text-faint">Email</dt>
                      <dd className="mt-0.5 text-[14.5px]">
                        <a href={`mailto:${l.email}`} className="font-semibold text-ink underline decoration-accent">
                          {l.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12px] font-bold uppercase tracking-[0.08em] text-faint">Came from</dt>
                      <dd className="mt-0.5 text-[14.5px] text-muted">
                        {l.sourcePath ?? "—"} · {l.audience.toLowerCase()}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-4 whitespace-pre-wrap rounded-[12px] border border-line-faint bg-paper px-4 py-3 text-[14.5px] leading-[1.6] text-fg">
                    {l.message}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={saving === l.id || s === l.status}
                        onClick={() => patch(l.id, { status: s })}
                        className={
                          s === l.status
                            ? "rounded-full bg-ink px-3.5 py-1.5 text-[12.5px] font-bold text-on-ink-bright"
                            : "rounded-full border border-line px-3.5 py-1.5 text-[12.5px] font-semibold text-muted transition-colors hover:border-accent hover:text-accent-ink disabled:opacity-50"
                        }
                      >
                        {s.charAt(0) + s.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>

                  <form
                    className="mt-4 flex flex-wrap items-end gap-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      const dollars = String(fd.get("quote") ?? "").trim();
                      patch(l.id, {
                        notes: String(fd.get("notes") ?? ""),
                        quotedCents: dollars === "" ? null : Math.round(Number(dollars) * 100),
                      });
                    }}
                  >
                    <div className="min-w-[220px] flex-1">
                      <label className="block text-[12px] font-bold uppercase tracking-[0.08em] text-faint">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        defaultValue={l.notes ?? ""}
                        rows={2}
                        className="mt-1 w-full rounded-[10px] border border-line bg-paper px-3 py-2 text-[14px] focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div className="w-[130px]">
                      <label className="block text-[12px] font-bold uppercase tracking-[0.08em] text-faint">
                        Quote ($)
                      </label>
                      <input
                        name="quote"
                        type="number"
                        min="0"
                        step="1"
                        defaultValue={l.quotedCents != null ? l.quotedCents / 100 : ""}
                        className="mt-1 w-full rounded-[10px] border border-line bg-paper px-3 py-2 text-[14px] focus:border-accent focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={saving === l.id}
                      className="rounded-full bg-accent px-4 py-2 text-[13.5px] font-bold text-on-ink-bright disabled:opacity-60"
                    >
                      {saving === l.id ? "Saving…" : "Save"}
                    </button>
                  </form>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}

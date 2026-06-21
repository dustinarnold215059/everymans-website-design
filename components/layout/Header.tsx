"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";

export function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-6 py-4 sm:px-7">
        <Link href="/#top" className="rounded-md" aria-label={`${siteConfig.name} — home`}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-[30px] md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14.5px] font-semibold text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Button href={siteConfig.primaryCta.href} variant="forest" size="md">
            {siteConfig.primaryCta.label}
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="border-t border-line bg-paper px-6 pb-6 pt-2 shadow-soft">
            <nav className="flex flex-col" aria-label="Mobile">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/70 py-3 text-base font-semibold text-fg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button
              href={siteConfig.primaryCta.href}
              variant="primary"
              size="lg"
              className="mt-5 w-full"
              onClick={() => setOpen(false)}
            >
              {siteConfig.primaryCta.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

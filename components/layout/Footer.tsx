import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";
import { IconArrowUpRight } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-on-ink">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Wordmark onInk />
            <p className="mt-4 text-sm leading-relaxed text-on-ink-muted">
              {siteConfig.footer.blurb}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-on-ink-muted">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-on-ink/90 transition-colors hover:text-accent-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-on-ink-muted">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-on-ink/90 transition-colors hover:text-accent-soft"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.footer.credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-on-ink/90 transition-colors hover:text-accent-soft"
                >
                  {siteConfig.footer.credit.label}
                  <IconArrowUpRight width={14} height={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-on-ink/15 pt-6 text-xs text-on-ink-muted sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-accent-soft">
              Privacy
            </Link>
            <span>{siteConfig.domain}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

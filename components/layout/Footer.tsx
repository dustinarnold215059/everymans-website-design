"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { AUDIENCES, audienceFor } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";

/**
 * The footer shows ONLY the audience you are currently on.
 *
 * This is the main reason it is a client component: a local-business prospect
 * must not be able to reach the abolition work from their side of the site, and
 * the footer previously listed both audiences plus a direct link to
 * abolishabortionmichigan.com on every page. The chooser at `/` is the only
 * place both sides appear.
 */
export function Footer() {
  const pathname = usePathname() ?? "/";
  const onChooser = pathname === "/";
  const audience = audienceFor(pathname) ?? AUDIENCES.ministries;
  const year = new Date().getFullYear();

  // On the chooser, list both doors and no case-study credit — it belongs to
  // neither side until the visitor has picked one.
  const columns = onChooser
    ? [
        { title: AUDIENCES.ministries.switchLabel, links: [...AUDIENCES.ministries.nav, AUDIENCES.ministries.cta] },
        { title: AUDIENCES.business.switchLabel, links: [...AUDIENCES.business.nav, AUDIENCES.business.cta] },
      ]
    : [{ title: "Explore", links: [...audience.nav, audience.cta] }];

  const blurb = onChooser ? siteConfig.footer.blurb : audience.footer.blurb;
  const credit = onChooser ? null : audience.footer.credit;

  return (
    <footer className="bg-ink text-on-ink-muted">
      <Container
        className={
          onChooser
            ? "grid gap-10 pb-[30px] pt-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
            : "grid gap-10 pb-[30px] pt-14 md:grid-cols-[1.6fr_1fr_1fr]"
        }
      >
        <div>
          <Wordmark onInk />
          <p className="mt-3.5 max-w-[26em] text-[14.5px] leading-[1.6]">{blurb}</p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-sage">{col.title}</h3>
            <ul className="mt-3.5 flex flex-col gap-2.5">
              {col.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[14.5px] transition-colors hover:text-on-ink-bright">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-sage">Get in touch</h3>
          <ul className="mt-3.5 flex flex-col gap-2.5">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="break-words text-[14.5px] transition-colors hover:text-on-ink-bright"
              >
                {siteConfig.email}
              </a>
            </li>
            {credit && (
              <li>
                <a
                  href={credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14.5px] transition-colors hover:text-on-ink-bright"
                >
                  {credit.label} →
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-sage-deep">
        <Container className="flex flex-wrap items-center justify-between gap-2.5 py-[18px] text-[13px]">
          <span>
            © {year} {siteConfig.name}. All rights reserved.
          </span>
          <span className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-on-ink-bright">
              Privacy
            </Link>
            <span>{siteConfig.domain}</span>
          </span>
        </Container>
      </div>
    </footer>
  );
}

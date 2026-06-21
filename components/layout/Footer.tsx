import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";

const exploreLinks = [...siteConfig.nav, { label: "Contact", href: "/#contact" }];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-on-ink-muted">
      <Container className="grid gap-10 pb-[30px] pt-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Wordmark onInk />
          <p className="mt-3.5 max-w-[26em] text-[14.5px] leading-[1.6]">{siteConfig.footer.blurb}</p>
        </div>

        <div>
          <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-sage">Explore</h3>
          <ul className="mt-3.5 flex flex-col gap-2.5">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[14.5px] transition-colors hover:text-on-ink-bright">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

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
            <li>
              <a
                href={siteConfig.footer.credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] transition-colors hover:text-on-ink-bright"
              >
                {siteConfig.footer.credit.label} →
              </a>
            </li>
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

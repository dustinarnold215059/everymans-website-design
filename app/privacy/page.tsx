import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects the information you share.`,
  alternates: { canonical: "/privacy" },
};

// Edit this date when you make material changes to the policy.
const LAST_UPDATED = "June 21, 2026";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="pb-12 pt-16 sm:pt-20">
          <Kicker>Legal</Kicker>
          <h1 className="mt-4 text-4xl leading-[1.05] sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            This explains what I collect when you use {siteConfig.name}, why, and the choices you
            have. Plain language, no surprises.
          </p>
          <p className="mt-3 text-sm text-muted">Last updated: {LAST_UPDATED}</p>
        </Container>
      </section>

      <Container className="max-w-3xl py-14">
        <Block title="Who I am">
          <p>
            {siteConfig.name} is a web-design business run by Dustin. You can reach me anytime at{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-ink underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </Block>

        <Block title="What I collect">
          <p>I only collect what I need to respond to you and keep the site running:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-ink">Contact form:</strong> your name, organization (optional),
              email address, what you need, and your message.
            </li>
            <li>
              <strong className="text-ink">Technical data:</strong> a limited record of requests
              (such as IP address) used to rate-limit the contact form and block spam.
            </li>
            <li>
              <strong className="text-ink">Usage analytics:</strong> aggregate, privacy-friendly page
              metrics (see below). No cookies, and no advertising profiles.
            </li>
          </ul>
        </Block>

        <Block title="How I use it">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>To read and personally reply to your inquiry.</li>
            <li>To protect the site from spam and abuse.</li>
            <li>To understand, in aggregate, which pages are useful so I can improve the site.</li>
          </ul>
          <p>I do not sell your information or share it for advertising.</p>
        </Block>

        <Block title="Service providers I use">
          <p>A few trusted services help operate the site. Each only receives what it needs:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-ink">Vercel</strong> — hosting and privacy-friendly Web
              Analytics (aggregate, cookieless).
            </li>
            <li>
              <strong className="text-ink">Resend</strong> — delivers contact-form emails to me and a
              confirmation back to you.
            </li>
            <li>
              <strong className="text-ink">Upstash</strong> — rate-limiting to prevent spam.
            </li>
          </ul>
        </Block>

        <Block title="How long I keep it">
          <p>
            I keep contact-form messages for as long as needed to correspond with you and for my own
            records, and delete them when they&apos;re no longer needed. Analytics data is aggregate
            and not tied to you personally. Rate-limiting data is short-lived.
          </p>
        </Block>

        <Block title="Your choices">
          <p>
            You can ask me to access or delete the information you&apos;ve sent me at any time — just
            email{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-ink underline">
              {siteConfig.email}
            </a>{" "}
            and I&apos;ll take care of it.
          </p>
        </Block>

        <Block title="Changes to this policy">
          <p>
            If this policy changes in a meaningful way, I&apos;ll update the date above. Continued use
            of the site means you accept the current version.
          </p>
        </Block>
      </Container>
    </>
  );
}

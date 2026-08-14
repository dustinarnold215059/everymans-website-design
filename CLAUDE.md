# Every Man's Website Design

Marketing site for the web-design business. It sells the service, so the site itself is the portfolio — visual regressions here are business problems, not cosmetic ones.

## Two audiences, one shell

The site sells to two audiences with separate landing pages:

| Route | Audience | Content |
|---|---|---|
| `/` | chooser — two doors, no sales copy | `app/page.tsx` |
| `/ministries` | churches, ministries, nonprofits | `config/site.config.ts` |
| `/business` | local businesses, Metro Detroit | `config/business.config.ts` |

Both landing pages render the **same section components**. The sections take a
`content` prop typed as `PageContent` (`config/page-content.ts`) and default to
`siteConfig`, so `/ministries` passes nothing and `/business` passes
`businessContent`. Adding a third audience = one config file + one route, no
component work.

`config/navigation.ts` holds each audience's nav, CTA, and wordmark tagline. The
header picks one from `usePathname()`; the footer lists both.

**Never hardcode audience-specific copy in a component.** Several bugs came from
exactly that — the hero's italic phrase, the faux-browser domain, the trust-line
emphasis, the feature chips and five section headings were all hardcoded to
ministry wording and appeared verbatim on the business page. They now come from
config. If you add a heading, add it to `PageContent` and both configs.

Same rule for `siteConfig.description`: it feeds layout metadata, the
Organization JSON-LD and the manifest, all of which render on `/business`, so it
must stay audience-neutral. Ministry wording lives in
`siteConfig.ministriesDescription`.

## Content lives in config, not in components

`config/site.config.ts`, `config/business.config.ts` and `config/case-studies.ts`
hold the copy, nav order, and case-study content. **Edit content there rather than
inlining it into components** — the components are intentionally presentational,
and inlining copy is the pattern this repo has been kept clear of.

`config/blur.ts` is generated. Run `node scripts/gen-blur.mjs` after adding or
replacing anything in `public/work`; do not hand-edit it.

## Email

Contact form submissions go through Resend (`lib/resend.ts`, `app/api/contact/route.ts`).

**Resend DNS verification was still pending as of 2026-06.** If contact-form email isn't arriving, check the domain's verification status in Resend before debugging the route — the code path has been working while the sending domain was not yet verified. The domain was transferred to Vercel around 2026-06-20, so DNS records live there.

## Pushing

Commits go up as the **dustinarnold215059** GitHub account. Multiple accounts exist in `gh`; confirm the active one before pushing.

## Conventions

npm (`package-lock.json`), Next 16. `npm run typecheck` runs `tsc --noEmit` and is not part of `build` — run it explicitly before pushing. `npm test` runs vitest.

## JSX text spacing

Text broken across lines collapses the space (`{n} projects` → `12projects`), and `</strong> word` at a line break drops it too. Use explicit `{' '}` and verify against built HTML.

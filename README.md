# Every Man's Website Design

Marketing + portfolio site for **Every Man's Website Design** — fast, modern, conversion-focused, and built for mission-driven organizations (churches, ministries, nonprofits, abolition/pro-life groups).

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel**. Contact form uses **Resend** for email and **Upstash Redis** for rate limiting.

---

## ✏️ Editing content & branding (start here)

Almost everything you'll want to change lives in **one file**:

```
config/site.config.ts
```

- **Copy** — every headline, paragraph, service description, nav label, etc.
- **Color palette** — `theme.colors`. Change a hex value and the whole site re-skins
  (Tailwind reads these via `tailwind.config.ts`, so e.g. `bg-ink` / `text-accent` follow automatically).

Case studies for the `/work` page live in:

```
config/case-studies.ts      # add a new object to the array to publish another case study
```

Screenshots/photos are **clearly-labeled placeholders** (`components/ui/PlaceholderImage.tsx`).
To use a real image: drop it in `/public` and replace the placeholder with `next/image`:

```tsx
import Image from "next/image";
<Image src="/work/aam-home.png" alt="AAM homepage" width={1280} height={800} className="rounded-xl2" />
```

---

## 🚀 Local development

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
#   then edit .env.local (see below)

# 3. Run the dev server
npm run dev
#   → http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # run the production build locally
npm run typecheck  # tsc --noEmit
```

> The contact form works locally **without** Resend/Upstash configured, but it won't
> actually send email until `RESEND_API_KEY` + `EMAIL_TO` are set. Rate limiting is
> skipped automatically when the Upstash vars are blank.

---

## 🔑 Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Variable | Required | What it's for |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes (to send mail) | Resend API key — https://resend.com/api-keys |
| `EMAIL_TO` | Yes | Inbox that receives contact-form submissions |
| `EMAIL_FROM` | Recommended | Verified Resend sender, e.g. `hello@everymanswebsitedesign.com`. Use `onboarding@resend.dev` for quick testing |
| `UPSTASH_REDIS_REST_URL` | Optional | Upstash Redis REST URL (enables rate limiting) |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Upstash Redis REST token |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for SEO/OG/sitemap, e.g. `https://everymanswebsitedesign.com` |

**Never commit `.env.local`** — it's gitignored.

---

## 📬 Contact form

`POST /api/contact` (`app/api/contact/route.ts`) does, in order:

1. **Honeypot** — a hidden `website` field; if filled, the bot gets a fake success.
2. **Rate limiting** — Upstash Redis, 5 requests / 10 minutes per IP (skipped if not configured).
3. **Validation** — shared `lib/validation.ts` runs on the client *and* server.
4. **Send** — formatted HTML + text email to `EMAIL_TO` via Resend, with `replyTo` set to the sender.

Secrets are only ever read server-side.

---

## ☁️ Deploy to Vercel

1. **Push to GitHub** (a fresh repo — this project does not reuse any prior site):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Every Man's Website Design"
   git branch -M main
   git remote add origin https://github.com/Dustinarnold/everymans-website-design.git
   git push -u origin main
   ```
2. **Import the repo** at https://vercel.com/new (framework auto-detected as Next.js).
3. **Add environment variables** in Vercel → Project → Settings → Environment Variables
   (the same keys as `.env.local`). Set `NEXT_PUBLIC_SITE_URL` to your production URL.
4. **Deploy.**

### Custom domain (everymanswebsitedesign.com)

1. Vercel → Project → **Settings → Domains** → add `everymanswebsitedesign.com`
   (and `www.everymanswebsitedesign.com`).
2. At your domain registrar, point DNS as Vercel instructs:
   - Apex `everymanswebsitedesign.com` → **A** record `76.76.21.21`, **or** use Vercel nameservers.
   - `www` → **CNAME** → `cname.vercel-dns.com`.
3. Set one as primary (a `www` → apex redirect is fine). SSL is issued automatically.
4. Update `EMAIL_FROM` to a verified sender on the domain in Resend, and set
   `NEXT_PUBLIC_SITE_URL=https://everymanswebsitedesign.com`.

---

## 🗂️ Project structure

```
app/
  api/contact/route.ts   Contact API (honeypot + rate limit + Resend)
  work/page.tsx          Case-study page (array-driven)
  layout.tsx             Fonts, metadata, header/footer
  page.tsx               Single-scroll home
  opengraph-image.tsx    Dynamic OG/Twitter image
  sitemap.ts  robots.ts  icon.svg  not-found.tsx
components/
  layout/   Header, Footer, Wordmark
  sections/ Hero, TrustStrip, Services, FeaturedWork, WhoIServe, About, CtaBand, Contact
  ui/       Button, Container, Section, Reveal, PlaceholderImage, icons, ContactForm
config/
  site.config.ts         ← all copy + color palette (single source of truth)
  case-studies.ts        case-study data
lib/
  validation.ts  rateLimit.ts  resend.ts  cn.ts
```

---

## 🔒 Security & performance notes

- Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options,
  Permissions-Policy) are set in `next.config.mjs`.
- `next/font` self-hosts fonts; images use `next/image`; scroll motion is a tiny
  IntersectionObserver (no animation library) and respects `prefers-reduced-motion`.
- Semantic HTML, skip-link, visible focus rings, and good contrast for accessibility.

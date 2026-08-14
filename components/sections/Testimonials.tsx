import { siteConfig } from "@/config/site.config";
import type { PageContent } from "@/config/page-content";
import type { ReviewsResult } from "@/lib/google-reviews";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="text-[14px] tracking-[0.12em] text-accent" aria-label={`${rating} out of 5`}>
      <span aria-hidden>{"★".repeat(full)}</span>
    </span>
  );
}

export function Testimonials({
  content = siteConfig,
  reviews,
}: {
  content?: PageContent;
  /**
   * Real Google reviews. When present these replace the written testimonial —
   * a real customer's words always beat a written stand-in. Absent or empty
   * (no GBP yet, no reviews yet, Google erroring) falls back to `proof`.
   */
  reviews?: ReviewsResult;
}) {
  const { proof } = content;
  const real = reviews?.reviews ?? [];
  const hasReal = real.length > 0;

  const emph = proof.emphasis;
  const idx = proof.quote.lastIndexOf(emph);
  const pre = idx >= 0 ? proof.quote.slice(0, idx) : proof.quote;
  const hasEmph = idx >= 0;

  return (
    <section id="proof" className="pb-16">
      <Container>
        <Reveal>
          <div className="grid items-center gap-10 rounded-[22px] border border-line bg-sand px-8 py-10 sm:px-11 sm:py-12 lg:grid-cols-[1.4fr_1fr] lg:gap-[46px]">
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Kicker>{proof.heading}</Kicker>
                {hasReal && reviews?.rating != null && (
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-muted">
                    <Stars rating={reviews.rating} />
                    {reviews.rating.toFixed(1)}
                    {reviews.total ? ` · ${reviews.total} Google reviews` : " on Google"}
                  </span>
                )}
              </div>

              {hasReal ? (
                <div className="mt-[18px] flex flex-col gap-6">
                  {real.slice(0, 2).map((r) => (
                    <figure key={r.id}>
                      <blockquote className="font-display text-[clamp(19px,2.8vw,23px)] font-normal leading-[1.35] tracking-[-0.01em]">
                        &ldquo;{r.text}&rdquo;
                      </blockquote>
                      <figcaption className="mt-3 flex items-center gap-3">
                        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-ink text-[13px] font-extrabold text-on-ink">
                          {r.initials}
                        </div>
                        <div>
                          <div className="text-[14px] font-bold">{r.author}</div>
                          <div className="text-[12.5px] text-faint">Google review</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <>
                  <blockquote className="mt-[18px] font-display text-[clamp(22px,3.5vw,27px)] font-normal leading-[1.32] tracking-[-0.01em]">
                    &ldquo;{pre}
                    {hasEmph && <span className="italic text-ink-soft">{emph}</span>}&rdquo;
                  </blockquote>
                  <div className="mt-[22px] flex items-center gap-3">
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-ink text-[15px] font-extrabold text-on-ink">
                      {proof.initials}
                    </div>
                    <div>
                      <div className="text-[14.5px] font-bold">{proof.author}</div>
                      <div className="text-[12.5px] text-faint">{proof.role}</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3.5">
              {proof.stats.map((s) => (
                <div key={s.label} className="rounded-[14px] border border-line bg-surface px-5 py-[18px]">
                  <div className="font-display text-[30px] font-semibold text-ink-soft">{s.value}</div>
                  <div className="mt-0.5 text-[13.5px] font-semibold text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

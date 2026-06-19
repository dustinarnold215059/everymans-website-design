import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site.config";

/**
 * Custom wordmark — a small builder's-square monogram + the brand name.
 * `onInk` flips the text color for use on the dark footer.
 */
export function Wordmark({ onInk = false }: { onInk?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-on-ink shadow-soft">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          {/* a builder's square / framed "E" — craftsmanship, not corporate */}
          <path
            d="M5 4h14v3.2H8.4v2.9H16v3.1H8.4v3.6H19V20H5V4z"
            fill="currentColor"
            className="text-on-ink"
          />
          <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" stroke="currentColor" strokeOpacity="0.0" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[15px] font-semibold tracking-tight",
            onInk ? "text-on-ink" : "text-ink",
          )}
        >
          {siteConfig.shortName} Website Design
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em]",
            onInk ? "text-on-ink-muted" : "text-muted",
          )}
        >
          Mission-driven web
        </span>
      </span>
    </span>
  );
}

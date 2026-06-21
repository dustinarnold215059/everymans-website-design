import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site.config";

/**
 * Lettermark: a fancy italic serif "E" on a rounded forest tile + the wordmark.
 * `onInk` renders the footer variant (smaller tile, no tagline).
 */
export function Wordmark({ onInk = false }: { onInk?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={cn(
          "grid flex-none place-items-center",
          onInk ? "h-[34px] w-[34px] rounded-[9px] bg-ink-soft" : "h-[38px] w-[38px] rounded-[10px] bg-ink",
        )}
      >
        <span
          className={cn(
            "font-display font-medium italic leading-none text-on-ink",
            onInk ? "text-[24px]" : "text-[27px]",
          )}
          style={{ paddingRight: 1 }}
        >
          E
        </span>
      </span>
      <span className="flex flex-col leading-[1.05]">
        <span
          className={cn(
            "whitespace-nowrap font-extrabold tracking-[-0.01em]",
            onInk ? "text-[16px] text-on-ink-bright" : "text-[15.5px] text-fg",
          )}
        >
          {siteConfig.name}
        </span>
        {!onInk && (
          <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
            Mission-driven web
          </span>
        )}
      </span>
    </span>
  );
}

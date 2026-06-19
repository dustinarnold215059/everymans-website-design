/** Tiny className joiner — keeps us from pulling in clsx for a one-liner. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

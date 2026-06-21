import type { SVGProps } from "react";

/** Small, consistent line-icon set. Inherit color via `currentColor`. */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconBrowser(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export function IconChurch(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M12 2v4M10 4h4" />
      <path d="M12 6l5 4v10H7V10l5-4z" />
      <path d="M10 20v-4a2 2 0 014 0v4" />
    </svg>
  );
}

export function IconHeart(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M12 20s-7-4.3-9-9a4.5 4.5 0 018-3 4.5 4.5 0 018 3c-2 4.7-9 9-9 9z" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0112 0M16 5.5a3 3 0 010 5.8M21 20a6 6 0 00-4-5.6" />
    </svg>
  );
}

export function IconFlag(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M5 21V4M5 4h11l-1.5 3L16 10H5" />
    </svg>
  );
}

export function IconStore(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16" />
      <path d="M9 20v-5h6v5" />
    </svg>
  );
}

/* ── Two-tone service icons (cream stroke + terracotta detail) for the forest tiles ── */
export function IconBuild(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <rect x="3" y="4" width="18" height="14" rx="2.5" stroke="#EFE6D2" strokeWidth="1.6" />
      <path d="M3 8h18" stroke="#EFE6D2" strokeWidth="1.6" />
      <path d="M9 21h6M12 18v3" stroke="#C5532E" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconCare(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <path
        d="M12 3l7 3v5c0 4.2-2.9 7.5-7 9-4.1-1.5-7-4.8-7-9V6l7-3Z"
        stroke="#EFE6D2"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="#C5532E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconData(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...props} aria-hidden>
      <path d="M4 19V9M9 19V5M14 19v-7M19 19v-11" stroke="#EFE6D2" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="14" cy="12" r="1.9" fill="#C5532E" />
    </svg>
  );
}

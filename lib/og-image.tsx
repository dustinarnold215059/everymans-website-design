import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";

const c = siteConfig.theme.colors;

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Shared social-share card.
 *
 * Each audience renders its own, because this image is what appears when a page
 * is shared on Facebook or in a text message. The single site-wide version used
 * to read "Churches · Ministries · Nonprofits · Abolition · Mission-driven
 * causes" — which meant sharing the local-business page showed an image saying
 * "Abolition". The two sides are kept strictly separate, and that includes here.
 */
export function renderOgImage({ tagline, subline }: { tagline: string; subline: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: c.ink,
          padding: "68px 76px",
          fontFamily: "Georgia, serif",
          color: c["on-ink"],
        }}
      >
        {/* logo + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: c["ink-soft"],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: 46,
              color: c["on-ink"],
            }}
          >
            E
          </div>
          <div
            style={{
              fontSize: 23,
              letterSpacing: 3,
              fontWeight: 700,
              color: c["on-ink-muted"],
              fontFamily: "Arial, sans-serif",
            }}
          >
            {siteConfig.name.toUpperCase()}
          </div>
        </div>

        {/* tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.08,
              fontWeight: 600,
              color: c["on-ink-bright"],
              maxWidth: 1000,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 26,
              color: c["on-ink-muted"],
              fontFamily: "Arial, sans-serif",
              maxWidth: 940,
            }}
          >
            {subline}
          </div>
        </div>

        {/* accent + domain */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 6, background: c.accent, borderRadius: 4 }} />
          <div style={{ fontSize: 24, color: c["on-ink"], fontFamily: "Arial, sans-serif" }}>
            {siteConfig.domain}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}

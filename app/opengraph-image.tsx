import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";

export const runtime = "edge";
export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const c = siteConfig.theme.colors;

export default function OpengraphImage() {
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
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
          color: c["on-ink"],
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: c.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
              color: c.ink,
            }}
          >
            E
          </div>
          <div style={{ fontSize: 26, color: c["on-ink-muted"], letterSpacing: 2 }}>
            {siteConfig.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 600, maxWidth: 980 }}>
            {siteConfig.tagline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: c["on-ink-muted"],
              fontFamily: "Arial, sans-serif",
              maxWidth: 900,
            }}
          >
            Ministries · Nonprofits · Abolition · Mission-driven causes
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 5, background: c.accent, borderRadius: 4 }} />
          <div style={{ fontSize: 24, color: c["on-ink"], fontFamily: "Arial, sans-serif" }}>
            {siteConfig.domain}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

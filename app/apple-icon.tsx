import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const c = siteConfig.theme.colors;

// iOS masks/rounds the corners itself, so the tile fills the square.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: c.ink,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 104,
            lineHeight: 1,
            color: c["on-ink"],
          }}
        >
          E
        </div>
        <div style={{ width: 54, height: 8, borderRadius: 4, background: c.accent }} />
      </div>
    ),
    { ...size },
  );
}

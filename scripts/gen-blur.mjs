/**
 * Regenerates config/blur.ts from whatever is in public/work.
 *
 * CLAUDE.md says blur data is generated rather than hand-edited, but the
 * generator was never committed — so editing it by hand was the only option.
 * This is that generator. Run it whenever screenshots are added or replaced:
 *
 *   node scripts/gen-blur.mjs
 *
 * Every image under public/work gets a ~16px-wide JPEG data URI, which is what
 * next/image wants for `placeholder="blur"` on a non-imported (public/) src.
 */

import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WORK_DIR = path.join(process.cwd(), "public", "work");
const OUT = path.join(process.cwd(), "config", "blur.ts");
const EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const files = (await readdir(WORK_DIR))
  .filter((f) => EXT.has(path.extname(f).toLowerCase()))
  .sort();

const entries = [];
for (const file of files) {
  const buf = await sharp(path.join(WORK_DIR, file))
    .resize(16) // tiny on purpose: this ships inline in the HTML
    .jpeg({ quality: 40 })
    .toBuffer();
  entries.push([`/work/${file}`, `data:image/jpeg;base64,${buf.toString("base64")}`]);
}

const body = entries.map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n");

await writeFile(
  OUT,
  `// Auto-generated tiny blur placeholders for next/image.
// DO NOT EDIT BY HAND — run \`node scripts/gen-blur.mjs\` instead.
// Keyed by the image's public path.
export const blurData: Record<string, string> = {
${body}
};
`,
  "utf8",
);

console.log(`wrote ${entries.length} placeholders -> config/blur.ts`);
for (const [k, v] of entries) console.log(`  ${k.padEnd(28)} ${v.length} chars`);

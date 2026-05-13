// scripts/generate-sitemap.js
// 執行: node scripts/generate-sitemap.js
// 或在 package.json 的 postbuild 中自動執行

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.VITE_SITE_URL || "https://flying-engineer.com.tw";
const today = new Date().toISOString().split("T")[0];

const urls = [{ loc: "/", priority: "1.0", changefreq: "monthly" }];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    ({ loc, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh-TW" href="${SITE_URL}${loc}" />
  </url>`,
  )
  .join("\n")}
</urlset>`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, sitemap, "utf-8");
console.log(`✅ sitemap.xml 已產生: ${outPath}`);

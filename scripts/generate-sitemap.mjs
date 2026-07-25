import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  articlePath,
  escapeXml,
  readBlogPosts,
  SITE_URL,
  sortBlogPosts,
} from "./blog-data.mjs";

const SITEMAP_OUTPUT_FILE = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/sitemap.xml"
);

const STATIC_ROUTES = [
  "/",
  "/blog",
  "/coach-chris",
  "/success-stories",
  "/book",
  "/privacy-policy",
  "/cookie-policy",
  "/accessibility",
];

function sitemapEntry(path, lastModified = "") {
  const lastModifiedMarkup = lastModified
    ? `\n    <lastmod>${escapeXml(lastModified)}</lastmod>`
    : "";

  return `  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>${lastModifiedMarkup}
  </url>`;
}

const blogPosts = sortBlogPosts(await readBlogPosts());
const staticEntries = STATIC_ROUTES.map((path) => sitemapEntry(path));
const blogEntries = blogPosts.map((post) =>
  sitemapEntry(articlePath(post), post.updatedDate || post.publishedDate)
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...blogEntries].join("\n")}
</urlset>
`;

await writeFile(SITEMAP_OUTPUT_FILE, sitemap, "utf8");
console.log(`Generated ${SITEMAP_OUTPUT_FILE} with ${staticEntries.length + blogEntries.length} URLs.`);

import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://hudsonchess.com";
const BLOG_DATA_FILE = resolve(dirname(fileURLToPath(import.meta.url)), "../src/App.jsx");
const RSS_OUTPUT_FILE = resolve(dirname(fileURLToPath(import.meta.url)), "../public/rss.xml");

function extractBlogPosts(source) {
  const declaration = "const BLOG_POSTS =";
  const declarationIndex = source.indexOf(declaration);

  if (declarationIndex === -1) {
    throw new Error("Could not find BLOG_POSTS in src/App.jsx");
  }

  const arrayStart = source.indexOf("[", declarationIndex);
  if (arrayStart === -1) {
    throw new Error("Could not find BLOG_POSTS array start");
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (let index = arrayStart; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;

    if (depth === 0) {
      const arrayLiteral = source.slice(arrayStart, index + 1);
      return Function(`"use strict"; return (${arrayLiteral});`)();
    }
  }

  throw new Error("Could not find BLOG_POSTS array end");
}

function escapeXml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function absoluteUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

function articleUrl(post) {
  const canonicalPath = post.canonicalPath || `#/blog/${post.slug}`;
  return `${SITE_URL}/${canonicalPath.replace(/^\//, "")}`;
}

function imageType(imageUrl) {
  const cleanUrl = imageUrl.split("?")[0].toLowerCase();
  if (cleanUrl.endsWith(".png")) return "image/png";
  if (cleanUrl.endsWith(".webp")) return "image/webp";
  if (cleanUrl.endsWith(".avif")) return "image/avif";
  if (cleanUrl.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

function rssDate(dateString) {
  return new Date(`${dateString}T12:00:00-05:00`).toUTCString();
}

function buildFeed(posts) {
  const sortedPosts = posts
    .map((post, index) => ({ ...post, sourceIndex: index }))
    .sort((left, right) => {
      const dateDiff = new Date(right.publishedDate).getTime() - new Date(left.publishedDate).getTime();
      return dateDiff || right.sourceIndex - left.sourceIndex;
    });

  const items = sortedPosts
    .map((post) => {
      const link = articleUrl(post);
      const description = post.description || post.excerpt || post.metaDescription || "";
      const imageUrl = absoluteUrl(post.featuredImage);
      const imageMarkup = imageUrl
        ? `\n      <enclosure url="${escapeXml(imageUrl)}" length="0" type="${imageType(imageUrl)}" />\n      <media:content url="${escapeXml(imageUrl)}" medium="image" type="${imageType(imageUrl)}" />`
        : "";

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(description)}</description>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${rssDate(post.publishedDate)}</pubDate>${imageMarkup}
    </item>`;
    })
    .join("\n");

  const lastBuildDate = sortedPosts[0]?.publishedDate ? rssDate(sortedPosts[0].publishedDate) : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Hudson Chess Blog</title>
    <description>Chess improvement articles, training ideas, and lesson updates from Coach Chris at Hudson Chess.</description>
    <link>${SITE_URL}/#/blog</link>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>${items}
  </channel>
</rss>
`;
}

const appSource = await readFile(BLOG_DATA_FILE, "utf8");
const blogPosts = extractBlogPosts(appSource);
const feed = buildFeed(blogPosts);
await writeFile(RSS_OUTPUT_FILE, feed, "utf8");
console.log(`Generated ${RSS_OUTPUT_FILE} with ${blogPosts.length} posts.`);

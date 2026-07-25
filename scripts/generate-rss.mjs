import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  absoluteUrl,
  articleUrl,
  escapeXml,
  readBlogPosts,
  SITE_URL,
  sortBlogPosts,
} from "./blog-data.mjs";

const RSS_OUTPUT_FILE = resolve(dirname(fileURLToPath(import.meta.url)), "../public/rss.xml");

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
  const sortedPosts = sortBlogPosts(posts);

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
    <link>${SITE_URL}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>60</ttl>${items}
  </channel>
</rss>
`;
}

const blogPosts = await readBlogPosts();
const feed = buildFeed(blogPosts);
await writeFile(RSS_OUTPUT_FILE, feed, "utf8");
console.log(`Generated ${RSS_OUTPUT_FILE} with ${blogPosts.length} posts.`);

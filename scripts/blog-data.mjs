import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_URL = "https://hudsonchess.com";
export const BLOG_DATA_FILE = resolve(dirname(fileURLToPath(import.meta.url)), "../src/App.jsx");

export function extractBlogPosts(source) {
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

export async function readBlogPosts() {
  const source = await readFile(BLOG_DATA_FILE, "utf8");
  return extractBlogPosts(source);
}

export function absoluteUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function articlePath(post) {
  return post.canonicalPath || `/blog/${post.slug}`;
}

export function articleUrl(post) {
  return absoluteUrl(articlePath(post));
}

export function sortBlogPosts(posts) {
  return posts
    .map((post, index) => ({ ...post, sourceIndex: index }))
    .sort((left, right) => {
      const dateDiff =
        new Date(right.publishedDate).getTime() - new Date(left.publishedDate).getTime();
      return dateDiff || right.sourceIndex - left.sourceIndex;
    });
}

export function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function escapeXml(value) {
  return escapeHtml(value).replaceAll("&#039;", "&apos;");
}

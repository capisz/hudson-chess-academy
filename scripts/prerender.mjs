import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  absoluteUrl,
  articlePath,
  articleUrl,
  escapeHtml,
  readBlogPosts,
  SITE_URL,
  sortBlogPosts,
} from "./blog-data.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST_DIR = resolve(PROJECT_ROOT, "dist");
const INDEX_FILE = resolve(DIST_DIR, "index.html");

const STATIC_PAGES = [
  {
    path: "/",
    title: "Hudson Chess | Private Online and In-Person Chess Lessons",
    description:
      "Private online and in-person chess coaching with Coach Chris for beginners, tournament players, and students building stronger thinking habits.",
    heading: "Expand your chess horizon.",
    body: "Structured chess lessons that help students think clearly, compete confidently, and keep improving.",
  },
  {
    path: "/blog",
    title: "Hudson Chess Blog | Chess Improvement Articles",
    description:
      "Chess articles from Hudson Chess on decision-making, resilience, calculation, and practical student improvement.",
    heading: "Hudson Chess Blog",
    body: "Chess improvement articles, training ideas, and reflective lessons from Coach Chris.",
  },
  {
    path: "/coach-chris",
    title: "Meet Coach Chris | Hudson Chess",
    description:
      "Meet Coach Chris and learn about the teaching approach behind Hudson Chess lessons, student development, and practical chess improvement.",
    heading: "Meet Coach Chris",
    body: "A chess coach focused on clear thinking, patient instruction, practical improvement, and student confidence.",
  },
  {
    path: "/success-stories",
    title: "Chess Success Stories | Student Growth Through Chess",
    description:
      "See how chess lessons can help students grow through tournament improvement, stronger focus, better problem-solving, and academic confidence.",
    heading: "Success Stories",
    body: "Chess growth can appear in tournament ratings, academic confidence, patience, focus, and stronger problem-solving.",
  },
  {
    path: "/book",
    title: "Book a Chess Lesson | Hudson Chess",
    description:
      "Book an online or in-person Hudson Chess lesson with Coach Chris for beginner instruction, tournament training, or focused game review.",
    heading: "Book a Chess Lesson",
    body: "Choose a lesson path and share the student’s experience, goals, and preferred training format.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Hudson Chess",
    description:
      "Read the Hudson Chess privacy policy, including Vercel Analytics disclosure, cookies, advertising, and contact details.",
    heading: "Privacy Policy",
    body: "How Hudson Chess handles lesson inquiries, analytics, cookie choices, and Google AdSense advertising.",
  },
  {
    path: "/cookie-policy",
    title: "Cookie Policy | Hudson Chess",
    description:
      "Learn how Hudson Chess uses essential storage, analytics technologies, advertising cookies, and cookie preference controls.",
    heading: "Cookie Policy",
    body: "How essential storage, analytics technologies, advertising choices, and browser controls work on Hudson Chess.",
  },
  {
    path: "/accessibility",
    title: "Accessibility Statement | Hudson Chess",
    description:
      "Read the Hudson Chess accessibility statement and learn how to request help or report an accessibility barrier.",
    heading: "Accessibility Statement",
    body: "Hudson Chess aims to make lessons, articles, and coaching information usable by visitors with disabilities.",
  },
];

function removeMeta(html, attribute, value) {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${escapedValue}["'][^>]*\\/?>\\s*`,
    "gi"
  );
  return html.replace(pattern, "");
}

function removeCanonical(html) {
  return html.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*\/?>\s*/gi, "");
}

function renderMeta({
  title,
  description,
  canonical,
  image = `${SITE_URL}/horizon-logo.png`,
  imageAlt = "Hudson Chess logo",
  type = "website",
  keywords = [],
  article,
}) {
  const keywordMarkup = keywords.length
    ? `<meta name="keywords" content="${escapeHtml(keywords.join(", "))}" />`
    : "";
  const articleMarkup = article
    ? `
    <meta property="article:author" content="${escapeHtml(article.author)}" data-managed-seo="true" />
    <meta property="article:published_time" content="${escapeHtml(article.publishedDate)}" data-managed-seo="true" />
    <meta property="article:modified_time" content="${escapeHtml(article.updatedDate || article.publishedDate)}" data-managed-seo="true" />
    <meta property="article:section" content="${escapeHtml(article.category)}" data-managed-seo="true" />`
    : "";

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    ${keywordMarkup}
    <link rel="canonical" href="${escapeHtml(canonical)}" data-managed-seo="true" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" data-managed-seo="true" />
    <meta name="twitter:title" content="${escapeHtml(title)}" data-managed-seo="true" />
    <meta name="twitter:description" content="${escapeHtml(description)}" data-managed-seo="true" />
    <meta name="twitter:image" content="${escapeHtml(image)}" data-managed-seo="true" />
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" data-managed-seo="true" />${articleMarkup}`;
}

function renderStructuredData(page, article) {
  const data = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: article.metaTitle || article.title,
        description: article.metaDescription,
        image: [absoluteUrl(article.featuredImage)],
        datePublished: article.publishedDate,
        dateModified: article.updatedDate || article.publishedDate,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl(article),
        },
        url: articleUrl(article),
        author: {
          "@type": "Person",
          name: article.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Hudson Chess",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/horizon-logo.png`,
          },
        },
        articleSection: article.category,
        keywords: article.tags,
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: `${SITE_URL}${page.path}`,
        isPartOf: {
          "@type": "WebSite",
          name: "Hudson Chess",
          url: SITE_URL,
        },
      };

  const id = article ? "blog-structured-data" : "page-structured-data";
  return `<script id="${id}" type="application/ld+json">${JSON.stringify(data).replaceAll("<", "\\u003c")}</script>`;
}

function renderArticleFallback(post) {
  const headingMap = new Map(
    (post.sectionHeadings || []).map((section) => [section.beforeParagraph, section.title])
  );
  const paragraphs = (post.body || [])
    .map((paragraph, index) => {
      const heading = headingMap.get(index);
      const headingMarkup = heading ? `<h2>${escapeHtml(heading)}</h2>` : "";
      return `${headingMarkup}<p>${escapeHtml(paragraph)}</p>`;
    })
    .join("\n");

  return `<article class="blogPostArticle">
    <div class="contentWrap blogPostReadableWrap">
      <header class="blogPostHeroCard">
        <div class="blogPostHeroCopy">
          <h1>${escapeHtml(post.title)}</h1>
          <p>${escapeHtml(post.excerpt)}</p>
          <div class="blogPostByline">
            <span>By ${escapeHtml(post.author)}</span>
            <span>Published ${escapeHtml(post.publishedDate)}</span>
          </div>
        </div>
        <figure class="blogPostHeroImage">
          <img src="${escapeHtml(post.featuredImage)}" alt="${escapeHtml(post.imageAlt)}" />
        </figure>
      </header>
      <div class="blogPostBody">
        <p class="blogCoachTakeaway">${escapeHtml(post.summaryIntro)}</p>
        ${paragraphs}
      </div>
    </div>
  </article>`;
}

function renderBlogIndexFallback(posts) {
  const cards = posts
    .map(
      (post) => `<article>
        <h2><a href="${escapeHtml(articlePath(post))}">${escapeHtml(post.title)}</a></h2>
        <p>${escapeHtml(post.excerpt || post.description || post.metaDescription)}</p>
      </article>`
    )
    .join("\n");

  return `<main class="seoFallback contentWrap">
    <h1>Hudson Chess Blog</h1>
    <p>Chess improvement articles, training ideas, and reflective lessons from Coach Chris.</p>
    ${cards}
  </main>`;
}

function renderPageFallback(page) {
  return `<main class="seoFallback contentWrap">
    <h1>${escapeHtml(page.heading)}</h1>
    <p>${escapeHtml(page.body)}</p>
  </main>`;
}

function applyRouteToTemplate(template, page, article, fallbackMarkup) {
  const title = article
    ? `${article.metaTitle || article.title} | Hudson Chess`
    : page.title;
  const description = article ? article.metaDescription : page.description;
  const canonical = article ? articleUrl(article) : `${SITE_URL}${page.path}`;
  const image = article ? absoluteUrl(article.featuredImage) : `${SITE_URL}/horizon-logo.png`;
  const imageAlt = article ? article.imageAlt : "Hudson Chess logo";
  const keywords = article?.tags || [];

  let html = template.replace(/<title>[\s\S]*?<\/title>\s*/i, "");
  [
    ["name", "description"],
    ["name", "keywords"],
    ["property", "og:title"],
    ["property", "og:description"],
    ["property", "og:type"],
    ["property", "og:url"],
    ["property", "og:image"],
    ["property", "og:image:alt"],
    ["name", "twitter:card"],
    ["name", "twitter:title"],
    ["name", "twitter:description"],
    ["name", "twitter:image"],
    ["name", "twitter:image:alt"],
  ].forEach(([attribute, value]) => {
    html = removeMeta(html, attribute, value);
  });
  html = removeCanonical(html);

  const meta = renderMeta({
    title,
    description,
    canonical,
    image,
    imageAlt,
    type: article ? "article" : "website",
    keywords,
    article,
  });
  const structuredData = renderStructuredData(page, article);
  html = html.replace("</head>", `${meta}\n    ${structuredData}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackMarkup}</div>`);
  return html;
}

async function writeRoute(path, html) {
  if (path === "/") {
    await writeFile(INDEX_FILE, html, "utf8");
    return;
  }

  const outputDirectory = resolve(DIST_DIR, path.replace(/^\/+|\/+$/g, ""));
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(resolve(outputDirectory, "index.html"), html, "utf8");
}

const template = await readFile(INDEX_FILE, "utf8");
const posts = sortBlogPosts(await readBlogPosts());
const pages = STATIC_PAGES.map((page) => ({
  ...page,
  fallback:
    page.path === "/blog" ? renderBlogIndexFallback(posts) : renderPageFallback(page),
}));

for (const page of pages) {
  await writeRoute(page.path, applyRouteToTemplate(template, page, null, page.fallback));
}

for (const post of posts) {
  const page = {
    path: articlePath(post),
    title: post.metaTitle || post.title,
    description: post.metaDescription,
  };
  await writeRoute(
    page.path,
    applyRouteToTemplate(template, page, post, renderArticleFallback(post))
  );
}

const latestPost = posts[0];
if (latestPost) {
  const latestPage = {
    path: "/blog/latest",
    title: `Latest Hudson Chess Article | Hudson Chess`,
    description: latestPost.metaDescription,
  };
  const latestFallback = `<main class="seoFallback contentWrap">
    <h1>Latest Hudson Chess Article</h1>
    <p><a href="${escapeHtml(articlePath(latestPost))}">Continue to ${escapeHtml(latestPost.title)}</a></p>
  </main>`;
  await writeRoute(
    latestPage.path,
    applyRouteToTemplate(template, latestPage, null, latestFallback)
  );
}

console.log(`Prerendered ${pages.length + posts.length + (latestPost ? 1 : 0)} routes.`);

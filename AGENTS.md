# Blog SEO rules

Whenever editing blog pages, blog templates, MDX posts, CMS fields, routing, or metadata, follow these SEO rules:

## Content quality

- Prioritize helpful, original, people-first writing.
- Do not keyword-stuff.
- Keep headings clear and useful.
- Break long sections into readable paragraphs.
- Do not fabricate dates, authors, statistics, sources, or claims.

## Required metadata for every blog post

Each blog post must support:

- title
- meta description
- slug
- canonical URL
- author
- published date
- updated date, if applicable
- featured image
- image alt text
- category/tags

## HTML / page structure

Each blog article page must render:

- one clear `<h1>`
- logical `<h2>` / `<h3>` sections
- a unique `<title>`
- a unique `<meta name="description">`
- a canonical link
- Open Graph tags
- Twitter/X card tags
- descriptive image alt text
- internal links to relevant pages/posts where natural

## Structured data

Add JSON-LD structured data using `BlogPosting` or `Article` schema when appropriate.
Include headline, description, author, datePublished, dateModified, image, and mainEntityOfPage when available.

## Technical checks

After SEO-related edits:

- run the project's lint/build/test commands if available
- do not break existing routes
- verify blog pages still render correctly
- check that metadata is generated per post, not duplicated globally

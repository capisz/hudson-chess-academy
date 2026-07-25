# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Hudson Chess routing, SEO, accessibility, privacy, and ads

This app is a Vite React site that uses browser-history routes such as `/blog`,
`/blog/:slug`, `/coach-chris`, `/book`, and `/accessibility`. Vercel rewrites direct
requests to prerendered route HTML or the React fallback. Legacy `#/...` URLs are
converted to their real-path equivalents in the browser.

### Search indexing

The production build performs four steps:

1. Generate `public/rss.xml`.
2. Generate `public/sitemap.xml`.
3. Build the Vite app.
4. Prerender static HTML for every blog article and core route.

Each article HTML file includes its title, meta description, canonical URL, Open Graph
and Twitter metadata, BlogPosting JSON-LD, featured image alt text, headings, and article
paragraphs before JavaScript runs.

After deployment, submit this sitemap in Google Search Console:

```text
https://hudsonchess.com/sitemap.xml
```

### Legal pages

- Privacy Policy: `/privacy-policy`
- Cookie Policy: `/cookie-policy`
- Accessibility Statement: `/accessibility`

These pages are rendered from `src/App.jsx` and use the same visual system as the rest of the Hudson Chess site.

### Cookie consent banner

- Component: `src/CookieConsent.jsx`
- Consent helpers: `src/consent.js`
- Storage key: `horizon_chess_cookie_consent`

To update the banner or preference text, edit `src/CookieConsent.jsx`. The footer Cookie Settings button dispatches the cookie settings event from `src/consent.js`, which reopens the preferences modal after a visitor has already made a choice.

### Vercel Analytics disclosure

Vercel Analytics remains installed and rendered in `src/App.jsx`. The Privacy Policy and Cookie Policy disclose that Vercel Web Analytics is privacy-friendly, does not use third-party cookies, and stores anonymized analytics data.

### Google AdSense

AdSense loading is implemented in `src/AdSense.jsx`. The script and in-article ad units
only load when all of these are true:

- The app is running in production.
- Advertising consent has been accepted.
- A valid AdSense client and blog slot ID are available.

The approved Hudson Chess IDs are the code defaults. They can be overridden in Vercel:

```bash
VITE_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-7765754071910029
VITE_GOOGLE_ADSENSE_BLOG_SLOT_ID=7388867598
```

The reusable ad slot component is in `src/AdSense.jsx`. Ads are placed between article
sections only, not on the blog index or non-blog pages.

### ads.txt

The publisher file lives at `public/ads.txt` and deploys to:

```text
/ads.txt
```

It contains the active publisher ID `pub-7765754071910029`.

### EEA, UK, and Switzerland consent note

For personalized ads served to visitors in the EEA, UK, or Switzerland, use Google AdSense Privacy & messaging or another Google-certified Consent Management Platform integrated with the IAB Transparency and Consent Framework. The custom Horizon Chess cookie banner is useful for basic preference collection, but it is not a replacement for a Google-certified CMP where Google requires one.

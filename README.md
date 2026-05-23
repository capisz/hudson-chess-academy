# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Horizon Chess privacy, cookies, and ads setup

This app is a Vite React single-page app that uses hash routes such as `#/home`, `#/blog`, `#/privacy-policy`, and `#/cookie-policy`.

### Legal pages

- Privacy Policy: `#/privacy-policy`
- Cookie Policy: `#/cookie-policy`

Both pages are rendered from `src/App.jsx` and use the same visual system as the rest of the Horizon Chess site.

### Cookie consent banner

- Component: `src/CookieConsent.jsx`
- Consent helpers: `src/consent.js`
- Storage key: `horizon_chess_cookie_consent`

To update the banner or preference text, edit `src/CookieConsent.jsx`. The footer Cookie Settings button dispatches the cookie settings event from `src/consent.js`, which reopens the preferences modal after a visitor has already made a choice.

### Vercel Analytics disclosure

Vercel Analytics remains installed and rendered in `src/App.jsx`. The Privacy Policy and Cookie Policy disclose that Vercel Web Analytics is privacy-friendly, does not use third-party cookies, and stores anonymized analytics data.

### Google AdSense preparation

AdSense loading is prepared in `src/AdSense.jsx`, but the script will only load when all of these are true:

- The app is running in production.
- Advertising consent has been accepted.
- A real AdSense client ID is configured.

After Google gives you your AdSense client ID, add this environment variable in Vercel:

```bash
VITE_GOOGLE_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

If you create a blog ad unit, add the slot ID as:

```bash
VITE_GOOGLE_ADSENSE_BLOG_SLOT_ID=1234567890
```

The reusable ad slot component is in `src/AdSense.jsx`. The blog article page includes a careful, non-intrusive placement below the article/video companion area that stays hidden until a real AdSense client ID, ad slot ID, production environment, and advertising consent are all present.

### ads.txt

The placeholder file lives at `public/ads.txt` and should deploy to:

```text
/ads.txt
```

Replace this placeholder publisher ID:

```text
pub-0000000000000000
```

with your real AdSense publisher ID from Google.

### EEA, UK, and Switzerland consent note

For personalized ads served to visitors in the EEA, UK, or Switzerland, use Google AdSense Privacy & messaging or another Google-certified Consent Management Platform integrated with the IAB Transparency and Consent Framework. The custom Horizon Chess cookie banner is useful for basic preference collection, but it is not a replacement for a Google-certified CMP where Google requires one.

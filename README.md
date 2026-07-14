# Hasnain Abbas Portfolio

Production-ready React/Vite portfolio for Hasnain Abbas, Full Stack Web Developer.

## Run locally

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` for local configuration. For production, add the same secrets in Netlify’s environment-variable settings.

## Production

```bash
npm run build
npm run preview
```

The app is configured for Netlify: build command `npm run netlify:build`, publish directory `dist`, and Node `20.19.0`. SPA redirects are in `public/_redirects`; `/api/contact` is routed to the Netlify function in `netlify.toml`.

## Contact form (Resend)

The form posts to a Netlify serverless function and sends a real email to `hassnainlilani@gmail.com` by default. It includes server-side validation and a honeypot field; credentials never reach the browser.

1. Create a [Resend](https://resend.com) account and verify a sending domain.
2. In Netlify, set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (for example, `Portfolio <contact@your-domain.com>`).
3. Optionally set `CONTACT_RECIPIENT` to change the recipient. Otherwise it remains `hassnainlilani@gmail.com`.
4. Deploy, then submit a form entry to test delivery. A missing provider configuration returns an honest error rather than a fake success message.

## Replace the resume

Place the final PDF at `public/resume.pdf`. Both desktop and mobile navigation use that path and download it directly.

## Replace the portrait

Put the professional image at `public/portrait-placeholder.jpg`. The component uses responsive `object-fit: cover`; no code change is required.

## Structure

- `src/main.jsx` — routes, reusable UI, content data, interactions
- `src/styles.css` — approved visual system and responsive styles
- `public/` — deployment, SEO, and PWA assets

Before deployment, replace example project URLs, social profile URLs, `siteUrl` in `src/main.jsx`, and the sitemap domain with the final live domain.

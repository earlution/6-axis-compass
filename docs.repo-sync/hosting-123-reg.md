# Hosting — 6axiscompass.uk (123-reg)

Production domain: **https://6axiscompass.uk**  
Registrar/hosting: **123-reg**

GitHub Pages remains a valid fallback or staging mirror for the **compass prototype**, but production merch should target your domain — Pages is a poor fit for commercial checkout (no backend; ToS).

**Planning:** [`merch-infrastructure.md`](merch-infrastructure.md)

## Recommended layout

| Service | Host | URL |
|---------|------|-----|
| Static app (`dist/`) | 123-reg web hosting | `https://6axiscompass.uk/` |
| Shop | same upload | `https://6axiscompass.uk/shop.html` |
| Checkout API (`api/server.js`) | Node-capable host (see below) | `https://api.6axiscompass.uk/` |

The compass quiz and shop are static files — upload the contents of `dist/` after `npm run build`.

The **merch checkout API must stay on a Node server** (Stripe webhooks, PNG rendering, Printful). Typical 123-reg **shared** hosting does not run a persistent Node process. Options:

1. **Subdomain on Fly.io (simplest)** — `api.6axiscompass.uk` → CNAME to Fly app; static site on 123-reg
2. **123-reg VPS** — run `node api/server.js` behind nginx + Let's Encrypt on the same account
3. **Another PaaS** (Railway, Render) — same pattern as Fly

## Build for production

```bash
MERCH_API_BASE=https://api.6axiscompass.uk npm run build
```

Upload everything in `dist/` to your 123-reg web root (often `public_html/` via FTP, SFTP, or File Manager).

Include:

- `index.html`, `shop.html`, `data.html`
- `merch-terms.html`, `merch-privacy.html`
- `assets/merch/` (mockup SVGs)
- PWA assets (`favicon.svg`, `manifest.json`, etc.)

## DNS (123-reg)

| Record | Name | Target |
|--------|------|--------|
| A or 123-reg default | `@` | 123-reg hosting IP (from control panel) |
| CNAME | `www` | `6axiscompass.uk` or hosting alias |
| CNAME | `api` | `<your-fly-app>.fly.dev` (if using Fly for API) |

Enable HTTPS in 123-reg (often free SSL via control panel).

## API environment (on Node host)

```bash
MERCH_SUCCESS_URL=https://6axiscompass.uk/shop.html?paid=1
MERCH_CANCEL_URL=https://6axiscompass.uk/shop.html
MERCH_ARTWORK_PUBLIC_ORIGIN=https://api.6axiscompass.uk
MERCH_API_BASE=https://api.6axiscompass.uk   # build-time only (see above)
```

Set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `PRINTFUL_API_KEY` on the API host only — never in static files.

Stripe webhook URL: `https://api.6axiscompass.uk/api/webhooks/stripe`

## CORS

If the API restricts origins (recommended for production), allow:

- `https://6axiscompass.uk`
- `https://www.6axiscompass.uk`

(Current default is `*` for development.)

## Deploy checklist (123-reg)

- [ ] DNS for `@` and `www` pointing at 123-reg hosting
- [ ] SSL enabled for `6axiscompass.uk`
- [ ] `dist/` uploaded to web root
- [ ] `api.6axiscompass.uk` DNS + Node API deployed
- [ ] Build used `MERCH_API_BASE=https://api.6axiscompass.uk`
- [ ] Stripe webhook + Printful keys on API host
- [ ] Test: quiz → shop → checkout → return to `shop.html?paid=1`

See also: [`merch-deploy.md`](merch-deploy.md) (Fly API details).

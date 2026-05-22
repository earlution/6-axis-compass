# Merch API deployment

Production site: **https://6axiscompass.uk** (123-reg).  
Static upload guide: [`hosting-123-reg.md`](hosting-123-reg.md).

**Before provisioning:** [`merch-infrastructure.md`](merch-infrastructure.md) — what you need beyond static hosting.

The checkout API runs separately on a Node host (recommended: **`api.6axiscompass.uk`** on Fly.io).

## Fly.io (API — recommended)

1. Install [flyctl](https://fly.io/docs/hands-on/install-flyctl/)
2. `fly launch --no-deploy` (use existing `fly.toml`) or `fly apps create six-axis-compass-api`
3. Create volume: `fly volumes create merch_data --region lhr --size 1`
4. Add DNS: CNAME `api.6axiscompass.uk` → `<app>.fly.dev`
5. Set secrets:

```bash
fly secrets set \
  STRIPE_SECRET_KEY=sk_live_... \
  STRIPE_WEBHOOK_SECRET=whsec_... \
  PRINTFUL_API_KEY=... \
  MERCH_SUCCESS_URL=https://6axiscompass.uk/shop.html?paid=1 \
  MERCH_CANCEL_URL=https://6axiscompass.uk/shop.html \
  MERCH_ARTWORK_PUBLIC_ORIGIN=https://api.6axiscompass.uk
```

6. `fly deploy`
7. Register Stripe webhook: `https://api.6axiscompass.uk/api/webhooks/stripe` → `checkout.session.completed`
8. Build static site: `MERCH_API_BASE=https://api.6axiscompass.uk npm run build`
9. Upload `dist/` to 123-reg (see hosting guide)

## Launch checklist

- [ ] `feat/merch` merged to `main`
- [ ] Printful variant IDs updated in `api/config/printful-catalog.json`
- [ ] Sample orders approved
- [ ] DNS: `6axiscompass.uk` + `api.6axiscompass.uk`
- [ ] Static `dist/` live on 123-reg with correct `MERCH_API_BASE` build
- [ ] Stripe live keys on API host
- [ ] Printful live API key on API host
- [ ] Stripe webhook registered
- [ ] Policy pages live (`merch-terms.html`, `merch-privacy.html`)
- [ ] Tag release `merch-v1.0.0`

## GitHub Pages (optional)

You can keep Pages as a mirror or staging URL. Production merch checkout should use the domain build:

`MERCH_API_BASE=https://api.6axiscompass.uk npm run build`

Do not point live Stripe redirects at the `github.io` URL if `6axiscompass.uk` is canonical.

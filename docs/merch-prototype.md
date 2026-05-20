# Merch shop prototype

Feedback-ready UI on branch **`merch-shop`**: print your compass on apparel. Checkout is **stubbed** (no Printful or Stripe yet).

## What is included

| Step | Page | Behaviour |
|------|------|-----------|
| 1 | `index.html` (results) | Garment carousel mockup (tee / sweatshirt / hoodie), white/black colour, **Buy this …** |
| 2 | `shop.html` | Full configurator: comparisons (max 2), garment, colour, size, placeholder price |
| 3 | Checkout button | Modal: “Checkout coming soon” + order summary + copy for feedback |

## Local demo

```bash
git checkout merch-shop
npm run build
npx --yes serve dist -p 8080
```

1. Open `http://localhost:8080/` — complete the quiz (or use a share link with `#v2;…`).
2. On results, toggle one or two actor comparisons.
3. Use the **Wear your map** carousel; switch garment colour.
4. Click **Buy this t-shirt** (label follows carousel).
5. On shop, change size/garment → **Checkout** → read stub modal → **Copy summary**.

Direct visit to `shop.html` without scores redirects to `index.html?shop=needs-results`.

## State and URLs

- **v3 hash** on `shop.html` encodes scores, orientation, axis order, up to two actor slugs, garment, garment colour, chart ink theme, and register mode. See [`src/merch-url.js`](../src/merch-url.js).
- **`sessionStorage`** key `six-axis-compass-merch-draft` holds custom actors and uploaded comparison maps (not in the hash).

Example:

```
shop.html#v3;c=5.0,e=5.0,m=5.0,s=5.0,l=5.0,a=5.0;o=flat;x=cemslg;a=Green-Party,Reform-UK;g=hoodie;gc=black;th=dark;reg=primary
```

## Source layout

| File | Role |
|------|------|
| [`src/merch-catalog.js`](../src/merch-catalog.js) | Garment IDs, placeholder GBP prices, asset paths |
| [`src/merch.js`](../src/merch.js) | Mockup HTML, carousel, stub checkout modal |
| [`src/merch-url.js`](../src/merch-url.js) | v3 encode/decode, draft persistence |
| [`src/shop-ui.js`](../src/shop-ui.js) | Shop page renderer |
| [`src/shop.html`](../src/shop.html) | Shop shell |
| [`src/assets/merch/`](../src/assets/merch/) | Placeholder garment SVGs (built to `dist/assets/merch/`) |
| [`api/lib/printful-stub.js`](../api/lib/printful-stub.js) | Future Printful hooks (throws if called) |

Build: `scripts/build.js` emits `dist/shop.html` and copies merch assets.

## Tests

```bash
npm test   # includes tests/merch-url.test.js (v3 hash round-trip)
```

## Spoke labels

Charts use uppercase **trigrams** on the rim (`CUL`, `ECO`, `MIL`, `SOV`, `GOV`, `CLA`) — better legibility on small mockups. Full axis names remain in the shop configurator. Brand spec: [`brand-trigrams.md`](brand-trigrams.md).

## Shop map colour and key

- **Your map colour** — colour picker plus “Match garment” and “Gold” presets; independent of garment white/black.
- **Key** (under mockup) — **Me** (your polygon) plus each selected comparison by **real actor name** (e.g. Green Party, Reform UK), with matching swatches.
- Persisted in v3 hash (`uc=rrggbb`) and `sessionStorage` draft.

## Production (not implemented)

See [`merch-printful-integration.md`](merch-printful-integration.md) for Printful + Stripe + chart render pipeline.

## Feedback script

1. Quiz → Green Party + Reform UK overlays.
2. Black hoodie in carousel → Buy.
3. Shop: size L → Checkout → copy summary into notes.

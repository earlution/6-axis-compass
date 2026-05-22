# Merch shop

Custom compass prints: results → [`shop.html`](../src/shop.html) → Stripe Checkout → Printful fulfilment (UK/EU).

**Integration:** [`merch-printful-integration.md`](merch-printful-integration.md)  
**Catalog:** [`merch-printful-catalog.md`](merch-printful-catalog.md)

## What is included

| Step | Page | Behaviour |
|------|------|-----------|
| 1 | `index.html` (results) | Garment carousel; **Buy this …** |
| 2 | `shop.html` | Configurator: comparisons, product (tee/sweat/hoodie/mug), size, checkout |
| 3 | Stripe | Payment + shipping address |
| 4 | Printful | Print + ship |

## Local demo

```bash
git checkout feat/merch
npm install
npm run build
npx --yes serve dist -p 8080
```

In another terminal:

```bash
cp .env.example .env.local
# Set STRIPE_SECRET_KEY (test mode)
node api/server.js
```

Open `http://localhost:8080/shop.html` after completing the quiz.

## State and URLs

- **v3 hash** encodes scores, garment, colour, mug size (`;ms=`), map colour (`;uc=`)
- **`sessionStorage`** draft holds custom actors and uploaded maps

Example:

```
shop.html#v3;c=5.0,e=5.0,m=5.0,s=5.0,l=5.0,a=5.0;o=flat;x=cemslg;g=mug;gc=white;th=light;ms=11oz;uc=c8a84b
```

## Source layout

| File | Role |
|------|------|
| [`src/merch-catalog.js`](../src/merch-catalog.js) | Products, prices, API base |
| [`src/merch-checkout.js`](../src/merch-checkout.js) | Checkout POST + redirect |
| [`src/merch-url.js`](../src/merch-url.js) | v3 hash + draft |
| [`src/shop-ui.js`](../src/shop-ui.js) | Shop renderer |
| [`api/lib/merch-orders.js`](../api/lib/merch-orders.js) | Checkout + fulfilment |

Build: `MERCH_API_BASE=http://localhost:3000 npm run build`

## Tests

```bash
npm test
```

## Stripe CLI (webhook testing)

With the API running locally and `STRIPE_WEBHOOK_SECRET` from the CLI:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Complete a test checkout in the shop; the API acknowledges the webhook immediately and fulfils asynchronously (see `api/lib/merch-fulfilment-queue.js`).

Poll order status from the shop return URL (`shop.html?paid=1&session_id=…`) or:

```bash
curl -s http://localhost:3000/api/orders/session/cs_test_...
```


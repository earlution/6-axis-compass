# Merch — Printful product catalog

**Status:** Template for `feat/merch`. Replace placeholder `variant_id` values in [`api/config/printful-catalog.json`](../api/config/printful-catalog.json) after Printful dashboard review.

## Ethical baseline (v1)

Product selection follows Printful’s published standards:

- Fulfilment via **UK/EU** Printful nodes where available
- Partner facilities subject to Printful’s audit programme
- Manual review of each blank before adding to catalog

## Products under review

| Internal ID | Printful product (verify in dashboard) | Print method | Notes |
|-------------|----------------------------------------|--------------|-------|
| `tee` | Bella+Canvas 3001 Unisex Staple Tee | DTG | White + black, XS–XXL |
| `sweatshirt` | Gildan 18000 Heavy Blend Crewneck | DTG | White + black, XS–XXL |
| `hoodie` | Gildan 18500 Heavy Blend Hoodie | DTG | White + black, XS–XXL |
| `mug` | White Glossy Mug 11oz / 15oz | Sublimation | Radar layout; handle dead zone respected |

## Print areas

| Product | Pixels @ 300 DPI | API field |
|---------|------------------|-----------|
| Apparel chest | 4500 × 5400 | `products.*.printArea` |
| Mug wrap | 2700 × 1125 | `products.mug.printArea` |

## Sample order checklist (manual)

Before launch, order physical samples:

- [ ] White tee — radar with 0 overlays
- [ ] Black tee — radar with 2 actor overlays (transparent DTG)
- [ ] Mug 11oz — personalized radar
- [ ] Mug 11oz — trigram ring (if offered)

Validate trigram legibility at print size (`labelMerch: true`).

## Updating variant IDs

1. Open Printful dashboard → Product → Variant
2. Copy numeric `variant_id` for each size/colour
3. Update `api/config/printful-catalog.json`
4. Run `npm test` — catalog validation tests must pass

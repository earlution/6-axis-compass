# Six-axis trigrams — brand and UI specification

**Status:** Ratified (2026-05-20). Spoke labels on all radar charts use **uppercase three-letter trigrams**. Full axis names and pole definitions remain everywhere else in the web app.

## Canonical codes

| Axis | Trigram | Notes |
|------|---------|--------|
| Cultural | **CUL** | From *Cultural*; **not** CTE (culture) or CULt ambiguity accepted in context |
| Economic | **ECO** | |
| Military | **MIL** | |
| Sovereignty | **SOV** | |
| Governance | **GOV** | Axis = mode of governance, not “the government” as actor; disambiguated by legend / score bars |
| Class | **CLA** | Class-conflict dimension; not CLS (classroom) |

All trigrams are **uppercase**, **three characters**, **unique**, and treated as **stable IDs** (not translated in i18n).

**Source of truth (app):** [`src/data.js`](../src/data.js) — `AXIS_TRIGRAMS`, `getAxisTrigram()`.  
**API mirror:** [`api/lib/axis-labels.js`](../api/lib/axis-labels.js) — keep in sync; exposed on `GET /api/axes` as `trigram` per axis and top-level `trigrams` map.

## Typography on the radar

- Rim labels: trigram, **12px**, **font-weight 600**, **letter-spacing 0.12em**
- `aria-label` and SVG `<title>`: full axis name (e.g. “Sovereignty”) for accessibility and hover
- Override: `drawRadar({ labelMode: 'full' })` or `POST /api/chart` with `"labelMode": "full"` for papers / print when long words are required

## Naming layers (dual-register for typography)

| Layer | Content | Example |
|-------|---------|---------|
| **Spoke (glyph)** | Trigram | `SOV` |
| **Score bars, quiz, modals, dataset** | Full name + poles | Sovereignty · Supranational ↔ National sovereignty |
| **Share hash / machine** | Single-letter keys | `s=` (Sovereignty) in `#v2;…` |

The hex chart is **logo space**; the rest of the app is **prose space**. Users learn meaning from copy below the chart, not from the rim alone.

## Ring orders (brand)

Trigram **order** is part of the brand. Do not permute rings between products without intent.

| Layout | Clockwise trigrams | Hash axis key |
|--------|-------------------|---------------|
| **Pedagogical (OQ2)** | `CUL ECO MIL SOV GOV CLA` | `x=cemslg` |
| **Spatial (OQ5)** | `ECO GOV CLA CUL SOV MIL` | `x=egacsm` |

Constants: `TRIGRAM_RING_PEDAGOGICAL`, `TRIGRAM_RING_SPATIAL` in [`src/data.js`](../src/data.js).

## Merch and product extensions

Trigrams scale to small surfaces (mockup radar, DTG, enamel pins) better than full words.

### Apparel (existing merch prototype)

- Chart rim: trigrams (automatic via `drawRadar`)
- Legend / shop copy: full names

### Mugs and “trigram-only” products (future)

Concepts that **do not require a full radar**:

1. **The ring** — six trigrams in fixed ring order, one colour; brand stamp
2. **Personal** — exterior hex silhouette; handle-side hero trigram for dominant axis
3. **Comparison** — two rings or solid/dashed codes for you vs actor
4. **Abstract** — spokes + trigrams at vertices, no numeric grid
5. **Glossary interior** — outside: `SOV`; inside: full name + pole definitions
6. **Series** — six SKUs, each mug heroing one trigram

**Print note:** mug wrap must respect handle dead zone (~60–90°); lock ring order to pedagogical or spatial per SKU line.

## Implementation checklist

- [x] `AXIS_TRIGRAMS` in `src/data.js`
- [x] `chart.js` default `labelMode: 'trigram'`
- [x] `GET /api/axes` includes `trigram`
- [x] `POST /api/chart` accepts `labelMode`: `"trigram"` (default) | `"full"`
- [ ] Merch SKUs: trigram-only mug templates (design)
- [ ] Figma / SVG brand sheet: spacing, ring, minimum size

## Related docs

- [`docs/merch-prototype.md`](merch-prototype.md) — shop UI prototype (`merch-shop` branch)
- [`docs/merch-printful-integration.md`](merch-printful-integration.md) — fulfilment pipeline
- [`API.md`](../API.md) — chart API including `labelMode`

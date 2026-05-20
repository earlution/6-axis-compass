# Six-Axis Political Compass

The standard left–right spectrum collapses six distinct political dimensions into one. This tool maps your position across all of them.

## The Six Axes

| Axis | Low (0) | High (10) |
|------|---------|-----------|
| **Cultural** | Cultural internationalism | Cultural nationalism |
| **Economic** | Economic internationalism | Economic nationalism |
| **Military** | Non-interventionist | Interventionist |
| **Sovereignty** | Supranational | National sovereignty |
| **Governance** | Maximal autonomy / consent-based / democratic | Maximal hierarchy / authority / coercive |
| **Class** | Class harmony | Class conflict |

## Usage

Open `dist/index.html` in any modern browser. No build step, no server, no dependencies.

## How it works

1. You are presented with **24 statements** (4 per axis).
2. For each statement, select how much you **agree or disagree** on a 5-point Likert scale.
3. Your answers are scored:
   - Forward-scored questions add the response value (0–4) directly.
   - Reverse-scored questions subtract the value from 4.
   - Each axis raw total (0–16) is normalised to a 0–10 scale.
4. Your profile is plotted on a **hexagonal radar chart**.
5. Optionally **compare your profile** against pre-loaded political parties or upload a saved map.

## Forkable, Traceable Actor Data

Every political actor in the compass is defined by a standalone JSON file in `data/actors/`. Each file contains:

- **Metadata** — name, slug, category, colour, active period, curator, version, last-updated date
- **Scores** — a 0–10 value on each of the six axes
- **Traceability** — per-axis confidence level, rationale, and a list of cited sources
- **Dual-register** *(optional)* — declared scores (what actors say) vs structural scores (what actors do), plus delta and per-register confidence

Sources can be manifestos, legislation, parliamentary votes, speeches, academic papers, or policy documents. Each source includes a title, date, URL, quoted relevant text, and a full citation.

The dual-register layer is maintained in `data/research/` as part of the **A Common Enemy** research programme. Files there follow the Dual-Register Sourcing Protocol and can be migrated into individual actor JSONs via `scripts/migrate-dual-register.js`.

### Contributing New Actors or Improved Scores

Researchers are invited to fork this repository and submit pull requests with new actor data or better-sourced scores. The data schema is defined in `data/schema.json` and every file is validated against it. See [Contributing](#contributing) below.

### Browsing Evidence in the App

In the results screen, every pre-loaded actor has an **information icon** ("i") next to its toggle button. Clicking it opens a detail panel showing:

- Actor metadata (curator, version, last updated)
- Per-axis score with confidence badge
- Rationale text
- Full source citations with clickable links to Hansard, legislation.gov.uk, and other primary sources

This makes the compass a living research instrument: users can inspect the evidence behind every score rather than taking it on trust.

### Public Actor Dataset Page

For a sortable, searchable table of **all actor scores** with per-axis confidence, rationale, and source links, see the dedicated data page:

**[Browse the full dataset →](https://earlution.github.io/6-axis-compass/data.html)**

The page lists every actor, their six-axis scores, confidence levels, and expandable detail panels showing curators, version history, rationales, and primary source links. You can sort by any axis or search by actor name, category, or source title.

## API

### REST API (Server-side)

A small HTTP API generates radar charts programmatically (papers, CI, **A Common Enemy** figure pipelines). The static GitHub Pages app does **not** host this API — run it locally or deploy `api/server.js` behind HTTPS.

```bash
npm run api
```

Copy `.env.example` to `.env.local` if you need non-default ports or legacy auth. The server listens on `API_PORT` (default **3000**).

**API v2.0.0 (public read, Phase 1):** When `API_PUBLIC_READ=true` (default), these routes need **no** `Authorization` header:

| Endpoint | Auth (default) | Description |
|----------|----------------|-------------|
| `GET /api/health` | No | Health check (`apiVersion`, `publicRead`, app `version`) |
| `GET /api/actors` | Public | List actors + `meta.axesOrder` |
| `GET /api/actors/:slug` | Public | Full actor record (ETag / 304) |
| `POST /api/chart` | Public | SVG or PNG chart (rate-limited: 60/min/IP) |
| `GET /api/axes` | Public | Canonical axis order and pole labels |
| `GET /api/openapi.json` | Public | OpenAPI 3.1 document |

Set `API_PUBLIC_READ=false` to require `Authorization: Bearer $API_SECRET` on read routes (legacy v1.x). Private write (`ADMIN_SECRET`, `POST /api/admin/*`) is **Phase 2** — see [`docs/feature-request-public-private-api-v0.1.0.md`](docs/feature-request-public-private-api-v0.1.0.md).

| Variable | Default | Role |
|----------|---------|------|
| `API_PUBLIC_READ` | `true` | Public read without Bearer |
| `API_SECRET` | *(unset)* | Legacy read Bearer when public read is off |
| `API_CHART_RATE_LIMIT` | `60` | Chart requests per IP per minute |

**Example — public chart (no secret):**

```bash
curl -sS -X POST http://localhost:3000/api/chart \
  -H "Content-Type: application/json" \
  -d '{"scores":{"Cultural":5,"Economic":3,"Military":7,"Sovereignty":5,"Governance":6,"Class":3},"actors":["Green Party"],"format":"png"}' \
  -o comparison.png
```

Paper-style actor-only PNG: [`docs/examples/api/chart-public-read.sh`](docs/examples/api/chart-public-read.sh).

Full trust zones, limits, CORS, errors, and cURL recipes: [`API.md`](./API.md).

**Default radar layout (v2.7.0+, OQ5 spatial):** Economic → Governance → Class → Cultural → Sovereignty → Military (`layout: spatial`, `orientation: spatial`, hash `x=egacsm`). **Pedagogical order (OQ2):** Cultural → Economic → Military → Sovereignty → Governance → Class (`layout: pedagogical`, `x=cemslg`). See [`API.md` § Radar layouts](./API.md#radar-layouts-v270).

### CI/CD Dispatch API (GitHub Actions)

External repositories (such as `common-enemy`) can trigger selective generation and OSF upload via `repository_dispatch` events.

| Event type | What it does |
|-----------|--------------|
| `paper-revised` | Regenerate all artifacts and upload the full set. |
| `generate-radar` | Generate artifacts for specific actors only, optionally upload to OSF. |
| `upload-asset` | Upload a single pre-built file to a specific OSF component. |

All dispatch events require a shared `DISPATCH_TOKEN` secret for authentication. See [`API.md`](./API.md) for full payload schemas and triggering examples from another repository.

### Shareable Web URL (Client-side)

The live UI supports generating maps directly via a **parameterised hash URL**—no API key or server required. Everything is rendered client-side.

```
https://earlution.github.io/6-axis-compass/#v2;c=5.0,e=5.0,m=5.0,s=5.0,l=5.0,a=5.0;o=flat;x=cemslg
```

| Segment | Meaning | Example |
|---------|---------|---------|
| `v2` | URL format version (`v1` legacy, `v2` current) | `v2` |
| `c=5.0,e=5.0,...` | Axis scores (0–10). Keys: `c`=Cultural, `e`=Economic, `m`=Military, `s`=Sovereignty, `l`=Governance, `a`=Class | `c=7.0,e=3.0,m=8.0,s=6.0,l=5.0,a=1.0` |
| `o=flat` | Chart orientation: `flat` or `pointy` | `o=pointy` |
| `x=cemslg` | Axis display order (clockwise; default OQ2 order) | `x=cemslg` |
| `i=` *(optional)* | Inverted axes (swapped poles) | `i=la` |

**Example — Centrist profile:**
```
https://earlution.github.io/6-axis-compass/#v2;c=5.0,e=5.0,m=5.0,s=5.0,l=5.0,a=5.0;o=pointy;x=cemslg
```

Visiting a valid hash URL skips the quiz and renders the results screen immediately. The URL auto-updates when orientation or axis order changes, so copying the address bar always captures the current view. `v1` URLs are backwards-compatible.

### Merch shop prototype (`merch-shop` branch)

Custom apparel flow (Printful-ready UI, **checkout stubbed**): results → garment mockup carousel → [`shop.html`](./src/shop.html) configurator → stub checkout modal.

| Output | Description |
|--------|-------------|
| `dist/shop.html` | Shop configurator (same styles as main app) |
| `dist/assets/merch/` | Placeholder garment mockup SVGs |

**Demo locally:** `npm run build` then serve `dist/` (see [`docs/merch-prototype.md`](./docs/merch-prototype.md)).

- **v3 hash** on shop URLs carries scores, comparisons (actor slugs), garment, colour, and chart ink theme.
- **sessionStorage** draft preserves custom actors and uploaded maps.
- Future Printful/Stripe wiring: [`docs/merch-printful-integration.md`](./docs/merch-printful-integration.md).

Tagged releases for this prototype use `merch-prototype-v*` (see git tags).

## Paper Artifacts

For academic publication, `npm run generate-artifacts` produces static, versioned files in `paper-artifacts/`:

| Format | Purpose |
|--------|---------|
| `.json` | Raw scores + full provenance (version, git commit, generation timestamp, traceability) |
| `.svg` | Print-ready vector radar chart (600×600, white background, self-contained) |
| `.tex` | LaTeX `\newcommand` definitions for each axis score |

Comparison charts (multi-actor overlays) are also generated based on `scripts/paper-config.json`. See [`paper-artifacts/README.md`](paper-artifacts/README.md) for LaTeX integration instructions.

## Development

The source is organised as ES modules under `src/`:

| File | Purpose |
|------|---------|
| `src/data.js` | Axes, questions, response scales, and actor scores (with fallback) |
| `src/i18n.js` | Translation dictionary and `t()` helper |
| `src/url.js` | Shareable URL encoding/decoding |
| `src/quiz.js` | Quiz state management and scoring engine |
| `src/chart.js` | SVG radar chart renderer |
| `src/ui.js` | Intro, quiz, and results screen rendering (including actor modal) |
| `src/export.js` | PNG, JSON, and XML export; JSON/XML import |
| `src/merch-url.js` | Merch v3 URL hash and sessionStorage draft |
| `src/merch-catalog.js` | Garment catalogue and placeholder prices |
| `src/merch.js` | Merch mockup carousel and stub checkout modal |
| `src/shop-ui.js` | Shop page renderer |
| `src/shop.html` | Merch shop shell |
| `src/styles.css` | Full component stylesheet |
| `src/index.html` | Shell that imports and wires the modules |

Actor data is loaded at build time from `data/actors/*.json` into `src/actors-generated.js`, which is then inlined into the deployable artifact. This preserves the zero-dependency constraint while making the data traceable and forkable.

### Build

```bash
npm run build
```

This runs `scripts/sync-actor-data.js` (regenerates `src/actors-generated.js` from `data/actors/`) followed by `scripts/build.js`, which inlines modules into `dist/index.html`, `dist/shop.html`, and `dist/data.html`, and copies `src/assets/merch/` to `dist/assets/merch/`.

### Watch mode

```bash
npm run dev
```

Rebuilds on every source file change.

### Paper artifacts

```bash
npm run generate-artifacts
```

Requires `jsdom` (installed via `npm install`).

## Contributing

### Adding or updating an actor

1. Create or edit a file in `data/actors/{slug}.json` matching the schema in `data/schema.json`.
2. Include at least one source per axis with a URL and citation.
3. Run `npm run build` to regenerate `src/actors-generated.js` and `dist/index.html`.
4. Run `npm run generate-artifacts` to update the paper artifacts.
5. Commit both the data file and the regenerated artifacts.

### Data schema

```json
{
  "schemaVersion": "1.1.0",
  "actor": {
    "name": "...",
    "slug": "...",
    "category": "...",
    "color": "#RRGGBB",
    "version": "1.0.0",
    "lastUpdated": "YYYY-MM-DD",
    "curator": "...",
    "contributors": ["..."]
  },
  "scores": {
    "Cultural": {
      "value": 5,
      "confidence": "high",
      "rationale": "...",
      "sources": [
        {
          "type": "manifesto",
          "title": "...",
          "date": "YYYY-MM-DD",
          "url": "https://...",
          "relevantText": "Quoted excerpt...",
          "citation": "Full citation..."
        }
      ]
    }
  },
  "dualRegister": {
    "protocol": "Dual-Register Sourcing Protocol v0.2.0",
    "period": "2010–2024",
    "status": "governing",
    "evidenceQuality": "strong",
    "declared": { "Cultural": 10, "Economic": 0, "Military": 8.1, "Sovereignty": 8.8, "Governance": 8.8, "Class": 2.5 },
    "structural": { "Cultural": 9.4, "Economic": 0, "Military": 10, "Sovereignty": 8.1, "Governance": 8.8, "Class": 2.5 },
    "delta": { "Cultural": -0.6, "Economic": 0, "Military": 1.9, "Sovereignty": -0.7, "Governance": 0, "Class": 0 },
    "confidence": {
      "Cultural": { "declared": 0.95, "structural": 0.90, "note": "14-year governing record" }
    },
    "sources": {
      "declared": [{ "type": "manifesto", "title": "...", "url": "...", "citation": "..." }],
      "structural": [{ "type": "legislation", "title": "...", "url": "...", "citation": "..." }]
    }
  }
}
```

Confidence levels: `low`, `medium`, `high`, `very-high`.
Source types: `manifesto`, `legislation`, `vote`, `policy`, `speech`, `book`, `academic`, `other`.

## License

MIT License — see [LICENSE](./LICENSE).

## Acknowledgements

Originally developed as part of [A Common Enemy](https://github.com/earlution/common-enemy).

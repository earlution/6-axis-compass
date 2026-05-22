# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[3.6.0]: https://github.com/earlution/6-axis-compass/releases/tag/v3.6.0
[3.5.0]: https://github.com/earlution/6-axis-compass/releases/tag/v3.5.0
[3.4.0]: https://github.com/earlution/6-axis-compass/releases/tag/v3.4.0
[3.3.0]: https://github.com/earlution/6-axis-compass/releases/tag/v3.3.0
[3.2.0]: https://github.com/earlution/6-axis-compass/releases/tag/v3.2.0
[3.1.1]: https://github.com/earlution/6-axis-compass/releases/tag/v3.1.1
[3.1.0]: https://github.com/earlution/6-axis-compass/releases/tag/v3.1.0
[3.0.0]: https://github.com/earlution/6-axis-compass/releases/tag/v3.0.0
[2.6.2]: https://github.com/earlution/6-axis-compass/releases/tag/v2.6.2
[2.6.1]: https://github.com/earlution/6-axis-compass/releases/tag/v2.6.1
[2.6.0]: https://github.com/earlution/6-axis-compass/releases/tag/v2.6.0
[2.5.8]: https://github.com/earlution/six-axis-compass/releases/tag/v2.5.8
[2.5.7]: https://github.com/earlution/six-axis-compass/releases/tag/v2.5.7
[2.5.6]: https://github.com/earlution/six-axis-compass/releases/tag/v2.5.6
[2.5.5]: https://github.com/earlution/six-axis-compass/releases/tag/v2.5.5
[2.5.4]: https://github.com/earlution/six-axis-compass/releases/tag/v2.5.4
[2.5.3]: https://github.com/earlution/six-axis-compass/releases/tag/v2.5.3
[2.5.2]: https://github.com/earlution/six-axis-compass/releases/tag/v2.5.2
[2.5.1]: https://github.com/earlution/six-axis-compass/releases/tag/v2.5.1
[2.5.0]: https://github.com/earlution/six-axis-compass/releases/tag/v2.5.0
[2.4.9]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.9
[2.4.8]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.8
[2.4.7]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.7
[2.4.6]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.6
[2.4.5]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.5
[2.4.4]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.4
[2.4.3]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.3
[2.4.2]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.2
[2.4.1]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.1
[2.4.0]: https://github.com/earlution/six-axis-compass/releases/tag/v2.4.0
[2.3.0]: https://github.com/earlution/six-axis-compass/releases/tag/v2.3.0
[2.2.0]: https://github.com/earlution/six-axis-compass/releases/tag/v2.2.0
[2.1.0]: https://github.com/earlution/six-axis-compass/releases/tag/v2.1.0
[2.0.0]: https://github.com/earlution/six-axis-compass/releases/tag/v2.0.0
[1.9.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.9.0
[1.8.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.8.0
[1.7.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.7.0
[1.6.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.6.0
[1.5.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.5.0
[1.4.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.4.0
[1.3.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.3.0
[1.2.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.2.0

## [Unreleased]

## [3.6.0] - 2026-05-22

### Added

- **Google Drive documentation workspace:** repo `google-drive/` symlinks to Drive **`6-Axis Compass`**; `docs.repo-sync/` is the git release mirror; `scripts/link-google-drive-staging.sh`, `consolidate-docs-to-drive.sh`, and `sync-docs-to-git.sh` wire mount → edit → commit.
- **`SPATIAL_STRUCTURAL_DISPLAY_INVERT`** — register-aware spatial rim inversion when `register: "structural"` on `POST /api/chart` (Governance + Class only).

### Changed

- **Documentation layout:** repo `docs/` deprecated (`docs/DEPRECATED.md` stub); working docs on Drive; `for-common-enemy/` handoff lives under `google-drive/handoff/for-common-enemy/` only.
- **Spatial default inversion:** primary spatial charts use no rim inversion (matches quiz UI); structural **(S)** scores invert Governance + Class only.
- **README / API links** point at `docs.repo-sync/` for git-visible documentation paths.

## [3.5.0] - 2026-05-20

### Changed

- **Radar axes:** Spokes extend **½ grid segment** (1 score unit) beyond the outermost zone; trigram labels follow the new tips.
- **Release tags:** Post-merch line renumbered from mistaken `v2.7.x` / `merch-prototype-v1.0.0` to `v3.0.0`–`v3.4.0` on the same commits (see entries below).

## [3.4.0] - 2026-05-20

*Formerly tagged `v2.7.4`.*

### Added

- **Merch mockup trigrams:** `labelMerch` on `drawRadar` enlarges spoke codes (CUL, ECO, MIL, SOV, GOV, CLA) so they stay legible when the chart is scaled on garment previews; `renderMerchRadarChart()` on results and shop.

### Changed

- **`scripts/build.js`:** Bundle `chart.js` before `merch.js` (merch imports `drawRadar`).

## [3.3.0] - 2026-05-20

*Formerly tagged `v2.7.3`.*

### Added

- **Merch shop map colour:** Colour picker on `shop.html` for your polygon (independent of garment colour), with “Match garment” and “Gold” presets; persisted in v3 hash (`uc=`) and session draft.
- **Merch shop key:** Legend under mockup — **Me** plus comparison overlays by **actor name** (e.g. Green Party), with colour swatches.

### Changed

- **`scripts/build.js`:** Bundle `merch-catalog.js` before `merch-url.js` (import order).
- **Results → shop:** Passes map colour from results theme when opening shop.

## [3.2.0] - 2026-05-20

*Formerly tagged `v2.7.2`.*

### Added

- **Axis trigrams (brand):** Radar spoke labels default to uppercase **CUL, ECO, MIL, SOV, GOV, CLA** (Cultural = **CUL**, not CTE). Full names in score bars / quiz; `aria-label` + SVG `<title>` on spokes. [`docs/brand-trigrams.md`](docs/brand-trigrams.md) captures UI layers, ring orders, and merch/mug extensions.
- **`POST /api/chart` `labelMode`:** `"trigram"` (default) or `"full"`.
- **`GET /api/axes`:** `trigram` per axis and `trigrams` map.
- **`tests/trigrams.test.js`:** Uniqueness and ring-order smoke tests.

### Changed

- **`src/chart.js`:** `labelMode` parameter; trigram typography (12px, semibold, letter-spacing).

## [3.1.1] - 2026-05-20

*Formerly tagged `v2.7.1`.*

### Fixed

- **GitHub Pages blank app** — `scripts/build.js` now strips multi-line `import` statements from inlined bundles; a surviving `import { … } from './merch-url.js'` caused a script syntax error so only the static footer rendered.

## [3.1.0] - 2026-05-20

*Formerly tagged `v2.7.0`.*

### Changed

- **Spatial radar layout (OQ5):** Default `POST /api/chart` and quiz results use **left/right hemisphere** spoke order: Economic → Governance → Class → Cultural → Sovereignty → Military (`orientation: spatial`, start 120°). Default display inversion: Economic, Governance, Class, Sovereignty. Pedagogical OQ2 order retained as `layout: pedagogical` / `AXES` for tables and legacy URLs.
- **`src/data.js`:** `SPATIAL_AXES`, `SPATIAL_DISPLAY_INVERT`; `AXES` remains OQ2 pedagogical order.
- **UI:** "Left / right map" orientation button (spatial default).
- **`API.md` v2.0.1** — `layout`, `invertedAxes`, spatial vs pedagogical radar layouts.

### Added

- **`layout` field** on `POST /api/chart` — `spatial` (default) or `pedagogical`.
- **`invertedAxes` field** on `POST /api/chart` — explicit display inversion list.

## [3.0.0] - 2026-05-20

*Formerly tagged `merch-prototype-v1.0.0` at commit `4ed8642`.*

UI-only merch funnel on `main`; checkout not connected to Printful or Stripe.

### Added

- **Results merch preview** — garment carousel (tee / sweatshirt / hoodie), white/black mockup, dynamic **Buy this …** CTA (`src/ui.js`, `src/merch.js`).
- **`shop.html`** — configurator: comparisons (max 2 actor slugs), garment, colour, size, placeholder GBP prices, breadcrumb back to results (`src/shop-ui.js`).
- **v3 share hash** and **`sessionStorage`** merch draft (`src/merch-url.js`); guard redirect `?shop=needs-results`.
- **Stub checkout modal** with order summary and copy (`src/merch.js`).
- **Placeholder garment SVGs** in `src/assets/merch/` (copied to `dist/assets/merch/` on build).
- **`docs/merch-prototype.md`** — local demo and file map.
- **`docs/merch-printful-integration.md`** — future Printful + Stripe pipeline.
- **`api/lib/printful-stub.js`** — throws until integration.
- **`tests/merch-url.test.js`** — v3 hash round-trip.

### Changed

- **`scripts/build.js`** — builds `dist/shop.html`, copies merch assets; watch list extended.
- **`package.json`** — test script includes merch-url tests.

## [2.6.2] - 2026-05-20

### Added

- **Public read API (v2.0.0, Phase 1 / FR v0.1.0):** `GET /api/actors`, `GET /api/actors/:slug`, `POST /api/chart`, `GET /api/axes`, `GET /api/openapi.json` unauthenticated when `API_PUBLIC_READ=true` (default). Chart rate limit (60 req/min per IP). CORS on `/api/*`. Actors list includes `meta.axesOrder`. Spec: `docs/feature-request-public-private-api-v0.1.0.md`.

### Changed

- **`API.md` v2.0.0 (complete)** — trust zones, configuration, CORS, public read, chart limits, `GET /api/axes` / `GET /api/openapi.json`, error `304`/`429`, public cURL examples.
- **`README.md`** — API section aligned with public read.

## [2.6.1] - 2026-05-20

### Fixed

- **`api/lib/actor-store.js` and `scripts/sync-actor-data.js`** — accept actor JSON where `scores` axes are bare numbers (e.g. migrated Restore Britain file), not only `{ value, confidence, … }` objects. Restores CI `generate-artifacts` and GitHub Pages deploy.

## [2.6.0] - 2026-05-20

### Changed

- **Default axis order (OQ2 / WB-032):** `AXES` in `src/data.js` aligned to **Cultural → Economic → Military → Sovereignty → Governance → Class** (pedagogical, tabular, and clockwise spoke order). Replaces the interim spatial-layout order (`Cultural, Military, Sovereignty, Economic, Class, Governance`). Quiz UI, drag-and-drop reset, shareable URL default (`x=cemslg`), and built `dist/` bundles now match the [A Common Enemy](https://github.com/earlution/common-enemy) methodology §II(a).

### Added

- **`tests/axes-order.test.js`** — asserts canonical `AXES` and Cultural at flat-top spoke (index 0, `orientation: flat`).
- **`POST /api/chart` `register` field** — `primary` (default), `declared`, or `structural` for actor overlays when `dualRegister` data exists.
- **`POST /api/chart` optional `axes`** — explicit permutation of the six axis names; omission uses the canonical default.

### Fixed

- **`api/lib/chart-renderer.js`** — loads `getEffectiveScores` from `data.js` so actor overlays resolve declared/structural registers correctly in server-side PNG/SVG renders.

## [2.5.8] - 2026-05-19

### Added
- **Register toggle on graph page** — switch between Primary, Declared, and Structural scores.
  - New `getEffectiveScores(actor, register)` helper in `src/data.js`.
  - `drawRadar` accepts `register` parameter and uses effective scores for actor overlays.
  - Toggle buttons added to results screen config panel (Primary / Declared / Structural).
  - `registerMode` persisted to `localStorage` under `six-axis-compass-register-mode`.
  - New i18n strings: `results.register`, `results.primary`, `results.declared`, `results.structural`.
- **`GET /api/actors/:slug`** endpoint returning full actor record including `dualRegister`.
  - New route handler `api/routes/actor-detail.js`.
  - `api/lib/actor-store.js` gains `getActorBySlug()`.
  - Documented in `API.md` v1.5.0.
- **Data page detail panels** now show dual-register metadata (protocol, period, status, evidence quality) and per-axis declared/structural/delta scores with confidence percentages when available.

## [2.5.7] - 2026-05-19

### Added
- **Dual-register schema documentation** across API, README, and JSON Schema.
  - `API.md` v1.4.0: new `dualRegister` field documented in Actor Data Schema with full sub-object definitions (declared/structural/delta scores, numeric confidence, dual-register source sets).
  - `README.md` data schema example now includes `dualRegister`.
  - `data/schema.json` updated with `dualRegister`, `dualRegisterScores`, `dualRegisterConfidence`, and `source` definitions.
- **`api/lib/actor-store.js`** now loads `dualRegister` into actor objects (returned as `dualRegister` on full actor records).

## [2.5.6] - 2026-05-19

### Added
- **Dual-register research data v0.2.0** (`data/research/compass-dual-register-data-v0.2.0.json`).
  - Cleaner schema with `config` section (axes, registers, defaultRegister, allowRegisterToggle).
  - Updated migration script supports both v0.1.0 and v0.2.0 schemas.

## [2.5.5] - 2026-05-19

### Added
- **Dual-register research data integration** (`data/research/compass-data-v0.1.0.json`).
  - Moved research-grade dual-register dataset to `data/research/`.
  - New migration script `scripts/migrate-dual-register.js` that:
    - Adds `dualRegister` field (declared/structural/delta scores + numeric confidence + sources) to 7 existing UK party actor JSONs.
    - Creates new `data/actors/restore-britain-2025-2026.json` with structural scores as primary.
  - `scripts/sync-actor-data.js` now preserves `dualRegister` into `src/actors-generated.js`.
  - Added **Restore Britain** to the '2024–2029 UK Parliament' actor group.

## [2.5.4] - 2026-05-19

### Added
- **User-reorderable actor groups** on the dataset page (`data.html`).
  - Each group header now has up/down arrow buttons to reorder groups.
  - Reordered sequence is persisted to `localStorage` under `six-axis-compass-data-group-order`.
  - Order is restored on page load and respected during search/sort operations.
  - New `.group-reorder` CSS styles with hover and disabled states for light/dark modes.

## [2.5.3] - 2026-05-19

### Changed
- **Actor dataset page** (`data.html`) now groups actors into the same categories as the graph page (e.g. "2024–2029 UK Parliament", "World War II figures", "Ideological anchors").
  - `scripts/build.js` injects `ACTOR_GROUPS` from `src/data.js` into the data page at build time.
  - Each group gets a labelled header row with an actor count.
  - Ungrouped actors appear under "Other".

## [2.5.2] - 2026-05-19

### Changed
- Moved the "Browse the actor dataset" link from the intro screen to the results (graph) screen, placing it directly below the actor groups where it is most useful during comparison.

## [2.5.1] - 2026-05-19

### Added
- **Link to actor dataset page** from the main compass app.
  - Intro screen now shows "Browse the actor dataset →" link below the upload area.
  - Site footer now includes a "Dataset" link visible on all screens (intro, quiz, results).
  - New `.data-link` CSS class with muted colour and gold hover state.

## [2.5.0] - 2026-05-19

### Added
- **Confidence legend** on the public actor dataset page (`data.html`).
  - Displays all four confidence levels (very high, high, medium, low) with their colour badges.
  - Explains that confidence indicates curator confidence based on source quality and quantity.

## [2.4.9] - 2026-05-19

### Added
- **Actor Data Schema documentation** in `API.md` (v1.3.0).
  - New section documenting the complete JSON structure for `data/actors/*.json`.
  - Field tables for: top-level structure, actor metadata, score objects, source objects, response objects (Q1–Q24).
  - Example actor JSON with real-world Conservative Party data.
  - Reference to `data/schema.json` as the machine-validated source of truth.

## [2.4.8] - 2026-05-19

### Added
- **Public actor dataset page** (`src/data.html` → `dist/data.html`).
  - Sortable, searchable table of all 31 actors with their six-axis scores.
  - Per-axis confidence badges (low / medium / high / very-high).
  - Expandable detail rows showing metadata (curator, version, last updated), per-axis rationale, and clickable source links.
  - Search filters by actor name, category, rationale, and source titles.
  - Responsive design with dark/light mode support via `prefers-color-scheme`.
  - Links back to the main compass and to raw JSON files on GitHub.
- **Build pipeline** updated (`scripts/build.js`) to generate `dist/data.html` alongside `dist/index.html`, embedding the full actor dataset at build time.
- **README.md** now links to the dataset page under "Forkable, Traceable Actor Data".

## [2.4.7] - 2026-05-19

### Changed
- Moved `6-axis-compass-api-fr-v0.0.1.md` from project root to `docs/feature-request-osf-dispatch-api.md`.

## [2.4.6] - 2026-05-19

### Added
- **CI/CD Dispatch API documentation** in `API.md` (v1.2.0).
  - New section covering `repository_dispatch` event types: `paper-revised`, `generate-radar`, `upload-asset`.
  - Authentication requirements (`DISPATCH_TOKEN` secret).
  - Full payload schemas for `generate-radar` and `upload-asset`.
  - Example dispatch YAML using `peter-evans/repository-dispatch@v3`.
- **README.md API section** now includes a summary of the CI/CD Dispatch API with a link to `API.md`.

## [2.4.5] - 2026-05-19

### Added
- **`repository_dispatch` event types `generate-radar` and `upload-asset`** in `.github/workflows/osf-upload.yml`.
  - `generate-radar`: selectively generates JSON, TEX, and SVG artifacts for specified actors via `scripts/generate-radar.mjs`.
    - Accepts `actors` array, `output_format`, `upload_to_osf`, `osf_component`, and `requested_by` in `client_payload`.
  - `upload-asset`: uploads a single file from the repo to a specific OSF component via `scripts/upload-asset-to-osf.mjs`.
    - Accepts `asset_path`, `osf_component`, `osf_filename`, and `requested_by` in `client_payload`.
- **Dispatch token authentication** (`DISPATCH_TOKEN` secret) for all `repository_dispatch` events. Unauthorized requests are rejected before any generation or upload.
- **`scripts/generate-radar.mjs`**: selective radar generation script.
  - `--actors "Name1,Name2"` generates individual actor artifacts.
  - `--comparison group-id` generates a comparison group artifact.
  - `--output-dir` overrides the default `paper-artifacts/`.
- **`scripts/upload-asset-to-osf.mjs`**: single-file upload script.
  - `--file`, `--component`, and `--filename` flags target a specific OSF folder.
- **New npm run targets**: `npm run generate-radar` and `npm run upload-asset-to-osf`.

## [2.4.4] - 2026-05-19

### Added
- **Standalone OSF upload workflow** (`.github/workflows/osf-upload.yml`).
  - Extracts OSF upload logic from `ci.yml` into a dedicated workflow.
  - Triggers on `push` to `main` and on `repository_dispatch` with type `paper-revised`.
  - Runs `npm ci` → `npm run generate-artifacts` → `node scripts/upload-to-osf.mjs`.
  - Preserves existing common-enemy paper PDF copy logic for dispatched events.

### Changed
- Removed the `upload-osf` job from `.github/workflows/ci.yml` to eliminate duplication.

## [2.4.3] - 2026-05-19

### Added
- **API documentation versioning** (`API.md`): added version history table (v1.0.0, v1.1.0).
- **Shareable Web URL documentation** in `README.md`: parameterised hash URL format, axis key reference, and live examples.

## [2.4.2] - 2026-05-19

### Changed
- **User map now renders behind actor overlays** in the radar chart (`src/chart.js`). Actors are drawn last so their strokes sit on top; user polygon remains visible underneath due to transparent fills.

### Added
- **Shareable Web URL documentation** added to `API.md`.
  - Documents the parameterised hash URL format (`#v2;c=...,e=...,...;o=...;x=...;i=...`) used by `https://earlution.github.io/6-axis-compass/`.
  - Explains how to construct URLs manually without API calls.
  - Covers axis keys, orientation, axis order, inverted axes, and backwards-compatible `v1` URLs.

## [2.4.1] - 2026-05-19

### Fixed
- **Sticky chart drift eliminated:** eyebrow and title moved inside `.chart-pane` so the sticky offset (`top: 3rem`) exactly matches the element's natural viewport position. Chart no longer shifts when scrolling.

## [2.4.0] - 2026-05-19

### Added
- **Sticky radar chart + reorderable actor groups**
  - Results screen now uses a two-column grid (desktop): chart stays fixed on the left while actor groups scroll on the right.
  - `.chart-pane` uses `position: sticky; top: 2rem` so the radar remains visible while browsing/toggling actors.
  - `.content-pane` contains scrollable actor groups, score bars, and configuration controls.
  - Collapses to single column on viewports ≤900px.
  - Results `.wrap` expands to `max-width: 1100px` via `.wrap--wide`.
- **User-arrangeable actor group order**
  - Up/down arrow buttons on every group header let users reorder groups.
  - Order persisted to `localStorage` (`six-axis-compass-actor-group-order`).
  - Custom actors and ungrouped "Other" are also reorderable.
  - Group order resets on "Retake".
  - Keyboard accessible: arrow buttons have `aria-label` and focus state.

## [2.3.0] - 2026-05-19

### Added
- **Per-question responses (Q1–Q24)** for all 31 actors.
  - New `responses` field in actor schema v1.1.0 with `value` (0–4 Likert), `confidence`, `rationale`, and `sources` per question.
  - `scripts/compute-responses.js` brute-force solver generates inferred responses that reproduce existing axis scores.
  - `docs/QUESTIONNAIRE.md` — canonical reference mapping Q1–Q24 to axes, directionality, and compact actor-profile notation.
  - Build pipeline (`sync-actor-data.js`, `actor-store.js`) propagates responses into `src/actors-generated.js` and the API.
  - Paper artifacts include per-question responses in generated JSON.
- **REST API** for programmatic chart generation.
  - `api/server.js` with Bearer-auth middleware.
  - `GET /api/health` — unauthenticated health check.
  - `GET /api/actors` — list all preset actors with metadata.
  - `POST /api/chart` — generate SVG or PNG radar charts with optional actor overlays.
  - Shared `api/lib/chart-renderer.js` uses jsdom + sharp for server-side SVG/PNG rendering.
  - `API.md` — full endpoint documentation with cURL examples.

### Changed
- **User map colour is now theme-aware:** white in dark mode, black in light mode.
  - Replaces the previous gold (`#c8a84b`) which visually clashed with semantically coloured actors (SNP yellow, Liberal Democrats amber).
  - User map remains toggleable; only the default colour changes.
  - Applies to radar polygon, legend dot, score bars, and "Your map" button.

### Fixed
- **Governance axis pole inversion:** Actor data was internally using the old convention (high = hierarchy/authority) while the UI displayed the new labels (high = autonomy/democratic). All actor scores recomputed to align with the displayed pole labels.
  - `data/actors/*.json` and `src/actors-generated.js` updated.

### Removed
- Legacy planning documents (`six-axis-compass-rebuild-guide-v1.0.0.md`, etc.) removed from project root in favour of `docs/` and `RESEARCH-MANIFEST.md`.

## [2.2.0] - 2026-05-18

### Changed
- **Axis rename:** `Liberty` → `Governance` across the entire codebase (upstream OQ4 sync).
  - The axis key is now `Governance` in `src/data.js`, `data/actors/*.json`, URLs (`l=`), exports, and translations.
  - Axis definition changed from state-vs-private coercion to **autonomy/consent vs hierarchy/authority**.
  - New low/high labels: "Maximal autonomy / consent-based / democratic" ↔ "Maximal hierarchy / authority / coercive".
  - All four Governance-axis quiz questions rewritten to probe the new dimension.
  - `src/export.js` retains backwards compatibility:
    - Old exports with `Liberty` key are automatically mapped to `Governance` on import.
    - Existing `Libertarian/Authoritarian` → `Liberty` → `Governance` chain still works for very old exports.
  - Export version bumped to `2.1.0`.

### Changed
- `README.md` Six Axes table updated to reflect Governance labels.
- `docs/axes.md` rewritten with Governance axis definition.
- `six-axis-compass-rebuild-guide-v1.0.0.md` updated to current axis names, questions, and scores.
- `paper-artifacts/README.md` and `latex-example.tex` example references updated to `Governance`.

## [2.1.0] - 2026-05-18

### Changed
- **Axis rename:** `Libertarian/Authoritarian` → `Liberty` across the entire codebase.
  - The axis key is now `Liberty` in `src/data.js`, `data/actors/*.json`, URLs (`l=`), exports, and translations.
  - `src/export.js` retains backwards compatibility: old exports with `Libertarian/Authoritarian` are automatically mapped to `Liberty`.
  - Display labels, intro text, and meta description updated to match.

### Added
- **Brexit factions:** Four new actors under the 'Brexit factions' compare group.
  - **Hard Brexit** (`data/actors/Hard-Brexit.json`) — ERG-style no-deal position.
  - **Soft Brexit** (`data/actors/Soft-Brexit.json`) — Withdrawal Agreement / customs union alignment.
  - **People's Vote** (`data/actors/Peoples-Vote.json`) — Second referendum / remain campaign.
  - **Brexit Intersection** (`data/actors/Brexit-Intersection.json`) — Meta-map representing the geometric intersection (common ground) of the three faction positions.

### Added
- **Favicon and PWA icons:** New radar-chart favicon (`favicon.svg`) with PNG fallbacks (`favicon-32x32.png`, `favicon-16x16.png`) and `apple-touch-icon.png`, plus `scripts/generate-favicon.js` to regenerate assets from the canonical SVG.

### Added
- **Per-axis pole inversion:** Users can now invert the poles of any axis, swapping its low and high ends visually.
  - New `invertedAxes` display preference (Set of axis names), persisted to localStorage and encoded in shareable URLs via the `i=` hash parameter.
  - Inverted axes render with `displayScore = 10 - rawScore` in the radar chart and score bars.
  - Score-bar labels swap positions when an axis is inverted.
  - Inversion toggles appear as `⇄` buttons in the axis reorder list.
  - `src/url.js`: `encodeHash()` and `decodeHash()` now handle `i=` (backwards-compatible with existing `v1` URLs).
  - `src/chart.js`: `drawRadar()` accepts `invertedAxes` option.
  - `src/ui.js`: `renderResults()` accepts `invertedAxes` and `onToggleInvertAxis`.
  - `src/index.html`: state management, localStorage persistence, and handler wiring added.

### Added
- **Persistent footer:** Site-wide footer showing copyright, MIT licence link, and version number injected from `package.json` at build time.

### Added
- **Intro-screen file upload:** Users can now upload a saved JSON or XML map directly from the intro screen without taking the quiz first.
  - New `onUpload` callback passed to `renderIntro()` in `src/ui.js`.
  - Parsed scores become the user's map; the app skips directly to the results screen.
  - Old export versions are handled by existing `parseUpload()` backwards-compatibility logic.

### Added
- **Grouped actor comparison:** Actor toggle buttons are now arranged into labelled sets under Compare:
  - 2024–2029 UK Parliament (7 actors)
  - US Congress (current cycle) (2 actors)
  - Thatcher / Reagan era (1 actor)
  - World War II figures (6 actors)
  - Economic thinkers (2 actors)
  - Ideological anchors (9 actors)
  - Custom actors appear in a separate "Custom actors" group.
  - Ungrouped actors fall through to an "Other" group.
  - `ACTOR_GROUPS` map added to `src/data.js`.

### Changed
- **Radar chart spatial layout (revised):** Reordered `AXES` so the left half of the radar chart consistently represents traditionally left-associated values and the right half represents traditionally right-associated values.
  - New order: Cultural, Military, Sovereignty, Economic, Class, Libertarian/Authoritarian.
  - Left side (120°–240°): Economic (nationalism), Class (conflict), Libertarian/Authoritarian (libertarian).
  - Right side (-60°–60°): Cultural (nationalism), Military (interventionist), Sovereignty (national sovereignty).
  - **BREAKING:** Inverted the `Libertarian/Authoritarian` axis so that "libertarian" is now the HIGH (outward) value and "authoritarian" is the LOW (inward) value. This was necessary to position libertarian on the left side of the chart.
  - All 4 Libertarian/Authoritarian quiz questions have their `reverse` flags swapped.
  - All 27 actor JSON files and `_FALLBACK_ACTORS` have their Libertarian/Authoritarian scores recomputed as `10 - old_score`.
  - `AXIS_META` labels swapped: low = "Authoritarian / hierarchical / illiberal", high = "Libertarian / consent-based / democratic".
  - Export version bumped to `1.1.1`. `parseUpload()` detects v1.1.0 exports and inverts the Libertarian/Authoritarian score for backwards compatibility.

### Changed
- **Radar chart spatial layout (initial):** Reordered `AXES` so left-associated values appear on the left side of the radar chart and right-associated values on the right.
  - Order: Cultural, Economic, Military, Sovereignty, Class, Libertarian/Authoritarian.
  - Superseded by the revised layout above.

### Fixed
- **Intro upload label:** Changed from "Or upload a saved map" to "Upload saved map (JSON / XML)" for clarity and consistency with the results-screen upload label.
  - Note: `src/i18n.js` stores translations in a hardcoded `TRANSLATIONS` object; `src/translations/en.json` is not currently consumed by the build.

### Fixed
- **Begin button after Retake:** `onRestart` in `src/index.html` now passes the correct options object `{ onStart, onUpload }` to `renderIntro()`, fixing a regression where the Begin button became unresponsive after clicking Retake.

### Fixed
- **Class axis data audit:** Corrected inverted Class scores for 5 methodology anchor actors whose values were entered with the opposite convention.
  - `Anarcho-communism`: 0 → 10 (class conflict)
  - `Attlee government 1945–51`: 0 → 10 (class conflict)
  - `Leninism`: 0 → 10 (class conflict)
  - `Thatcher government 1979–90`: 10 → 0 (class harmony)
  - `Fascism`: 10 → 0 (class harmony)
  - `src/data.js` `_FALLBACK_ACTORS` and `data/actors/*.json` updated.
  - `src/actors-generated.js` regenerated.

### Changed
- **Axis restructure (B1):** Renamed the deprecated *Liberty* axis to *Libertarian/Authoritarian*.
  - `src/data.js`: `AXES` order updated to Cultural, Economic, Military, Sovereignty, Libertarian/Authoritarian, Class.
  - `AXIS_META` updated with new low/high labels: "Libertarian / consent-based / democratic" ↔ "Authoritarian / hierarchical / illiberal".
  - All actor score objects renamed the axis key (values unchanged in this commit).
  - `src/url.js`, `src/i18n.js`, `src/translations/en.json`, `src/index.html`, `src/export.js` updated.
  - `data/actors/*.json` and regenerated `src/actors-generated.js`.

### Changed
- **Axis restructure (B2):** Rewrote the four Libertarian/Authoritarian quiz questions to measure consent-based democratic organisation vs. hierarchical/illiberal order.
  - Two forward (authoritarian) and two reverse (libertarian), balanced.
  - Old liberty questions (employer coercion, landlord power, taxation) retired.

### Changed
- **Axis restructure (B3):** Recalibrated Libertarian/Authoritarian scores for 9 preset UK/US parties:
  - Conservative Party 2 → 5, Labour Party 5 → 4, Reform UK 3 → 5,
    Liberal Democrats 6 → 3, Green Party 8 → 2, SNP 7 → 3,
    Plaid Cymru 7 → 3, US Democrats 6 → 4, US Republicans 2 → 6.
  - data/actors/*.json updated and src/actors-generated.js rebuilt.

### Changed
- **Axis restructure (B4):** Updated user-facing text and export/import backwards compatibility.
  - Intro text and meta description now reference "libertarian/authoritarian".
  - Export version bumped to `1.1.0`.
  - `parseUpload()` detects old exports (v0.0.x or `Liberty` key) and:
    - Maps `Liberty` scores to `Libertarian/Authoritarian`.
    - Returns a descriptive label warning that the map was created with an earlier version.

### Added
- Forkable, traceable actor data architecture:
  - `data/actors/*.json` — 27 canonical actor files with per-axis confidence, rationale, and cited sources.
  - `data/schema.json` — JSON Schema v7 defining the actor data structure.
  - `scripts/sync-actor-data.js` — reads JSON files and generates `src/actors-generated.js` at build time.
  - Backward compatibility: `src/data.js` falls back to hardcoded `_FALLBACK_ACTORS` when `__ACTORS` is undefined.
- Actor data browser UI:
  - Information icon ("i") next to each actor toggle button in the results screen.
  - Modal panel showing actor metadata, per-axis score breakdowns with confidence badges, rationale text, and full source citations with clickable links.
  - Keyboard accessible (Escape to close, focus management, `role="dialog"`).
  - New i18n keys for confidence levels, source types, and modal labels.
- Paper artifact documentation:
  - `paper-artifacts/README.md` — full guide to artifact formats, LaTeX integration, and provenance.
  - `paper-artifacts/latex-example.tex` — minimal working LaTeX example.
- Updated `README.md` with forkable data model, contributing guide, and data schema documentation.

## [2.0.0] - 2026-05-16

### Added
- Progressive Web App (PWA) support:
  - `src/manifest.json` with app metadata, theme colours, and PNG icon references.
  - `src/sw.js` minimal service worker that caches `index.html` for offline use.
  - Service worker registration in the inline module script.
  - `src/icon.svg` and `scripts/generate-icons.js` (using `sharp`) to produce 192×192 and 512×512 PNGs.
  - `apple-touch-icon` link for iOS home-screen addition.
  - `scripts/build.js` copies `manifest.json` and `sw.js` into `dist/` alongside `index.html`.

## [1.9.0] - 2026-05-16

### Added
- Accessibility audit and WCAG 2.1 AA baseline improvements:
  - Skip-to-content link for keyboard users.
  - `aria-live="polite"` announcer region for screen-reader feedback on screen changes.
  - `role="region"` and `aria-label` on intro, quiz, and results screens.
  - Quiz response buttons use `role="radio"`, `aria-checked`, and keyboard arrow navigation within a `role="radiogroup"`.
  - Actor toggle buttons expose `aria-pressed` state.
  - Focus management: on screen change, focus moves to the active screen container.
- Colour contrast fixes across dark and light themes:
  - `--text3` adjusted to `#9a9690` (dark) and `#6a665e` (light) to meet 4.5:1.
  - Replaced hardcoded `rgba()` values in configuration panel with theme-aware CSS variables.

## [1.8.0] - 2026-05-16

### Added
- Dark / light theme toggle in the results configuration panel.
- Theme preference persists in `localStorage` (`six-axis-compass-theme`).
- `data-theme="light"` attribute applied to `<html>`; all colours are driven by CSS custom properties so the switch is instant and covers both DOM and inline SVG.
- `loadTheme()` / `saveTheme()` utilities in the inline module script.

## [1.7.0] - 2026-05-16

### Added
- 10 new preset actors from the methodology document's anchor examples:
  Attlee government 1945–51, Thatcher government 1979–90, Bush/Blair Iraq position,
  Stop the War Coalition, Enoch Powell 1968, Federalist EU tradition,
  Anarcho-communism, Leninism, Fascism, Orbán's Hungary.
- Custom actor creation UI in the configuration panel:
  name input, colour picker, and six score inputs (0–10).
- Custom actors persist in `localStorage` and appear in the actor toggle list.
- Custom actors can be deleted via a small × button on their toggle.
- Custom actors are not included in export/import (local-only).
- `src/i18n.js` and `src/translations/en.json` updated with translations for all new and historical actors.

## [1.6.0] - 2026-05-16

### Added
- Shareable URLs: scores, orientation, and axis order are encoded in the URL hash (`#v1;c=5.0,...;o=flat;x=cemsla`).
- On reaching the results screen, the URL hash updates automatically so users can copy their profile link directly.
- On page load with a valid hash, the app skips the intro and quiz and renders results immediately with the decoded scores.
- "Copy link" button added to the results configuration panel.
- `src/url.js` with `encodeHash()`, `decodeHash()`, and `copyToClipboard()` utilities.
- Versioned hash format (`v1`) for graceful future format changes.

## [1.5.0] - 2026-05-16

### Added
- Paper artifact generation pipeline (`npm run generate-artifacts`) producing static, peer-reviewable outputs for the *A Common Enemy* academic paper.
- New script `scripts/generate-paper-artifacts.mjs` renders SVG radar charts via jsdom, generates JSON data files, and emits LaTeX `\newcommand` definitions for every actor.
- New `scripts/paper-config.json` defines comparison groups: UK parties, US parties, Brexit factions, economic historical figures, WWII figures, and UK–US cross-country.
- 8 new historical actors added to `src/data.js`: John Maynard Keynes, Milton Friedman, Clement Attlee, Winston Churchill, Adolf Hitler, Franklin D. Roosevelt, Benito Mussolini, Joseph Stalin.
- `paper-artifacts/` directory containing per-actor `.json`, `.svg`, `.tex` files and comparison-group charts.
- `paper-artifacts/README.md` and `latex-example.tex` documenting how to include artifacts in a LaTeX paper.
- `jsdom` added as a devDependency for server-side SVG generation.
- CI workflow updated to validate artifact generation on every push.

### Changed
- `src/i18n.js` updated with translations for all new historical actors.

## [1.4.0] - 2026-05-16

### Added
- i18n infrastructure with English as the default language (`src/i18n.js`, `src/translations/en.json`).
- All user-facing strings are now rendered through a `t(key)` helper, enabling future localisation.
- Language selector added to the results configuration panel (currently English only).
- Axis names, actor names, response labels, and UI text are all translatable while preserving internal English keys for export portability.
- `scripts/build.js` updated to inline `src/i18n.js` before dependent modules.

## [1.3.0] - 2026-05-16

### Changed
- "Your map" toggle moved from the configuration panel into the **Compare** row alongside party buttons.
- Score bars section is now always visible and dynamically shows bars for every selected profile.
- Each axis row displays a colour-coded mini-bar for the user (gold) and every selected party (their brand colour).
- Actor bars include a name label, a thin coloured track, and a numeric score — matching the radar chart overlay pattern.
- Empty state shown when no profiles are selected.

## [1.2.0] - 2026-05-16

### Changed
- Toggling "Hide your map" now also hides the score bars section alongside the radar chart polygon.
- This reduces visual noise when comparing only party maps.

## [1.1.1] - 2026-05-16

### Fixed
- `scripts/build.js` now extracts and includes the inline module script from `src/index.html`.
- Previously the build replaced the entire `<script type="module">` block with only the 5 module files, losing all app initialization code (`renderIntro(app, startQuiz)`, event handlers, state management).
- This caused the deployed artifact to render an empty black page.

## [1.1.0] - 2026-05-16

### Added
- Automated deployment to GitHub Pages via GitHub Actions.
- `deploy` job added to `.github/workflows/ci.yml` that publishes `dist/` on every push to `main`.
- Uses `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`.
- Workflow permissions updated to allow `pages: write` and `id-token: write`.

## [1.0.0] - 2026-05-16

### Added
- `tests/quiz.test.js` — zero-dependency unit tests for the scoring engine.
  - Verifies neutral, balanced agree/disagree, maximum, and minimum score scenarios.
  - Verifies `createQuiz()` state progression, back navigation, and answer capture.
- `.github/workflows/ci.yml` — GitHub Actions CI workflow.
  - Runs `node scripts/build.js` on every push and pull request.
  - Runs `node tests/quiz.test.js` to validate scoring logic.
  - Verifies `dist/index.html` is self-contained (no `type="module"`, no external `src` or `href` dependencies).
- Project reaches stable release with full feature parity to the original v0.0.5.

## [0.9.0] - 2026-05-16

### Added
- `docs/axes.md` with detailed explanations of each of the six political axes.
- `docs/examples/` containing sample export files:
  - `centrist.json` — neutral scores across all axes.
  - `green-party.json` — Green Party scores.
  - `reform-uk.json` — Reform UK scores.
- Updated `README.md` with "How it works" section explaining the scoring algorithm.
- Expanded "Development" section with source file map, build instructions, and watch mode.
- Screenshot placeholder section in `README.md`.

## [0.8.0] - 2026-05-16

### Added
- `package.json` with project metadata, build and dev scripts, and zero devDependencies.
- `scripts/build.js` Node.js inliner that reads `src/` files and produces a self-contained `dist/index.html`.
- Regex-based stripping of `import` and `export` statements to inline ES modules.
- Optional `--watch` mode that rebuilds on any source file change.
- `dist/index.html` is generated and verified as self-contained (no module scripts, no external src/href).

## [0.7.0] - 2026-05-16

### Added
- Orientation toggle in results screen: "Edge up" (flat) and "Vertex up" (pointy) buttons.
- Show/hide user map toggle to overlay or hide the user's own radar polygon.
- Axis reordering via HTML5 drag-and-drop in a configuration panel.
- Grip handle and position label on each draggable axis item.
- Config panel CSS classes for sections, headings, buttons, file labels, and axis list.
- Drag-and-drop state managed entirely within `renderResults()` via `addEventListener`.

## [0.6.0] - 2026-05-16

### Added
- `src/export.js` with PNG chart export, JSON/XML data export, and JSON/XML import.
- `downloadChart()` clones the SVG, renders it to a canvas, and downloads as PNG with SVG fallback.
- `downloadMapData()` exports scores as JSON or XML with metadata (source, version, timestamp).
- `parseUpload()` reads exported JSON or XML files and returns scores; handles original v0.0.5 format.
- Download buttons (PNG, JSON, XML) wired into the results screen.
- Upload section with file input accepting `.json` and `.xml`; shows parsed map as dashed purple overlay.
- Clear upload button to remove imported map.

## [0.5.0] - 2026-05-16

### Added
- Intro screen with title, description, and start button.
- Quiz screen with progress bar, axis tag, question text, and Likert response buttons.
- Results screen with SVG radar chart, actor comparison toggles, legend, and score bars.
- Full CSS stylesheet ported from original with variables, component classes, and mobile breakpoint.
- `renderIntro()`, `renderQuiz()`, and `renderResults()` in `src/ui.js`.
- Wired `src/index.html` module script handling full quiz flow: intro → quiz → results → retake.
- All inline event handlers replaced with `addEventListener` calls.
- State passed through function parameters — no global mutable variables.

## [0.4.0] - 2026-05-16

### Added
- Hexagonal SVG radar chart renderer in `src/chart.js`.
- `drawRadar()` accepts options object for scores, axes, orientation, actors, uploaded map, and visibility.
- Support for flat (edge-up) and pointy (vertex-up) hexagon orientations.
- Grid polygons at levels 2, 4, 6, 8, 10 with original opacity values.
- Actor overlays with party colours and translucent fills.
- Uploaded map overlay with dashed purple stroke.
- User profile polygon with gold stroke and dot markers.
- Axis labels positioned outside the chart perimeter.

## [0.3.0] - 2026-05-16

### Added
- Quiz state management via `createQuiz()` factory.
- `computeScores()` scoring engine matching original algorithm.
- Immutable quiz instance with getters for current question, progress, and completion state.
- Answer/back navigation with answers stored in an internal record.
- Pure logic module — no DOM dependencies.

## [0.2.0] - 2026-05-16

### Added
- Extract questions, axes, actors, and response scales into `src/data.js`.
- `AXES` array defining the six political dimensions.
- `AXIS_META` object with low/high labels for each axis.
- `RESPONSES` array with Likert-scale labels and values.
- `QUESTIONS` array: 24 statements mapped to axes with forward/reverse scoring flags.
- `ACTORS` array: 9 political parties with pre-defined scores and colours.
- JSDoc comment block documenting the scoring algorithm.

## [0.1.0] - 2026-05-16

### Added
- Repository scaffolding for standalone open-source project.
- `src/` directory with modular ES module files (`index.html`, `data.js`, `quiz.js`, `chart.js`, `ui.js`, `styles.css`).
- `dist/` directory for pre-built deployable artifact.
- `scripts/` directory for build tooling.
- `README.md` with project overview, six-axis table, usage, and development instructions.
- `.gitignore` ignoring `node_modules/`, `.DS_Store`, and `*.log`.

[0.1.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.1.0
[0.2.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.2.0
[0.3.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.3.0
[0.4.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.4.0
[0.5.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.5.0
[0.6.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.6.0
[0.7.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.7.0
[0.8.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.8.0
[0.9.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.9.0

# Feature Request: Public Read API and Private Write API

**Repository:** [earlution/6-axis-compass](https://github.com/earlution/6-axis-compass)  
**Version:** 0.1.0  
**Date:** 2026-05-20  
**Priority:** HIGH  
**Status:** Phase 1 implemented (app v2.6.2); Phase 2 (admin write) not yet implemented  
**Consumers:** [earlution/common-enemy](https://github.com/earlution/common-enemy) (academic paper PDF pipeline, governance data sync)  
**Supersedes / extends:** `docs/feature-request-osf-dispatch-api.md` (v0.0.1, dispatch-only); common-enemy `docs/academic/6-axis-compass-api-fr-v0.0.1.md` (discussion draft)

---

## 1. Summary

Split the Six-Axis Compass HTTP surface into two trust zones:

1. **Public read API** — Unauthenticated access to actor metadata, full traceable actor records (read-only), and **on-demand radar rendering** for any valid permutation of axes, actors, registers, orientation, and output format.
2. **Private write API** — Authenticated mutation of actor datasets (`data/actors/*.json`) with schema validation, provenance fields, and an audit trail suitable for research-grade traceability (Dual-Register Sourcing Protocol alignment).

A **hosted** deployment of the read API (stable base URL) plus documented OpenAPI-style specification enables **common-enemy** (and other clients) to automate: *figure manifest → PNG/SVG → academic paper PDF* without cloning the compass repo or running `npm run api` locally.

---

## 2. Problem statement

### 2.1 Current state (v2.6.0)

| Capability | Today | Gap |
|------------|--------|-----|
| Actor data | JSON files in `data/actors/`, validated at build | No HTTP write path; edits require git/PR |
| Read actors / chart | `GET /api/actors`, `GET /api/actors/:slug`, `POST /api/chart` | **All require `API_SECRET`** — not public |
| Public maps | GitHub Pages hash URLs (client-side quiz scores) | **No actor overlays in URL**; not server-rendered PNG for papers |
| Chart server | `npm run api` (local / self-hosted) | **No production chart API URL** documented for CI |
| Selective generation | `repository_dispatch` (`generate-radar`, `upload-asset`) | CI/async only; not a synchronous REST write/read split |
| Paper automation | common-enemy `fetch-paper-radar-figures.sh` + fixed JSON payloads | Works only with local API + secret; three hard-coded figures |

### 2.2 User goal

> *Data access is publicly available and does not require auth. A private API provides upload / update of actor values with supporting, traceable reference data. Via the public API, request any valid radar permutation. API docs present the spec. Automate steps to obtain a PDF of the paper with any radar maps I specify.*

### 2.3 Non-goals (v0.1.0)

- Replacing git as the **canonical long-term archive** for actor data (write API may commit to repo or stage for PR; see §6.4).
- Anonymous write access or crowd-sourced edits without review.
- Real-time collaborative editing UI (out of scope for this FR).
- SocArXiv / OSF submission automation (remains common-enemy + existing workflows).

---

## 3. Design principles

1. **Read public, write private** — Rendering and reading never require a secret; mutation always does.
2. **Same renderer everywhere** — `POST /api/chart` uses the same code path as the quiz UI and `dist/` build (OQ2 axis order, `flat` default).
3. **Schema is law** — All writes validate against `data/schema.json` (and semver `schemaVersion`).
4. **Provenance is mandatory on write** — Updates that change scores must include or preserve `sources`, `rationale`, `confidence`, and `dualRegister` where applicable.
5. **Permutations, not presets** — Public chart API accepts arbitrary valid combinations within documented limits (actor count, score ranges).
6. **Docs are deliverables** — `API.md` (or generated OpenAPI) is versioned with the API semver.

---

## 4. Architecture overview

```text
                    ┌─────────────────────────────────────┐
                    │     Hosted 6-axis-compass API       │
                    └─────────────────────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          │ PUBLIC (no auth)          │ PRIVATE (Bearer token)     │
          ▼                           ▼                            │
   GET /api/health              POST /api/admin/actors              │
   GET /api/actors              PUT  /api/admin/actors/:slug        │
   GET /api/actors/:slug        PATCH /api/admin/actors/:slug      │
   POST /api/chart              POST /api/admin/actors/:slug/...   │
   GET /api/openapi.json        (optional DELETE — soft-delete)    │
          │                           │                            │
          │                           │ git commit / PR bot        │
          ▼                           ▼                            │
   data/actors/*.json  ◄──────────────────────────────────────────┘
   (read via actor-store)
```

**Deployment options (implementation choice):**

| Option | Public base URL | Write path |
|--------|-----------------|------------|
| A. Single service | `https://api.<domain>/` | Same host, `/api/admin/*` + `ADMIN_SECRET` |
| B. Split | Cloudflare Worker / static + serverless chart | GitHub App commits to `data/actors/` |
| C. Hybrid | Public read on CDN edge; writes via `repository_dispatch` only | Keeps write off HTTP (not preferred for this FR) |

**Recommended:** Option A — one Node service (extend current `api/server.js`) behind HTTPS reverse proxy; separate env vars `API_PUBLIC_MODE=true` (read routes unauthenticated) and `ADMIN_SECRET` (write routes).

---

## 5. Public read API (unauthenticated)

### 5.1 Endpoints

All routes below **must not** require `Authorization` when `API_PUBLIC_READ=true` (default in production).

#### `GET /api/health`

Unchanged. Returns `{ status, version, apiVersion }`.

#### `GET /api/actors`

Returns index of actors (name, slug, color, category, `lastUpdated`).

**Response — 200**

```json
{
  "actors": [
    { "name": "Green Party", "slug": "green-party", "color": "#4a9c5d", "category": "UK Political Party", "lastUpdated": "2026-05-19" }
  ],
  "meta": { "count": 42, "schemaVersion": "1.1.0", "axesOrder": ["Cultural", "Economic", "Military", "Sovereignty", "Governance", "Class"] }
}
```

#### `GET /api/actors/:slug`

Full actor record: `scores`, `responses`, `dualRegister`, `_meta`, `_scoreMeta` — same shape as current authenticated response.

**Caching:** `ETag` / `Last-Modified` from file mtime; `Cache-Control: public, max-age=300` (configurable).

#### `POST /api/chart`

**Unauthenticated** radar generation.

**Request body** (extends current v1.5.0 spec):

| Field | Type | Required | Default | Constraints |
|-------|------|----------|---------|-------------|
| `scores` | object | No | all `0` | Keys ∈ six axes; values `0–10` |
| `actors` | string[] | No | `[]` | Max **8** overlays; names must exist in dataset |
| `format` | string | No | `svg` | `svg` \| `png` |
| `orientation` | string | No | `flat` | `flat` \| `pointy` |
| `axes` | string[] | No | OQ2 canonical order | Permutation of six axis names |
| `register` | string | No | `primary` | `primary` \| `declared` \| `structural` |
| `showUser` | boolean | No | `true` | — |
| `colors` | object | No | theme defaults | Per-actor colours resolved from dataset unless overridden |
| `title` | string | No | `"Chart"` | Max 200 chars |
| `width` / `height` | number | No | `600` | PNG only; max **4096** |

**Response:** Raw `image/svg+xml` or `image/png`.

**Rate limiting (required for public chart):**

| Limit | Suggested default |
|-------|-------------------|
| Per IP | 60 requests / minute |
| Per IP burst | 10 concurrent |
| Max PNG pixels | `width * height` ≤ 16_777_216 |

Return `429 Too Many Requests` with `Retry-After`.

#### `GET /api/openapi.json`

Machine-readable OpenAPI 3.1 document generated from route definitions (or hand-maintained and CI-checked).

#### `GET /api/axes`

Optional convenience endpoint: canonical axis order, pole labels, scale description (for clients building UIs without scraping `API.md`).

### 5.2 Permutation coverage

The public chart endpoint **must** support at least:

| Dimension | Examples |
|-----------|----------|
| Actor set | Any subset of known actors (0–8 overlays) |
| Register | Declared vs structural polygons per actor |
| User polygon | Custom `scores` with `showUser: false` (actor-only chart) |
| Axis order | Any permutation (default OQ2: C→E→M→S→G→Cl) |
| Orientation | `flat` / `pointy` |
| Output | SVG (vector) or PNG (raster, sized for print) |

**Explicitly out of scope for v0.1.0:** encoding actor overlays in hash URLs (remain a separate client-side feature).

### 5.3 Backward compatibility

- Existing clients that send `Authorization: Bearer <API_SECRET>` on read routes **continue to work** (optional auth ignored for read).
- Deprecation window: document in `API.md` that read-scope `API_SECRET` is optional from API v2.0.0; remove requirement in v3.0.0.

---

## 6. Private write API (authenticated)

### 6.1 Authentication

```http
Authorization: Bearer <ADMIN_SECRET>
```

| Secret | Scope | Storage |
|--------|--------|---------|
| `ADMIN_SECRET` | Write API only | GitHub Actions secret, server env, **never** in browser |
| `API_SECRET` (legacy) | **Deprecated** for read after v2.0.0 | Migrate callers to public read |

**Optional:** separate `WRITE_TOKEN` per client (`common-enemy-ci`, `curator-local`) via hashed token table — defer to v0.2.0 unless needed at launch.

### 6.2 Endpoints

Base path: `/api/admin` (or `/api/v1/admin` if versioning prefix adopted).

#### `POST /api/admin/actors`

Create a new actor file.

**Request body:** Full actor JSON conforming to `data/schema.json`.

**Validation:**

- `actor.slug` unique (kebab-case, `[a-z0-9-]+`)
- `actor.name` unique among actors
- All six axes present in `scores` OR inferrable per schema rules
- Each score with `value` in range; if `sources` provided on an axis, at least one source with `type` + `title`
- `dualRegister` if present: `declared`, `structural`, `delta`, `sources.declared[]`, `sources.structural[]` per Dual-Register Sourcing Protocol v0.2.0

**Response — 201**

```json
{
  "slug": "new-party",
  "path": "data/actors/new-party.json",
  "commit": "abc1234",
  "message": "Actor created"
}
```

#### `PUT /api/admin/actors/:slug`

Replace entire actor record (idempotent). Same validation as POST.

#### `PATCH /api/admin/actors/:slug`

Partial update (RFC 7396 merge patch or JSON Patch — **specify JSON Merge Patch** for v0.1.0).

**Rules:**

- Cannot change `actor.slug` via PATCH (use DELETE + POST or admin tooling)
- Score patches must include `lastUpdated` bump in `_meta` (server-side automatic)
- Patches that alter `scores.*.value` without `sources` or `rationale` → **400** unless `force: true` in body with `auditNote` (discouraged escape hatch for curators)

#### `POST /api/admin/actors/:slug/sources`

Append a source citation to a specific axis and register (`declared` | `structural` | `primary`).

**Request:**

```json
{
  "axis": "Economic",
  "register": "structural",
  "source": {
    "type": "legislation",
    "title": "Finance Act 2024",
    "date": "2024-03-15",
    "url": "https://…",
    "relevantText": "…",
    "citation": "…"
  }
}
```

#### `DELETE /api/admin/actors/:slug`

Soft-delete: move to `data/actors/_archived/{slug}.json` or set `"status": "archived"` in `_meta` (implementation choice; prefer archive folder).

### 6.3 Persistence model

**Phase 1 (MVP):** Write API persists to filesystem, then **git commit** via libgit2 / `git` CLI in CI container:

```
write → validate → write data/actors/{slug}.json → git commit → git push (branch or main per policy)
```

| Policy | Recommendation |
|--------|----------------|
| Production writes | Push to branch `data/actor-updates/{timestamp}-{slug}`; open PR |
| Local / staging | Direct write to working tree without push |

**Phase 2:** GitHub App with required reviews before merge to `main`; write API only opens PRs.

**Never:** expose `ADMIN_SECRET` to GitHub Pages static site.

### 6.4 Audit trail

Every successful mutation logs:

| Field | Example |
|-------|---------|
| `timestamp` | ISO-8601 UTC |
| `actor` | `slug` |
| `operation` | `create` \| `replace` \| `patch` \| `append-source` |
| `requestedBy` | `common-enemy-ci` \| header `X-Client-Id` |
| `commit` | git SHA after persist |
| `diffSummary` | axes changed, register touched |

Persist log to `data/audit/actor-changes.jsonl` (append-only, committed with PR).

---

## 7. Documentation deliverables

| Artifact | Location | Acceptance |
|----------|----------|------------|
| Human spec | `API.md` | Public + admin sections; version table |
| Machine spec | `GET /api/openapi.json` | Validates in CI (spectral or openapi-cli) |
| Examples | `docs/examples/api/` | curl recipes for chart permutations + one write |
| Changelog | `API.md` version table + `CHANGELOG.md` | Semver for API |
| Migration guide | `docs/migration-api-v1-to-v2.md` | Optional auth on read; admin paths |

**Versioning:** API semver independent of app semver (e.g. app 2.6.0, API 2.0.0 when public read ships).

---

## 8. common-enemy integration (consumer contract)

### 8.1 Figure manifest

common-enemy defines a versioned manifest (new file):

`docs/academic/paper-figure-manifest-v0.1.0.json`

```json
{
  "apiBase": "https://api.example.com",
  "figures": [
    {
      "id": "figure-01-convergence",
      "output": "docs/academic/figures/v0.2.0/figure-01-convergence.png",
      "chart": {
        "actors": ["Reform UK", "Green Party"],
        "register": "structural",
        "showUser": false,
        "format": "png",
        "width": 1400,
        "height": 1400,
        "orientation": "flat",
        "axes": ["Cultural", "Economic", "Military", "Sovereignty", "Governance", "Class"]
      }
    }
  ]
}
```

### 8.2 Automation script (common-enemy scope)

Extend or replace `fetch-paper-radar-figures.sh`:

```bash
# Public read — no API_SECRET required
API_BASE=https://api.<hosted> bash docs/academic/scripts/render-paper-figures.sh \
  --manifest docs/academic/paper-figure-manifest-v0.1.0.json

# Then PDF
bash docs/academic/build-socarxiv.sh
```

### 8.3 Actor updates from common-enemy

When governance / dual-register JSON changes in common-enemy (`compass-dual-register-data-v0.2.0.json`):

```bash
# Private write — ADMIN_SECRET in CI only
curl -X PATCH "$API_BASE/api/admin/actors/labour-party" \
  -H "Authorization: Bearer $ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d @patch-labour-structural.json
```

Or trigger compass workflow `sync-actor-from-common-enemy` with payload `{ slug, register, scores, sources }`.

### 8.4 Secrets matrix

| Secret | Repo | Purpose |
|--------|------|---------|
| *(none)* | common-enemy CI | Public chart fetch |
| `COMPASS_ADMIN_SECRET` | common-enemy | Actor writes (optional) |
| `ADMIN_SECRET` | 6-axis-compass | Write API server |
| `OSF_*` | both | OSF upload (unchanged) |
| `COMPASS_REPO_PAT` | common-enemy | `repository_dispatch` (unchanged) |

**Remove confusion:** `API_SECRET` ≠ GitHub PAT. Document in both READMEs.

---

## 9. Security

| Risk | Mitigation |
|------|------------|
| Chart endpoint abuse (DoS) | Rate limits, max PNG size, optional API gateway |
| Unauthorized writes | `ADMIN_SECRET` only on server; never in Pages bundle |
| Data poisoning | Schema validation + required sources on score change + PR review for production |
| Secret leakage in logs | Redact Bearer tokens in server logs |
| CORS | Public read: `Access-Control-Allow-Origin: *` for GET/POST chart only; admin routes no CORS |
| PII in actor records | Document curator responsibility; no automatic PII ingestion |

---

## 10. Implementation phases

### Phase 1 — Public read (MVP for paper automation)

- [x] Split auth middleware: public routes skip `checkAuth` (`API_PUBLIC_READ`, default true)
- [ ] Deploy chart + read API to stable HTTPS URL (hosting — maintainer)
- [x] Rate limiting on `POST /api/chart` (60/min per IP, configurable)
- [x] Publish `API.md` v2.0.0 public section; `GET /api/openapi.json`, `GET /api/axes`
- [ ] common-enemy: manifest-driven `render-paper-figures.sh` (no secret) — WB-035
- [x] Verify OQ2 defaults match methodology v0.0.3 §II(a)

**Exit criteria:** Generate three v0.2.0 paper figures against **hosted** public API; build PDF in CI without `npm run api` locally.

### Phase 2 — Private write (curator / CI)

- [ ] Admin routes + `ADMIN_SECRET`
- [ ] Schema validation on write (ajv against `data/schema.json`)
- [ ] Git commit / PR workflow for persists
- [ ] `data/audit/actor-changes.jsonl`
- [ ] `POST .../sources` convenience endpoint

**Exit criteria:** PATCH Labour structural scores with sources via API; PR merged; public chart reflects new data.

### Phase 3 — Polish

- [ ] `GET /api/openapi.json` + CI validation
- [ ] `GET /api/axes`
- [ ] Deprecate read-time `API_SECRET` in docs
- [ ] Load test chart endpoint
- [ ] Optional: webhook instead of only git for writes

---

## 11. Testing

| Layer | Tests |
|-------|--------|
| Unit | Schema validation, auth middleware, axis permutation validation |
| Integration | `POST /api/chart` golden PNG hash (or SVG snapshot) for fixed payload |
| Contract | OpenAPI examples match live server |
| E2E | common-enemy CI: manifest → 3 PNGs → PDF build |

**Fixture:** Neutral hexagon + Reform UK / Green Party overlay (Figure 1 payload) at 1400×1400 PNG.

---

## 12. Definition of done (full FR)

- [ ] Public endpoints operate **without** Bearer token on deployed production URL
- [ ] `POST /api/chart` supports all permutation fields in §5.2
- [ ] Private write endpoints require `ADMIN_SECRET` and validate against `data/schema.json`
- [ ] Writes produce traceable audit log and git-visible actor JSON
- [ ] `API.md` + OpenAPI published; version bumped
- [ ] common-enemy can build academic paper PDF from manifest using **only** public API base URL
- [ ] README updated: public vs private, secret names, deployment
- [ ] No regression: GitHub Pages quiz + hash URLs still work

---

## 13. Open questions

| ID | Question | Default if unresolved |
|----|----------|------------------------|
| OQ-API-1 | Hosted domain / provider? | Project maintainer decides; document in README |
| OQ-API-2 | Write → direct push `main` vs PR-only? | PR-only for production |
| OQ-API-3 | Keep `API_SECRET` for read during transition? | Yes, optional 6 months |
| OQ-API-4 | Max actors per chart above 8? | Stay at 8 for readability |
| OQ-API-5 | Include `GET /api/questionnaire` public? | Defer v0.2.0 |

---

## 14. References

- `API.md` (v1.5.0) — current REST spec
- `data/schema.json` — actor schema v1.1.0
- common-enemy *Axis Scale Specification and Radar Methodology* v0.0.3 §II(a) — OQ2 spoke order
- common-enemy `paper-radar-figures-v0.2.0-design.md` — figure payloads
- common-enemy Dual-Register Sourcing Protocol v0.2.0 (via `compass-dual-register-data-v0.2.0.json`)
- WB-032 / compass v2.6.0 — canonical `AXES` alignment

---

*Six-Axis Compass | Feature Request: Public Read API and Private Write API | Version 0.1.0*

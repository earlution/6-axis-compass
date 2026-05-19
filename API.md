# Six-Axis Compass — REST API Specification

| Version | Date | Changes |
|---------|------|---------|
| 1.2.0 | 2026-05-19 | Added "CI/CD Dispatch API" section documenting `repository_dispatch` event types for selective generation and upload. |
| 1.1.0 | 2026-05-19 | Added "Shareable Web URL" section documenting the parameterised hash URL format. |
| 1.0.0 | 2026-05-18 | Initial release. Endpoints: `GET /health`, `GET /actors`, `POST /chart`. |

For **A Common Enemy** integration.

## Base URL

```
https://<host>:<port>/api
```

The server listens on `API_PORT` (default `3000`).

---

## Authentication

All endpoints except `GET /health` require a Bearer token.

```http
Authorization: Bearer <API_SECRET>
```

The `API_SECRET` is configured server-side via the environment variable of the same name. Pass the exact shared secret in the `Authorization` header on every protected request.

---

## Endpoints

### 1. Health Check

Unauthenticated. Use to verify the API is alive and discover the deployed version.

```http
GET /api/health
```

**Response — 200 OK**

```json
{
  "status": "ok",
  "version": "2.2.3"
}
```

---

### 2. List Actors

Returns every political actor in the dataset with basic metadata.

```http
GET /api/actors
Authorization: Bearer <API_SECRET>
```

**Response — 200 OK**

```json
{
  "actors": [
    {
      "name": "Green Party",
      "slug": "Green-Party",
      "color": "#4a9c5d"
    },
    {
      "name": "Conservative Party",
      "slug": "Conservative-Party",
      "color": "#1a6bc4"
    }
  ]
}
```

**Error — 401 Unauthorized**

```json
{ "error": "Unauthorized" }
```

---

### 3. Render Chart

Generates a radar-chart image from your scores, optionally overlaying known actors.

```http
POST /api/chart
Authorization: Bearer <API_SECRET>
Content-Type: application/json
```

**Request Body**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `scores` | `object` | No | All axes `0` | Six-axis scores. Each key must be one of: `Cultural`, `Economic`, `Military`, `Sovereignty`, `Governance`, `Class`. Each value must be a number `0–10`. |
| `actors` | `string[]` | No | `[]` | Names of actors to overlay on the chart. Must match the `name` field from `/api/actors`. |
| `format` | `string` | No | `"svg"` | Output format: `"svg"` or `"png"`. |
| `orientation` | `string` | No | `"flat"` | Chart orientation. |
| `showUser` | `boolean` | No | `true` | Whether to draw the user’s own score polygon. |
| `colors.user` | `string` | No | `"#c8a84b"` | Hex colour for the user polygon. |
| `title` | `string` | No | `"Chart"` | Chart title (embedded in SVG/PNG metadata). |
| `width` | `number` | No | `600` | PNG width in pixels (PNG only). |
| `height` | `number` | No | `600` | PNG height in pixels (PNG only). |

**Example Request — SVG**

```json
{
  "scores": {
    "Cultural": 5,
    "Economic": 5,
    "Military": 5,
    "Sovereignty": 5,
    "Governance": 5,
    "Class": 5
  },
  "actors": ["Green Party"],
  "format": "svg",
  "title": "My Compass"
}
```

**Response — 200 OK**

Returns raw SVG XML with `Content-Type: image/svg+xml`.

**Example Request — PNG**

```json
{
  "scores": {
    "Cultural": 3,
    "Economic": 7,
    "Military": 2,
    "Sovereignty": 8,
    "Governance": 6,
    "Class": 4
  },
  "format": "png",
  "width": 1200,
  "height": 1200
}
```

**Response — 200 OK**

Returns raw PNG bytes with `Content-Type: image/png`.

**Error — 400 Bad Request**

```json
{ "error": "Unknown axis: InvalidAxis" }
```

```json
{ "error": "Invalid score for Cultural: must be 0–10" }
```

```json
{ "error": "Unknown actor: Totally Fake Actor" }
```

```json
{ "error": "Invalid format. Use svg or png." }
```

**Error — 401 Unauthorized**

```json
{ "error": "Unauthorized" }
```

---

## Error Reference

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `400` | Malformed request (bad axis, bad score, unknown actor, invalid format) |
| `401` | Missing or incorrect `Authorization` header |
| `404` | Unknown endpoint |
| `500` | Server error (e.g. `API_SECRET` not configured) |

---

## Axis Definitions

| Axis | Low (0) | High (10) |
|------|---------|-----------|
| **Cultural** | Tradition / preservation | Progressive / reform |
| **Economic** | Collectivism / intervention | Free-market / laissez-faire |
| **Military** | Pacifism / demilitarisation | Hawkish / interventionist |
| **Sovereignty** | Globalist / pooled authority | Nationalist / self-determination |
| **Governance** | Libertarian / minimal state | Authoritarian / strong state |
| **Class** | Egalitarian / classless | Hierarchical / stratified |

---

## Quick cURL Examples

### Health

```bash
curl https://localhost:3000/api/health
```

### Actors (authenticated)

```bash
curl -H "Authorization: Bearer <API_SECRET>" \
     https://localhost:3000/api/actors
```

### Chart SVG

```bash
curl -X POST \
     -H "Authorization: Bearer <API_SECRET>" \
     -H "Content-Type: application/json" \
     -d '{"scores":{"Cultural":5,"Economic":5,"Military":5,"Sovereignty":5,"Governance":5,"Class":5},"format":"svg"}' \
     https://localhost:3000/api/chart
```

### Chart PNG with actor overlay

```bash
curl -X POST \
     -H "Authorization: Bearer <API_SECRET>" \
     -H "Content-Type: application/json" \
     -d '{"scores":{"Cultural":3,"Economic":7,"Military":2,"Sovereignty":8,"Governance":6,"Class":4},"actors":["Conservative Party"],"format":"png","width":800,"height":800}' \
     https://localhost:3000/api/chart \
     -o chart.png
```

---

## Shareable Web URL (No API Required)

The live UI at `https://earlution.github.io/6-axis-compass/` supports generating maps directly via a **parameterised hash URL**. No API key or server call is required—everything is rendered client-side.

### URL Format

```
https://earlution.github.io/6-axis-compass/#v2;c=5.0,e=5.0,m=5.0,s=5.0,l=5.0,a=5.0;o=flat;x=cemsla
```

| Segment | Meaning | Example |
|---------|---------|---------|
| `v2` | URL format version (`v1` for legacy maps, `v2` for current) | `v2` |
| `c=5.0,e=5.0,m=5.0,s=5.0,l=5.0,a=5.0` | Axis scores (0–10). Keys: `c`=Cultural, `e`=Economic, `m`=Military, `s`=Sovereignty, `l`=Governance, `a`=Class | `c=7.0,e=3.0,m=8.0,s=6.0,l=5.0,a=1.0` |
| `o=flat` | Chart orientation: `flat` (vertex at top) or `pointy` (flat edge at top) | `o=pointy` |
| `x=cemsla` | Axis display order. The letters define clockwise order starting from the top-right. | `x=cemsla` |
| `i=` *(optional)* | Inverted axes. Letters indicate which axes have swapped low/high poles. | `i=la` |

### Constructing a URL Manually

1. **Scores:** For each axis, assign `0–10` using the one-letter keys.
2. **Orientation:** Pick `flat` or `pointy`.
3. **Axis order:** Arrange the six letters in your preferred clockwise order. Default is `cemsla`.
4. **Inverted axes** *(optional)*: Add `i=` followed by the letters of any axes you want to invert.

**Example — Centrist profile, pointy orientation:**

```
https://earlution.github.io/6-axis-compass/#v2;c=5.0,e=5.0,m=5.0,s=5.0,l=5.0,a=5.0;o=pointy;x=cemsla
```

**Example — Strong cultural nationalist, economic nationalist, non-interventionist:**

```
https://earlution.github.io/6-axis-compass/#v2;c=9.0,e=8.0,m=1.0,s=7.0,l=5.0,a=4.0;o=flat;x=cemsla
```

### Behaviour

- Visiting a valid hash URL **skips the quiz** and renders the results screen immediately.
- Actor overlays are not encoded in the URL; the user toggles them manually in the results screen.
- The URL updates automatically when the user changes orientation or axis order, so copying the browser address bar always captures the current view.
- `v1` URLs are backwards-compatible: the app auto-detects legacy hashes and applies the correct Governance-axis polarity correction.

---

## CI/CD Dispatch API

For automated pipelines and external systems (e.g. the `common-enemy` project), the repository accepts `repository_dispatch` events. These are triggered via the GitHub API and run inside GitHub Actions rather than hitting a local server.

All dispatch events require a shared secret.

### Authentication

Every `repository_dispatch` payload must include:

```json
{
  "token": "${{ secrets.COMPASS_DISPATCH_TOKEN }}"
}
```

The `DISPATCH_TOKEN` secret is configured in the 6-axis-compass repository settings. Requests with a missing or mismatched token are rejected before any work begins.

### Event Types

| Event type | Purpose |
|-----------|---------|
| `paper-revised` | Regenerate **all** artifacts and upload the full set to OSF. Optionally copies a companion PDF from the `common-enemy` repo. |
| `generate-radar` | Selectively generate artifacts for one or more actors, then optionally upload them to OSF. |
| `upload-asset` | Upload a single pre-built file from the repo to a specific OSF component. |

### `generate-radar` Payload

```json
{
  "event_type": "generate-radar",
  "client_payload": {
    "token": "${{ secrets.COMPASS_DISPATCH_TOKEN }}",
    "actors": ["SNP", "Plaid Cymru"],
    "upload_to_osf": true,
    "osf_component": "actors",
    "requested_by": "common-enemy-ci"
  }
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `token` | `string` | **Yes** | — | Must match the `DISPATCH_TOKEN` secret. |
| `actors` | `string[]` | **Yes** | — | Actor names exactly as they appear in `data/actors/*.json`. |
| `upload_to_osf` | `boolean` | No | `true` | Whether to upload generated SVGs to OSF after generation. |
| `osf_component` | `string` | No | `"actors"` | OSF folder name (e.g. `actors`, `comparisons`, `archive`). |
| `requested_by` | `string` | No | `"manual"` | Audit-trail identifier for the calling system. |

**Workflow behaviour**
- Runs `npm ci`.
- Runs `scripts/generate-radar.mjs --actors "Name1,Name2"` to produce JSON, TEX, and SVG files in `paper-artifacts/`.
- If `upload_to_osf` is not `false`, uploads each actor's SVG to the specified OSF component.

### `upload-asset` Payload

```json
{
  "event_type": "upload-asset",
  "client_payload": {
    "token": "${{ secrets.COMPASS_DISPATCH_TOKEN }}",
    "asset_path": "paper-artifacts/actors/SNP.svg",
    "osf_component": "actors",
    "osf_filename": "SNP-Declared-Radar-v1.0.0.svg",
    "requested_by": "common-enemy-ci"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | `string` | **Yes** | Must match the `DISPATCH_TOKEN` secret. |
| `asset_path` | `string` | **Yes** | Repository-relative path to the file. |
| `osf_component` | `string` | **Yes** | Target OSF folder name. |
| `osf_filename` | `string` | **Yes** | Filename to use on OSF. |
| `requested_by` | `string` | No | Audit-trail identifier. |

**Workflow behaviour**
- Verifies `DISPATCH_TOKEN`.
- Runs `scripts/upload-asset-to-osf.mjs` with the provided path, component, and filename.

### Triggering from another repository

Use `peter-evans/repository-dispatch@v3` (or any GitHub API client) from the calling repo:

```yaml
- name: Trigger selective radar generation
  uses: peter-evans/repository-dispatch@v3
  with:
    token: ${{ secrets.COMPASS_REPO_PAT }}
    repository: earlution/6-axis-compass
    event-type: generate-radar
    client-payload: |
      {
        "token": "${{ secrets.COMPASS_DISPATCH_TOKEN }}",
        "actors": ["SNP"],
        "upload_to_osf": true,
        "requested_by": "common-enemy-ci"
      }
```

**Required secrets in the calling repository:**
- `COMPASS_REPO_PAT` — GitHub PAT with `repo` scope for `earlution/6-axis-compass`.
- `COMPASS_DISPATCH_TOKEN` — Shared secret matching the `DISPATCH_TOKEN` in 6-axis-compass.

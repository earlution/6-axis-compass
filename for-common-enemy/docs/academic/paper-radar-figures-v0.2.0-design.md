# Academic paper radar figures — design note (v0.2.0)

**Status:** Draft (paper **0.x.x**). Figures are **illustrative**; there is no publication-grade confidence gate on the chart layer alone. The **traceable analytic record** for structural (S) scores remains **Table 1** in `academic-paper-v0.2.3.md` §3.3.

**Regeneration:** Run `bash docs/academic/scripts/fetch-paper-radar-figures.sh` with a running [Six-Axis Compass](https://github.com/earlution/6-axis-compass) API and `API_SECRET` set (see script header). Committed PNGs live under `docs/academic/figures/v0.2.0/`.

**Rationale doc:** [`radar-maps-academic-paper-justification-v0.1.0.md`](radar-maps-academic-paper-justification-v0.1.0.md) (Figure 1–2; Figure 3 substituted per v0.2.0 plan — Reform UK vs Restore Britain instead of blocked temporal Map 3).

---

## 1. Axis names and polarity (best-effort)

`POST /api/chart` uses the upstream axis keys: `Cultural`, `Economic`, `Military`, `Sovereignty`, `Governance`, `Class`. These align **by key** with Table 1 column labels.

**Assumption:** Pole direction matches the paper’s Table 1 footnote and the compass [API axis table](https://github.com/earlution/6-axis-compass/blob/main/API.md) (0–10 scale). If a spoke is later inverted, bump the paper patch and regenerate PNGs.

---

## 1a. Radar spoke order (OQ2 / WB-031)

**Canonical order** (pedagogical, tabular, and clockwise spoke order — identical): Cultural → Economic → Military → Sovereignty → Governance → Class. Default orientation: `flat` (Cultural at the top flat edge). Authoritative specification: *Axis Scale Specification and Radar Methodology* **v0.0.3** §II(a); ratification record: `docs/session-notes/wb022-editorial-decisions-session-note.md`.

**Upstream aligned (2026-05-20):** Six-Axis Compass **v2.6.0** default `AXES` matches OQ2. PNGs under `figures/v0.2.0/` were regenerated after WB-032 / WB-031 Phase B. Re-run only when payloads, compass version, or Table 1 **(S)** coordinates change.

**Compass version pinned:** **v2.6.0** — tag `bf6d1e19583e4b58f4b728b4e99ad32b31ff06ed` (axis-order commit `cb7a70b`) — OQ2 `AXES` order; `POST /api/chart` defaults and optional `register: "structural"` for actor overlays.

---

## 2. Mechanical constraint: actor `name` strings

`actors[]` must match **`name` from `GET /api/actors`** exactly. Verified against a live API (compass v2.5.8 dataset):

| Role in figure | `GET /api/actors` `name` |
|----------------|--------------------------|
| Reform UK | `Reform UK` |
| Green Party | `Green Party` |
| Conservative Party | `Conservative Party` |
| Labour Party | `Labour Party` |
| Liberal Democrats | `Liberal Democrats` |
| Restore Britain | `Restore Britain` |

---

## 3. Numeric layer: API vs Table 1 structural (S)

The Six-Axis Compass REST handler resolves each actor’s **primary** `scores` block from `data/actors/*.json` for polygon vertices (see upstream `api/lib/actor-store.js`). **It does not automatically plot `dualRegister.structural`.**

For several Westminster parties the primary `scores` differ from Table 1 **(S)**. Until upstream exposes a `register: "structural"` request field (or syncs primary scores to S), **embedded PNGs are “Compass-primary” renderings** for layout and API reproducibility. **Table 1 remains the paper’s authoritative S-tier table.** Draft captions in the `.md` file state this explicitly.

---

## 4. Figure definitions

### Figure 1 — Convergence overlay (thesis-critical)

- **Intent:** Nationalist-right exemplar vs anti-imperialist-left exemplar (justification doc Map 1 family).
- **Actors:** `Reform UK`, `Green Party`.
- **Output:** `figures/v0.2.0/figure-01-convergence.png` (1400×1400 PNG).
- **Request body:** `docs/academic/scripts/paper-radar-payloads-v0.2.0/figure-01-convergence.request.json`
- **Caption (draft, in paper):** Structural radar overlay — Reform UK vs Green Party; draft Compass REST render; analytic **(S)** values in Table 1; Protocol v0.2.0.

### Figure 2 — Reference lattice (supporting)

- **Intent:** Orienting four major parties (justification Map 2 family; single chart).
- **Actors:** `Conservative Party`, `Labour Party`, `Liberal Democrats`, `Green Party`.
- **Output:** `figures/v0.2.0/figure-02-reference.png` (1400×1400 PNG).
- **Request body:** `figure-02-reference.request.json`
- **Caption (draft):** Four-party reference radar; draft Compass REST render; Table 1 **(S)** for numeric traceability.

### Figure 3 — Reform UK vs Restore Britain (substitute for blocked temporal Map 3)

- **Intent:** Nationalist-right **economic-axis** internal contrast (§5.3 / Table 1); Restore Britain caveats stay in body prose.
- **Actors:** `Reform UK`, `Restore Britain`.
- **Output:** `figures/v0.2.0/figure-03-reform-restore.png` (1400×1400 PNG).
- **Request body:** `figure-03-reform-restore.request.json`
- **Caption (draft):** Reform UK vs Restore Britain; draft Compass REST render; see §5.3 and Table 1 **(S)**.

---

## 5. Common request fields (all figures)

Shared JSON shape (also embedded per `*.request.json`):

```json
{
  "scores": { "Cultural": 0, "Economic": 0, "Military": 0, "Sovereignty": 0, "Governance": 0, "Class": 0 },
  "format": "png",
  "width": 1400,
  "height": 1400,
  "showUser": false
}
```

`scores` are a neutral baseline because the user polygon is hidden (`showUser: false`). Only named **actors** are drawn.

---

## 6. Upstream API note (PNG generation)

Compass **v2.5.8** `api/lib/chart-renderer.js` must load `src/data.js` **before** `src/chart.js` so `getEffectiveScores` is in scope for `drawRadar`. If `POST /api/chart` returns **500** with `getEffectiveScores is not defined` in server logs, apply that ordering fix locally or upgrade the compass checkout before running the fetch script.

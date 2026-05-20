# Feature Request: 6-Axis Compass — Public Read API and Private Write API

**Target repository:** [earlution/6-axis-compass](https://github.com/earlution/6-axis-compass)  
**Canonical spec (upstream):** [`docs/feature-request-public-private-api-v0.1.0.md`](feature-request-public-private-api-v0.1.0.md)  
**Version:** 0.1.0  
**Date:** 2026-05-20  
**Priority:** HIGH  
**Status:** Filed — awaiting compass implementation  
**Supersedes:** [`6-axis-compass-api-fr-v0.0.1.md`](6-axis-compass-api-fr-v0.0.1.md) (dispatch-only sketch; partial ship in compass `API.md` v1.2+)

---

## Summary (common-enemy)

This FR specifies the API surface **common-enemy** needs to automate academic paper builds with arbitrary radar figures, while keeping actor curation traceable and authenticated.

| Zone | Auth | Purpose |
|------|------|---------|
| **Public read** | None | List/read actors; `POST /api/chart` for any valid radar permutation |
| **Private write** | `ADMIN_SECRET` (repo secret) | Create/update actor JSON with schema + source validation |

**Downstream automation (goal):**

```text
paper-figure-manifest.json  →  public POST /api/chart  →  PNGs
                           →  build-socarxiv.sh       →  academic-paper-vX.Y.Z.pdf
```

Actor score updates from common-enemy research artifacts use the **private write** path (or PR into `data/actors/`), not the public API.

---

## Why common-enemy cares

1. **Paper figures** — Replace local `npm run api` + `API_SECRET` with a hosted public chart endpoint (see `fetch-paper-radar-figures-v0.2.0-design.md`).
2. **Table 1 vs chart** — Require `register: "structural"` on overlays so PNGs match S-tier table (methodology v0.0.3).
3. **Any permutation** — Manifest-driven figures for revisions, rebuttals, or alternate comparisons without editing shell loops.
4. **Traceability** — Dual-register updates must carry `sources` / `rationale`; align with Protocol v0.2.0.

---

## Work blocks (proposed — common-enemy)

| WB | Repo | Task | Depends on |
|----|------|------|------------|
| WB-033 | compass | Phase 1: public read API + deploy | — |
| WB-034 | compass | Phase 2: private write API + audit log | WB-033 |
| WB-035 | common-enemy | `paper-figure-manifest` + `render-paper-figures.sh` | WB-033 |
| WB-036 | common-enemy | CI: PDF build from manifest (no local API) | WB-035 |

*(Register in AWB when editorially approved.)*

---

## Full specification

The complete endpoint definitions, security model, persistence, phases, and definition of done are in the **canonical upstream document**:

**[6-axis-compass `docs/feature-request-public-private-api-v0.1.0.md`](https://github.com/earlution/6-axis-compass/blob/main/docs/feature-request-public-private-api-v0.1.0.md)**

Do not duplicate the spec in two places; update the compass file on revision and bump this stub’s version pointer only.

---

## Secret naming (clarification)

| Name | Use |
|------|-----|
| `API_SECRET` / `API_BASE` | Legacy chart server bearer (read); **optional** after public read ships |
| `ADMIN_SECRET` | Private write API only |
| `COMPASS_REPO_PAT` | GitHub `repository_dispatch` — **not** chart rendering |
| `OSF_PAT` / `OSF_NODE_ID` | OSF uploads — **not** compass chart API |

---

*A Common Enemy | Feature Request pointer | Version 0.1.0*

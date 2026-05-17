# Six-Axis Compass — Agent Instructions
## for-claude-ai/ | Cross-Repo Project Sync
### Version 1.0.0

---

## Scope

This document is for the **Claude AI agent** working in the `earlution/6-axis-compass` repository (this repo). It covers the relationship between this repository and the `earlution/common-enemy` monorepo, including the cross-repo CI mechanism and where to find canonical framework definitions.

---

## The Two Repos

| Repository | Role | URL |
|---|---|---|
| `earlution/common-enemy` | Primary monorepo. Academic paper, podcast scripts, governance docs, reference framework. **Source of truth for all framework definitions.** | `https://github.com/earlution/common-enemy` |
| `earlution/6-axis-compass` | Standalone open-source web app (this repo). Interactive six-axis political compass with quiz, radar charts, actor overlays, export/import. Deployed at `https://earlution.github.io/6-axis-compass/`. | `https://github.com/earlution/6-axis-compass` |

This repo is the **consumer** of framework definitions from `common-enemy`. The axis scales, methodology, questionnaire, and actor coordinates are authored there and enacted here.

---

## Source of Truth Documents (in common-enemy)

Before making any framework change in this repo, read the corresponding canonical document in `common-enemy`:

| Document | Path in common-enemy | Purpose |
|---|---|---|
| Axis Scale Specification and Radar Methodology | `docs/governance/axis-scale-specification-and-radar-methodology-v0.0.2.md` | Defines the 0–10 scales, anchor examples, dual-register methodology |
| Axis Coding Questionnaire | `docs/governance/axis-coding-questionnaire-v0.0.1.md` | The canonical 24-question instrument for deriving coordinates |
| Defining Principles | `docs/governance/defining-principles-v0.1.0.md` | Framework taxonomy, standing definitions, bias protocol |
| Defining Principles — Supplement (Axis Restructure) | `docs/governance/defining-principles-supplement-axis-restructure-v0.0.2.md` | The liberty → libertarian/authoritarian restructure proposal |
| Linguistic Register | `docs/governance/linguistic-register-v0.0.1.md` | Vocabulary constraints, register tiers, retired terms |
| Reference Framework | `docs/research/reference-framework-v0.0.5.md` | Source-backed coordinates and citations for each actor |

**Rule:** If a framework document in `common-enemy` has been updated but this repo has not yet reflected the change, the `common-enemy` version takes precedence. File a work block or issue to track the enactment.

---

## Cross-Repo CI: Receiving Paper Revisions

### How it works

When the academic paper is revised in `common-enemy`, a `repository_dispatch` event is sent to this repo automatically.

1. **Trigger:** Push to `common-enemy/main` touching `docs/academic/academic-paper-*`, `references.bib`, or `docs/governance/**`
2. **File:** `common-enemy/.github/workflows/trigger-compass-osf.yml`
3. **Payload received by this repo:**
   ```json
   {
     "paper_version": "v0.1.4",
     "commit_hash": "<sha>",
     "paper_path": "docs/academic/academic-paper-v0.1.4.pdf",
     "timestamp": "<ISO8601>"
   }
   ```

### What this repo's CI does on receipt

File: `.github/workflows/ci.yml`

1. Runs the normal build and artifact generation (`npm run generate-artifacts`)
2. If triggered by `repository_dispatch`:
   - Checks out `common-enemy` at the dispatched commit
   - Copies the paper PDF to `paper-artifacts/paper/`
3. Uploads all artifacts (actors/, comparisons/, paper/) to OSF via `scripts/upload-to-osf.mjs`
4. **Skips the `deploy` job** (GitHub Pages redeployment only happens on `push` events)

### What you must not do

- Do not manually edit the `paper/` folder contents — they are produced by CI
- Do not commit the paper PDF to this repo — it is fetched at build time
- Do not change the `repository_dispatch` event type name (`paper-revised`) — the trigger workflow in `common-enemy` depends on it

---

## Directory Structure and Responsibilities

```
6-axis-compass/
├── .github/workflows/ci.yml       # CI: build, test, generate artifacts, upload OSF
├── scripts/
│   ├── build.js                    # Inline source into dist/index.html
│   ├── generate-paper-artifacts.mjs # Server-side SVG/JSON/TEX generation
│   ├── upload-to-osf.mjs           # OSF API v2 upload client
│   └── paper-config.json           # Comparison group definitions
├── src/
│   ├── index.html                  # Source HTML (built into dist/)
│   ├── data.js                     # Quiz questions, AXES, AXIS_META, ACTORS
│   ├── chart.js                    # SVG radar chart renderer
│   ├── ui.js                       # Screen management, interactions
│   ├── export.js                   # JSON/XML export/import
│   ├── i18n.js                     # Translation infrastructure
│   └── styles.css                  # Theme variables, layout
├── data/actors/                    # Source JSON for each actor
├── paper-artifacts/                # Generated output (gitignored)
│   ├── actors/                     # Per-actor SVG, JSON, TEX
│   ├── comparisons/                # Group comparison SVG, JSON
│   └── paper/                      # Paper PDF (populated by CI only)
├── dist/                           # Deployable output (gitignored)
│   └── index.html                  # Self-contained, zero-dependency
└── for-claude-ai/
    └── AGENT-INSTRUCTIONS.md       # This file
```

---

## What Goes Where

| Type of work | Belongs in |
|---|---|
| Interactive web app (HTML, CSS, JS) | `6-axis-compass` |
| Radar chart SVG generation, actor JSON exports | `6-axis-compass` |
| Quiz questions, axis labels, response text | `6-axis-compass` (but derived from common-enemy methodology) |
| Actor scores and coordinates | `6-axis-compass` (but must be source-backed per common-enemy Reference Framework) |
| PWA, i18n, theme toggle, shareable URLs | `6-axis-compass` |
| Academic paper (LaTeX, markdown, PDF) | `common-enemy` |
| Podcast scripts, show notes | `common-enemy` |
| Framework definitions, methodology, questionnaire | `common-enemy` |
| Reference Framework, source-backed coordinates | `common-enemy` |
| OSF upload automation | Both (trigger in `common-enemy`, execution in `6-axis-compass`) |

---

## Secrets Required (Repository-level)

| Repo | Secret | Purpose |
|---|---|---|
| `6-axis-compass` | `OSF_PAN` | OSF Personal Access Token for API uploads |
| `6-axis-compass` | `OSF_NODE_ID` | OSF project node ID (stored as variable, not secret) |
| `6-axis-compass` | `COMMON_ENEMY_PAT` | PAT with `repo` scope for `earlution/common-enemy`; used by CI to checkout paper PDF |

If `COMMON_ENEMY_PAT` is missing or expired, the CI checkout step fails and no paper PDF is uploaded to OSF.

---

## Axis Restructure Status

The compass has **partially implemented** the axis restructure approved in `common-enemy/docs/governance/defining-principles-supplement-axis-restructure-v0.0.2.md`:

- ✅ Liberty axis renamed to Libertarian/Authoritarian
- ✅ Axis order updated to: Cultural, Economic, Military, Sovereignty, Libertarian/Authoritarian, Class
- ✅ Quiz questions rewritten for new axis
- ✅ Actor scores recalibrated (first-cut)
- ✅ Backwards compatibility for old exports
- ⬜ Dual-register methodology (declared vs structural radar)
- ⬜ Reference Framework integration (reading coordinates from source-backed data)
- ⬜ Comparison group expansion with historical anchors

The remaining items are tracked in `POST_RELEASE_PLAN.md` in this repo (Commits A1–A6 optional enhancements, B1–B4 axis restructure refactor).

---

## Communication Protocol Between Agents

- **claude.ai** (reasoning agent): Works in both repos. When framework changes are drafted in `common-enemy`, produces a session note or work block specifying what must change here.
- **Claude Code** (execution agent): Implements changes in whichever repo they belong to. Never assumes a document change in `common-enemy` automatically appears here.
- **Ruari** (human coordinator): Approves cross-repo changes. The axis restructure requires explicit approval before being enacted.

---

## Quick Reference

**Build the app:**
```bash
npm run build      # or: node scripts/build.js
```

**Generate paper artifacts:**
```bash
npm run generate-artifacts
```

**Upload to OSF (local testing):**
```bash
export OSF_PAN="<your-token>"
export OSF_NODE_ID="<your-node-id>"
npm run generate-artifacts
node scripts/upload-to-osf.mjs
```

**Run tests:**
```bash
node tests/quiz.test.js
```

**Check CI status:**
```bash
gh run list --workflow=ci.yml --repo=earlution/6-axis-compass
```

**Check trigger status in common-enemy:**
```bash
gh run list --workflow=trigger-compass-osf.yml --repo=earlution/common-enemy
```

---

*Six-Axis Compass | for-claude-ai/ | Agent Instructions v1.0.0*

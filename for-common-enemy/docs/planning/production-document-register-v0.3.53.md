# A COMMON ENEMY
## Production Document Register
### Version 0.3.53

---

## Versioning Schema

| Increment | Trigger |
|---|---|
| **Major** (x.0.0) | Series thesis or structure changes substantially |
| **Minor** (0.x.0) | Episode number (for episode scripts); significant structural change (for series documents) |
| **Patch** (0.0.x) | Revision within an episode or document |

**This register** increments its minor version when a new document is added, and its patch version when an existing document's current version is updated or a correction is made.

---

## Document Categories

| Code | Category | Description |
|---|---|---|
| **GOV** | Governance | Foundational documents: philosophy, standards, methodology |
| **PLAN** | Planning | Structural and production planning documents |
| **REF** | Reference | Source registers, evidence frameworks, citation documents |
| **AUDIT** | Audit | Bias audit logs and pre-recording checklists |
| **SESSION** | Session Notes | Raw capture of verbatim phrases, images, and arguments from working conversations |
| **SCRIPT** | Script | Episode scripts |
| **LOGIC** | Logical Formalisations | Propositional structures, truth tables, counter-argument analyses |
| **COORD** | Coordination | Delegation and handoff documents between agents |
| **ANALYSIS** | Word and Concept Analyses | Deep analysis of specific terms and concepts |
| **ACAD** | Academic Paper Materials | Paper versions, bibliography, compiled outputs |
| **INFRA** | Infrastructure | Repository, deployment, tooling |

---

## Terminology — housekeeping

**Housekeeping protocol** — The binding rules in this document’s **Housekeeping and batch-ingestion protocol** (principles, staging, pointer file, ordered passes), together with the Agent Work Blocks **Deletion Authority Protocol**, **Version Bump Protocol** (copy-then-edit; never bump in place), and **deletion clearance** format. It states *what must be true* for the repo to stay canonical (versioning, provenance, who may delete, when staging may be cleared).

**HKW** (*Housekeeping Workflow*) — The ordered operator sequence for a Claude Desktop → repo batch. The same sequence appears as the numbered checklist in Agent Work Blocks § **Post-batch housekeeping — HKW**. **HKW implements the protocol:** it is the repeatable mechanical pass that applies those binding rules without drift.

**ADR-006** records the architectural decision to split normative protocol (PDR + AWB rules) from the executable workflow label (HKW). See [`docs/governance/housekeeping-protocol-and-hkw-v0.0.1.md`](../governance/housekeeping-protocol-and-hkw-v0.0.1.md).

---

## Register

### GOV — Governance Documents

| Document | Current Version | File | Status | Notes |
|---|---|---|---|---|
| Defining Principles | `0.2.1` | `docs/governance/defining-principles-v0.2.1.md` | Active | **`MINOR` bump — governance axis rename (WB-028, OQ4).** §IV: all live "libertarian/authoritarian axis" references replaced with "governance axis"; layered vocabulary introduced on first use ("governance axis (also: political-authority axis; pol-auth)"). §IV(d) "Liberal (1)" definition pole reference updated. v0.2.0 changes preserved: liberty axis replaced; class axis paragraph absorbed liberty-axis class content; introductory "six distinct dimensions" framing; convergence zone third-axis scope condition. |
| Defining Principles — Supplement (Axis Restructure) | `0.0.2` | `docs/governance/defining-principles-supplement-axis-restructure-v0.0.2.md` | Discussion draft | Proposes deprecating the liberty axis and replacing it with a libertarian/authoritarian axis. Adds axis-conflation rhetoric and the radar diagnostic as substantive sections. `MAJOR`-class change pending editorial decision on three open questions. v0.0.1 retained as discussion-trail predecessor (reconstruction — see Version History Index). |
| Axis Scale Specification and Radar Methodology | `0.0.3` | `docs/governance/axis-scale-specification-and-radar-methodology-v0.0.3.md` | Discussion draft | **WB-031 Phase A:** §II(a) OQ2 radar spoke distribution (canonical order, `flat` default); axis 5 pole label → Governance. Dual register, anchors, inter-coder protocol unchanged. v0.0.2 superseded. v0.0.1 retained (reconstruction). |
| Axis Coding Questionnaire | `0.0.1` | `docs/governance/axis-coding-questionnaire-v0.0.1.md` | Discussion draft | 27 coding questions across the six axes — variable per axis (3-6 each). 0–4 scoring per question, normalised to 0–10 framework scale. Worked example: Labour 1997–2010 economic axis, 1.9-point declared/structural delta. Depends on Supplement and Methodology adoption. |
| ADR-005: Ollama Model Ecosystem | `0.0.1` | `docs/governance/ollama-model-ecosystem-v0.0.1.md` | Active | Dual-tier AI model ecosystem (3 cloud slots + local M1 Pro). Role-based assignment: Engineer (`kimi-k2.6`), Creator (`qwen3.5:122b`/`gemma4:31b`), Scholar (`deepseek-r1:32b` local). Local tier: `deepseek-r1:32b`, `laguna-xs.2`, `granite4.1:8b`, `qwen3.5:7b–14b`, `lfm2.5-thinking`. Subscription economics (Ollama Pro, Cursor Pro, DeepSeek Pro) analyzed. Filed 2026-05-18. |
| ADR-006: Housekeeping protocol and HKW | `0.0.1` | `docs/governance/housekeeping-protocol-and-hkw-v0.0.1.md` | Active | Documents the split: **housekeeping protocol** (normative rules in PDR + AWB) vs **HKW** (*Housekeeping Workflow* — operator checklist that implements the protocol). Filed 2026-05-20. |

---

### PLAN — Planning Documents

| Document | Current Version | File | Status | Notes |
|---|---|---|---|---|
| Series Episode Plan | `0.0.9` | `docs/planning/series-episode-plan-v0.0.9.md` | Active | Episodes 1–19 retrofitted with five-field requirements spec format. Lowe/Restore Britain right-wing economic axis note added to multi-axis framework section. WB-002 and WB-003 complete. |
| Episode Requirements Specs | `0.0.2` | `docs/planning/episode-requirements-specs-v0.0.2.md` | Active | Episode 0 added with eight segment-level specifications. |

---

### REF — Reference Documents

| Document | Current Version | File | Status | Notes |
|---|---|---|---|---|
| Reference Framework | `0.0.6` | `docs/research/reference-framework-v0.0.6.md` | Active | **Governance axis sources added (WB-028).** Adorno et al. (1950) and Altemeyer (1996) added under new governance-axis row in Episode 2 section as the psychometric grounding cited in Academic Paper v0.1.7 §2.1. Former liberty-axis row (Mill/Berlin/Hayek) repurposed to reflect the class-axis absorption of that analytical content; sources retained as historical-tradition references. Title corrected. Remaining axis-conflation rhetoric sources (Polanyi forward; Schmitt; Paxton; Leninism primary documents) deferred to WB-027 pending OQ3 placement decision. |
| Brexit Under the Six-Axis Framework | `0.0.1` | `docs/research/brexit-under-six-axis-framework-v0.0.1.md` | Discussion draft | First worked application of the restructured framework. Five Leave components and three Remain components mapped via the questionnaire. Cross-component table shows convergence on sovereignty axis (1.5–3.5) and divergence elsewhere. Predicts post-2016 fragmentation pattern; record consistent. Engages Goodwin-Eatwell counter-argument. First-cut codings — pending inter-coder verification. Depends on Supplement, Methodology, and Questionnaire adoption. Companion SVG: `docs/research/brexit-coalitions-radar-declared-v0.0.1.svg`. |
| Rojava / Democratic Confederalism Research Note | `0.0.1` | `docs/research/rojava-democratic-confederalism-research-note-v0.0.1.md` | Active | Six-axis mapping, intellectual lineage (Öcalan, Bookchin, Kropotkin), bibliography, feminist governance open question (undecided), sovereignty axis anomaly noted, series relevance and bias audit flags. Reference point now; full episode treatment deferred to WB-029. |

---

### AUDIT — Audit Documents

| Document | Current Version | File | Status | Notes |
|---|---|---|---|---|
| Bias Audit Log | `0.0.6` | `docs/audit/bias-audit-log-v0.0.6.md` | Active | 19 standing flags. New flag: framework-restructure transparency — acknowledges the axis restructure as a substantive analytical commitment requiring explicit disclosure on air. |

---

### SESSION — Session Notes

| Document | Current Version | File | Status | Notes |
|---|---|---|---|---|
| Session Notes | `0.2.7` | `docs/session-notes/session-notes-v0.2.7.md` | Active | Gary Stevenson endorsement strategy banked. Sequence, timing, Rory Stewart precedent noted. |
| Session Handoff Note | `2026-05-16` | `docs/session-notes/session-handoff-note-2026-05-16.md` | Active | Framework restructure session: axis restructure, methodology, questionnaire, Brexit case study, housekeeping. |
| WB-022 Editorial Decisions | `2026-05-17` | `docs/session-notes/wb022-editorial-decisions-session-note.md` | Active — historical record (with OQ4 forward-pointer) | Editorial review of axis restructure open questions (Supplement §IX). Three questions settled at 2026-05-17: OQ1 (axis name) ratified as "libertarian/authoritarian"; OQ2 (axis order) ratified as slot 5; OQ3 (liberty vocabulary) settled as class-axis absorption with axis-conflation rhetoric deferred. WB-023 and WB-026 unblocked. **OQ1 subsequently superseded by OQ4 (2026-05-18): "libertarian/authoritarian" → "governance axis".** Forward-pointer added at top of document; historical decision text preserved unchanged below the pointer. |
| OQ4 Governance Axis Naming | `2026-05-18` | `docs/session-notes/oq4-governance-axis-session-note.md` | Active | Fourth open question settled: the fifth axis will be labelled the *governance axis*; *political authority* / *political-authority axis* as the explanatory register; *pol-auth* as the internal shorthand. WB-028 created to track the rename sweep (~80 occurrences across 8 live documents). |
| WB-028 §2.1 Lineage Draft | `2026-05-18` | `docs/session-notes/wb028-s21-lineage-paragraph-draft.md` | Executed — inserted into Academic Paper v0.1.7 | §2.1 paragraph inserted into Academic Paper v0.1.7 on 2026-05-18 as part of the WB-028 paper-side execution. Draft retained as the original record of the insertion specification. |
| WB-028 Governance Axis Scope Note | `2026-05-18` | `docs/session-notes/wb028-governance-axis-scope-note-draft.md` | Executed — inserted into Academic Paper v0.1.7 | §3.2 scope note and §8 conclusion fourth-limit paragraph inserted into Academic Paper v0.1.7 on 2026-05-18 as part of the WB-028 paper-side execution. "Three limits" → "Three empirical limits" in §8. Draft retained as the original record of the insertion specification. |

---

### LOGIC — Logical Formalisations

| Document | Current Version | File | Status | Notes |
|---|---|---|---|---|
| Logic Framework | `0.0.6` | `docs/audit/logical-formalisation-framework-v0.0.6.md` | Active | P6 standard — formal definition of "primary structural cause." Convergence thesis retrofitted to P6 standard. Framework internally consistent. |

---

### COORD — Coordination Documents

| Document | Current Version | File | Status | Notes |
|---|---|---|---|---|
| Agent Work Blocks | `0.2.35` | `docs/operations/agent-work-blocks-v0.2.35.md` | Active | **WB-031 COMPLETE** (Phase B). **WB-032 handback:** compass **v2.6.0** published (`bf6d1e1` tag; axis code `cb7a70b`). Source-of-truth → `production-document-register-v0.3.53.md`. |
| Six-Axis Compass — rebuild guide | `1.0.1` | `docs/operations/six-axis-compass-rebuild-guide-v1.0.1.md` | Active | WB-031: OQ2 `AXES` order and Governance label; v1.0.0 superseded. |
| Marketing Strategy | `0.0.3` | `docs/operations/marketing-strategy-v0.0.3.md` | Active | Civic nationalism standalone video as featured Track Two piece. |
| Six-Axis Compass | `2.6.0` | *Standalone repo:* `https://github.com/earlution/6-axis-compass` | **Deployed** | **WB-032:** OQ2 canonical `AXES`; tag **v2.6.0** at `bf6d1e1` on `origin/main` (axis-order `cb7a70b`; README/API `x=cemslg`). `https://earlution.github.io/6-axis-compass/`. |

---

### ANALYSIS — Word and Concept Analyses

| Document | Current Version | File | Status | Notes |
|---|---|---|---|---|
| Word Analysis: Free | `0.0.1` | `docs/research/word-analysis-free-v0.0.1.md` | Active | Libre/gratis split, political taxonomy, truth table for "free world," rhetorical mechanism, bias flag. |
| Axis Ratification: SNP and Plaid Cymru | `0.0.2` | `docs/research/axis-ratification-snp-plaid-v0.0.2.md` | Active | Numeric scoring for visual production. Radar chart concept. Candidate phrases. |
| Linguistic Register | `0.0.1` | `docs/governance/linguistic-register-v0.0.1.md` | Active | Five-tier epistemic hedging vocabulary. Grounded in Hyland (1998) and Toulmin (1958). Mapped to three registers. Retired terms. Pre-submission checklist item. |

---

### ACAD — Academic Paper Materials

| Document | Current Version | File | Status | Notes |
|---|---|---|---|---|
| Academic Paper Outline | `0.0.2` | `docs/academic/academic-paper-outline-v0.0.2.md` | Active | Subtitle corrected ("Rhetorically Absent" reinstated). Cultural axis updated to Defining Principles v0.1.0 terminology. |
| Radar maps — academic paper inclusion justification | `0.1.0` | `docs/academic/radar-maps-academic-paper-justification-v0.1.0.md` | Active | Three-part inclusion test for peer-review radar figures; Figure 1–3 proposal; temporal map deferred; Rojava overlay excluded from main text. **Canonical academic paper** pointer → **v0.2.3.md**. Coordinates conditional on **WB-025**; captions must disclose Table 1 derivation until source-backed. Cross-ref **WB-019** ingest note in AWB. **Chart API:** [Six-Axis Compass README — API](https://github.com/earlution/6-axis-compass#api); [`API.md`](https://github.com/earlution/6-axis-compass/blob/main/API.md). |
| Paper radar figures — design / reproduction (v0.2.0) | `0.2.0` | `docs/academic/paper-radar-figures-v0.2.0-design.md` | Active | **§1a** upstream aligned; compass pin **v2.6.0** (`bf6d1e1` / `cb7a70b`). PNGs regenerated WB-031 Phase B. Actor names, payloads, API-vs-Table-1 **(S)** caveat. |
| Academic Paper (full expansion) | `0.0.7` | `docs/academic/academic-paper-v0.0.7.md` | Active | ~14,100 words. Five expansion moves. LaTeX-ready. |
| Academic Paper (Cursor restructure) | `0.2.3` | `docs/academic/academic-paper-v0.2.3.md` | Active — submission-ready | **v0.2.3 (patch):** Fig 1–3 regenerated under OQ2 spoke order (compass **v2.6.0**). **v0.2.2** superseded. |
| Academic Paper — compiled outputs | `0.1.1` | `docs/academic/academic-paper-v0.1.1.tex` / `.pdf` | Active | Historical compiled outputs from v0.1.1. 23 pages. Pipeline confirmed operational. |
| BibTeX Bibliography | — | `docs/academic/references.bib` | Active | 48 entries. Hyland 1998/2005 and Toulmin 1958 added for Section 1.5. Adorno et al. (1950) and Altemeyer (1996) added for WB-028 governance axis lineage. Chicago Author-Date CSL filed alongside. |
| OSF/SocArXiv Feature Request | `0.0.1` | `docs/academic/academic-paper-osf-socarxiv-fr-v0.0.1.md` | Active | New FR: ORCID, OSF project, LaTeX template evaluation, PDF validation, pre-moderation readiness. SocArXiv designated first-submission venue. |
| SocArXiv Pandoc Template | `0.0.2` | `docs/academic/socarxiv-pandoc-template.latex` | Superseded | **v0.2.0 figures:** `\usepackage{graphicx}`. Superseded by v0.0.3 (`wrapfig`). |
| SocArXiv Pandoc Template | `0.0.3` | `docs/academic/socarxiv-pandoc-template.latex` | Active | Custom Pandoc LaTeX template. **`wrapfig`** for v0.2.2 figure column; `graphicx`; ORCID; `\xmpquote` fallback. |
| XeLaTeX / XMP patch fragment | — | `docs/academic/xmpfix.tex` | Active | Loaded via `build-socarxiv.sh` (`pandoc -H`). Belt-and-brackets `\@ifundefined{xmpquote}` fallback. |
| SocArXiv Build Script | `0.1.1` | `docs/academic/build-socarxiv.sh` | Active | Targets **`academic-paper-v0.2.3.md` → `academic-paper-v0.2.3.pdf`**; runs from `docs/academic/`. |
| Academic Paper — embedded figures (v0.2.0) | `0.2.0` | `docs/academic/figures/v0.2.0/*.png` | Active | Three PNGs (1400×1400). **Regenerated 2026-05-20** under OQ2 spoke order (compass **v2.6.0**, WB-031 Phase B). |
| Academic Paper — compiled output | `0.1.4` | `docs/academic/academic-paper-v0.1.4.pdf` | Superseded — stale | Last compiled PDF from v0.1.4 source. Source superseded by v0.1.8. 132K, 23 pages. |
| Academic Paper — compiled output | `0.1.8` | `docs/academic/academic-paper-v0.1.8.pdf` | Superseded | Compiled from v0.1.8 source. 144K, 23 pages, text-searchable, fonts embedded. Superseded by v0.1.9 with Document Provenance footer. |
| Academic Paper — compiled output | `0.1.9` | `docs/academic/academic-paper-v0.1.9.pdf` | Superseded | Compiled from v0.1.9 source. 144K, 23 pages, text-searchable, fonts embedded. Document Provenance footer added for internal traceability. Superseded by v0.1.10 with sourced coordinates. |
| Academic Paper — compiled output | `0.1.10` | `docs/academic/academic-paper-v0.1.10.pdf` | Superseded | Compiled from v0.1.10 **source** (160K). Superseded by v0.1.11.pdf — v0.1.11.md is metadata / planned-figures pointer only; axis scores unchanged. |
| Academic Paper — compiled output | `0.1.11` | `docs/academic/academic-paper-v0.1.11.pdf` | Superseded | Compiled from v0.1.11 source (160K). Superseded by **v0.1.12.pdf** — §3.3 planned-figure placement note; coordinates unchanged. |
| Academic Paper — compiled output | `0.1.12` | `docs/academic/academic-paper-v0.1.12.pdf` | Superseded | Compiled from v0.1.12 source. **164K**. Superseded by **v0.2.0.pdf** — embedded draft radar figures. |
| Academic Paper — compiled output | `0.2.0` | `docs/academic/academic-paper-v0.2.0.pdf` | Superseded | Full-width figure layout; superseded by **v0.2.1.pdf** (half-width rows). |
| Academic Paper — compiled output | `0.2.1` | `docs/academic/academic-paper-v0.2.1.pdf` | Superseded | Minipage caption-left layout; superseded by **v0.2.2.pdf** (wrapfig). |
| Academic Paper — compiled output | `0.2.2` | `docs/academic/academic-paper-v0.2.2.pdf` | Superseded | Wrapfig layout; superseded by **v0.2.3.pdf** (OQ2 figure regen). |
| Academic Paper — compiled output | `0.2.3` | `docs/academic/academic-paper-v0.2.3.pdf` | Active — submission-ready | Compiled from v0.2.3 source. **~640K**; wrapfig + OQ2 spoke-order figures. |

### INFRA — Infrastructure

| Item | Current Version | File | Status | Notes |
|---|---|---|---|---|
| GitHub Repository | — | — | **Active (private)** | https://github.com/earlution/common-enemy — private. Go public on series air date. Session Notes biographical material requires pre-publication review pass before going public. |
| CC BY 4.0 License | `4.0` | `LICENSE` | Active | Creative Commons Attribution 4.0 International. Applies to all project materials unless otherwise noted. |
| OSF Upload Workflow | `0.0.1` | `.github/workflows/osf-upload.yml` | Active | Uploads governance documents, episode scripts, and LICENSE to OSF project on push. Paper PDF uploaded separately by 6-axis-compass CI. |
| OSF Project | — | https://osf.io/ubtz8/ | Active | Project created. CC BY 4.0 licence applied. Secrets configured: `OSF_PAT`, `OSF_NODE_ID`, `OSF_USERNAME`. |
| Register canonical pointer | — | [`docs/planning/CURRENT_PDR.md`](CURRENT_PDR.md) | Active | Tracked one-line filename of the current Production Document Register (`production-document-register-vX.Y.Z.md`). Update on every register bump; [`README.md`](../../README.md) and AWB cross-references should align. |

---

### SCRIPT — Episode Scripts

| Episode | Title | Current Version | Track | Status |
|---|---|---|---|---|
| Ep 0 — S01 | The Declared Standpoint | `0.0.1` | Book track | Initial draft. Adapted from Ep1 v0.1.7 bias declaration. Standalone segment. |
| Ep 0 — S02 | The Taxonomy | `0.0.1` | Book track | Initial draft. Trilling criterion. "Far" retired. Liberal democracy defined. SNP/Plaid civic nationalism. |
| Ep 0 — S03 | The Six-Axis Framework | `0.0.3` | Book track | **Governance axis rename (WB-028, OQ4).** Script body and production notes updated to "governance axis." Layered vocabulary introduced on first naming in script. Production note caveat updated: "libertarian" as a pole descriptor still requires the American-party-political-baggage caveat even though the axis label is now "governance." Bias audit checklist updated. v0.0.2 changes preserved: fifth-axis section rewritten through fascism vs. Restore Britain and anarcho-communism vs. Leninism worked examples; class axis section absorbed deprecated liberty-axis class content; convergence zone updated to three-axis frame. |
| Ep 0 — S04 | Define X | `0.0.1` | Book track | Initial draft. Libre/gratis primary example. Liberal/liberal conflation second example. |
| Ep 0 — S05 | The Three-Register System | `0.0.1` | Book track | Initial draft. Evidence / interpretation / moral argument. Signal phrases. Sequence non-negotiable. |
| Ep 0 — S06 | Validity vs Soundness | `0.0.1` | Book track | Initial draft. Ferrari illustration (propositional logic class example). Logic Framework vs Reference Framework roles. |
| Ep 0 — S07 | The Bartlett Standard | `0.0.1` | Book track | Initial draft. Prisoner test. Two-track production model. Book skip invitation verbatim. |
| Ep 0 — S08 | The Steelman Obligation | `0.0.1` | Book track | Initial draft. Steelman defined. Hardest objection to steelmanning at full force. Segment models the obligation. |
| Ep 0 — Aggregate | The Methodology (full) | `0.0.1` | Book track | All eight segments assembled in order with framing introduction. |
| Ep 1 | The Wrong Fight | `0.1.7` | Podcast track | Reworked opening. Character portraits developed. Bias declaration expanded. Production notes restructured. New bias audit items added. |
| Ep 2 | Nationalist About What, Exactly? | `0.2.6` | Podcast track | **Governance axis rename (WB-028, OQ4).** Single rename in Example 5 closing line ("That's the governance axis"). No layered vocabulary parenthetical — established in Ep 00 S03 before listener reaches this episode. v0.2.5 changes preserved: Example 5 (Freedom — "freedom from *what*?") replaced; "we'll come back" promise retired; *Free trade* / *free world* passages retained as straightforward rhetorical analysis without the deferred axis-conflation rhetoric framing (per OQ3). |
| Ep 3 | What Bretton Woods Actually Was | `0.3.1` | Book track | **WB-016 COMPLETE.** 8,556 words (~38–42 min). Bretton Woods (1944–1971), Nixon shock, Washington Consensus (Williamson 1989), UK consequences. Hayek-Friedman steelman in full. Milanovic elephant curve as evidential pivot. All sources logged in Reference Framework v0.0.5. |
| Ep 4 | The Globalisation Discontents — Left Version | `0.4.1` | Book track | **FILED.** 6,798 words (~38–42 min). Deindustrialisation, precarious labour, welfare state contraction as class war. UK case study: Thatcher → Blair → austerity. Class-harmony steelman delivered at full force. Manufacturing employment decline (7m → 2.5m), wage stagnation (IFS/Resolution Foundation), PFI financialisation. All sources flagged for verification. Production notes filed. Bias audit checklist complete. Ready for podcast track and verification pass. |
| Ep 5–19 | Various | — | — | Not yet drafted |

---

## Document Dependencies

```
Defining Principles (GOV)
│
├── Series Episode Plan (PLAN)
│   ├── Episode Requirements Specs (PLAN)
│   └── All episode scripts (SCRIPT)
│
├── Reference Framework (REF)
│   └── All episode scripts (SCRIPT)
│
├── Bias Audit Log (AUDIT)
│   └── All episode scripts (SCRIPT)
│
└── Logic Framework (LOGIC)
    └── All episode scripts (SCRIPT)
```

---

## Status Definitions

| Status | Meaning |
|---|---|
| **Active** | Current working version, in use |
| **In revision** | Drafted but not yet at ready-to-record standard |
| **Ready to record** | Podcast track script has passed all bias audit and logical fallacy checklist items |
| **Recorded** | Audio exists; script is locked unless a correction is required |
| **Archived** | Superseded by a later version; retained in git history |
| **Not yet drafted** | Planned but no file exists |
| **Deployable** | Tool or asset ready for deployment pending WB completion |

## Track Labels (Script documents only)

| Track | Meaning |
|---|---|
| **Book track** | Full analytical verbosity. Dense, technically precise. Forms raw material for the book chapter. v0.x.1 versions. |
| **Podcast track** | Simplified toward the Bartlett standard. Same argument, plainer language. Audio delivery. v0.x.2 onward. |
| **Ready to record** | Podcast track that has passed the full bias audit and logical fallacy checklist. Version ends in .0 (e.g. v1.2.0). |

---

## Housekeeping and batch-ingestion protocol

### Principles

**Version management:** The GitHub repo holds the complete version history. The working directory retains only the current version of each document. Superseded versions are deleted locally — recoverable from git (`git show <commit>:<path>`; see [`docs/version-history-index.md`](../version-history-index.md)).

**Episode transcript exception:** All track versions of episode transcripts are retained. Book track and podcast track versions are both kept as each serves as a development reference for the other.

**Repo structure:** All production documents under `docs/` with kebab-case filenames. `tools/` for deployable interactive assets.

**Staging directory:** `from-claude-desktop/` at the repository root is the **only** canonical gitignored staging area for Claude Desktop exports. It is listed in [`.gitignore`](../../.gitignore). Older notes may say `from-claude-ai/` — treat that as deprecated naming for the same workflow; **do not** introduce a second staging folder name in new instructions.

### Pointer file

[`docs/planning/CURRENT_PDR.md`](CURRENT_PDR.md) contains a single-line filename pointing at the current register file on disk. Update it whenever this register’s filename changes so entrypoints and agents can be checked with `rg` against drift.

### Relationship to Agent Work Blocks

The **Deletion Authority Protocol**, **Version Bump Protocol** (copy-then-edit; never bump in place), and **deletion clearance** wording are binding and live in [`docs/operations/agent-work-blocks-v0.2.35.md`](../operations/agent-work-blocks-v0.2.35.md). This **Housekeeping and batch-ingestion protocol** section states the **housekeeping protocol** (normative rules and pass order). The operator **HKW** checklist in the AWB is the executable mirror of the steps below — **HKW implements this protocol.**

### Post-batch workflow — HKW (strict order)

1. **Intake and triage** — Land exports only under `from-claude-desktop/`. Classify each artifact: new document, patch/minor/major bump, duplicate of something already canonical, or reject. Do not bump versions by editing the current canonical file in place.

2. **Install to `docs/`** — Move or copy into kebab-case paths under `docs/` per [README](../../README.md). Retain **one** current filename per logical document except: (a) episode transcripts where multiple tracks are policy-retained; (b) any register row that explicitly requires keeping a predecessor on disk (discussion trail / reconstruction).

3. **Register pass (this document)** — Bump this register’s semver per the schema at the top of this file. Update the Register tables and append a **Register Change Log** row. If this pass creates a **new** register filename, add an INFRA-style pointer update in step 7.

4. **Coordination pass (AWB)** — Bump Agent Work Blocks using a **new** `agent-work-blocks-vX.Y.Z.md` file. Update work block statuses, definitions of done, completion notes, and **deletion clearances** for superseded paths. Set the prominent **Source of truth for current document versions** line to the new register filename. Sweep **all** internal AWB references (including buried “Notes for Claude Code” boilerplate — a common drift vector).

5. **Provenance pass** — Update [`docs/version-history-index.md`](../version-history-index.md): mark prior **Current** rows **Superseded**; add rows for new versions with **real commit hashes** once the housekeeping commit exists (`git rev-parse HEAD`). A follow-up commit in the same maintenance session is acceptable if hashes were unknown at authoring time.

6. **Lean-tree pass** — Only after `git log --oneline -- <path>` confirms new files are committed: delete superseded **co-existing** versioned filenames from the branch (older `production-document-register-*.md`, older `agent-work-blocks-*.md`, and other versioned docs per batch), except explicit register retention and transcript exceptions. Git plus the version history index remain the archive.

7. **Reference hygiene** — Update [README](../../README.md) and [`CURRENT_PDR.md`](CURRENT_PDR.md). Ripgrep stale `production-document-register-v0.3.` and `agent-work-blocks-v0.2.` paths under `docs/` and `.github/`. Optionally note large deletions in [`CHANGELOG.md`](../../CHANGELOG.md).

8. **Batch closure** — Clear or quarantine `from-claude-desktop/` only after the batch meets the **Definition of Done — post-batch housekeeping (HKW)** checklist in [`.github/PULL_REQUEST_TEMPLATE.md`](../../.github/PULL_REQUEST_TEMPLATE.md) (aligned with AWB § **Post-batch housekeeping — HKW**).

---

## Outstanding Actions

| Priority | Action | WB | Dependency |
|---|---|---|---|
| ~~HIGH~~ | ~~Episode 4 sources verification pass (17 flagged figures) — ONS, IFS, Resolution Foundation, Treasury, NAO, Treasury Committee~~ | ~~WB-021~~ | **COMPLETE** — Episode 4 v0.4.2 filed with corrected figures (wage share 64%→58%, local authority cuts 20–25%). |
| ~~HIGH~~ | ~~Academic paper ORCID registration and OSF profile setup~~ | ~~WB-022~~ | **COMPLETE** — ORCID 0009-0006-4035-4761 recorded. |
| **MEDIUM** | Academic paper: evaluate SocArXiv LaTeX template and adopt if beneficial | WB-023 | WB-022 |
| **MEDIUM** | Academic paper: PDF searchability/quality validation pass | WB-024 | WB-023 (if template changes) or independent |
| ~~MEDIUM~~ | ~~OSF project creation, source file upload, and licence (CC BY 4.0)~~ | ~~WB-025~~ | **COMPLETE** — OSF at https://osf.io/ubtz8/, CC BY 4.0 licence applied, automated upload workflow configured. |
| **MEDIUM** | Transcript markup annotations + location/visual briefs, Episode Reqs Specs v0.0.3 | WB-012 | WB-007 complete ✓ |
| **MEDIUM** | Six-axis radar chart visual assets (React + SVG) | WB-019 | None |
| ~~MEDIUM~~ | ~~Deploy six-axis compass web app~~ | ~~WB-020~~ | **COMPLETE** — deployed at `https://earlution.github.io/6-axis-compass/` |
| **LOW** | Submit to SocArXiv and track pre-moderation | WB-026 | WB-022, WB-024 |
| **BLOCKED** | Update Reference Framework with Trilling (2026) | WB-017 | Host must read book first |

---

## Register Change Log

| Register Version | Change |
|---|---|
| `0.0.1`–`0.2.9` | See prior entries. |
| `0.3.0` | Housekeeping. Outputs cleaned. Housekeeping protocol added. |
| `0.3.1` | Cultural axis terminology updated. Defining Principles v0.1.0. |
| `0.3.2` | Six-axis compass web app filed. Agent Work Blocks v0.1.2 (WB-020). |
| `0.3.3` | Academic paper expanded to v0.0.6. BibTeX filed (WB-015 COMPLETE). WB-014 COMPLETE. |
| `0.3.4` | Agent Work Blocks v0.1.3. WB-013 IMMEDIATE. WB-014/015 COMPLETE. |
| `0.3.5` | Academic paper versioning corrected. v0.0.7, v0.1.0 (Git), v0.1.1. BibTeX 43 entries. |
| `0.3.6` | WB-004 COMPLETE. Linguistic Register v0.0.1 filed. Academic Paper v0.1.2. BibTeX 46 entries. Agent Work Blocks v0.1.4. |
| `0.3.7` | WB-007 COMPLETE — Episode 1 podcast accessibility pass v0.1.6 filed. Episode 2 v0.2.3 noted. Agent Work Blocks v0.1.7. Session Notes corrected to v0.2.7. Duplicate register sections removed. All file references updated to kebab-case docs/ paths. |
| `0.3.8` | Deletion authority protocol added to Agent Work Blocks v0.1.8. Claude Code is sole agent authorised to delete files. Deletion clearance procedure formalised. Version history index added at `docs/version-history-index.md`. |
| `0.3.9` | Agent Work Blocks updated to v0.1.9. Stale version references corrected throughout (Defining Principles v0.0.9 → v0.1.0, Session Notes v0.2.4 → v0.2.7, episode script paths updated to current podcast track versions, academic paper and six-axis compass paths corrected). |
| `0.3.10` | Episode 1 v0.1.7 filed. Academic Paper Outline v0.0.2 filed. references.bib updated to 46 entries (hyland1998, hyland2005, toulmin1958 restored). Agent Work Blocks v0.2.0. |
| `0.3.11` | WB-010 COMPLETE. Episode 0 all eight segment scripts (book track v0.0.1) filed under `docs/scripts/episode-00/`. Aggregate filed. Agent Work Blocks updated to v0.2.1. |
| `0.3.12` | WB-002 COMPLETE. Series Episode Plan v0.0.9 filed — Episodes 1–19 retrofitted with five-field requirements specification format from Episode_Requirements_Specs_v0.0.2. WB-010 removed from Outstanding Actions (COMPLETE). |
| `0.3.13` | WB-003 COMPLETE. Reference Framework v0.0.5 filed — Lowe/Restore Britain economic axis entry added under Episode 2 references. Series Episode Plan v0.0.9 amended with right-wing economic axis note in multi-axis framework section. WB-003 removed from Outstanding Actions. |
| `0.3.14` | **WB-016 COMPLETE.** Episode 3 book track v0.3.1 filed — "What Bretton Woods Actually Was." Evidence-dense economic history: Bretton Woods (1944–1971), Nixon shock, Washington Consensus, UK consequences. Hayek-Friedman steelman in full. Milanovic elephant curve as evidential pivot. Agent Work Blocks updated to v0.2.2. Series title updated to "A Common Enemy" in register. WB-016 removed from Outstanding Actions. |
| `0.3.15` | **FILED Episode 4 book track v0.4.1.** "The Globalisation Discontents — Left Version": 6,798-word first draft. Deindustrialisation (manufacturing 7m → 2.5m), wage stagnation (IFS/Resolution Foundation data), welfare contraction (austerity era), PFI financialisation. Four-premise propositional structure: capital mobility, employment collapse, wage-productivity divergence, deliberate welfare contraction. Class-harmony steelman delivered at full force before response. 17 sources flagged for verification before podcast track. Bias audit checklist filed. Outstanding Actions updated: WB-021 (sources verification) marked as next HIGH priority. |
| `0.3.16` | **FILED Academic Paper OSF/SocArXiv Feature Request v0.0.1.** SocArXiv designated first-submission venue (no university affiliation required). FR covers ORCID, OSF project, LaTeX template evaluation, PDF validation, pre-moderation readiness. New WBs added: WB-022 (HIGH), WB-023–026. |
| `0.3.17` | **Academic Paper bumped to v0.1.3.** OSF/SocArXiv submission track. ORCID added to YAML frontmatter. Preprint Metadata section added (funding, competing interests, data availability, licence, OSF placeholder). Keywords section added to document body. Source file retained in `docs/academic/`. |
| `0.3.18` | **Pandoc pipeline migrated to SocArXiv template track.** Custom Pandoc LaTeX template created (`socarxiv-pandoc-template.latex`). Build script (`build-socarxiv.sh`) operational. PDF compiled: 132K, 23 pages, text-searchable, fonts embedded. WB-023 (template evaluation) satisfied. |
| `0.3.19` | Academic Paper bumped to v0.1.4: Section 6.1 Iraq WMD canonical counterpoint added to Ferrari illustration. PDR bumped to v0.3.19. |
| `0.3.20` | **Axis restructure documents filed from 2026-05-16 claude.ai session.** Defining Principles Supplement v0.0.1/v0.0.2, Axis Scale Specification and Radar Methodology v0.0.1/v0.0.2, Axis Coding Questionnaire v0.0.1, Brexit Under Six-Axis Framework v0.0.1, Bias Audit Log v0.0.6, Session Handoff Note 2026-05-16, Agent Work Blocks v0.2.6. AWB source of truth updated. |
| `0.3.21` | **WB-020 COMPLETE.** Six-Axis Compass spun off as standalone open-source project at `https://github.com/earlution/6-axis-compass`, deployed at `https://earlution.github.io/6-axis-compass/`. Internal `tools/six-axis-compass/` files removed. README updated. Agent Work Blocks v0.2.7. |
| `0.3.22` | **Academic Paper bumped to v0.1.5 — partial WB-023 enactment.** §3.2 liberty axis replaced with libertarian/authoritarian axis. §3.3 three actor mappings updated; closing observation rewritten to three-axis convergence frame. Process deviation logged: WB-022 (editorial review of open questions) bypassed; implicit editorial decisions made (axis name retained as "libertarian/authoritarian"; axis order retained in slot 5; class-axis content absorbed in lieu of the axis-conflation-rhetoric treatment specified in supplement §V). v0.1.4 retained as last clean OSF/SocArXiv-ready version. Downstream "liberty" references in abstract, §1.4, §2.1, §4, §5.3, conclusion, and keywords remain unaddressed. WB-023 split: step 3 marked partially complete; remaining work tracked under WB-026 (new). WB-022 still required to ratify the implicit decisions. Agent Work Blocks v0.2.9. |
| `0.3.23` | **WB-022 COMPLETE.** Editorial decisions on axis restructure open questions settled and filed in session note. OQ1 (axis name) ratified as "libertarian/authoritarian"; OQ2 (axis order) ratified as slot 5; OQ3 (liberty vocabulary) settled as class-axis absorption. The implicit decisions in Academic Paper v0.1.5 match the editorial decisions — v0.1.5 stands as drafted. WB-023 and WB-026 unblocked; WB-023 step 3 marked COMPLETE; remaining steps ready to proceed. Session note added to register. Agent Work Blocks v0.2.10. |
| `0.3.24` | **WB-026 COMPLETE. Academic Paper bumped to v0.1.6.** Restructure sweep completed: abstract, §1.4, §2.1, §4.1 (scope-condition paragraph), §5.3, and conclusion all updated to the libertarian/authoritarian axis framework. Paper now internally consistent. v0.1.5 superseded; v0.1.4 retention status ended (also superseded). Build script row updated to flag the pending v0.1.4 → v0.1.6 retarget. Compiled PDF marked superseded — recompile required from v0.1.6 source before OSF/SocArXiv submission. Agent Work Blocks v0.2.11. |
| `0.3.25` | **WB-023 PARTIAL COMPLETE — parent docs updated.** Defining Principles → v0.2.0 (`MAJOR`; §IV and §IV(d) restructured). Episode 00 S03 → v0.0.2 (fifth-axis section rewritten through fascism vs. Restore Britain and anarcho-communism vs. Leninism worked examples; convergence zone passage updated to three-axis frame). Episode 02 → v0.2.5 (Example 5 replaced; "we'll come back" promise retired). Steps 4 (Reference Framework) and 6 (Episode 00 axis-conflation rhetoric sub-segment) deferred to **WB-027** pending OQ3 placement decision. Episode 02 row in this register also fixed (was stale at v0.2.3 since the v0.2.4 music-annotations bump). Agent Work Blocks v0.2.12. |
| `0.3.26` | **OQ4 settled — governance axis naming decision.** Session note filed. Fifth axis to be labelled *governance axis*; *political authority* as explanatory register; *pol-auth* as internal shorthand. WB-028 created for the rename sweep. OQ4 session note added to SESSION section. Agent Work Blocks v0.2.13. |
| `0.3.27` | **WB-028 extended — §2.1 lineage paragraph drafted.** Paragraph for Academic Paper §2.1 drafted and filed; credits Adorno et al. (1950) and Altemeyer (1996); positions governance axis as established dimension correctly located and relabelled. WB-028 instructions updated with §2.1 insertion and two new Reference Framework bibliographic entries. Academic Paper WB-028 target updated to v0.1.7. SESSION section: WB-028 lineage draft row added. Agent Work Blocks v0.2.14. |
| `0.3.28` | **Rojava research note filed; WB-029 created.** `rojava-democratic-confederalism-research-note-v0.0.1.md` added to REF section. Six-axis mapping, intellectual lineage, feminist governance open question (undecided), sovereignty axis anomaly, bias audit flags. Reference Framework row updated to note pending WB-028 entries. Agent Work Blocks v0.2.15. |
| `0.3.29` | **WB-028 extended — governance axis scope note drafted.** §3.2 scope note and §8 conclusion fourth-limit paragraph drafted and filed as `wb028-governance-axis-scope-note-draft.md`. Acknowledges the governance axis's state-form assumption; names anarchist/confederalist and Rojava as occupying a position prior to the axis's framing assumptions; flags as a direction for further framework development beyond both this paper and the *A Common Enemy* series. SESSION section updated. Agent Work Blocks v0.2.16. |
| `0.3.30` | **WB-028 PARTIAL COMPLETE — Academic Paper v0.1.7 filed.** All three coordinated WB-028 changes applied to the paper: rename sweep, §2.1 lineage paragraph, §3.2 scope note + §8 fourth-limit paragraph. nocite block updated with `@adorno1950` and `@altemeyer1996`. Two draft-hold rows in SESSION section moved to "Executed" status. v0.1.6 superseded. **Outstanding for full submission-readiness:** bibliography entries in `references.bib` (Claude Code task) and PDF recompile from v0.1.7 source. **Outstanding for full WB-028 completion:** rename sweep across Defining Principles v0.2.0, Episode 00 S03 v0.0.2, Episode 02 v0.2.5, Reference Framework v0.0.5, and the WB-022 session note. Agent Work Blocks v0.2.17. |
| `0.3.31` | **WB-028 COMPLETE.** Five remaining WB-028 documents updated as a sub-change-set: Defining Principles → v0.2.1 (`MINOR`); Episode 00 S03 → v0.0.3; Episode 02 → v0.2.6; Reference Framework → v0.0.6 (with Adorno 1950 and Altemeyer 1996 entries); WB-022 session note (OQ4 forward-pointer added, historical record preserved). All live "libertarian/authoritarian axis" references in the production canon now removed; canon terminologically consistent under "governance axis." Outstanding only: bibliography entries in `references.bib` and PDF recompile from Academic Paper v0.1.7 source (both Claude Code tasks). Agent Work Blocks v0.2.18. |
| `0.3.32` | **ADR-005 filed.** Ollama Model Ecosystem document added to GOV section — dual-tier AI model ecosystem (3 cloud slots + local M1 Pro 16 GB). Role-based assignment: Engineer, Creator, Scholar. Local tier model catalog with M1 Pro memory constraints. Subscription economics analysis (Ollama Pro, Cursor Pro, DeepSeek Pro). Local DeepSeek hosting guide. Filed 2026-05-18. |
| `0.3.33` | **Academic Paper submission-ready (v0.1.8).** `references.bib` updated with Adorno et al. (1950) and Altemeyer (1996) entries (48 total). Build script retargeted to v0.1.8. PDF compiled: 144K, text-searchable, fonts embedded. WB-028 and WB-026 marked COMPLETE. Paper ready for SocArXiv submission pending ORCID/OSF profile setup (WB-022, host action). |
| `0.3.34` | **WB-022 ORCID recorded.** Host ORCID: 0009-0006-4035-4761. Academic Paper v0.1.8 YAML frontmatter already contains ORCID. Agent Work Blocks bumped to v0.2.20. |
| `0.3.35` | **Document Provenance footer added.** Academic Paper v0.1.9 — footer added with project version, source file, AWB, PDR, and bibliography count for internal traceability. |
| `0.3.36` | **Academic Paper v0.1.10 filed — WB-030 COMPLETE.** Full sourced 6-axis-compass coordinates integrated from dual-register sourced-party documents (Protocol v0.2.0). Section 3.3 rewritten with eight-actor mapping (declared/structural scores with delta analysis for Conservative, Labour, Lib Dems, Reform UK, Restore Britain, Green Party, SNP, Plaid Cymru). Table 1 added with all structural axis scores. Document Provenance footer updated to v0.1.10. |
| `0.3.37` | **Agent Work Blocks updated.** AWB v0.2.21 — WB-030 marked COMPLETE, source of truth updated to v0.3.37. |
| `0.3.38` | **Commit hash recorded.** Academic Paper v0.1.10 committed at `e2b56be`. |
| `0.3.39` | **Build script retargeted to v0.1.10.** PDF compiled from v0.1.10 source: 160K, text-searchable, fonts embedded. AWB v0.2.22. |
| `0.3.40` | **WB-021 COMPLETE — Episode 4 source verification.** Two figures corrected: wage share 70%→55% corrected to 64%→58% (ONS national accounts); local authority cuts 50% corrected to 20–25% per person (IFS). Episode 4 bumped to v0.4.2. Reference Framework bumped to v0.0.6 with Episode 4 entries. |
| `0.3.41` | **Housekeeping protocol + lean tree.** §Housekeeping and batch-ingestion protocol expanded; canonical staging `from-claude-desktop/`; [`CURRENT_PDR.md`](CURRENT_PDR.md) added; superseded PDR/AWB co-existing files removed from working tree; README + PR template exit criteria; AWB v0.2.24. |
| `0.3.43` | **HKW + ADR-006.** **Terminology** — *Housekeeping Workflow* (**HKW**) vs **housekeeping protocol**; protocol narrative cross-links AWB **HKW** checklist (implements protocol). **ADR-006** filed (`housekeeping-protocol-and-hkw-v0.0.1.md`). COORD row → AWB v0.2.26; lean-tree removal of superseded `production-document-register-v0.3.41.md` / `v0.3.42.md` and `agent-work-blocks-v0.2.24.md` / `v0.2.25.md` from working tree. |
| `0.3.44` | **Radar maps justification + paper v0.1.11.** Filed [`radar-maps-academic-paper-justification-v0.1.0.md`](../academic/radar-maps-academic-paper-justification-v0.1.0.md) (ACAD). Academic paper patch **v0.1.11** — Preprint Metadata pointer to justification + WB-025; Document Provenance → AWB v0.2.27 / PDR v0.3.44. `build-socarxiv.sh` retargeted to v0.1.11. COORD → AWB v0.2.27; lean-tree removal of `production-document-register-v0.3.43.md` and `agent-work-blocks-v0.2.26.md`. |
| `0.3.45` | **Academic PDF v0.1.11 + XeLaTeX `xmpquote` fix.** `\providecommand{\xmpquote}` after `hyperref` in `socarxiv-pandoc-template.latex`; committed [`xmpfix.tex`](../academic/xmpfix.tex); `build-socarxiv.sh` uses script-directory `-H` path (no `/tmp` placeholder). **`academic-paper-v0.1.11.pdf`** compiled (160K). v0.1.10.pdf superseded. Build script **v0.0.6**. COORD → AWB v0.2.28. Lean-tree removal of `production-document-register-v0.3.44.md` and `agent-work-blocks-v0.2.27.md`. |
| `0.3.53` | **WB-032 publish handback.** Six-Axis Compass **v2.6.0** pushed to `origin/main` (tag `bf6d1e1`; OQ2 axis code `cb7a70b`). `paper-radar-figures-v0.2.0-design.md` §1a — upstream aligned; pin updated. AWB WB-032 completion notes refreshed. COORD unchanged (AWB v0.2.35). Lean-tree: `production-document-register-v0.3.52.md`. |
| `0.3.52` | **WB-031 COMPLETE (Phase B).** Fig PNGs regenerated (compass v2.6.0); **academic v0.2.3** + PDF; `fetch-paper-radar-figures.sh` loads `.env.local`. COORD → AWB v0.2.35. Lean-tree: `production-document-register-v0.3.51.md`, `agent-work-blocks-v0.2.34.md`, `academic-paper-v0.2.2.md`, `academic-paper-v0.2.2.pdf`. |
| `0.3.51` | **WB-031 Phase A — axis distribution codified.** Methodology **v0.0.3** (§II(a) OQ2 spoke distribution). Rebuild guide **v1.0.1**. `paper-radar-figures-v0.2.0-design.md` §1a + WB-032 gate. Table 1 / compass-data confirmed canonical order. COORD → AWB v0.2.34. Lean-tree: remove `production-document-register-v0.3.50.md`, `agent-work-blocks-v0.2.33.md`, `axis-scale-specification-and-radar-methodology-v0.0.2.md`, `six-axis-compass-rebuild-guide-v1.0.0.md`. |
| `0.3.50` | **HKW — academic v0.2.2 + WB-031/032.** Academic **v0.2.2** wrapfig figure column committed. **WB-031** (axis distribution realignment) and **WB-032** (6-axis-compass alignment dispatch). COORD → AWB v0.2.33. Lean-tree: remove `production-document-register-v0.3.47.md`, `agent-work-blocks-v0.2.30.md`, `academic-paper-v0.2.0.md`, `academic-paper-v0.2.0.pdf`. |
| `0.3.49` | **Academic paper v0.2.2 — wrapfig figure column.** **`academic-paper-v0.2.2.md` / `.pdf`** — §4 text flows left; Fig 1–3 stacked right (caption below each chart). `socarxiv-pandoc-template.latex` **v0.0.3** (`wrapfig`). COORD → AWB v0.2.32. Lean-tree: remove v0.3.48 PDR, v0.2.31 AWB, `academic-paper-v0.2.1.md`, `academic-paper-v0.2.1.pdf`. |
| `0.3.48` | **Academic paper v0.2.1 — half-width figure layout.** **`academic-paper-v0.2.1.md` / `.pdf`** — Figure 1–3 in two-column rows (caption left, chart right; LaTeX minipage). `build-socarxiv.sh` **v0.0.9** (runs from `docs/academic/`). COORD → AWB v0.2.31. Lean-tree: remove `production-document-register-v0.3.47.md`, `agent-work-blocks-v0.2.30.md`, `academic-paper-v0.2.0.md`, `academic-paper-v0.2.0.pdf`. |
| `0.3.47` | **Academic paper v0.2.0 — embedded draft radar figures.** New **`paper-radar-figures-v0.2.0-design.md`** (ACAD). **`academic-paper-v0.2.0.md` / `.pdf`** — Fig 1–3 PNGs after Table 1 (Six-Axis Compass REST); `docs/academic/scripts/fetch-paper-radar-figures.sh` + `paper-radar-payloads-v0.2.0/*.request.json`; `figures/v0.2.0/*.png`. `build-socarxiv.sh` **v0.0.8** (`--resource-path=docs/academic`). `socarxiv-pandoc-template.latex` **v0.0.2** (`graphicx`). Radar justification `canonical_academic_paper` → v0.2.0. COORD → AWB v0.2.30. HKW lean-tree: remove `production-document-register-v0.3.46.md`, `agent-work-blocks-v0.2.29.md`, `academic-paper-v0.1.12.md`, `academic-paper-v0.1.12.pdf`. |
| `0.3.46` | **Academic paper v0.1.12 — §3.3 planned radar placement.** In-body note: Table 1 = current traceable visual surface; **Figure 1–3** intended positions per [`radar-maps-academic-paper-justification-v0.1.0.md`](../academic/radar-maps-academic-paper-justification-v0.1.0.md); PDF still polygon-free until **WB-025**. Preprint Metadata + PDR radar row link Six-Axis Compass [README#api](https://github.com/earlution/6-axis-compass#api) / [`API.md`](https://github.com/earlution/6-axis-compass/blob/main/API.md). `build-socarxiv.sh` **v0.0.7** → **`academic-paper-v0.1.12.pdf` (164K)**. COORD → AWB v0.2.29. Lean-tree removal of `production-document-register-v0.3.45.md`, `agent-work-blocks-v0.2.28.md`, `academic-paper-v0.1.11.md`. |

---

*A Common Enemy | Production Document Register | Version 0.3.53*
*Update this register whenever a new document is created, a document version changes, or a status changes. The register is only useful if it is current.*

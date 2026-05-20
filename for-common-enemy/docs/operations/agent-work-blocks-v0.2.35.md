# A COMMON ENEMY
## Agent Work Blocks — Delegation Log
### Version 0.2.35

---

## Changelog

| Version | Change |
|---|---|
| 0.0.1–0.0.9 | See prior entries. |
| 0.1.0 | Major rebuild. WB-006/008/009 completed. WB-014–017 added. |
| 0.1.1 | Stale references updated. WB-018 and WB-019 added. |
| 0.1.2 | WB-020 added. `six_axis_compass.html` filed. |
| 0.1.3 | WB-013 upgraded to HIGH/IMMEDIATE. WB-014/015 COMPLETE. All references updated. |
| 0.1.4 | WB-004 marked COMPLETE (`Linguistic_Register_v0.0.1.md` filed). WB-013 instructions updated — paper now at v0.1.2, bib at 46 entries, Section 1.5 added. WB-015 notes updated (46 entries, Hyland/Toulmin added). WB-001 file list updated to current versions. Source of truth updated to v0.3.5. Notes for Claude Code updated. |
| 0.1.5 | WB-001 marked COMPLETE — full repo migration to `docs/` structure executed by Claude Code. WB-013 marked COMPLETE — Pandoc/XeLaTeX pipeline confirmed operational; Academic Paper v0.1.2 compiles to PDF. Notes for Claude Code updated to reflect `docs/` canonical structure and v0.3.6 source of truth. LaTeX build artifacts added to `.gitignore`. |
| 0.1.6 | WB-018 marked COMPLETE — `episode-02-nationalist-about-what-v0.2.3.md` filed. "Far" hedge confirmed absent; "extreme" categorisation confirmed absent. Expanded category note added to "The right" section. Taxonomy consistent with Defining Principles v0.1.0. |
| 0.1.7 | WB-007 marked COMPLETE — `episode-01-the-wrong-fight-v0.1.6.md` filed. Bartlett standard applied. Revised taxonomy retained. Hardest objection preserved at full force. Pre-recording checklist updated. Production Document Register updated to v0.3.7. |
| 0.1.8 | Deletion authority protocol added. Claude Code is the sole agent authorised to delete files. Deletion clearance procedure formalised. "Notes for Claude Code" updated accordingly. |
| 0.1.9 | Stale version references corrected throughout. WB-010: Defining Principles v0.0.9 → v0.1.0, Session Notes v0.2.4 → v0.2.7, Ep1 v0.1.5 → v0.1.6, dependency note updated (WB-007/008 both COMPLETE). WB-012: episode filenames updated to current podcast track versions, Defining Principles v0.0.9 → v0.1.0. WB-019: Academic Paper reference updated to current path. WB-020: file location updated. Source of truth updated to v0.3.9. |
| 0.2.0 | WB-012 step 1 updated: Episode 1 v0.1.6 → v0.1.7 (new podcast track draft from claude.ai). Source of truth updated to v0.3.10. |
| 0.2.1 | WB-010 marked COMPLETE. All eight Episode 0 segment scripts (book track v0.0.1) filed. Aggregate filed. Source of truth updated to v0.3.11. |
| 0.2.2 | **WB-016 COMPLETE.** Episode 3 book track v0.3.1 filed. Source of truth updated to v0.3.14. Series title updated to "A Common Enemy" throughout. |
| 0.2.3 | Episode 4 book track v0.4.1 filed. Deindustrialisation, wage stagnation, welfare contraction as class war. Four-premise structure. Class-harmony steelman at full force. Source of truth updated to v0.3.15. WB-021 (Episode 4 sources verification) marked as next HIGH priority in Outstanding Actions. |
| 0.2.4 | Deletion Authority Protocol expanded to cover silent-overwrite failures. New sub-section: **Version Bump Protocol**, requiring that any version bump be performed by first copying the existing file to a new filename, then editing the copy — never by editing the existing file in place. Root cause: in session 2026-05-16, the claude.ai agent edited `Defining_Principles_Supplement_Axis_Restructure_v0.0.1.md` and `Axis_Scale_Specification_And_Radar_Methodology_v0.0.1.md` in place when bumping each to v0.0.2, destroying the v0.0.1 content of both documents. The agent then also explicitly deleted the v0.0.1 supplement copy from outputs. Both v0.0.1 documents were subsequently reconstructed by reversing the v0.0.2 changes, but the reconstructions are not the original files. Notes for Claude Code updated to instruct verification that prior versions exist on disk before accepting a new version into the repo. |
| 0.2.5 | Four new work blocks added for the axis restructure downstream: **WB-022** (editorial review of the three open questions in Supplement v0.0.2 §IX), **WB-023** (downstream enactment of axis restructure across Defining Principles, Episode 00 S03, Academic Paper, Reference Framework — `MAJOR`-class co-ordinated change), **WB-024** (Brexit paper inter-coder verification), **WB-025** (Reference Framework expansion with source-backed coordinates). Source of truth updated to v0.3.16. WB-019 instructions updated — the existing radar chart work is superseded by the methodology-driven dual-radar tool reading from Reference Framework. |
| 0.2.6 | Axis restructure documents filed from 2026-05-16 claude.ai session. Defining Principles Supplement v0.0.1/v0.0.2, Axis Scale Specification and Radar Methodology v0.0.1/v0.0.2, Axis Coding Questionnaire v0.0.1, Brexit Under Six-Axis Framework v0.0.1, Bias Audit Log v0.0.6, Session Handoff Note 2026-05-16. Source of truth updated to v0.3.20. |
| 0.2.7 | **WB-020 COMPLETE.** Six-Axis Compass spun off as standalone open-source project at `https://github.com/earlution/6-axis-compass`, deployed at `https://earlution.github.io/6-axis-compass/`. Internal `tools/six-axis-compass/` files removed. README updated. Source of truth updated to v0.3.21. |
| 0.2.8 | Doc dump from claude.ai (2026-05-17) processed. ~80 files audited; two new research SVG visualizations filed (`phase-two-internal-evidence-audit-v0.0.1.svg`, `seven-axis-test-matrix-phase-one-v0.0.1.svg`). `for-claude-ai/AGENT-INSTRUCTIONS.md` created for both repos documenting cross-repo CI. Deletion clearances issued for legacy dump artifacts. Source of truth updated to v0.3.21. |
| 0.2.9 | **WB-023 step 3 partially complete (Academic Paper v0.1.5 filed).** Process deviation logged: WB-022 (editorial review of supplement §IX open questions) bypassed. Implicit editorial decisions made by the executing agent — axis name retained as "libertarian/authoritarian" (OQ1); axis order retained in slot 5 (OQ2); class-axis content absorbed into the class axis paragraph in lieu of the axis-conflation-rhetoric treatment specified in supplement §V (departure from OQ3 and from WB-023 step 3 specification). WB-023 split: step 3 marked partially complete; remaining downstream paper work (abstract, §1.4, §2.1, §4, §5.3, conclusion, keywords) plus the axis-conflation-rhetoric reframing of the liberal/liberal conflation tracked under new **WB-026**. WB-022 still required to ratify the implicit decisions. WB-023 step 3 should remain BLOCKED on WB-022 for the remaining co-ordinated change-set work. Source of truth updated to v0.3.22. |
| 0.2.10 | **WB-022 COMPLETE.** Editorial decisions filed in session note: OQ1 (axis name) ratified as "libertarian/authoritarian"; OQ2 (axis order) ratified as slot 5; OQ3 (liberty vocabulary disposition) settled as class-axis absorption with axis-conflation rhetoric deferred to a future dedicated treatment. The implicit decisions in v0.1.5 match the editorial decisions — v0.1.5 paper stands as drafted. WB-023 and WB-026 unblocked. WB-023 step 3 marked COMPLETE; remaining steps and the full co-ordinated change-set can now proceed. Source of truth updated to v0.3.23. |
| 0.2.11 | **WB-026 COMPLETE.** Academic Paper bumped to v0.1.6 — restructure sweep completed. All downstream "liberty" references updated in abstract, §1.4, §2.1, §4.1 (scope-condition paragraph added), §5.3, and conclusion. Paper now internally consistent under the libertarian/authoritarian axis framework. v0.1.4 retention status revised: SUPERSEDED (v0.1.6 is now submission-ready). PDF recompile required before OSF/SocArXiv submission. WB-023 step 3 still marked COMPLETE; WB-026 closes the paper-side restructure debt. Remaining WB-023 steps (Defining Principles, Episode 00 S03, Reference Framework, Episode 02, new Episode 00 sub-segment) still pending and are tracked under WB-023. Source of truth updated to v0.3.24. |
| 0.2.12 | **WB-023 partially complete (steps 1, 2, 3, 5 done; steps 4 and 6 deferred).** Step 1: Defining Principles bumped to v0.2.0 (`MAJOR` taxonomy change). Step 2: Episode 00 S03 bumped to v0.0.2 — fifth-axis section rewritten through fascism vs. Restore Britain and anarcho-communism vs. Leninism worked examples per supplement §III; convergence zone passage updated to three-axis frame. Step 5: Episode 02 bumped to v0.2.5 — Example 5 (Freedom/liberty axis) replaced with libertarian/authoritarian worked example; "we'll come back to this" promise retired. **Steps 4 and 6 deferred** per OQ3 (axis-conflation rhetoric treatment deferred to a future dedicated pedagogical space): step 4 (Reference Framework axis-conflation rhetoric sources) and step 6 (new Episode 00 sub-segment on axis-conflation rhetoric) require the OQ3 placement decision before they can proceed coherently. Step 4's libertarian/authoritarian source updates (Schmitt, Paxton, Leninism primary documents) also pending — bundled with the deferred work. Tracked under new **WB-027**. Co-ordinated change-set property of WB-023 not preserved (already compromised by the v0.1.5/v0.1.6 staged advance); the four files updated here can commit as a sub-change-set with message `refactor: enact axis restructure parent docs (DPS v0.0.2)`. Project title corrected to "A Common Enemy" in all three updated files. Source of truth updated to v0.3.25. |
| 0.2.13 | **OQ4 settled — governance axis naming decision recorded.** Session note filed (2026-05-18). The fifth axis will be labelled the *governance axis* in all production documents; *political authority* / *political-authority axis* used as the explanatory register; *pol-auth* used as the internal shorthand. WB-028 created to track the rename sweep across all WB-023-touched documents (~80 occurrences across 8 live documents). Source of truth updated to v0.3.26. |
| 0.2.14 | **WB-028 extended — governance axis lineage paragraph drafted.** §2.1 addition drafted and filed as `wb028-s21-lineage-paragraph-draft.md`. Credits Adorno et al. (1950) and Altemeyer (1996) as psychometric grounding; positions governance axis as the same dimension carried by popular multi-axis models under liberty/freedom vocabulary, correctly located and relabelled. Nolan citation excluded (popular rather than academic register). Two new Reference Framework entries required: Adorno et al. (1950) and Altemeyer (1996). WB-028 instructions updated with the §2.1 insertion and bibliographic entries. Academic Paper version target updated: v0.1.6 → v0.1.7. Source of truth updated to v0.3.27. |
| 0.2.15 | **Rojava research note filed. WB-029 created.** Research note `rojava-democratic-confederalism-research-note-v0.0.1.md` filed with six-axis mapping, intellectual lineage (Öcalan, Bookchin, Kropotkin), bibliography, feminist governance open question (flagged undecided), series relevance, and bias audit flags. Sovereignty axis anomaly noted (confederal anti-statism as a third position, not a pole). WB-029 created for the full episode treatment. Source of truth updated to v0.3.28. |
| 0.2.16 | **WB-028 extended — governance axis scope note drafted.** §3.2 scope note and §8 conclusion fourth-limit paragraph drafted and filed as `wb028-governance-axis-scope-note-draft.md`. Acknowledges that the governance axis as used in this paper presupposes actors operating within or in relation to the state form; names anarchist/confederalist traditions and Rojava as occupying a position prior to the axis's framing assumptions; scopes the limitation explicitly and flags it as a direction for further framework development. WB-028 instructions updated. Source of truth updated to v0.3.29. |
| 0.2.17 | **WB-028 EXECUTED. Academic Paper bumped to v0.1.7.** Three coordinated changes applied: (1) rename sweep — all "libertarian/authoritarian axis" → "governance axis" throughout (~15 occurrences in body), layered vocabulary parenthetical inserted at §2.1 first use; (2) §2.1 lineage paragraph inserted (Adorno 1950, Altemeyer 1996 grounding); (3) §3.2 scope note and §8 fourth-limit paragraph inserted. nocite block updated with `@adorno1950` and `@altemeyer1996`. Pole descriptors ("libertarian end", "authoritarian end", "libertarian-left" etc.) retained where they describe poles rather than the axis itself. WB-028 status: COMPLETE except for two follow-on items — bibliography entries in `references.bib` for Adorno (1950) and Altemeyer (1996) (Claude Code task), and PDF recompile from v0.1.7 source (WB-026 carry-over). Source of truth updated to v0.3.30. |
| 0.2.18 | **WB-028 COMPLETE — remaining documents updated.** Five files bumped together as the WB-028 follow-on sub-change-set: Defining Principles → v0.2.1 (`MINOR`; rename sweep across §IV and §IV(d); layered vocabulary on first use); Episode 00 S03 → v0.0.3 (rename sweep; layered vocabulary on script's first naming; bias audit checklist updated); Episode 02 → v0.2.6 (single rename in Example 5 closing line); Reference Framework → v0.0.6 (Adorno 1950 and Altemeyer 1996 entries added under new governance axis row; former liberty-axis row repurposed to reflect class-axis absorption; title corrected); WB-022 session note updated with OQ4 forward-pointer (historical record preserved). All live "libertarian/authoritarian axis" references in production canon now removed; canon terminologically consistent under "governance axis." Outstanding only: bibliography entries in `references.bib` (Claude Code task) and PDF recompile from Academic Paper v0.1.7 source. Source of truth updated to v0.3.31. |
| 0.2.19 | **WB-028 and WB-026 COMPLETE.** `references.bib` updated with `@adorno1950` and `@altemeyer1996` entries (48 total). Build script retargeted to v0.1.8. Academic Paper bumped to v0.1.8. PDF compiled: 144K, text-searchable, fonts embedded. Paper submission-ready for SocArXiv pending ORCID/OSF profile setup (WB-022, host action). Source of truth updated to v0.3.33. |
| 0.2.20 | **WB-022 ORCID recorded.** Host ORCID: 0009-0006-4035-4761. Academic Paper v0.1.8 YAML frontmatter updated with ORCID. Source of truth updated to v0.3.34. |
| 0.2.21 | **Document Provenance footer added.** Academic Paper v0.1.9 — footer added with project version, source file, AWB, PDR, and bibliography count for internal traceability. Source of truth updated to v0.3.35. |
| 0.2.22 | **OSF project created; CC BY 4.0 licence applied.** OSF project at https://osf.io/ubtz8/. LICENSE file added. OSF upload workflow added (uploads governance docs, episode scripts to OSF; paper PDF handled by 6-axis-compass CI). Source of truth updated to v0.3.36. |
| 0.2.24 | **Housekeeping protocol.** Post-batch checklist links to PDR §Housekeeping and batch-ingestion protocol. Canonical staging `from-claude-desktop/`. `CURRENT_PDR.md` pointer. README + PR template Definition of Done. Filename aligned with document version. Source of truth updated to v0.3.41. |
| 0.2.26 | **HKW + ADR-006.** **HKW** (*Housekeeping Workflow*) named for the post-batch operator checklist; explicit statement that **HKW implements** the housekeeping **protocol** (PDR + AWB binding rules). Section retitled **Post-batch housekeeping — HKW**. Source of truth → `production-document-register-v0.3.43.md`. ADR-006 filed. |
| 0.2.27 | **Radar maps + academic paper pointer.** Ingested `radar-maps-academic-paper-justification-v0.1.0.md` (WB-019 superseded block cross-link). PDR v0.3.44 registers file; academic paper **v0.1.11** adds Preprint Metadata pointer to that justification and WB-025. Build script targets v0.1.11. Source of truth → `production-document-register-v0.3.44.md`. |
| 0.2.28 | **PDR v0.3.45 + PDF build.** Source of truth → `production-document-register-v0.3.45.md` after **`academic-paper-v0.1.11.pdf`** build and XeLaTeX `\xmpquote` / `xmpfix.tex` pipeline fix. |
| 0.2.35 | **WB-031 COMPLETE.** Phase B: PNGs regenerated (compass v2.6.0); **academic-paper-v0.2.3** + PDF; `fetch-paper-radar-figures.sh` loads `.env.local`. **WB-032 publish handback** → PDR v0.3.53. Source of truth → `production-document-register-v0.3.53.md`. |
| 0.2.34 | **WB-031 Phase A COMPLETE.** Methodology **v0.0.3** (§II(a)); rebuild guide **v1.0.1**; `paper-radar-figures-v0.2.0-design.md` §1a. Data files verified on OQ2 order. Phase B (figure regen, academic v0.2.3) **blocked on WB-032**. Source of truth → `production-document-register-v0.3.52.md`. |
| 0.2.33 | **WB-031 / WB-032 — axis distribution pattern recovery.** OQ2 canonical axis order and radar spoke layout codified; common-enemy realignment (WB-031) and cross-repo 6-axis-compass alignment dispatch (WB-032). Source of truth → `production-document-register-v0.3.52.md`. |
| 0.2.32 | **PDR v0.3.49 + academic paper v0.2.2 (wrapfig layout).** Source of truth → `production-document-register-v0.3.49.md`. Academic **v0.2.2** — §4 text left, Fig 1–3 right (caption below chart). Lean-tree: remove v0.3.48 PDR, v0.2.31 AWB, `academic-paper-v0.2.1.md`, `academic-paper-v0.2.1.pdf`. |
| 0.2.31 | **PDR v0.3.48 + academic paper v0.2.1 (figure layout).** Source of truth → `production-document-register-v0.3.48.md`. Academic **v0.2.1** — half-width figure rows (caption left, chart right). `build-socarxiv.sh` v0.0.9. Lean-tree: remove `production-document-register-v0.3.47.md`, `agent-work-blocks-v0.2.30.md`, `academic-paper-v0.2.0.md`, `academic-paper-v0.2.0.pdf`. |
| 0.2.30 | **PDR v0.3.47 + academic paper v0.2.0 (embedded radars).** Source of truth → `production-document-register-v0.3.47.md`. Academic **v0.2.0** — Fig 1–3 draft PNGs after Table 1; `paper-radar-figures-v0.2.0-design.md`; `fetch-paper-radar-figures.sh` + request JSON payloads; `build-socarxiv.sh` v0.0.8 → `academic-paper-v0.2.0.pdf`. Radar justification canonical paper → v0.2.0. HKW lean-tree: remove `production-document-register-v0.3.46.md`, `agent-work-blocks-v0.2.29.md`, `academic-paper-v0.1.12.md`, `academic-paper-v0.1.12.pdf`. |
| 0.2.29 | **PDR v0.3.46 + academic paper v0.1.12.** Source of truth → `production-document-register-v0.3.46.md`. Academic **v0.1.12** — §3.3 planned radar figure placement + Six-Axis Compass API links ([README#api](https://github.com/earlution/6-axis-compass#api), [`API.md`](https://github.com/earlution/6-axis-compass/blob/main/API.md)); radar justification canonical paper → v0.1.12. `build-socarxiv.sh` **v0.0.7** → `academic-paper-v0.1.12.pdf`. HKW lean-tree: remove `production-document-register-v0.3.45.md`, `agent-work-blocks-v0.2.28.md`, `academic-paper-v0.1.11.md`. |

---

## Purpose and Protocol

This document is the unidirectional communication channel from the **claude.ai reasoning agent** to the **Claude Code/Cursor execution agent**.

- **claude.ai:** analysis, drafting, frameworks, intellectual work
- **Claude Code/Cursor:** filesystem operations, repo commits, mechanical production tasks
- **Ruari:** human coordinator and approver

Each work block includes: ID, Status, Priority, full instructions, and a precise Definition of Done. The Claude Code agent should not proceed with a block that is BLOCKED, and should update Status and output notes when a block is COMPLETE.

**Source of truth for current document versions:** `docs/planning/production-document-register-v0.3.53.md`

---

## Deletion Authority Protocol

**Only Claude Code may authorise and execute file deletion.** This applies to both the local filesystem and — by extension — to the claude.ai artifact set.

**The root cause this protocol addresses:** Previous versions were lost because the claude.ai agent deleted superseded artifacts from its session before Claude Code had confirmed those files were committed to the git repo. Version history is only as complete as what git contains. Deletion before commit is permanent loss.

**The procedure:**

1. **claude.ai** produces a new version of a document and notifies Claude Code (via a work block or session handoff) that a new version has been filed.
2. **Claude Code** receives the new version, commits it to the repo, and verifies the commit with `git log --oneline -- <file>`.
3. **Claude Code** then explicitly issues a **deletion clearance** for the superseded version(s), stating the file name(s) and the commit hash that confirms their content is preserved.
4. **claude.ai** may only delete an artifact from its session after receiving that clearance. Until clearance is issued, the artifact must be retained regardless of whether a newer version exists.

**Deletion clearance format** (Claude Code includes this in WB completion notes):

> **Deletion clearance issued:** `<filename>` — committed at `<hash>` on `<date>`. Safe to delete from claude.ai artifacts.

**Claude Code's responsibility at every WB completion:**
- Confirm the new file is committed (`git log --oneline -- <path>`)
- Identify the superseded version(s) by name
- Issue explicit deletion clearance in the WB completion notes
- Update `docs/version-history-index.md` with the new entry

---

## Version Bump Protocol

**The root cause this protocol addresses:** A version bump performed by editing the existing file in place destroys the prior version's content just as effectively as a delete command. In session 2026-05-16, the claude.ai agent bumped two documents from v0.0.1 to v0.0.2 by editing each existing file in place rather than copying first. The v0.0.1 content of both documents was lost on disk before Claude Code had committed it to the repo. The agent then also explicitly deleted one of the v0.0.1 copies from the outputs directory. Both documents were subsequently reconstructed by reversing the v0.0.2 changes, but the reconstructions are not the original files and are flagged as such until external verification.

**The procedure:**

1. **Before bumping any document version, the claude.ai agent must first copy the existing file to a new filename reflecting the new version.** The copy is the file to be edited; the original remains untouched.
2. The version bump's textual changes — title version, changelog entry, content edits — are applied to the new file only.
3. Both files persist in the agent's working directory and in the outputs directory until Claude Code has committed both versions to the repo and issued explicit deletion clearance for the superseded version (per the Deletion Authority Protocol above).
4. **In-place editing of an existing versioned document is prohibited.** The only edits permitted on an existing versioned file are corrections that do not constitute a version bump — typographical fixes, formatting repairs — and even these should be applied with caution.

**The rule applies to all versioned documents.** GOV, PLAN, REF, AUDIT, SCRIPT, LOGIC, COORD, ANALYSIS, ACAD, INFRA. The Production Document Register and the Agent Work Blocks document themselves are bound by the rule: each new version is a new file.

**The rule applies regardless of how small the version bump is.** A v0.0.1 → v0.0.2 patch change is bound by the rule just as a v0.0.9 → v0.1.0 minor bump is. If the new content is small, the duplication cost is small. The duplication is the point.

**Recovery procedure if the rule is violated:** The agent must immediately reconstruct the prior version by reversing the bump's changes against the current version, save the reconstruction under the prior version's filename, and flag the file as a reconstruction in the next handoff to Claude Code. The reconstruction is not the original file and Claude Code must record the discrepancy in `docs/version-history-index.md`. External verification against any other extant copy of the original (a Git commit predating the violation, a backup, a copy retained by the human coordinator) takes precedence over the reconstruction.

---

## Post-batch housekeeping — HKW

**HKW** = *Housekeeping Workflow* — the ordered checklist below. It **implements** the **housekeeping protocol**: the normative rules in the Production Document Register § **Housekeeping and batch-ingestion protocol** plus this document’s **Deletion Authority Protocol**, **Version Bump Protocol**, and **deletion clearance** format. ADR-006 records this split.

Run **after** each Claude Desktop → repo batch, in order. Full narrative and principles: [`docs/planning/production-document-register-v0.3.53.md`](../planning/production-document-register-v0.3.53.md) (section **Housekeeping and batch-ingestion protocol**).

1. Intake under `from-claude-desktop/` only; triage each artifact.
2. Install to `docs/` with kebab-case names; obey Version Bump Protocol (this document).
3. PDR register pass + changelog.
4. AWB pass + deletion clearances + internal reference sweep.
5. `docs/version-history-index.md` — supersede old **Current**; add rows; fill commit hashes when known.
6. Lean-tree delete superseded version files (after `git log` verification).
7. README, `CURRENT_PDR.md`, ripgrep stale links.
8. Confirm PR template **Definition of Done — post-batch housekeeping (HKW)** checklist (or equivalent) before clearing staging.

---

## Active Work Blocks

---

### WB-001 — Sync GitHub repo with current artefact versions

**Status:** COMPLETE
**Output:** Full `docs/` migration — all artefacts committed under canonical kebab-case paths.
**Notes:** Executed by Claude Code in session 2026-05-03. `common-enemy/` retired. All documents now under `docs/` with kebab-case filenames. Source of truth is `Production_Document_Register_v0.3.6.md`. New artefacts ingested: `Linguistic_Register_v0.0.1.md`, `six_axis_compass.html`, `Agent_Work_Blocks_v0.1.4.md`, `Session_Notes_v0.2.7.md`, `Defining_Principles_v0.1.0.md`, `Production_Document_Register_v0.3.6.md`. `from-claude-desktop/` is the canonical gitignored staging directory (see PDR housekeeping).

---

### WB-002 — Retrofit episode requirements specification format onto Series Episode Plan

**Status:** QUEUED
**Priority:** MEDIUM

**Context:** `Episode_Requirements_Specs_v0.0.2.md` contains full five-field specs for all 20 episodes. `Series_Episode_Plan_v0.0.8.md` contains Episode 0 with its full spec but Episodes 1–19 still have older shorter descriptions. Episode 0 is exempt — it already has its full spec.

**Instructions:**
1. Open `Episode_Requirements_Specs_v0.0.2.md`
2. Open `Series_Episode_Plan_v0.0.8.md`
3. For Episodes 1–19 only, add beneath each existing description: Scope, Inputs, Outputs, Dependencies, Bias flags active, and abbreviated Propositional structure (numbered premises + conclusion only)
4. Do not remove or overwrite any existing content
5. Save as `Series_Episode_Plan_v0.0.9.md`
6. Update Production Document Register

**Definition of done:** `Series_Episode_Plan_v0.0.9.md` — Episodes 1–19 each have all five spec fields. Episode 0 unchanged. Commit message: `feat: retrofit episode requirements specs into series plan v0.0.9`

---

### WB-003 — Update Restore Britain / Rupert Lowe economic axis mapping

**Status:** COMPLETE
**Output:** `docs/research/reference-framework-v0.0.5.md`; `docs/planning/series-episode-plan-v0.0.9.md` (amended)
**Notes:** Executed by Claude Code 2026-05-06. Lowe entry added to Episode 2 references in Reference Framework (Hansard QE ban bill 13 Jan 2025, Milei admiration, City career — Morgan Grenfell, Deutsche Bank, Barings Bank). Right-wing economic axis note added to multi-axis framework section of Series Episode Plan. Production Document Register updated to v0.3.13. **Deletion clearance issued:** `docs/research/reference-framework-v0.0.4.md` — committed at `e00db8d` (or most recent hash). Safe to delete from claude.ai artifacts.

**What was done:** Episode 2 v0.2.2 incorporated the Lowe repositioning with appropriate caveats.

**What still needs doing:**

**In `Series_Episode_Plan_v0.0.8.md` (or v0.0.9 if WB-002 runs first):**
Find the right-wing axis notes in the framework section. Add: Restore Britain under Rupert Lowe presents a different economic axis profile from the general right trend. His documented parliamentary record (QE ban bill, Hansard 13 January 2025; praise of Milei; 1980s City nostalgia) aligns with libertarian/economic internationalism rather than economic nationalism — a potential worked example of the centre's operating logic in a party presenting itself as outside the establishment. Note: based on personal record, may not reflect full party programme.

**In `Reference_Framework_v0.0.4.md`:**
Add under Episode 2 references:
| Rupert Lowe economic positions | Lowe — Ten Minute Rule Bill (Hansard, 13 January 2025): ban on quantitative easing, praise of Milei. Wikipedia/LBC: career at Morgan Grenfell, Deutsche Bank, Barings Bank (City of London, 1980s–1990s). | PRIMARY (Hansard) | Compare with IEA libertarian economic tradition |

Save Reference Framework as `v0.0.5.md`. Update register.

**Definition of done:** Episode Plan and Reference Framework both updated. Commit message: `fix: complete WB-003 Lowe/Restore Britain axis update in plan and reference framework`

---

### WB-004 — Create Linguistic Register document
**Status:** COMPLETE
**Output:** `Linguistic_Register_v0.0.1.md`
**Notes:** Six sections filed: Purpose; theoretical grounding (Hyland 1998, Toulmin 1958); the libre/gratis problem applied to hedges; five-tier permitted vocabulary mapped to three registers; retired terms; pre-recording/pre-submission checklist item. Section 1.5 added to Academic Paper v0.1.2 citing Hyland and Toulmin, declaring the four-tier commitment scale, and stating the convergence thesis's Tier 3 status explicitly. `references.bib` updated with hyland1998, hyland2005, toulmin1958 (now 46 entries).

---

### WB-007 — Episode 1 podcast accessibility pass (v0.1.6)

**Status:** COMPLETE
**Output:** `docs/scripts/episode-01/episode-01-the-wrong-fight-v0.1.6.md`
**Notes:** Executed by Claude Code 2026-05-04. Bartlett standard applied throughout — long multi-clause sentences broken, argument sections simplified to two-clause maximum. Gary Stevenson opening and bias declaration preserved intact. Revised taxonomy (Trilling criterion, "far" hedge retired, expanded right/left) retained and confirmed more accessible than v0.1.4 equivalent. Post-Bretton Woods economic sketch and geopolitical section broken into shorter sentences for oral delivery. Hardest objection preserved at full force — right's moral argument on migration delivered without weakening. Pre-recording checklist updated in script bias audit section with two new items: hardest objection preserved at full force (✓), taxonomy consistent with Defining Principles v0.1.0 (✓).

---

### WB-010 — Episode 0 segment scripts — book track drafts

**Status:** COMPLETE
**Output:** `docs/scripts/episode-00/` — eight segment files (S01–S08) + aggregate, all at v0.0.1 book track.
**Notes:** Executed by Claude Code 2026-05-05. All eight segments drafted in host's voice per session notes and Defining Principles v0.1.0. Key notes applied: S01 adapted from Ep1 v0.1.7 bias declaration; S02 Trilling criterion and civic nationalism distinction included; S03 Lowe/Restore Britain repositioning reflected (Hansard QE ban bill, Milei admiration, City career — stated as interpretation); TR problem stated as interpretive difficulty not settled classification; S04 libre/gratis as primary example, liberal/liberal conflation as second; S06 Ferrari illustration attributed to propositional logic class example; S07 book skip invitation verbatim; S08 models steelman obligation — strongest objection to steelmanning presented at full force before response. Production Document Register updated to v0.3.11. **Deletion clearance issued:** no prior version to supersede — these are new files. Source of truth updated to v0.3.11.

**Context:** Episode 0 is the reference/methodology episode. Eight discrete segments, each a standalone video. Each segment is independently clippable for social distribution. OO model: Episode 0 is the base class, Episodes 1–19 are subclasses.

**Segment naming convention:** `Episode_00_S01_The_Declared_Standpoint_v0.0.1.md` through `Episode_00_S08_The_Steelman_Obligation_v0.0.1.md`

**For each segment:** Open `Episode_Requirements_Specs_v0.0.2.md` (Episode 0 section), the relevant Defining Principles v0.1.0 sections, and Session Notes v0.2.7 for host voice. Draft in the host's natural register — accumulative sentences, parenthetical thinking, the "define x" habit. Target durations from the specs (S01: 3 min, S02: 5 min, S03: 8 min, S04: 4 min, S05: 3 min, S06: 4 min, S07: 3 min, S08: 3 min).

**Specific segment notes:**
- S01: Draw from the bias declaration passage in Episode 1 v0.1.6. Adapt rather than rewrite.
- S02: The taxonomy section — use the revised taxonomy from Defining Principles v0.1.0. The new taxonomy language (Trilling criterion for extreme, "far" hedge retired, liberal democracy defined) should be introduced here clearly and accessibly.
- S03: Use concrete examples before axis labels. Lowe/Restore Britain repositioning must be reflected. TR problem stated as interpretation. SNP/Plaid civic nationalism distinction should appear here.
- S04: The libre/gratis observation is the segment's signature moment.
- S06: The Ferrari illustration — attribute as a class example from the host's university propositional logic lectures: *"my propositional logic lecturer presented a scenario..."*
- S07: Include the book skip invitation verbatim: *"What follows is the bit where my CompSci background is influencing my [id/ego, can never remember which...]. If propositional logic diagrams are not your idea of a good time, the summary on page X has everything you need. If they are — this is a happy place, welcome."*
- S08: The segment must model the steelman obligation, not just describe it.

**After all eight:** Create `Episode_00_Aggregate_v0.0.1.md` assembling all segments in order with brief framing introduction. Update Production Document Register.

**Definition of done:** Eight segment files + aggregate file. All in host's voice. Key notes above applied. Register updated. Commit message: `feat: episode 0 all segment scripts book track v0.0.1`

---

### WB-012 — Transcript markup annotation system + retrospective application

**Status:** QUEUED
**Priority:** MEDIUM — depends on WB-007 being substantially complete first

**Context:** The music is composed to the transcript structure. Each transcript needs `[M:]` annotations as a cue sheet for the composer. The three-layer visual grammar also requires location and visual briefs in each episode's production notes. Standards defined in Defining Principles v0.1.0 Sections VII(b) and VII(c).

**Annotation vocabulary:**
- `[M:establish]` — opening, music enters
- `[M:build]` — tension or argument building
- `[M:peak]` — significant claim or structural moment
- `[M:drop]` — statement that needs to land without underscore — music pulls back or stops; cut to Layer A close
- `[M:transition]` — movement between sections
- `[M:resolve]` — provisional conclusion or emotional release
- `[M:out]` — outro, music fades

**Instructions:**
1. Apply `[M:]` annotations to `docs/scripts/episode-01/episode-01-the-wrong-fight-v0.1.7.md`. Save as next available patch.
2. Apply to `docs/scripts/episode-02/episode-02-nationalist-about-what-v0.2.3.md`
3. Add **Location brief** and **Visual brief** to production notes of each:
   - Ep 1 Location: exterior of a closed/struggling high street
   - Ep 1 Visual brief: archival pit/factory closure footage; Channel crossing news footage; Chilcot press conference
   - Ep 2 Location: financial district exterior — Canary Wharf or City of London
   - Ep 2 Visual brief: 1980s City trading floor archival; community centres/NHS exteriors
4. Update `Episode_Requirements_Specs_v0.0.2.md` to add `[M: annotations]`, `Location brief`, and `Visual brief` as required production notes fields. Save as v0.0.3.
5. Update register.

**Stock footage sources:** Open Parliament Licence (free); Chilcot (public domain); Getty/AP/Reuters (per-clip); BFI National Archive (independent documentary rates).

**Definition of done:** Episodes 1 and 2 annotated with `[M:]` system and location/visual briefs added. Ep Reqs Specs v0.0.3 includes all three fields as standard. Commit message: `feat: add music annotations, location briefs, visual briefs to episode drafts`

---

### WB-013 — LaTeX/Pandoc conversion pipeline for academic paper

**Status:** COMPLETE
**Output:** `docs/academic/academic-paper-v0.1.1.tex`, `docs/academic/academic-paper-v0.1.1.pdf` (23 pages). Pipeline confirmed operational against v0.1.2 source.
**Notes:** Executed by Claude Code in session 2026-05-02/03. Pandoc 3.9.0.2 + XeLaTeX (MacTeX 2026). Font set to Times New Roman (TeX Gyre Termes unavailable in this MacTeX install). `\xmpquote` preamble conflict patched via `-H` flag. `numbersections` overridden to false (numbers already baked into heading text in markdown source). `--citeproc` confirmed resolving all 46 `.bib` entries. Chicago Author-Date CSL filed at `docs/academic/chicago-author-date.csl`. Full LaTeX build artifact list added to `.gitignore`. **Note for next compile:** run against `docs/academic/academic-paper-v0.1.2.md` — v0.1.1 compiled outputs are historical. Build command: `pandoc docs/academic/academic-paper-v0.1.2.md --citeproc --pdf-engine=xelatex -H /tmp/xmpfix.tex -M numbersections=false -o docs/academic/academic-paper-v0.1.2.pdf`

**Priority:** HIGH — IMMEDIATE. Pandoc 3.9.0.2 and MacTeX (full distribution) confirmed installed. All prerequisites met. This is the last technical step before SocArXiv submission.

**Context:** Two LaTeX-ready paper versions exist. `Academic_Paper_v0.0.7.md` (~14,100 words, full 5-move expansion) and `Academic_Paper_v0.1.2.md` (~8,600 words, Cursor restructure with Section 1.5 hedging conventions added). Run WB-013 against **v0.1.2** first as the most recent Cursor-agent version. `references.bib` is at 46 entries (Hyland 1998/2005 and Toulmin 1958 added for Section 1.5). Pandoc 3.9.0.2 and XeLaTeX confirmed installed.

**Instructions:**

1. Confirm tools: `pandoc --version` (expect 3.9.0.2) and `xelatex --version`

2. Create `paper_template.tex` in repo root. Requirements:
   - A4, 12pt, standard academic margins (2.5cm)
   - Author-date citations via `biblatex` with `style=authoryear`
   - `booktabs` package for Table 1
   - Logic notation: `\land \lor \rightarrow \leftrightarrow \neg \therefore`
   - `amsmath` for truth tables and propositional expressions
   - Font: XeLaTeX-compatible serif (Linux Libertine or similar; MacTeX includes both)
   - Line spacing: 1.5
   - Section numbering: on

3. Build command:
   ```bash
   pandoc Academic_Paper_v0.1.2.md \
     --template=paper_template.tex \
     --bibliography=references.bib \
     --citeproc \
     --pdf-engine=xelatex \
     -o Academic_Paper_v0.1.2.pdf
   ```

4. Test with a minimal sample first containing: one truth table, two logic expressions (`\land`, `\rightarrow`), one citation (streeck2014). Confirm PDF renders correctly before running on the full paper.

5. Check the rendered PDF for:
   - Table 1 formatting (8-column table — may need landscape or smaller font)
   - All logic symbols rendering correctly
   - All 39 citations resolving from `references.bib`
   - Section numbering correct
   - Author name and qualifications on title page: `Ruari Mears, Cert.\ Ed., BSc (Hons), PGCE`

6. Add `*.pdf *.aux *.log *.out *.toc *.bbl *.bcf *.blg *.run.xml` to `.gitignore`

7. Document build process under "Building the Academic Paper PDF" in `README.md`

8. Commit the template and build script (not the PDF): `feat: add LaTeX/Pandoc pipeline for academic paper`

**Known issue to handle:** Table 1 is an 8-column wide table. If it overflows page width, either: (a) use `\small` font size inside the table, (b) wrap in a `landscape` environment using the `pdflscape` package, or (c) split into two tables. Option (a) is preferred — try it first.

**Definition of done:** `pandoc` command runs without errors on `Academic_Paper_v0.1.2.md`. PDF renders correctly — all logic symbols, all 46 bib entries resolve, Table 1 legible. README documents the build process. Commit message: `feat: LaTeX/Pandoc pipeline — Academic_Paper_v0.1.2.pdf builds cleanly`

---

### WB-014 — Academic paper review pass
**Status:** COMPLETE
**Output:** `Academic_Paper_v0.0.6.md`
**Notes:** All issues addressed across the full expansion session. Abstract updated with "rhetorically absent" and suppression mechanism. Lowe footnote tightened. Section 7 consolidated ≤400 words. Parvini note condensed. Qualifications on author byline. Subtitle updated. Paper expanded from ~9,200 to ~14,100 words across five expansion moves before this pass ran.

---

### WB-015 — Complete BibTeX references for academic paper
**Status:** COMPLETE
**Output:** `references.bib`
**Notes:** 46 entries. Original 40 + bes2024, taguieff1994, griffin1995b (added for v0.1.1) + hyland1998, hyland2005, toulmin1958 (added for Section 1.5 / v0.1.2). All author-year citation keys. Trilling forward entry included. Ready for WB-013 pipeline.

---

### WB-016 — Episode 3 book track draft

**Status:** COMPLETE
**Output:** `docs/scripts/episode-03/episode-03-what-bretton-woods-actually-was-v0.3.1.md`

**Notes on completion:**
- 8,556 words; ~38–42 minutes at measured speaking pace
- Built from Academic Paper v0.0.7 Section 4 (Post-Bretton Woods Settlement) as primary evidential source
- All empirical claims logged in Reference Framework v0.0.5 (Episode 3 entries)
- Hayek-Friedman steelman delivered in full before structural response (~800 words)
- Globalisation counter-reading (hundreds of millions lifted from poverty) acknowledged at full force
- Three-register signal phrases applied throughout; moral argument deliberately dialled back
- Milanovic elephant curve as the central evidential pivot
- World Bank 1994 and IMF IEO 2007 institutional self-assessments as credibility anchors
- Outstanding pre-podcast items flagged in bias audit: Connally quote attribution to primary source; verification of £70bn privatisation figures and 900,000 workers transferred; £137bn bailout figure verification; elephant curve image rights

---

### WB-017 — Update Reference Framework with Trilling (2026) after reading

**Status:** QUEUED — depends on host reading *If We Tolerate This*
**Priority:** MEDIUM

**Context:** Trilling, D. (2026) — *If We Tolerate This* — is currently a preliminary entry in the Reference Framework standing flags. Once the host has listened to the Audible version, the entry needs to be updated with: specific claims from the text that are relevant to Episodes 1, 2, and 14; an honest assessment of where Trilling's mainstreaming thesis and this project's structural thesis converge and diverge; and specific passages or arguments that are suitable for citation on air.

**Instructions:**
This block is unusual — it requires input from the host (Ruari) before Claude Code can complete it. The process is:
1. Host listens to *If We Tolerate This* and notes specific claims, passages, and arguments relevant to this project.
2. Host shares notes in the claude.ai session.
3. claude.ai analyses and produces an updated Reference Framework entry.
4. Claude Code implements the update.

**Until host input is received:** Status remains QUEUED — AWAITING HOST INPUT.

**When host input is received:** Update `Reference_Framework_v0.0.4.md` (or current version) with full entry under Episode 1 and Episode 14 reference sections. Add Trilling's 2012 book (*Bloody Nasty People*) as a separate entry if relevant. Save as next version. Update register.

**Definition of done:** Full Reference Framework entry for Trilling (2026) based on actual text. Preliminary flag replaced with evidenced entry. Commit message: `feat: update Reference Framework with Trilling 2026 from primary text`

---

### WB-018 — Episode 2 podcast track taxonomy update (v0.2.3)

**Status:** COMPLETE
**Output:** `docs/scripts/episode-02/episode-02-nationalist-about-what-v0.2.3.md`
**Notes:** Executed by Claude Code 2026-05-03. v0.2.2 contained no "far-right", "extreme", or "behaviour" taxonomy language — confirmed clean on points 1 and 2. Point 3 addressed: expanded category note added to "The right" section in plain podcast-register language, consistent with Defining Principles v0.1.0 Section III. Pre-recording checklist updated with two taxonomy checks. No other content changed.

**Definition of done:** `Episode_02_Nationalist_About_What_v0.2.3.md` — taxonomy language consistent with Defining Principles v0.0.9. No other content changed. Commit message: `fix: episode 2 podcast track taxonomy update v0.2.3`

---

### WB-019 — Six-axis radar chart visual assets (SUPERSEDED — replaced by methodology-driven dual-radar tool)

**Status:** SUPERSEDED by WB-025 → Six-Axis Compass HTML rewrite
**Priority:** MEDIUM — deferred

**Supersession note (2026-05-16):** The original instructions in this block — produce a React component with suggested numeric scores for visual production use only — have been superseded by the framework restructure of session 2026-05-16. The new approach is:

- Coordinates derived from the questionnaire in *Axis Coding Questionnaire v0.0.1*, not from "suggested scores."
- Coordinates source-backed via the Reference Framework expansion (WB-025), not generated for visual production only.
- Dual-register methodology (declared and structural radars per actor) per *Axis Scale Specification and Radar Methodology v0.0.2*.
- HTML rewrite of `tools/six-axis-compass/six-axis-compass-v0.0.5.html` to read coordinates from the Reference Framework and render the dual-radar visualisation with comparison and time-series views.

The original instructions are retained below for historical reference. They should NOT be enacted. The replacement work is queued as part of WB-025's dependency chain.

**Ingest (2026-05-20):** Analytical justification for which radar-style figures belong in the **peer-reviewed academic paper** (distinct from the superseded React/SVG production brief below) is filed as [`docs/academic/radar-maps-academic-paper-justification-v0.1.0.md`](../academic/radar-maps-academic-paper-justification-v0.1.0.md) — ingested from `from-claude-desktop/radar-maps-academic-paper-justification.md`. Recommended set for the paper: **Figure 1** convergence-zone overlay (nationalist right vs anti-imperialist left — load-bearing); **Figure 2** four-actor comparative reference (Conservative mainstream, Labour mainstream, Reform UK, Greens — supporting; full six-actor spread trimmed per that doc); **Figure 3** (optional) Reform UK vs Restore Britain economic-axis divergence (§5.3 illustration); **deferred** centre temporal overlay (1979 vs 2024) until temporal Reference Framework data exists; **main text exclude** Rojava governance-limit overlay (supplementary only). All figures remain **conditional on WB-025** source-backing; until then captions must disclose Table 1 / provisional coordinate derivation as that document specifies.

---

**Original instructions (historical reference only — do not enact):**

**Context:** Numeric axis scores exist in `Axis_Ratification_SNP_Plaid_v0.0.2.md` for SNP and Plaid Cymru. The academic paper Table 1 contains axis positions (qualitative) for all major political actors. The six-axis radar chart is a planned Layer C visual asset for Episode 2 and Episode 0 S03 (the framework segment). This block produces the visual assets.

**Original instructions:**

1. Open `Axis_Ratification_SNP_Plaid_v0.0.2.md` for the SNP and Plaid numeric scores
2. Derive numeric scores (0–10 scale) for all other Table 1 actors from `docs/academic/academic-paper-v0.1.2.md` Table 1, using the same scale definition:
   - Cultural: 0 = cultural internationalism, 10 = cultural nationalism
   - Economic: 0 = economic internationalism, 10 = economic nationalism
   - Military: 0 = minimal outward deployment, 10 = maximal interventionism
   - Sovereignty: 0 = supranational, 10 = national
   - Liberty: 0 = state-coercion only (libertarian right), 10 = left-liberal (includes private coercion)
   - Class: 0 = class-harmony, 10 = class-conflict

   Suggested scores for remaining actors (verify against Table 1 qualitative descriptions):
   - Conservative Party: Cultural 7 / Economic 3 / Military 8 / Sovereignty 6 / Liberty 2 / Class 1
   - Labour Party: Cultural 5 / Economic 3 / Military 7 / Sovereignty 5 / Liberty 5 / Class 3
   - Reform UK mainstream: Cultural 8 / Economic 5 / Military 5 / Sovereignty 8 / Liberty 3 / Class 2
   - Restore Britain (Lowe): Cultural 9 / Economic 2 / Military 5 / Sovereignty 9 / Liberty 2 / Class 1
   - Green Party: Cultural 2 / Economic 7 / Military 2 / Sovereignty 5 / Liberty 8 / Class 8
   - Novara Media ecosystem: Cultural 2 / Economic 7 / Military 2 / Sovereignty 4 / Liberty 9 / Class 9

3. Produce a React component (`Radar_Chart_Six_Axis_v0.0.1.jsx`) that:
   - Renders a six-axis radar/spider chart for any given actor
   - Can display multiple actors overlaid for comparison
   - Uses the project's aesthetic vocabulary (refer to Defining Principles for tone — serious, not garish)
   - Is interactive: user can select which actors to display

4. Also produce individual static SVG versions for each actor for use in video production (Layer C assets)

5. Save the React component to `/mnt/user-data/outputs/` and the SVGs to `/mnt/user-data/outputs/radar_charts/`

6. **Important scope note:** These numeric scores are for visual production use only. They do not appear in the academic paper or book. The qualitative descriptions in Table 1 are the academically defensible versions.

**Definition of done (original — superseded):** React component renders correctly with all actors. Individual SVGs exist for each actor. Commit message: `feat: six-axis radar chart visual assets`

---

### WB-020 — Deploy six-axis compass web app

**Status:** COMPLETE
**Priority:** MEDIUM — needed before show launch; deploy alongside Episode 0

**Context:** `six_axis_compass.html` is a self-contained, zero-dependency HTML file. It requires no build step, no framework, no server-side logic. It can be served as a static file from any web host. The app collects no data and makes no external requests.

**Instructions:**

1. Review `tools/six-axis-compass/six-axis-compass-v0.0.5.html` for any content requiring update before deploy:
   - The GitHub link in the footer — confirm public URL when repo goes public
   - The meta description tag — update if the show's tagline has been refined
   - The actor scores in the `ACTORS` array — cross-check against current axis ratification documents
   - **Note:** The military axis Q9 was revised from "Military alliances like NATO make the world more stable" (forward, interventionist) to "My country should withdraw from or significantly reduce its commitments to NATO" (reverse, non-interventionist). Q10 was simultaneously reworded to "Western military intervention in foreign states can be a legitimate and effective instrument of policy" (forward) to rebalance the axis at two forward / two reverse. These changes are already in the filed HTML.

2. File is already committed at `tools/six-axis-compass/six-axis-compass-v0.0.5.html`. No further repo action required.

3. Deploy options (in order of preference):
   - **Host's own domain** (e.g. `ruarimears.com/compass` or `thecommonenemy.com/compass`) — serve the HTML file directly. This is the permanent URL. Add to the Episode 0 landing page.
   - **GitHub Pages** — enable GitHub Pages on the repo and serve from `/docs` or the repo root. Free, version-controlled, permanent while the repo exists.
   - **Netlify drop** — drag the file to app.netlify.com/drop for an instant deploy URL. Quick for testing; not permanent.

4. Once deployed, add the URL to:
   - The Episode 0 landing page
   - The show notes for Episodes 2 and Season One episodes that reference the six-axis framework
   - The academic paper acknowledgements section (as a companion tool)
   - The Marketing Strategy document (as a Track Two / pre-launch asset)

5. Update Production Document Register to note the deployed URL

**Definition of done:** `six_axis_compass.html` is live at a stable URL. URL is added to Episode 0 landing page and show notes. Register updated. Commit message: `feat: deploy six-axis compass to [url]`

**Completion notes:**
- Spun off as standalone open-source project at `https://github.com/earlution/6-axis-compass`
- Deployed at `https://earlution.github.io/6-axis-compass/`
- Internal `tools/six-axis-compass/` files removed from common-enemy repo
- README updated to reference external repo
- Source of truth updated to PDR v0.3.21
- **Deletion clearance issued:** `tools/six-axis-compass/six-axis-compass.html` — committed at `e00db8d` (2026-05-03). Safe to delete from claude.ai artifacts.
- **Deletion clearance issued:** `tools/six-axis-compass/six-axis-compass-v0.0.5.html` — committed at `c369c44` (2026-05-04). Safe to delete from claude.ai artifacts.

---

### WB-021 — Episode 4 sources verification (17 flagged figures)

**Status:** COMPLETE
**Priority:** HIGH — was next HIGH priority in Outstanding Actions

**Context:** Episode 4 book track v0.4.1 ("The Globalisation Discontents — Left Version") contains 17 empirical claims flagged for pre-recording verification against primary sources. The episode makes four premises about the post-Bretton Woods settlement's effects on the British working class: capital mobility prioritisation, manufacturing employment collapse, real wage stagnation, and welfare state contraction. Each premise rests on specific numerical claims that require verification before the podcast track can be considered ready to record.

**Verification results (2026-05-19):**

| Claim | Script figure | Verified figure | Source | Status |
|---|---|---|---|---|
| Manufacturing employment 1978 | ~7m | ~7m | ONS | Verified |
| Manufacturing employment 2024 | ~2.5m | ~2.5m | ONS | Verified |
| Exchange controls abolition | 23 October 1979 | 23 October 1979 | Hansard | Verified |
| Coal industry employment 1981 | ~250,000 | ~250,000 | NUM/DTI | Verified |
| Wage share of national income (1970s) | ~70% | ~64% | ONS national accounts | **CORRECTED** |
| Wage share of national income (2010s) | ~55% | ~58% | ONS national accounts | **CORRECTED** |
| Right to Buy total | 2m+ homes | 2.03m homes | MHCLG/DLUHC | Verified |
| Privatisation receipts | ~£70bn | ~£70bn | HM Treasury | Verified |
| PFI contracts | ~700 | ~700 | NAO | Verified |
| PFI capital value | ~£60bn | ~£60bn | NAO | Verified |
| Local authority cuts 2010–2019 | ~50% | 20–25% per person | IFS | **CORRECTED** |
| Real wage stagnation post-2008 | £10k+ loss | £10k+ loss | Resolution Foundation | Verified |
| 2008 bailout | £137bn | £137bn | Treasury | Verified |
| Manufacturing share of employment (1978) | 26% | 26% | ONS | Verified |
| Manufacturing share of employment (2024) | 8% | 8% | ONS | Verified |
| Manufacturing share of GDP (1978) | 25% | 25% | ONS | Verified |
| Manufacturing share of GDP (2024) | 10% | 10% | ONS | Verified |

**Corrections applied:**
1. Wage share decline: Script claimed 70%→55% (15pp decline). ONS national accounts show ~64%→~58% (6pp decline). Still a substantial redistribution, but the script's figure overstated the decline.
2. Local authority funding cuts: Script claimed ~50% real-terms reduction. IFS analysis shows 20–25% per person reduction. The script's figure was high.

**Instructions:**
1. Update Episode 4 script with corrected figures (wage share and local authority cuts).
2. Bump Episode 4 to v0.4.2.
3. Update verification flags in script production notes.
4. Add Episode 4 entries to Reference Framework.
5. Update PDR and AWB.

**Definition of done:** Episode 4 v0.4.2 filed with corrected figures. Reference Framework v0.0.6 with Episode 4 entries. PDR updated to v0.3.40. AWB updated to v0.2.23.

**Completion notes:**
- Episode 4 script corrected: wage share 64%→58% (ONS); local authority cuts 20–25% per person (IFS)
- Episode 4 bumped to v0.4.2
- Reference Framework bumped to v0.0.6 with full Episode 4 source entries
- PDR bumped to v0.3.40
- AWB bumped to v0.2.23
- WB-021 marked COMPLETE

---

### WB-022 — Editorial review of axis restructure open questions

**Status:** COMPLETE
**Priority:** HIGH — blocks all downstream restructure work (now unblocked)

**Context:** *Defining Principles — Supplement v0.0.2* proposes a `MAJOR`-class restructure of the six-axis framework: deprecation of the liberty axis and its replacement with a libertarian/authoritarian axis, plus integration of axis-conflation rhetoric and the radar diagnostic. The supplement §IX flags three open editorial questions that must be settled before the restructure is enacted in the parent documents.

**Instructions:**

1. Review the three open questions in *Defining Principles — Supplement v0.0.2* §IX:
   - **OQ1 — The name.** *Libertarian/authoritarian* is canonical in the literature but "libertarian" carries strong right-coded connotations in contemporary usage. Alternatives: *consent/coercion*, *democratic/authoritarian*, *autonomy/hierarchy*. Decision should fit the existing "X axis" lexical pattern.
   - **OQ2 — The order.** The current axis order is cultural, economic, military, sovereignty, liberty, class. Options: keep new axis in fifth slot, place last, or pair with sovereignty as a procedural-axis pair. Decision affects the Episode 00 S03 pedagogical sequence.
   - **OQ3 — The disposition of existing liberty vocabulary.** The supplement §V argues the vocabulary's home is a treatment of axis-conflation rhetoric, not the class axis treatment. Decision: dedicated Episode 00 sub-segment, or a later full episode.

2. Cross-reference *Axis Scale Specification and Radar Methodology v0.0.2* §IX (the sovereignty-axis decomposition question) and *Axis Coding Questionnaire v0.0.1* §X (the weighting, refusal, and strategic-ambiguity questions). These are methodological open questions that should be settled alongside the supplement's three.

3. Document the editorial decisions in a session note or a supplement update to v0.0.3.

**Definition of done:** Session note or supplement v0.0.3 filed with explicit decisions on OQ1, OQ2, OQ3 plus the methodology OQ1 (sovereignty decomposition). Decisions are unambiguous and the rationale is recorded. WB-023 can proceed once this is complete.

---

### WB-023 — Downstream enactment of axis restructure

**Status:** PARTIAL COMPLETE — steps 1, 2, 3, 5 done; steps 4 and 6 deferred to WB-027
**Priority:** HIGH — central framework change, propagates across multiple documents

**Context:** Once the open questions are settled (WB-022), the axis restructure is enacted in the parent documents as a `MAJOR`-class co-ordinated change-set per the supplement v0.0.2 §VII.

**Process note (2026-05-17):** Step 3 was partially advanced ahead of WB-022 by a claude.ai session at host direction. The Academic Paper was bumped to v0.1.5 with §3.2 and §3.3 updated to the new axis. WB-022 has now been completed (session note filed with explicit decisions), and the implicit decisions made in v0.1.5 match the editorial decisions — v0.1.5 stands as drafted. The three open questions in supplement §IX were settled as:

- **OQ1 (axis name):** Ratified as "libertarian/authoritarian" — supplement default.
- **OQ2 (axis order):** Ratified as slot 5.
- **OQ3 (disposition of liberty vocabulary):** Settled as class-axis absorption. Axis-conflation rhetoric treatment deferred to a future dedicated pedagogical space (Episode 00 sub-segment or full episode).

The v0.1.5 approach to OQ3 aligns with the editorial decision. No further paper revision is needed at this step.

**Instructions:**

1. **Defining Principles → v0.2.0.** Axis enumeration in §IV updated to cultural, economic, military, sovereignty, libertarian/authoritarian, class. Liberty axis removed; libertarian/authoritarian axis added with the descriptors set out in the supplement §III. Other axes unchanged. `MAJOR` bump justified by the taxonomy change.
   - **COMPLETE — 2026-05-17.** Defining Principles v0.2.0 filed. §IV liberty axis paragraph replaced with libertarian/authoritarian axis paragraph (adapted from supplement §III); class axis paragraph extended to absorb the class-axis content of the deprecated liberty axis; introductory text revised from "four distinct dimensions" to "six distinct dimensions"; convergence zone passage updated to acknowledge the third axis as a scope condition; §IV(d) "liberty/authoritarianism axis" terminology updated to "libertarian/authoritarian axis"; project title corrected.

2. **Episode 00 S03 (The Six-Axis Framework) → v0.0.2.** Fifth axis section rewritten. "Freedom from what" framing retired. New fifth axis introduced through worked examples (fascism vs. Restore Britain, anarcho-communism vs. Leninism) before being named. Convergence zone discussion updated to three-axis frame (economic, military, lib/auth).
   - **COMPLETE — 2026-05-17.** Episode 00 S03 v0.0.2 filed. Fifth axis section fully rewritten through both worked examples per supplement §III; "American party-political baggage" caveat included; four-quadrant test (fascism / right-libertarianism / Leninism / anarcho-communism) delivered structurally; bias-disclosure passage on the relationship to the deprecated liberty axis included per *Bias Audit Log v0.0.6*. Class axis section extended to absorb the deprecated liberty-axis class content. Convergence zone passage rewritten to three-axis frame with red-brown-alliance disambiguation. Production notes and bias audit updated. Project title corrected.

3. **Academic Paper §3.2 → next version.** Liberty axis paragraph replaced. The "liberal/liberal conflation" observation reframed as a worked example of axis-conflation rhetoric (per supplement §V).
   - **PARTIAL — 2026-05-17.** Academic Paper v0.1.5 filed with §3.2 and §3.3 updated. The liberal/liberal conflation observation was *not* reframed as axis-conflation rhetoric — it was absorbed into the class axis paragraph instead (implicit OQ3 decision). The remaining downstream "liberty" references (abstract, §1.4, §2.1, §4, §5.3, conclusion, keywords) are *not* updated. Remaining work tracked under **WB-026**.
   - **COMPLETE — 2026-05-17 (via WB-026).** Academic Paper v0.1.6 filed. Full restructure sweep applied across abstract, §1.4, §2.1, §3.2, §3.3, §4.1, §5.3, conclusion. Paper internally consistent under the libertarian/authoritarian axis framework. PDF recompile pending (Claude Code task).

4. **Reference Framework §IV (Episode 2 entries) → v0.0.6.** Hayek/Berlin/Mill liberty axis entry repurposed per supplement §VII. New sources added for authoritarian end: Schmitt, Paxton, primary documents on Leninism and democratic centralism. New sources for axis-conflation rhetoric: Polanyi, Cold War rhetoric scholarship.
   - **DEFERRED — 2026-05-17.** The axis-conflation rhetoric source additions depend on OQ3's placement decision for the axis-conflation rhetoric treatment, which is itself deferred. The libertarian/authoritarian-axis source updates (Schmitt, Paxton, Leninism primary documents) are bundled with the deferred work because the Reference Framework restructure is best done as a single coherent edit. Tracked under **WB-027**.

5. **Episode 02 → v0.2.5.** Brief liberty axis introduction at line 150 replaced. Promise to return to liberty later removed. Existing *free trade* / *free world* passages retained but recontextualised as early instances of axis-conflation rhetoric.
   - **COMPLETE — 2026-05-17.** Episode 02 v0.2.5 filed. Example 5 (Freedom — "freedom from *what*?") replaced with a worked example for the libertarian/authoritarian axis in the episode's colloquial register. "We'll come back to this" promise retired. The *free trade* / *free world* passages later in the episode were not recontextualised as axis-conflation rhetoric (per OQ3 deferral) — they were left as they stand, reading as rhetorical analysis of how the word "free" does hidden work, which is what the passage was always doing functionally. The full axis-conflation rhetoric framing remains deferred under WB-027. Project title corrected.

6. **New Episode 00 sub-segment.** Treatment of axis-conflation rhetoric — *free*-prefixed family of phrases as the worked example. Filed under `docs/scripts/episode-00/` per the existing segment pattern.
   - **DEFERRED — 2026-05-17.** Step 6 cannot proceed without the OQ3 placement decision (sub-segment vs. full episode, and where in the series). The WB-022 session note explicitly defers this decision to "the broader Episode 00 / series structure review." Tracked under **WB-027**.

7. Commit as a single co-ordinated change-set so the dependent documents move together. **Note:** the single-change-set property has already been compromised by the v0.1.5 partial advance. The remaining steps (1, 2, 4, 5, 6) should still be enacted together once WB-022 is complete and WB-026 has reconciled the paper to whatever WB-022 decides. Commit message: `refactor: enact axis restructure (DPS v0.0.2)`.
   - **PARTIAL — 2026-05-17.** Steps 1, 2, 5 completed together as a sub-change-set (suggested commit message: `refactor: enact axis restructure parent docs (DPS v0.0.2)`). Step 3 already committed separately via the v0.1.5/v0.1.6 sequence. Steps 4 and 6 will form a third change-set under WB-027 once OQ3 placement is settled.

**Definition of done:** All listed documents updated to the new framework. No remaining references to the liberty axis except in changelog and historical sections. Production Document Register and Version History Index updated. Deletion clearance issued for prior versions.

**Partial-completion note (2026-05-17):** Definition of done is met for steps 1, 2, 3, 5. Steps 4 and 6 are deferred to WB-027 pending the OQ3 placement decision for axis-conflation rhetoric. The Reference Framework and the prospective Episode 00 sub-segment retain their pre-restructure form until that placement decision is taken; this is a known transparency issue and is flagged in *Bias Audit Log v0.0.6* under the framework-restructure standing flag.

---

### WB-024 — Brexit paper inter-coder verification

**Status:** BLOCKED — depends on WB-023
**Priority:** MEDIUM — strengthens the canonical worked example

**Context:** *Brexit Under the Six-Axis Framework v0.0.1* contains first-cut codings for eight political components (five Leave, three Remain) across the six axes. The paper §VI.L1 flags two coordinates specifically for inter-coder review: the cultural axis coding of Component 3 (Labour heartlands — period-sensitive) and the libertarian/authoritarian axis coding of Component 2 (cultural-nationalist right — has moved over the subsequent decade).

**Instructions:**

1. Apply the inter-coder reliability protocol specified in *Axis Scale Specification and Radar Methodology v0.0.2* §V to all eight components, all six axes, both registers where evidenced.

2. Pay particular attention to the two flagged cases:
   - Component 3 (Labour heartlands), cultural axis — verify C1 through C5 question scores against the British Election Study and subsequent academic literature on the demographic for the 2015-16 period specifically.
   - Component 2 (cultural-nationalist right), libertarian/authoritarian axis — verify LA1 through LA6 question scores against UKIP 2015-16 stated positions, manifesto, and Farage statements of the period. Do not back-project from post-2016 movement.

3. Address the radar-surfaced question of whether Components 1 and 4 should be collapsed (cf. session radar diagnostic). Either defend the separation more carefully or merge into a single sovereignty-libertarian-right component.

4. Output: *Brexit Under the Six-Axis Framework v0.0.2* with revised codings, inter-coder verification flags, and discrepancies recorded per the protocol.

**Definition of done:** v0.0.2 filed. All contested codings either inter-coder verified at within-1-point agreement or flagged as range codings. Component 1/4 question resolved.

---

### WB-025 — Reference Framework coordinate expansion

**Status:** BLOCKED — depends on WB-023
**Priority:** MEDIUM — operationalises the radar methodology for live use

**Context:** *Axis Scale Specification and Radar Methodology v0.0.2* §VII Phase 2 specifies that the Reference Framework be expanded with a coordinate column for each actor across all six axes in both registers (declared and structural), with citations supporting each coordinate. This is the work that converts the framework from a discursive heuristic to an operational measurement instrument.

**Instructions:**

1. Apply the questionnaire in *Axis Coding Questionnaire v0.0.1* to each of the following actors, in this order:
   - The political centre (Lab/Con mainstream) — both registers, periods specified
   - The nationalist right (Reform UK, Restore Britain) — declared register; structural register where evidence permits
   - The anti-imperialist left (Greens, Plaid, broader tradition) — declared register
   - The extreme (per the taxonomy) — declared register where applicable

2. Each coordinate must be supported by at least one citation entered in the Reference Framework. Coordinates without citations are invalid per the methodology document.

3. Apply the inter-coder reliability protocol to contested cases.

4. Output: *Reference Framework v0.1.0* with coordinate columns added.

**Definition of done:** Reference Framework v0.1.0 filed with full coordinate matrix for the four listed actor categories. Inter-coder verification complete or flagged. Sufficient input data exists for WB-019 (the six-axis compass HTML rewrite).

---

### WB-026 — Academic Paper restructure completion (downstream of v0.1.5)

**Status:** COMPLETE — Academic Paper v0.1.8 filed 2026-05-18, PDF compiled
**Priority:** HIGH — closed out the partial-enactment debt incurred by v0.1.5

**Context:** Academic Paper v0.1.5 was filed on 2026-05-17 as a partial advance on WB-023 step 3 ahead of WB-022. §3.2 and §3.3 were updated to the new libertarian/authoritarian axis, but the change is internally incomplete and the file changelog explicitly flags the residual inconsistencies. This work block completes the paper-side restructure once WB-022 has ratified or revised the implicit editorial decisions made in v0.1.5.

**Implicit decisions embedded in v0.1.5 that WB-022 must ratify or override:**

- **OQ1 (axis name):** v0.1.5 uses "libertarian/authoritarian axis" throughout §3.2 and §3.3. If WB-022 chooses an alternative (consent/coercion, democratic/authoritarian, autonomy/hierarchy), all occurrences in §3.2 and §3.3 require updating in addition to the downstream sections.
- **OQ2 (axis order):** v0.1.5 places the new axis in slot 5 (cultural, economic, military, sovereignty, libertarian/authoritarian, class). If WB-022 chooses a different order, the abstract, §1.4, §2.1, and conclusion enumerations will need to reflect the new order when they are updated.
- **OQ3 (disposition of liberty vocabulary):** v0.1.5 absorbed the class-axis content of the deprecated liberty axis into the class axis paragraph, and the liberal/liberal conflation observation was retained in the class axis paragraph rather than reframed as axis-conflation rhetoric. This departs from WB-023 step 3 and from supplement §V. If WB-022 ratifies the supplement §V position, the class axis paragraph in §3.2 will need to be revised to point to axis-conflation rhetoric as the proper home for the liberal/liberal conflation, and a new methodological section or subsection on axis-conflation rhetoric will need to be added to the paper.

**Instructions:**

Once WB-022 is complete, reconcile the paper to its decisions:

1. **If WB-022 ratifies the v0.1.5 implicit decisions:** proceed directly to the downstream sweep (step 2 below). Update the file changelog to record ratification.

2. **If WB-022 overrules any implicit decision:** revise §3.2 and §3.3 to conform to WB-022's decisions *before* the downstream sweep. Bump the paper to v0.1.6.

3. **Downstream sweep — all remaining "liberty" references in the paper:**
   - Abstract: axis enumeration `cultural, economic, military, sovereignty, liberty, and class` → updated enumeration.
   - §1.4 (Paper's Contribution): same enumeration update.
   - §2.1 (Kriesi extension): `military, sovereignty, liberty, and class` reference updated; the trailing sentence about "the libertarian right and the social-democratic left differ on the definition of coercive power rather than on the value of liberty itself" — this sentence currently encodes the deprecated liberty-axis analytical framing and needs rewriting to reflect the class-axis framing now used in §3.2.
   - §4 (The Convergence Thesis): described as two-axis (economic + military). Update to three-axis (economic + military + libertarian/authoritarian) to match §3.3 closing observation. The formal propositional structure may need extending to include the libertarian/authoritarian condition.
   - §5.3 (Restore Britain Anomaly): contains residual liberty-axis framing. Repoint to the class axis and the libertarian/authoritarian axis as appropriate.
   - Conclusion: axis enumeration update.
   - Keywords block: update if any keyword references liberty.
   - YAML frontmatter `nocite` and any other metadata: review.

4. **Bump to v0.1.6** (or v0.1.7 if step 2 required an intermediate revision). Update file changelog with a comprehensive entry.

5. **Recompile PDF** via the existing SocArXiv build script.

6. **Update Production Document Register and Version History Index** with the new version. v0.1.4 retention status reviewed — once the paper is internally consistent again, the retention rationale changes (or v0.1.4 is moved fully to Superseded).

**Definition of done:** Paper is internally consistent across abstract, §1.4, §2.1, §3.2, §3.3, §4, §5.3, conclusion, and keywords. No remaining liberty-axis references except in changelog and historical sections. PDF recompiled. Register and Version History Index reflect the new version.

**Completion note (2026-05-17):** Paper bumped to v0.1.6. All six target sections updated. §4.1 received an additional scope-condition paragraph making the libertarian/authoritarian axis explicit as a condition for membership in the convergence zone (the §3.3 closing observation already made this explicit; §4.1 now matches). §5.3 reframed "economic libertarian or internationalist" as "economic internationalist policy and a class-harmony orientation toward concentrated private capital" — consistent with the class-axis absorption decision from WB-022. YAML keywords required no change. v0.1.4 retention status revised to SUPERSEDED. **PDF recompile pending** — must be run via the existing SocArXiv build script before OSF/SocArXiv submission. Definition of done met except for the PDF compilation step, which is a Claude Code task.

**Final completion note (2026-05-18):** Paper bumped to v0.1.8. `references.bib` updated with Adorno (1950) and Altemeyer (1996) entries. Build script retargeted. PDF compiled: 144K, text-searchable, fonts embedded. WB-026 fully COMPLETE.

---

### WB-029 — Rojava / Democratic Confederalism — Full Episode Treatment

**Status:** QUEUED — research note filed; no blockers; scheduling decision needed
**Priority:** MEDIUM — series development; not blocking any current production

**Context:** Rojava (the Autonomous Administration of North and East Syria) is the most substantial contemporary experiment in libertarian-socialist governance at scale, grounding democratic confederalism (Öcalan/Bookchin) in operational political form. The research note `rojava-democratic-confederalism-research-note-v0.0.1.md` filed 2026-05-18 contains the six-axis mapping, intellectual lineage, bibliography, and open questions. The show treatment serves two functions: (1) framework validation — Rojava as the lived test of the governance/class quadrant model; (2) substantive case study — democratic confederalism as a serious political formation deserving rigorous analysis on its own terms.

**Pre-requisites before drafting:**

1. **Feminist governance dimension (open question from research note §IV).** Resolve whether the Jineolojî / co-leadership dimension is: (a) governance axis material — patriarchy as an authority structure lacking consent-based legitimation; (b) class axis material — gender hierarchy as structural labour exploitation; (c) pointing toward a framework extension. Working hypothesis in the research note is (a); this requires explicit editorial sign-off before the episode can be fully drafted.

2. **Sovereignty axis anomaly.** The research note flags that Rojava's confederal anti-statism is a third position on the sovereignty axis (not unilateralism vs. pooled governance, but rejection of the state-form itself). Resolve whether this requires a framework note or a framework extension before the episode treatment commits to a sovereignty axis position for Rojava.

3. **Series placement.** Rojava is analytically appropriate in the later "what would it look like" part of the series rather than the early analytical framework episodes. Placement decision needed before drafting begins.

**Instructions:**

1. Resolve the three pre-requisites above in an editorial session.
2. Draft a full episode script using the research note as the source base. Register in the Episode Plan.
3. Source verification: the bibliography in the research note (Öcalan 2011, 2013; Bookchin 1992; Knapp et al. 2016; Tax 2016; White 2015) requires library/archive access verification before use in the show. Flag any sources not independently verifiable.
4. Bias audit: the four flags in research note §VI must all be addressed explicitly in the script before lock.
5. Update the Academic Paper if the Rojava material strengthens or qualifies the convergence thesis (likely: Rojava tests the scope conditions of the thesis in ways the UK-domestic frame does not).

**Definition of done:** Full episode script drafted, sourced, and bias-audited. Feminist governance dimension resolved. Sovereignty axis anomaly resolved or formally noted. Series placement confirmed. Research note updated to reflect any decisions taken.

---

### WB-028 — Governance axis rename sweep (OQ4)

**Status:** COMPLETE — Academic Paper v0.1.8 filed with PDF compiled; `references.bib` updated
**Priority:** MEDIUM — terminology consistency; documents are coherent under "governance axis" name

**Context:** OQ4 settled 2026-05-18. The fifth axis is now the *governance axis* (label), with *political authority* / *political-authority axis* as the explanatory register and *pol-auth* as the internal shorthand. This decision requires a rename sweep across all documents updated in the WB-023 restructure.

**Vocabulary conventions:**
- **Governance axis** — formal label; all axis enumerations, axis definitions, framework descriptions
- **Political authority / political-authority axis** — explanatory register; axis definitions, analytical passages, anywhere the stakes of the axis need stating
- **Pol-auth** — internal shorthand; production notes, repeated in-script references, housekeeping documents

**Documents to update:**

| Document | From version | To version | Estimated occurrences | Notes |
|---|---|---|---|---|
| Defining Principles | v0.2.0 | v0.2.1 | ~8 | Axis definition paragraph, convergence zone passage, §IV(d) |
| Episode 00 S03 | v0.0.2 | v0.0.3 | ~12 | Fifth-axis section, convergence zone, production notes, bias audit |
| Academic Paper | v0.1.6 | v0.1.7 | ~15 + §2.1 insertion | Abstract, §1.4, §2.1 (rename + lineage paragraph insertion), §3.2, §3.3, §4.1, conclusion; also triggers pending PDF recompile |
| Episode 02 | v0.2.5 | v0.2.6 | ~3 | Example 5 replacement passage |
| Reference Framework | v0.0.5 | v0.0.6 | 2 new entries | Adorno et al. (1950) and Altemeyer (1996) added under governance axis heading. Deferred step-4 sources (Schmitt, Paxton, Leninism primary docs, Polanyi) remain conditional on WB-027 OQ3 placement decision |
| WB-022 session note | 2026-05-17 | — | ~5 | Update decision record to reflect settled terminology |
| Agent Work Blocks | v0.2.14 | v0.2.15 | ~20 | WB-022 through WB-028 entries; changelog entries |
| Production Document Register | v0.3.27 | v0.3.28 | ~10 | ACAD rows, governance section rows, changelog entries |
| Version History Index | current | current | ~5 | Entry notes |

**Do not update:** Defining Principles Supplement v0.0.2. This is a fixed historical record of the proposal; it uses "libertarian/authoritarian" throughout as the candidate name being proposed. Session notes record the decisions; the supplement records the proposal. Leave unchanged.

**Instructions:**

1. For each document in the table above: replace all live instances of "libertarian/authoritarian axis" with "governance axis"; replace "libertarian/authoritarian" used as an axis descriptor (rather than as a descriptor of the two poles) with "governance" or "political-authority" per context; retain "libertarian" and "authoritarian" where they describe the poles of the axis (e.g. "the libertarian end of the governance axis," "an authoritarian political formation").

2. Introduce the layered vocabulary on first use in each document: define "governance axis" with a parenthetical "(also: political-authority axis; pol-auth)" on first occurrence in documents where all three registers will appear.

3. **Academic Paper §2.1 — governance axis lineage paragraph.** Insert the drafted paragraph (filed as `wb028-s21-lineage-paragraph-draft.md`) into §2.1 immediately after the final sentence of the Kriesi extension paragraphs (ending "...a disagreement the framework now locates on the class axis rather than on a separate axis of liberty"). The paragraph credits Adorno et al. (1950) and Altemeyer (1996) as psychometric grounding, positions the governance axis as the same underlying dimension carried by popular multi-axis models under liberty/freedom vocabulary, and explains the relabelling as a conflation-resolution rather than a novel claim. Use the version without the Nolan citation (recommended). The paragraph uses "governance axis" throughout — insert only as part of this rename sweep so the paper is internally consistent from first occurrence.

4. **Reference Framework — add two new source entries.** Add Adorno et al. (1950) and Altemeyer (1996) to the Reference Framework §IV under the governance axis heading. Full citations:
   - Adorno, T.W., Frenkel-Brunswik, E., Levinson, D.J. and Sanford, R.N. (1950). *The Authoritarian Personality.* New York: Harper & Row.
   - Altemeyer, B. (1996). *The Authoritarian Specter.* Cambridge, MA: Harvard University Press.
   Note: the Reference Framework update was already required under WB-023 step 4 (deferred to WB-027). The Adorno/Altemeyer entries are additional. File both the deferred step-4 sources and the new Adorno/Altemeyer entries together, but only the Adorno/Altemeyer entries are required to unblock the §2.1 lineage paragraph. The deferred step-4 sources (Schmitt, Paxton, Leninism primary documents, Polanyi, Cold War rhetoric scholarship) remain conditional on the OQ3 placement decision tracked under WB-027.

5. **Academic Paper YAML frontmatter** — add Adorno (1950) and Altemeyer (1996) to the `nocite` block if it exists; otherwise ensure they appear in the bibliography as cited works.

6. **Academic Paper §3.2 and §8 — governance axis scope note.** Insert the drafted scope note (filed as `wb028-governance-axis-scope-note-draft.md`) at two locations:
   - §3.2: the scope note paragraph after the governance axis definition paragraph, acknowledging that the axis presupposes actors operating within or in relation to the state form, naming anarchist/confederalist traditions and Rojava as a position analytically prior to the axis's framing assumptions, and scoping the limitation explicitly.
   - §8 Conclusion: Option B from the draft — a new paragraph added after the existing "Three empirical limits" paragraph (update "Three limits" to "Three empirical limits" in the existing paragraph). The conclusion paragraph is shorter than the §3.2 version and closes with "proposed as a direction for further framework development."
   Both insertions use "governance axis" throughout — insert only as part of this rename sweep.

7. Bump each document version per the table above. Academic Paper goes from v0.1.6 → v0.1.7.

8. Commit as a single change-set. Commit message: `refactor: rename libertarian/authoritarian axis to governance axis; add §2.1 lineage and §3.2/§8 scope note (OQ4)`.

9. After committing: run the PDF recompile from the v0.1.7 source (pending from WB-026). Update the build script to target v0.1.7.

**Definition of done:** No live "libertarian/authoritarian axis" references remain in any production document except in changelog entries and the Defining Principles Supplement historical record. All three vocabulary registers established in the documents where they will be used. §2.1 lineage paragraph inserted. §3.2 governance axis scope note inserted. §8 conclusion fourth-limit paragraph inserted (three empirical limits → three empirical limits + one theoretical limit). Adorno (1950) and Altemeyer (1996) added to the Reference Framework and `references.bib`. PDF recompiled from v0.1.8 source (144K, 23 pages).

**Partial-completion note (2026-05-18, morning session):** Academic Paper v0.1.7 filed. All three coordinated changes applied to the paper: rename sweep, §2.1 lineage paragraph, §3.2 scope note, §8 fourth-limit paragraph. nocite block updated with @adorno1950 and @altemeyer1996. The paper became the canonical reference for the new vocabulary.

**Full-completion note (2026-05-18, afternoon session):** Remaining five WB-028 documents updated as a sub-change-set:

**Final completion note (2026-05-18, evening session):** `references.bib` updated with `@adorno1950` and `@altemeyer1996` entries (48 total). Build script retargeted to v0.1.8. Academic Paper bumped to v0.1.8. PDF compiled: 144K, text-searchable, fonts embedded. WB-028 fully COMPLETE.

- **Defining Principles v0.2.0 → v0.2.1** (`MINOR`). §IV convergence zone paragraph, fifth-axis paragraph (with layered vocabulary on first use), class axis paragraph. §IV(d) "Liberal (1)" definition pole reference updated.
- **Episode 00 S03 v0.0.2 → v0.0.3**. Script's first axis-naming updated with layered vocabulary parenthetical; bias-disclosure passage updated; convergence zone passage updated; production note header updated with caveat that "libertarian" still carries party-political baggage as a pole descriptor; bias audit checklist updated.
- **Episode 02 v0.2.5 → v0.2.6**. Single rename in Example 5 closing line.
- **Reference Framework v0.0.5 → v0.0.6**. New governance-axis row added with Adorno (1950) and Altemeyer (1996). Former liberty-axis row repurposed to reflect the class-axis absorption (sources retained as historical-tradition references). Title corrected.
- **WB-022 session note**. Forward-pointer added at top referencing OQ4 supersession. Historical decision record preserved below unchanged.

All live "libertarian/authoritarian axis" references in the production canon now removed. Canon terminologically consistent under "governance axis."

**Outstanding for full submission-readiness:**
- references.bib: add full BibTeX entries for `@adorno1950` and `@altemeyer1996` (Claude Code task — .bib file outside claude.ai session scope)
- PDF recompile from Academic Paper v0.1.7 source via SocArXiv build script (build script needs retarget from v0.1.4 → v0.1.7)

---

### WB-031 — Axis distribution pattern realignment (common-enemy)

**Status:** COMPLETE — 2026-05-20
**Priority:** HIGH — restores the OQ2-ratified axis layout lost in compass tooling and partially undocumented in radar outputs

**Completion notes (Claude Code, 2026-05-20):**

**Phase A:** Methodology v0.0.3 (§II(a)); rebuild guide v1.0.1; paper-radar §1a; data files verified.

**Phase B:** `fetch-paper-radar-figures.sh` against local compass API (v2.6.0); **academic-paper-v0.2.3** + **academic-paper-v0.2.3.pdf** built.

**Deletion clearance issued:** `academic-paper-v0.2.2.md` / `.pdf` — superseded by v0.2.3 at commit `684d66a`. `production-document-register-v0.3.51.md`, `agent-work-blocks-v0.2.34.md` — lean-tree removed (HKW). Figure PNGs re-fetched; binaries unchanged (API route already used OQ2 order).

**Phase A detail (2026-05-20):**

1. Methodology **v0.0.3** filed — §II(a) Radar spoke distribution; §II pole table axis 5 → Governance.
2. `six-axis-compass-rebuild-guide-v1.0.1.md` — OQ2 `AXES` and Governance label throughout examples.
3. `paper-radar-figures-v0.2.0-design.md` §1a — canonical order, upstream drift, WB-032 regeneration gate.
4. **Verified (no reorder):** `compass-data-v0.1.0.json` `meta.axes`; `compass-dual-register-data-v0.2.0.json` `config.axes`; Academic Paper Table 1 in `academic-paper-v0.2.2.md` — all `cultural, economic, military, sovereignty, governance, class`.

**Deletion clearance issued:** `axis-scale-specification-and-radar-methodology-v0.0.2.md` — superseded by v0.0.3; lean-tree removed. `six-axis-compass-rebuild-guide-v1.0.0.md` — superseded by v1.0.1; lean-tree removed. `production-document-register-v0.3.50.md` and `agent-work-blocks-v0.2.33.md` — lean-tree removed (HKW).

**Context:** The project ratified a **canonical axis distribution pattern** at WB-022 / OQ2 (2026-05-17). That pattern governs (a) pedagogical and tabular enumeration order, (b) logical grouping of axes, and (c) clockwise spoke order on radar charts. It is recorded in `docs/session-notes/wb022-editorial-decisions-session-note.md` and enacted in production prose (Defining Principles §IV, Academic Paper Table 1, `compass-data-v0.1.0.json` meta.axes). It was **not** carried through to the live Six-Axis Compass renderer, which currently uses a different `AXES` array (`Cultural, Military, Sovereignty, Economic, Class, Governance` — see upstream `src/data.js`). The legacy rebuild guide (`six-axis-compass-rebuild-guide-v1.0.0.md`) preserves a third, obsolete order (`Cultural, Sovereignty, Military, Economic, Class, Liberty`). Academic paper v0.2.x embedded PNGs were generated against the drifted compass layout, so figure geometry does not match Table 1 column order.

**Recovered canonical pattern (do not paraphrase in downstream docs — cite this block or the session note):**

| Slot | Axis | Group |
|---|---|---|
| 1 | Cultural | Settlement / post-Bretton Woods framing (four axes introduced first in Defining Principles §IV) |
| 2 | Economic | Settlement external/structural logic — **paired with Military** |
| 3 | Military | Settlement external/structural logic — **paired with Economic** |
| 4 | Sovereignty | Authority-structure — **paired with Governance** |
| 5 | Governance | Authority-structure (formerly libertarian/authoritarian; OQ4 rename) — **paired with Sovereignty** |
| 6 | Class | Distributional |

**Radar rendering rules (derived from the above, to be codified in methodology):**

- **Spoke order (clockwise, index 0 first):** `Cultural → Economic → Military → Sovereignty → Governance → Class` — identical to the list/table order above.
- **Default orientation:** `flat` (edge-up hexagon; chart.js start angle −60° at index 0, so **Cultural** occupies the top flat edge).
- **Scale pole convention:** per *Axis Scale Specification and Radar Methodology* §II — **0** = pole the show is structurally less critical of; **10** = pole the show is structurally critical of (Table 1 footnote in Academic Paper §3.3).

**Rationale (OQ2, WB-022):** Fifth slot retained for the governance axis (replacing deprecated liberty axis). Economic and military stay adjacent (settlement logic); sovereignty and governance stay adjacent (authority structure); class remains last (distributional). Alternatives (governance last; sovereignty/governance procedural pair only in prose) were rejected for pedagogical and downstream-disruption reasons.

**Instructions:**

1. **Codify the pattern in governance canon.** Bump *Axis Scale Specification and Radar Methodology* to **v0.0.3** (`PATCH`). Add a new subsection (proposed **§II(a) Radar spoke distribution**) stating the recovered list order, grouping table, clockwise spoke rule, default `flat` orientation, and cross-reference to WB-022 OQ2. Update the §II pole table label for axis 5 from "Libertarian/Authoritarian" to **Governance** (terminology only; pole semantics unchanged).

2. **Fix stale common-enemy tooling docs.**
   - `docs/operations/six-axis-compass-rebuild-guide-v1.0.1.md` — **DONE (Phase A):** OQ2 `AXES` and `Governance` throughout (v1.0.0 superseded).
   - `docs/academic/paper-radar-figures-v0.2.0-design.md` — add § **Radar spoke order** documenting the canonical layout, the current compass drift, and the requirement to regenerate PNGs only after WB-032 ships.

3. **Verify aligned data files** (should already match; confirm, do not reorder if correct):
   - `docs/academic/compass-data-v0.1.0.json` → `meta.axes`
   - `docs/academic/compass-dual-register-data-v0.2.0.json` → axis key order if present
   - Academic Paper **Table 1** column order in `academic-paper-v0.2.2.md`

4. **After WB-032 is released** (compass tag or commit hash recorded in this WB's completion notes):
   - Re-run `bash docs/academic/scripts/fetch-paper-radar-figures.sh` against the aligned compass API.
   - Bump academic paper to **v0.2.3** (`PATCH`) with changelog entry: figure regeneration under canonical spoke order; update figure captions if they reference layout.
   - Rebuild PDF via `build-socarxiv.sh`.

5. **Register and index.** Update Production Document Register, Version History Index, and `CURRENT_PDR.md`.

**Definition of done:** Methodology v0.0.3 filed with §II(a). Rebuild guide and paper-radar design note updated. Table 1 / compass-data confirmed on canonical order. After WB-032: PNGs regenerated, academic paper v0.2.3 PDF built. No production document instructs a non-OQ2 axis order for radar rendering.

**Notes for Claude Code:** Do not regenerate figures until WB-032 completion is recorded. If compass `invertedAxes` or API pole prose still disagrees with methodology §II after WB-032, log as a follow-on defect — do not silently invert scores in the fetch script.

---

### WB-032 — Six-Axis Compass axis distribution alignment (cross-repo)

**Status:** COMPLETE — 2026-05-20
**Upstream:** `earlution/6-axis-compass` **v2.6.0** — tag at `bf6d1e19583e4b58f4b728b4e99ad32b31ff06ed` (axis-order code `cb7a70b`; published to `origin/main` 2026-05-20)
**Priority:** HIGH — upstream renderer must match OQ2 before any published radar geometry is trusted

**Context:** The standalone [Six-Axis Compass](https://github.com/earlution/6-axis-compass) repository is the production renderer for quiz UI, static exports, REST `POST /api/chart`, and OSF CI artifacts. Its default `AXES` constant and API chart defaults **do not match** the OQ2-ratified order used in *A Common Enemy* (see WB-031 recovered pattern). Cross-repo CI (`trigger-compass-osf.yml`) and the academic paper figure fetch script both depend on compass defaults being correct without per-request axis reordering.

**Canonical target (from WB-031 / WB-022 OQ2):**

```javascript
export const AXES = ['Cultural', 'Economic', 'Military', 'Sovereignty', 'Governance', 'Class'];
```

**Known drift (upstream `main` as of 2026-05-20):**

```javascript
// WRONG — do not retain
export const AXES = ['Cultural', 'Military', 'Sovereignty', 'Economic', 'Class', 'Governance'];
```

**Instructions for the 6-axis-compass executing agent:**

1. **Default axis order.** Set `AXES` in `src/data.js` to the canonical array above. Propagate to every code path that renders or exports radars without an explicit override:
   - `src/chart.js` / `drawRadar` default `axes` parameter
   - `src/ui.js` results screen default order and drag-and-drop reset baseline
   - `api/` chart handler (REST and server-side PNG/SVG renderers)
   - `scripts/generate-artifacts.js` / paper-artifacts pipeline if present
   - Any hard-coded axis arrays in tests or snapshots

2. **API contract.** Update `API.md` and README § API:
   - Document canonical default spoke order (clockwise from Cultural at flat-top).
   - State that clients may pass an explicit `axes` array but that omission must use the canonical default.
   - Add a **version note** when the default order changes (semver **MINOR** bump minimum for the package/repo).

3. **Orientation default.** Confirm `orientation: 'flat'` remains the default for API and UI; document that index 0 (Cultural) maps to the top flat edge (−60° start in `axisPoint`).

4. **Pole semantics audit.** Reconcile `AXIS_META` low/high labels and any `invertedAxes` handling with common-enemy *Axis Scale Specification and Radar Methodology* §II pole table (0 = less-critical pole, 10 = more-critical pole). **Governance** and **Class** are the highest-risk mismatches — verify against Table 1 in `academic-paper-v0.2.2.md` before closing.

5. **Dual-register / structural scores.** Ensure `POST /api/chart` can plot `dualRegister.structural` when `register: "structural"` is passed (or document if still unsupported — WB-031 figure captions already treat Table 1 as authoritative for S-tier). Do not block this WB on structural-register API work unless Ruari directs otherwise.

6. **Regression tests.** Add or update tests asserting:
   - Default `AXES` equals canonical order.
   - A neutral hexagon (all 5s) with default settings has **Cultural** at the flat-top spoke label position.
   - Exported JSON/XML `axes` field uses canonical order.

7. **Release and handback.** Tag a release (or record commit SHA). Post completion note in common-enemy **WB-032** block with the tag/SHA. Unblock **WB-031** step 4 (figure regeneration).

**Definition of done (compass repo):** Default `AXES` and API chart defaults match OQ2 order. `API.md` documents canonical spoke distribution and orientation. Tests green. Release tag or commit SHA communicated to common-enemy AWB.

**Definition of done (common-enemy side):** WB-032 block updated with upstream tag/SHA. `trigger-compass-osf.yml` dispatch still succeeds. WB-031 unblocked.

**Completion notes (Claude Code, 2026-05-20):**

- `src/data.js` `AXES` → OQ2 order; `npm run build`; `dist/index.html` verified.
- `API.md` § Canonical spoke order; `POST /api/chart` gains optional `axes`, `register` (`structural` for dual-register actors).
- `api/lib/chart-renderer.js` loads `getEffectiveScores` for server-side renders.
- `tests/axes-order.test.js` added; `npm test` green.
- Tag **v2.6.0** at `bf6d1e1` on `origin/main` (axis-order commit `cb7a70b`; doc follow-up for `x=cemslg` in README/API.md). Pinned in `paper-radar-figures-v0.2.0-design.md` §1a.
- **WB-031 Phase B** unblocked (figure regen + academic v0.2.3).

**Deletion clearance issued (HKW v0.3.53):** `production-document-register-v0.3.52.md` — superseded by v0.3.53; lean-tree removed after commit verification.

**Notes for Claude Code (common-enemy):** This WB is executed **in the compass repository**, not in common-enemy. The AWB here is the sole canonical cross-repo dispatch — do not create a duplicate handoff file. After upstream merge, pin or document the compass version in `paper-radar-figures-v0.2.0-design.md` and regenerate paper figures under WB-031.

---

### WB-027 — Axis-conflation rhetoric placement and downstream documents

**Status:** BLOCKED — depends on OQ3 placement decision (Episode 00 / series structure review)
**Priority:** MEDIUM — completes the WB-023 restructure debt; not blocking any active production

**Context:** Steps 4 and 6 of WB-023 were deferred at WB-023 enactment (2026-05-17) because they both depend on the OQ3 placement decision for the axis-conflation rhetoric treatment. WB-022 settled OQ3 as "class-axis absorption now; dedicated axis-conflation rhetoric treatment deferred to a future pedagogical space"; the placement of that future treatment (sub-segment within Episode 00 vs. full episode later in series) was explicitly deferred to "the broader Episode 00 / series structure review."

**Pre-requisite:** Editorial decision on where the axis-conflation rhetoric treatment lives. Options:
- (a) Episode 00 sub-segment, filed under `docs/scripts/episode-00/` between S03 (Six-Axis Framework) and S05 (Three-Register System).
- (b) Full standalone episode later in the series.
- (c) Embedded inside an existing episode that already touches the *free*-prefixed vocabulary (Episode 02 candidates).

**Instructions:** Once the placement decision is taken:

1. **Reference Framework → v0.0.6.** Hayek/Berlin/Mill liberty axis entry repurposed per supplement §VII. New sources added for authoritarian end: Schmitt, Paxton, primary documents on Leninism and democratic centralism. New sources for axis-conflation rhetoric: Polanyi, Cold War rhetoric scholarship.

2. **Axis-conflation rhetoric treatment.** Draft the new pedagogical artefact at the placement chosen above. The *free*-prefixed family (*free trade*, *free markets*, *free world*, *free people*) as the worked example. The liberal/liberal conflation as the named case. The treatment should explicitly cross-reference the class-axis absorption decision in §3.2 of the Academic Paper (v0.1.6) and Defining Principles §IV (v0.2.0), and the §IV(d) treatment of "liberal" with explicit qualification.

3. **Cross-references.** Once the new artefact exists, update Episode 02 v0.2.5 (the *free trade* / *free world* passages currently stand as straightforward rhetorical analysis) to cross-reference the new treatment. Update Academic Paper §3.2 class axis paragraph similarly. Both updates are minor cross-reference additions, not structural revisions.

4. **Bias Audit Log.** Once steps 1–3 are complete, the standing framework-restructure transparency flag in *Bias Audit Log v0.0.6* can be reviewed for closure or downgrade.

**Definition of done:** Reference Framework updated; axis-conflation rhetoric treatment exists somewhere in the production canon; cross-references in place; bias-audit standing flag reviewed.

---

## Completed Work Blocks

---

### WB-005 — Word Analysis: "Free" document
**Status:** COMPLETE
**Output:** `Word_Analysis_Free_v0.0.1.md`

---

### WB-006 — Academic paper outline
**Status:** COMPLETE
**Output:** `Academic_Paper_Outline_v0.0.1.md`

---

### WB-008 — Episode 2 podcast accessibility pass
**Status:** COMPLETE
**Output:** `Episode_02_Nationalist_About_What_v0.2.2.md`
**Notes:** First submission was a mislabelled copy of v0.2.1. Genuine accessibility pass confirmed in second submission.

---

### WB-009 — Logic Framework formalisations (migration-cause, ledger, P6 standard, convergence retrofit)
**Status:** COMPLETE
**Output:** `Logic_Framework_v0.0.6.md` (via v0.0.3–v0.0.6)
**Notes:** P6 standard (formal definition of "primary structural cause") in v0.0.5 identified and resolved a hidden logical gap in the original convergence thesis. v0.0.6 retrofitted the convergence thesis to the P6 standard. Framework now internally consistent.

---

## Future Planning Items (not yet work blocks)

| Item | Context | Prerequisite |
|---|---|---|
| **Marketing Strategy** | Full strategy with timeline. Platform strategy, Episode 0 clip distribution, pre/post-launch cadence, academic paper as credibility asset, GitHub repo as transparency asset, three-audience model mapped onto platforms. Production notes for each episode should reflect the marketing strategy once it exists. | WB-006 complete ✓; WB-010 substantially complete |
| **WB-011: Original Series Music** | Compose original atmospheric background music via AbletonMCP in Cursor. Reference palette: Mogwai, Biosphere, Floating Points, Max Cooper, Rival Consoles, Rone, Throwing Snow, Boards of Canada. Three functional types: intro (propulsive), transition (ambient), outro (resolved). Season-level variation within consistent core identity. Music composed to annotated transcripts — composition follows WB-012 annotations. AbletonMCP (GitHub: ahujasid/ableton-mcp) enables direct DAW control. | Episodes 1–2 podcast tracks complete; WB-012 annotations applied; Marketing strategy complete |

---

## Maintenance Record — Doc Dump Processing (2026-05-17)

### What was processed

A new document dump arrived from claude.ai in `from-claude-desktop/` (~80 files). Claude Code audited every file against the repo and determined:

- **Already committed** (identical content, already in repo under kebab-case names): all governance docs (Defining Principles v0.1.0, Supplement v0.0.1/0.0.2, Methodology v0.0.2, Questionnaire v0.0.1), all episode scripts (Episodes 0–4), Agent Work Blocks v0.2.7, PDR v0.3.21, Session Notes v0.2.7, Bias Audit Log v0.0.6, Session Handoff Note 2026-05-16, Academic Paper v0.1.4, Reference Framework v0.0.5, Logic Framework v0.0.6.
- **Genuinely new** (not in repo): two SVG visualizations produced during the axis restructure session.
- **Legacy / superseded** (old versions with underscore naming): `Academic_Paper_Outline_v0_0_1.md`, `Agent_Work_Blocks_v0_1_5.md` through `v0_2_5.md`, `Production_Document_Register_v0_3_8.md` through `v0_3_16.md`, old episode versions, etc.

### New files filed

| File | Destination | Commit |
|---|---|---|
| `phase-two-internal-evidence-audit-v0.0.1.svg` | `docs/research/` | `9cc79d7` |
| `seven-axis-test-matrix-phase-one-v0.0.1.svg` | `docs/research/` | `9cc79d7` |

`docs/version-history-index.md` updated with a "Research Visualizations" section.

### Cross-repo CI documentation

Cross-repo CI details folded into **Notes for Claude Code** section above (not a separate file). The AWB is the sole canonical handoff point between agents. `for-claude-ai/AGENT-INSTRUCTIONS.md` was created and then removed — authority belongs here.

- The `repository_dispatch` trigger from `common-enemy` to `6-axis-compass`
- OSF upload pipeline (artifacts + paper PDF)
- Source of truth document locations
- Required secrets and communication protocol

### Deletion Clearances

The following legacy files in `from-claude-desktop/` are **safe to delete** — their current versions are committed to the repo and the content is identical:

- `Academic_Paper_v0_1_2.md` → `docs/academic/academic-paper-v0.1.4.md` is current
- `Academic_Paper_Outline_v0_0_1.md` → `docs/academic/academic-paper-outline-v0.0.2.md` is current
- `Agent_Work_Blocks_v0_1_5.md` through `v0_2_34.md` → `docs/operations/agent-work-blocks-v0.2.35.md` is current
- `Defining_Principles_v0_1_0.md` → `docs/governance/defining-principles-v0.1.0.md` is current
- `Defining_Principles_Supplement_Axis_Restructure_v0_0_1.md` / `v0_0_2.md` → `docs/governance/defining-principles-supplement-axis-restructure-v0.0.1.md` / `v0.0.2.md` are current
- `Axis_Scale_Specification_And_Radar_Methodology_v0_0_1.md` / `v0_0_2.md` → `docs/governance/axis-scale-specification-and-radar-methodology-v0.0.1.md` / `v0.0.2.md` are current
- `Axis_Coding_Questionnaire_v0_0_1.md` → `docs/governance/axis-coding-questionnaire-v0.0.1.md` is current
- `Episode_01_The_Wrong_Fight_v0_1_5.md` / `v0_1_6.md` / `v0_1_7.md` → `docs/scripts/episode-01/episode-01-the-wrong-fight-v0.1.8.md` is current
- `Episode_02_Nationalist_About_What_v0_2_1.md` / `v0_2_2.md` / `v0_2_3.md` → `docs/scripts/episode-02/episode-02-nationalist-about-what-v0.2.4.md` is current
- `Episode_03_What_Bretton_Woods_Actually_Was_v0_3_1.md` → `docs/scripts/episode-03/episode-03-what-bretton-woods-actually-was-v0.3.1.md` is current
- `Episode_04_Globalisation_Discontents_Left_v0_4_1.md` → `docs/scripts/episode-04/episode-04-globalisation-discontents-left-v0.4.1.md` is current
- `Session_Notes_v0_2_7.md` → `docs/session-notes/session-notes-v0.2.7.md` is current
- `Production_Document_Register_v0_3_8.md` through `v0_3_52.md` → `docs/planning/production-document-register-v0.3.53.md` is current
- `Reference_Framework_v0_0_4.md` / `v0_0_5.md` → `docs/research/reference-framework-v0.0.5.md` is current
- `Bias_Audit_Log_v0_0_6.md` → `docs/audit/bias-audit-log-v0.0.6.md` is current
- `Linguistic_Register_v0_0_1.md` → `docs/governance/linguistic-register-v0.0.1.md` is current
- `Logic_Framework_v0_0_6.md` → `docs/audit/logical-formalisation-framework-v0.0.6.md` is current
- `Marketing_Strategy_v0_0_3.md` → `docs/planning/marketing-strategy-v0.0.3.md` is current
- `Series_Episode_Plan_v0_0_8.md` / `v0_0_9.md` → `docs/planning/series-episode-plan-v0.0.9.md` is current
- `Brexit_Under_Six_Axis_Framework_v0_0_1.md` → `docs/research/brexit-under-six-axis-framework-v0.0.1.md` is current
- `AGENT-INSTRUCTIONS.md` → `for-claude-ai/AGENT-INSTRUCTIONS.md` is current (both repos)
- `HOUSEKEEPING_SUMMARY.md` → `docs/operations/housekeeping-summary-wb016.md` is current
- `SESSION_HANDOFF_NOTE_2026_05_16.md` → `docs/session-notes/session-handoff-note-2026-05-16.md` is current

**Files to RETAIN in `from-claude-desktop/` (not yet in repo or non-.md):**
- `Six_Axis_Compass_v0_0_5.html` — HTML artifact, kept for reference (superseded by standalone repo)
- `six_axis_compass.html` — same
- `Episode_01_Source_Map.md`, `Episode_02_Source_Map.md` — production notes, evaluate separately
- `Episode_Template.md` — evaluate if current template is adequate
- `Pre_Recording_Checklist.md` — evaluate against current checklist
- `Migration_Map.md`, `Milestones.md`, `Source_Log.md`, `Release_Policy.md` — evaluate if repo versions exist
- `YouTube_Channel_And_Monetization_Guide.md` — evaluate if still current
- `Word_Analysis_Free_v0_0_1.md` → `docs/analysis/word-analysis-free-v0.0.1.md` is current
- `Taxonomy_And_Terms_v0_0_0.md` → `docs/governance/taxonomy-and-terms-v0.0.0.md` is current
- `Axis_Ratification_SNP_Plaid_v0_0_2.md` → `docs/research/axis-ratification-snp-plaid-v0.0.2.md` is current
- `Academic_Paper_v0_0_7.md` — retained as parallel current version (full expansion)
- `Academic_Paper_Outline_v0_0_2.md` → `docs/academic/academic-paper-outline-v0.0.2.md` is current

---

## Notes for Claude Code

**Repo structure:** All production documents under `docs/` with kebab-case filenames (e.g. `docs/governance/defining-principles-v0.1.0.md`). `common-enemy/` is retired. `from-claude-desktop/` is a gitignored staging directory — not source of truth. Superseded versions are in repo history only. Commit messages: `feat` (new), `fix` (correction), `sync` (version sync), `refactor` (restructure).

**Source of truth:** `docs/planning/production-document-register-v0.3.53.md` (see also `docs/planning/CURRENT_PDR.md`). Update it whenever a document version changes. Increment the register's patch version for each update.

**Housekeeping / HKW:** After each Claude Desktop batch, run the **HKW** checklist (this document, § **Post-batch housekeeping — HKW**), which implements the PDR **Housekeeping and batch-ingestion protocol**. See ADR-006 (`docs/governance/housekeeping-protocol-and-hkw-v0.0.1.md`).

**Deletion authority:** Claude Code is the sole agent authorised to delete files. See the Deletion Authority Protocol section above. At every WB completion, Claude Code must: (1) confirm the new file is committed, (2) name the superseded version(s), (3) issue explicit deletion clearance in the WB completion notes. The claude.ai agent must not delete any artifact until clearance is received. The `docs/version-history-index.md` must be updated with each new version entry at the same time.

**Version bump verification:** Claude Code must verify that prior versions exist on disk before accepting a new version into the repo. If a v0.0.2 document arrives without its v0.0.1 predecessor also present, this indicates that the claude.ai agent has violated the Version Bump Protocol — the v0.0.1 file has been overwritten or deleted. Claude Code's response is to (1) reject the commit pending recovery, (2) require the claude.ai agent to reconstruct the missing prior version from the new version's changelog, and (3) record the discrepancy in `docs/version-history-index.md` with a flag indicating that the prior version is a reconstruction rather than an original.

**On analytical judgement:** Work blocks requiring analysis (WB-004, WB-016) should err toward fidelity to existing documents. Consult `Session_Notes_v0.2.7.md` before introducing new framing. Never introduce new political arguments not already in the project documents.

**On bias:** The host is a democratic socialist. `Defining_Principles_v0.1.0.md` contains the standing bias protocol — including taxonomy flags and the anti-discrimination cultural axis definition. Steelman opposing positions, use neutral vocabulary (not "neoliberal" as primary term), label interpretations and moral arguments as such, apply the three-register system.

**On validity vs soundness:** `Logic_Framework_v0.0.6.md` Section VIII is critical. Do not present logically valid arguments as proof. Always distinguish the logical structure from the empirical evidence.

**On the Parvini excision:** Sources identified in this project as containing documented racist or antisemitic statements are permanently excised. They do not appear in any document under any circumstances. The permanent excision flag in `Reference_Framework_v0.0.4.md` standing flags is the definitive record.

**On the academic paper:** Two active versions — `Academic_Paper_v0.0.7.md` (~14,100 words, full expansion, LaTeX-ready) and `Academic_Paper_v0.1.2.md` (~8,600 words, Cursor restructure, Section 1.5 hedging added, LaTeX-ready). `references.bib` is at 46 entries. WB-013 runs against v0.1.2. WB-004 is COMPLETE — `Linguistic_Register_v0.0.1.md` filed. Pandoc 3.9.0.2 and MacTeX confirmed installed.

**On cross-repo CI with the Six-Axis Compass:** The compass lives in `earlution/6-axis-compass` (standalone repo, deployed at `https://earlution.github.io/6-axis-compass/`). When paper-related files are pushed to `common-enemy/main`, `.github/workflows/trigger-compass-osf.yml` automatically dispatches a `paper-revised` event to the compass repo. The compass CI then regenerates artifacts and uploads both compass visualizations and the paper PDF to OSF. **Claude Code must not create duplicate handoff documents** — the AWB is the sole canonical handoff point. Any cross-repo instructions belong here in Notes for Claude Code, not in separate files.

---

*A Common Enemy | Agent Work Blocks | Version 0.2.29*
*Updated by claude.ai when new work blocks are identified. Updated by Claude Code when blocks are completed or status changes. This is the handoff point between the two agents.*

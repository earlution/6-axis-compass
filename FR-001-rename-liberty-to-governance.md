# FR-001: Rename Liberty Axis to Governance Axis

**Status:** Open  
**Date:** 2026-05-18  
**Depends on:** [common-enemy OQ4 session note](https://github.com/earlution/common-enemy/blob/main/docs/session-notes/oq4-governance-axis-session-note-2026-05-18.md)  
**Labels:** breaking-change, upstream-sync, axis-restructure

---

## Summary

The upstream `common-enemy` project has settled its axis naming question (OQ4, 2026-05-18). The fifth axis — currently labelled **Liberty** in this compass — is to be renamed **Governance** across all code, data, documentation, and generated artifacts. The axis *definition* also changes: the old "state coercion vs private coercion" framing is retired (that content was absorbed into the Class axis in WB-022) and replaced with the restructured definition: **autonomy/consent vs hierarchy/authority**.

This is a **breaking change** that invalidates existing saved-map URLs and stored JSON/XML exports. The FR includes a backward-compatibility strategy.

---

## Background

### Why the change happened upstream

The original Liberty axis asked: *which entities count as coercive?* (state only, or private power too?). This question was structurally redundant with the Class axis (whether concentrated private power counts as coercive is already answered by one's class-axis position). The upstream restructure (Defining Principles v0.2.0, enacted via WB-022/WB-023) replaced the Liberty axis with a new axis measuring *how much hierarchy vs autonomy* a political programme accepts.

The label question was then settled in OQ4 (2026-05-18):
- **Formal label:** governance axis
- **Explanatory register:** political authority / political-authority axis
- **Internal shorthand:** pol-auth

### Why this matters for the compass

The compass currently exposes the *old* Liberty definition to users. The questions on that axis still probe state-vs-private coercion (e.g. "In times of serious crisis, the government should have the authority to suspend normal legal protections..."). This is analytically stale — it tests a dimension that the upstream framework no longer treats as independent. The compass must stay aligned with the upstream framework or it becomes a misleading instrument.

---

## Scope of Change

### Affected files and systems

| Category | Files / Systems | Count |
|---|---|---|
| Core source | `src/data.js` (axis names, meta, questions, fallback actors) | 1 |
| Translations | `src/translations/en.json` (axis labels, intro text) | 1 |
| URL codec | `src/url.js` (axis names in shareable URL encoding) | 1 |
| UI renderer | `src/ui.js`, `src/chart.js` (axis label rendering) | 2 |
| Export/import | `src/export.js` (JSON/XML axis keys) | 1 |
| i18n system | `src/i18n.js` (axis name lookup) | 1 |
| Actor data | `data/actors/*.json` (38 files, axis keys in scores) | 38 |
| Data schema | `data/schema.json` (enum of valid axis names) | 1 |
| Build script | `scripts/sync-actor-data.js` (actor generation) | 1 |
| Paper artifacts | `paper-artifacts/actors/*.json`, `.svg`, `.tex` | ~114 files |
| Comparison artifacts | `paper-artifacts/comparisons/*.json` | 3 |
| Documentation | `README.md`, `docs/axes.md`, `CHANGELOG.md` | 3 |
| Rebuild guide | `six-axis-compass-rebuild-guide-v1.0.0.md` | 1 |
| Deployed artifact | `dist/index.html` (bundled, generated) | 1 |
| Tests | `tests/quiz.test.js` | 1 |

### Detailed changes per file

#### 1. `src/data.js`

- `AXES` array: replace `'Liberty'` with `'Governance'`
- `AXIS_META`: replace `Liberty` key with `Governance`; update low/high labels:
  - **Low (0):** "Maximal autonomy / consent-based / democratic" (was: "Authoritarian / hierarchical / illiberal")
  - **High (10):** "Maximal hierarchy / authority / coercive" (was: "Libertarian / consent-based / democratic")
  - *Note: verify directionality — in the old axis, high = libertarian. In the new governance axis, the convention needs to match the upstream framework. Verify with Defining Principles v0.2.1.*
- `QUESTIONS`: replace all 4 Liberty-axis questions with new governance-axis questions aligned to the autonomy-vs-hierarchy dimension. Draft questions available in WB-028 scope note.
- `ACTORS` fallback array: replace `Liberty` key with `Governance` in all 24 fallback actors.

#### 2. `src/translations/en.json`

- `intro.body`: update axis list from `...cultural, economic, military, sovereignty, liberty, and class` to `...cultural, economic, military, sovereignty, governance, and class`
- `axis.Liberty` → `axis.Governance`
- `axis.Liberty.low` → `axis.Governance.low` (new labels)
- `axis.Liberty.high` → `axis.Governance.high` (new labels)
- Verify no hardcoded "liberty" strings elsewhere in the file.

#### 3. `src/url.js`

The URL encoding scheme uses axis order indices. Since the axis name is not transmitted in the URL (only scores), the axis *rename* itself does not break URL encoding. **However:** if the axis *order* changes (e.g. `Governance` sorts differently from `Liberty` in the `AXES` array), URL decoding must be verified. The current `AXES` order is:

```js
['Cultural', 'Military', 'Sovereignty', 'Economic', 'Class', 'Liberty']
```

Replacing `Liberty` with `Governance` at the same array position does not change index mapping. **Keep the same index position** to preserve URL compatibility for the non-governance axes.

#### 4. `data/actors/*.json` (38 files)

Each actor JSON contains a `scores` object with axis keys. Replace `"Liberty"` with `"Governance"` in every file. No score value changes are required at this stage — the numerical scores carry over to the new axis definition.

**Batch command (for reference):**
```bash
find data/actors -name '*.json' -exec sed -i '' 's/"Liberty"/"Governance"/g' {} +
```

#### 5. `data/schema.json`

The schema does not currently enumerate valid axis names (it uses `additionalProperties`), so no schema change is strictly required. However, adding an explicit `enum` for axis names in the `scores` property would be a quality improvement. **Out of scope for this FR — propose as follow-up.**

#### 6. `scripts/sync-actor-data.js`

Verify that the script reads axis names dynamically from the JSON files rather than hardcoding them. If it does not, update accordingly.

#### 7. Paper artifacts (`paper-artifacts/`)

All generated files in `paper-artifacts/actors/` and `paper-artifacts/comparisons/` contain axis keys. These must be regenerated with `npm run generate-artifacts` after the source changes. **Do not attempt manual edits** — the generation script is the source of truth.

#### 8. Documentation

- `README.md`: Update the Six Axes table (Liberty → Governance; new low/high labels)
- `docs/axes.md`: Rewrite the Liberty axis section to the Governance axis definition
- `CHANGELOG.md`: Add entry under a new version heading
- `six-axis-compass-rebuild-guide-v1.0.0.md`: Update any axis-specific references

#### 9. `dist/index.html`

This is a generated file. It will be rebuilt by `npm run build`. No manual edits.

---

## Breaking Change Assessment

### What breaks

1. **Saved-map URLs:** Existing shareable URLs encode scores by axis index. Since the index mapping is preserved (Governance replaces Liberty at the same position), existing URLs will decode to the *correct numerical score* but will *display the wrong axis label* ("Governance" instead of "Liberty") for that score. The score itself is still valid because the numerical scale carries over. **Verdict:** URLs remain functionally valid; only the label changes. Acceptable.

2. **Exported JSON/XML files:** Files exported before this change contain `"Liberty"` as an axis key. When imported after this change, the import logic will not recognise the key and may fail or drop the score. **Verdict:** Requires backward-compatibility shim.

3. **Actor data JSON:** External forks that have added their own actors with `"Liberty"` keys will need to update. This is documented in the migration notes.

### Backward-compatibility strategy

**For JSON/XML imports (`src/export.js`):**

Add a migration shim in the import function:

```js
function migrateAxisNames(data) {
  if (data.scores && data.scores.Liberty !== undefined) {
    data.scores.Governance = data.scores.Liberty;
    delete data.scores.Liberty;
  }
  return data;
}
```

This silently upgrades old exports on import. Log a console message: `Migrated axis name: Liberty → Governance`.

**For actor data (`data/actors/*.json`):**

No runtime shim — the build-time sync script reads the JSON files. All upstream actor files will be updated in the same PR. Forks are expected to follow the migration guide.

**For URL-encoded maps:**

No shim needed. Axis indices are preserved. The label change is cosmetic and correct.

---

## Proposed Implementation Steps

1. **Update source definitions** (`src/data.js`, `src/translations/en.json`)
2. **Add import migration shim** (`src/export.js`)
3. **Update all actor JSON files** (`data/actors/*.json`) — batch replace
4. **Run build** (`npm run build`) to regenerate `src/actors-generated.js` and `dist/index.html`
5. **Run tests** (`npm test`) to verify quiz logic and scoring
6. **Regenerate paper artifacts** (`npm run generate-artifacts`)
7. **Update documentation** (`README.md`, `docs/axes.md`, `CHANGELOG.md`, rebuild guide)
8. **Commit** with message: `refactor: rename Liberty axis to Governance axis (OQ4 upstream sync)`

---

## Acceptance Criteria

- [ ] `src/data.js` contains no references to `Liberty` (case-insensitive search returns zero hits outside comments/history)
- [ ] `src/translations/en.json` contains no `axis.Liberty` keys
- [ ] All 38 `data/actors/*.json` files use `"Governance"` as the axis key
- [ ] `npm run build` succeeds and produces a valid `dist/index.html`
- [ ] `npm test` passes (all quiz and scoring tests)
- [ ] Importing an old JSON export (with `"Liberty"` key) succeeds and maps the score to `Governance`
- [ ] Paper artifacts regenerate without errors
- [ ] README and docs/axes.md describe the Governance axis with the new autonomy-vs-hierarchy definition
- [ ] CHANGELOG.md documents the breaking change and the migration path

---

## Related Upstream Documents

- [common-enemy/docs/session-notes/oq4-governance-axis-session-note-2026-05-18.md](https://github.com/earlution/common-enemy/blob/main/docs/session-notes/oq4-governance-axis-session-note-2026-05-18.md)
- [common-enemy/docs/governance/defining-principles-v0.2.1.md](https://github.com/earlution/common-enemy/blob/main/docs/governance/defining-principles-v0.2.1.md)
- [common-enemy/docs/operations/wb028-governance-axis-scope-note-draft.md](https://github.com/earlution/common-enemy/blob/main/docs/operations/wb028-governance-axis-scope-note-draft.md)

---

*Six-Axis Compass | Feature Request FR-001 | 2026-05-18*

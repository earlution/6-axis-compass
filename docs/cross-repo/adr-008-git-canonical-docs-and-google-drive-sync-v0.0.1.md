---
lifecycle: evergreen
ttl_days: null
created_at: 2026-05-22T00:00:00Z
expires_at: null
housekeeping_policy: keep
---

# ADR-008: Git-canonical docs and Google Drive sync

### Version 0.0.2

| Version | Change |
|---------|--------|
| 0.0.1 | Initial decision — symmetric protocol with 6-axis-compass; supersedes ADR-007 mount model. |
| 0.0.2 | 6-axis-compass mount renamed **`docs-gd-6-axis-compass/`** (per-project `docs-gd-<slug>/` convention). |

**Status:** Accepted  
**Date:** 2026-05-22 (mount naming v2: 2026-05-22)  
**Deciders:** Ruari Mears  
**Supersedes:** ADR-007 v0.0.2 (partial — mount and release model; staging manifest rules unchanged)  
**Related:** ADR-006 (HKW), [`data-hygiene-and-multi-agent-docs-v0.0.1.md`](../governance/data-hygiene-and-multi-agent-docs-v0.0.1.md), 6-axis-compass [`docs/README.md`](https://github.com/earlution/6-axis-compass/blob/main/docs/README.md), [`docs/staging/README.md`](../staging/README.md)

**Install (common-enemy):** copy this file to `docs/governance/git-canonical-docs-and-google-drive-sync-v0.0.1.md` and add stub `docs/governance/ADR-008-git-canonical-docs-and-google-drive-sync.md`. Bump PDR GOV table and AWB HKW release step.

---

## Context

ADR-007 v0.0.2 treated repo **`docs/`** as a symlink to Google Drive and **`docs.repo-sync/`** as the git release mirror. That inverted the mental model: the path operators care about (`docs/`) was not what git tracked, and release required a manual sync into a second tree. Edits on Drive were easy to lose at commit time.

The **6-axis-compass** repo adopted a symmetric protocol (2026-05-22):

- **`docs/`** — git-tracked, canonical single point of truth  
- **`docs-gd-<slug>/`** — gitignored symlink to Drive (infrastructure only; e.g. **`docs-gd-6-axis-compass/`**)  
- **`sync-docs-from-drive.sh`** / **`sync-docs-to-drive.sh`** — bidirectional rsync

Claude Desktop and Cursor agents must share the same documentation without shipping copies between repos or agents. **A Common Enemy** and **6-Axis Compass** each use their own Drive folder but **the same repo protocol**.

---

## Decision

### Terminology (binding — both projects)

| Term | Meaning |
|------|---------|
| **Canon** | Git-tracked **`docs/`** after intentional commit (and HKW on common-enemy). |
| **Drive mount** | Gitignored **`docs-gd-<slug>/`** → local Google Drive folder (operators do not edit directly). |
| **Sync from Drive** | `bash scripts/sync-docs-from-drive.sh` — Drive → `docs/` before commit when Claude Desktop edited Drive. |
| **Sync to Drive** | `bash scripts/sync-docs-to-drive.sh` — `docs/` → Drive after Cursor/repo edits. |
| **Promote (legacy)** | Per-file manifest workflow (`promote-from-staging.sh`); unchanged from ADR-007 where still used. |

**Rule:** **`docs/` in git is canonical.** Drive is a shared mirror for multi-agent editing, not a second source of truth.

### Per-repo layout

| Project | Git canonical | Drive mount (repo path) | Drive folder name |
|---------|---------------|-------------------------|-------------------|
| **6-axis-compass** | `docs/` (flat: `axes.md`, `examples/`, …) | **`docs-gd-6-axis-compass/`** | `6-Axis Compass` |
| **common-enemy** | `docs/` (flat: `governance/`, `planning/`, …) | **`docs-gd-a-common-enemy/`** (recommended) | `A Common Enemy` |

**Cross-repo (common-enemy only):** optional gitignored symlink **`docs-6-axis-compass/`** → Drive **6-Axis Compass** for inbound handoff packages. Not part of either project's canon sync excludes.

**Cross-repo (compass only):** **`docs-gd-6-axis-compass/handoff/for-common-enemy/`** on Drive — outbound packages; excluded from compass git sync (Drive-only).

### Sync exclusions (both projects)

When copying Drive ↔ git `docs/`, exclude from git canon:

- `_meta/` — manifests, inbox, locks, versions  
- `archive/` — legacy exports  
- `handoff/` — compass outbound only (on Drive under 6-Axis Compass)

Do **not** exclude production trees (`governance/`, `planning/`, `academic/`, …).

### Operator workflow

**Once per machine (each repo):**

```bash
bash scripts/link-docs-gd-6-axis-compass.sh   # 6-axis-compass
# common-enemy: link-docs-gd-a-common-enemy.sh (when added)
# common-enemy inbound handoff (optional):
bash scripts/link-docs-6-axis-compass.sh
```

**After editing on Drive / Claude Desktop:**

```bash
bash scripts/sync-docs-from-drive.sh
git add docs/
# common-enemy: run HKW, then commit
```

**After editing in repo / Cursor:**

```bash
bash scripts/sync-docs-to-drive.sh
git add docs/
git commit
bash scripts/sync-docs-to-drive.sh   # optional: ensure Drive matches tag
```

### What changes vs ADR-007 v0.0.2

| ADR-007 v0.0.2 | ADR-008 |
|----------------|---------|
| `docs/` = symlink to Drive | **`docs/` = git-tracked canon** |
| `docs.repo-sync/` = git mirror | **Retired** — commit `docs/` directly |
| `sync-docs-to-git.sh` = Drive → mirror | **`sync-docs-from-drive.sh`** = Drive → `docs/` |
| (no push script) | **`sync-docs-to-drive.sh`** = `docs/` → Drive |
| Mount at `docs/` | Mount at **`docs-gd-<slug>/`** |

ADR-007 staging manifest, `_meta/inbox/`, and `promote-from-staging.sh` remain valid for partial promotes; full releases use sync + git commit.

### Reference scripts (6-axis-compass)

Canonical implementation: [earlution/6-axis-compass `scripts/`](https://github.com/earlution/6-axis-compass/tree/main/scripts):

- `link-docs-gd-6-axis-compass.sh` — `GOOGLE_DRIVE_FOLDER="6-Axis Compass"`, `LINK=docs-gd-6-axis-compass`  
- `sync-docs-from-drive.sh`  
- `sync-docs-to-drive.sh`  
- `sync-docs-to-git.sh` — alias for `sync-docs-from-drive.sh`

**common-enemy** should copy these scripts and set:

```bash
GOOGLE_DRIVE_FOLDER="${GOOGLE_DRIVE_FOLDER:-A Common Enemy}"
LINK="$REPO_ROOT/docs-gd-a-common-enemy"
```

Remove or repoint legacy `link-google-drive-staging.sh` if it still mounts `docs/`.

---

## Consequences

- PDR GOV table: add ADR-008 row; mark ADR-007 **Superseded** (mount/release); bump PDR minor.  
- AWB HKW: replace “`sync-docs-to-git.sh` → `docs.repo-sync/`” with “`sync-docs-from-drive.sh` → commit `docs/`”.  
- [`data-hygiene-and-multi-agent-docs-v0.0.1.md`](../governance/data-hygiene-and-multi-agent-docs-v0.0.1.md): update **Release** bullet (§ Binding rules).  
- [`versioning-policy-v0.0.2.md`](../governance/versioning-policy-v0.0.2.md): replace “Production files live on Google Drive via repo mount **`docs/`**” with **`docs-gd-<slug>/`** mirror + git **`docs/`** canon.  
- Delete **`docs.repo-sync/`** from common-enemy repo after migration.  
- **Prohibited (unchanged):** editing **`docs-gd-*`** mounts as primary; nested `docs/docs/`; parallel unregistered copies.

---

## References

- [6-axis-compass `docs/README.md`](https://github.com/earlution/6-axis-compass/blob/main/docs/README.md)  
- [`docs/governance/housekeeping-protocol-and-hkw-v0.0.1.md`](../governance/housekeeping-protocol-and-hkw-v0.0.1.md)  
- [`docs/governance/google-drive-staging-and-promotion-v0.0.2.md`](../governance/google-drive-staging-and-promotion-v0.0.2.md) (superseded in part)  
- [`docs/staging/manifest/documents.schema.json`](../staging/manifest/documents.schema.json)

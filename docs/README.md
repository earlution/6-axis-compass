# Six-Axis Compass — documentation

**`docs/` in this repo is the canonical source of truth** (git-tracked).

Google Drive folder **`6-Axis Compass`** is mounted at **`docs-gd-6-axis-compass/`** (gitignored). You usually ignore that path — it exists so Cursor and Claude Desktop stay aligned without manually copying files.

## Sync

| Direction | When | Command |
|-----------|------|---------|
| Drive → git | Edited on Drive / Claude Desktop | `bash scripts/sync-docs-from-drive.sh` |
| git → Drive | Edited in repo / Cursor | `bash scripts/sync-docs-to-drive.sh` |

Then commit `docs/` as usual.

```bash
bash scripts/link-docs-gd-6-axis-compass.sh   # once per machine
```

## On Drive only (not in git)

These live under `docs-gd-6-axis-compass/` but are excluded from git sync:

- `handoff/for-common-enemy/` — outbound coordination for [common-enemy](https://github.com/earlution/common-enemy)
- `_meta/` — manifests, inbox
- `archive/` — legacy exports

## Cross-repo

common-enemy working tree: Drive **`A Common Enemy`** (separate folder). Shared protocol: **ADR-008** — [`docs/cross-repo/adr-008-git-canonical-docs-and-google-drive-sync-v0.0.1.md`](cross-repo/adr-008-git-canonical-docs-and-google-drive-sync-v0.0.1.md).

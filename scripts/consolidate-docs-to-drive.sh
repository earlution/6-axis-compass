#!/usr/bin/env bash
# One-time / maintenance merge into google-drive/ working tree.
# Sources: archive/docs.repo-backup-*, repo for-common-enemy/ (if present).
# Does NOT read repo docs/ (deprecated).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GD="$REPO_ROOT/google-drive"

if [[ ! -d "$GD" ]]; then
  echo "ERROR: Run scripts/link-google-drive-staging.sh first." >&2
  exit 1
fi

echo "Consolidating into $GD …"

mkdir -p "$GD/docs" "$GD/_meta/manifest" "$GD/_meta/inbox/from-desktop" "$GD/_meta/inbox/from-code"
mkdir -p "$GD/_meta/versions" "$GD/_meta/locks" "$GD/archive" "$GD/handoff/for-common-enemy"

for backup in "$GD/archive"/docs.repo-backup-* "$REPO_ROOT"/docs.repo-backup-*; do
  [[ -d "$backup" ]] || continue
  echo "  merge archive: $(basename "$backup") → docs/"
  rsync -a "$backup/" "$GD/docs/"
  if [[ "$backup" == "$REPO_ROOT"/docs.repo-backup-* ]]; then
    dest="$GD/archive/$(basename "$backup")"
    mkdir -p "$GD/archive"
    mv "$backup" "$dest"
    echo "  archived $(basename "$backup") → google-drive/archive/"
  fi
done

if [[ -d "$REPO_ROOT/for-common-enemy" ]]; then
  echo "  merge for-common-enemy/ → handoff/for-common-enemy/"
  rsync -a "$REPO_ROOT/for-common-enemy/" "$GD/handoff/for-common-enemy/"
fi

cat > "$GD/README.md" <<'EOF'
# Six-Axis Compass — Google Drive workspace

**Git is canonical for releases.** This folder is the **working tree**.

| Path | Role |
|------|------|
| `docs/` | Project documentation (axes, API notes, feature requests, examples) |
| `handoff/for-common-enemy/` | Outbound coordination package for [common-enemy](https://github.com/earlution/common-enemy) |
| `_meta/manifest/` | `documents.json` for promote/sync |
| `_meta/inbox/` | Optional quarantine drops |
| `_meta/versions/` | Copy-then-edit snapshots |
| `archive/` | Legacy exports (`docs.repo-backup-*`, etc.) |

## Release to git

```bash
bash scripts/sync-docs-to-git.sh   # google-drive/docs → docs.repo-sync/
# commit docs.repo-sync/ as usual
```

Repo `docs/` is **deprecated** (stub only). Do not edit there.

## Cross-repo

common-enemy working tree: Drive **`A Common Enemy/docs/`** (separate folder).
EOF

if [[ -f "$GD/docs/staging/manifest/documents.example.json" ]]; then
  cp "$GD/docs/staging/manifest/documents.example.json" "$GD/_meta/manifest/documents.json"
fi

echo "Done. Edit google-drive/docs/; release via scripts/sync-docs-to-git.sh"

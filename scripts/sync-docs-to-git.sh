#!/usr/bin/env bash
# Copy google-drive/docs/ → docs.repo-sync/ for git commit.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/google-drive/docs"
DEST="$REPO_ROOT/docs.repo-sync"

[[ -d "$SRC" ]] || {
  echo "ERROR: $SRC missing — run scripts/link-google-drive-staging.sh" >&2
  exit 1
}

mkdir -p "$DEST"
rsync -a --delete --exclude '.DS_Store' "$SRC/" "$DEST/"
echo "Synced google-drive/docs → docs.repo-sync/"
echo "Commit docs.repo-sync/ for releases (repo docs/ is deprecated)."

#!/usr/bin/env bash
# Pull docs-google-drive/ (Drive) → docs/ (git canonical).
# Run before git commit when Claude Desktop or Drive was the editor.
#
# Usage:
#   bash scripts/sync-docs-from-drive.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/docs-google-drive"
DEST="$REPO_ROOT/docs"

if [[ ! -d "$SRC" ]]; then
  echo "ERROR: $SRC not found — run scripts/link-docs-google-drive.sh" >&2
  exit 1
fi

mkdir -p "$DEST"
rsync -a --delete \
  --exclude '.DS_Store' \
  --exclude '_meta/' \
  --exclude 'archive/' \
  --exclude 'handoff/' \
  "$SRC/" "$DEST/"

echo "Synced docs-google-drive/ → docs/ (git canonical)"
echo "Next: git add docs/ && git commit"

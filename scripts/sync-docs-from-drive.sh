#!/usr/bin/env bash
# Pull docs-gd-6-axis-compass/ (Drive) → docs/ (git canonical).
# Run before git commit when Claude Desktop or Drive was the editor.
#
# Usage:
#   bash scripts/sync-docs-from-drive.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/docs-gd-6-axis-compass"
DEST="$REPO_ROOT/docs"

if [[ ! -d "$SRC" ]]; then
  echo "ERROR: $SRC not found — run scripts/link-docs-gd-6-axis-compass.sh" >&2
  exit 1
fi

mkdir -p "$DEST"
rsync -a --delete \
  --exclude '.DS_Store' \
  --exclude '_meta/' \
  --exclude 'archive/' \
  --exclude 'handoff/' \
  "$SRC/" "$DEST/"

echo "Synced docs-gd-6-axis-compass/ → docs/ (git canonical)"
echo "Next: git add docs/ && git commit"

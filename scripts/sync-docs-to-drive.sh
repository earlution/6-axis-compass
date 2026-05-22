#!/usr/bin/env bash
# Push docs/ (git canonical) → docs-google-drive/ (Drive).
# Run after editing docs/ in-repo so Claude Desktop / Drive stay in sync.
#
# Usage:
#   bash scripts/sync-docs-to-drive.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/docs"
DEST="$REPO_ROOT/docs-google-drive"

if [[ ! -d "$DEST" ]]; then
  echo "ERROR: $DEST not found — run scripts/link-docs-google-drive.sh" >&2
  exit 1
fi

rsync -a \
  --exclude '.DS_Store' \
  "$SRC/" "$DEST/"

echo "Synced docs/ → docs-google-drive/ (Drive)"

#!/usr/bin/env bash
# Lift production tree from <mount>/docs/ to <mount>/ (flat layout).
#
# Usage:
#   bash scripts/flatten-drive-layout.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MOUNT_NAME="${MOUNT:-docs-google-drive}"
ROOT="$REPO_ROOT/$MOUNT_NAME"

INNER="$ROOT/docs"

if [[ ! -d "$ROOT" ]]; then
  echo "ERROR: Mount not found: $ROOT" >&2
  exit 1
fi

if [[ ! -d "$INNER" ]]; then
  echo "Already flat (no $INNER). Skipping."
  exit 0
fi

echo "Flattening $INNER → $ROOT …"
rsync -a --exclude '.DS_Store' "$INNER/" "$ROOT/"
find "$INNER" -depth -delete 2>/dev/null || rm -rf "$INNER"
echo "Done."

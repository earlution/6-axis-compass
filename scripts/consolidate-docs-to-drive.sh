#!/usr/bin/env bash
# Merge repo backup into docs-gd-6-axis-compass/ (flat layout).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GD="$REPO_ROOT/docs-gd-6-axis-compass"

if [[ ! -d "$GD" ]]; then
  echo "ERROR: Run scripts/link-docs-gd-6-axis-compass.sh first." >&2
  exit 1
fi

SRC=""
for candidate in "$REPO_ROOT/docs.repo-backup-"*; do
  if [[ -d "$candidate" ]]; then
    SRC="$candidate"
    break
  fi
done

if [[ -n "$SRC" ]]; then
  echo "Consolidating $SRC → $GD …"
  rsync -a --delete --exclude '.DS_Store' "$SRC/" "$GD/"
fi

bash "$(dirname "$0")/flatten-drive-layout.sh" 2>/dev/null || true

mkdir -p "$GD/_meta/manifest" "$GD/_meta/inbox/from-desktop" "$GD/handoff/for-common-enemy" "$GD/archive"

bash "$(dirname "$0")/sync-docs-from-drive.sh" 2>/dev/null || true

echo "Done. Canonical git copy: docs/"

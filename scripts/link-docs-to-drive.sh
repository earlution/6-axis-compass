#!/usr/bin/env bash
# Deprecated — repo docs/ is no longer symlinked to google-drive/docs/.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "NOTE: scripts/link-docs-to-drive.sh is deprecated." >&2
echo "  Working tree:  $REPO_ROOT/google-drive/docs/" >&2
echo "  Git mirror:    $REPO_ROOT/docs.repo-sync/  (scripts/sync-docs-to-git.sh)" >&2
echo "  Repo docs/:    $REPO_ROOT/docs/DEPRECATED.md" >&2
echo >&2
echo "Mount Drive first: bash scripts/link-google-drive-staging.sh" >&2

exit 0

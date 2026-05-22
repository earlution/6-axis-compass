#!/usr/bin/env bash
# Show docs-google-drive mount status.
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ -L "$REPO_ROOT/docs-google-drive" ]]; then
  ls -la "$REPO_ROOT/docs-google-drive"
  exit 0
fi
echo "Run: bash scripts/link-docs-google-drive.sh" >&2
exit 1

#!/usr/bin/env bash
# Show docs-gd-6-axis-compass mount status.
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ -L "$REPO_ROOT/docs-gd-6-axis-compass" ]]; then
  ls -la "$REPO_ROOT/docs-gd-6-axis-compass"
  exit 0
fi
echo "Run: bash scripts/link-docs-gd-6-axis-compass.sh" >&2
exit 1

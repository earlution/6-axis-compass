#!/usr/bin/env bash
# Repo google-drive → Google Drive project folder (mearsruari@gmail.com default).
#
# Usage:
#   bash scripts/link-google-drive-staging.sh
#   GOOGLE_ACCOUNT=mearsruari@gmail.com GOOGLE_DRIVE_FOLDER="6-Axis Compass" bash scripts/link-google-drive-staging.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ACCOUNT="${GOOGLE_ACCOUNT:-mearsruari@gmail.com}"
FOLDER="${GOOGLE_DRIVE_FOLDER:-6-Axis Compass}"
TARGET="/Users/rms/Library/CloudStorage/GoogleDrive-${ACCOUNT}/My Drive/${FOLDER}"
LINK="$REPO_ROOT/google-drive"

if [[ ! -d "$TARGET" ]]; then
  echo "ERROR: Drive folder not found:" >&2
  echo "  $TARGET" >&2
  exit 1
fi

if [[ -e "$LINK" && ! -L "$LINK" ]]; then
  echo "ERROR: $LINK exists and is not a symlink." >&2
  exit 1
fi

ln -sfn "$TARGET" "$LINK"
mkdir -p "$REPO_ROOT/.staging-config"
printf '%s\n' "$LINK" > "$REPO_ROOT/.staging-config/STAGING_ROOT.local"

echo "Linked:"
ls -la "$LINK"

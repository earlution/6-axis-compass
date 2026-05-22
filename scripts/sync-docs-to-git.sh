#!/usr/bin/env bash
# Alias: pull Drive → docs/ before git commit.
exec bash "$(dirname "$0")/sync-docs-from-drive.sh" "$@"

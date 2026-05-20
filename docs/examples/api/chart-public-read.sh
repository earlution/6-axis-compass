#!/usr/bin/env bash
# Public read — no API_SECRET (API v2.0.0+, API_PUBLIC_READ=true default)
set -euo pipefail
BASE="${API_BASE:-http://localhost:3000}"

curl -sS -X POST "${BASE}/api/chart" \
  -H 'Content-Type: application/json' \
  -d '{
    "actors": ["Reform UK", "Green Party"],
    "register": "structural",
    "showUser": false,
    "format": "png",
    "width": 1400,
    "height": 1400,
    "orientation": "flat"
  }' -o figure-sample.png

echo "Wrote figure-sample.png"

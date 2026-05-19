# Feature Request: 6-Axis Compass — On-Demand Radar Generation API

**Version:** 0.0.1  
**Date:** 2026-05-19  
**Priority:** MEDIUM  
**Status:** Discussion Draft

---

## Summary

Enable authenticated users to trigger on-demand generation of specific radar visualizations via the 6-axis-compass GitHub Actions workflow, rather than only regenerating all assets on every push. This allows external systems (common-enemy CI, OSF direct uploads, manual triggers) to request specific visualizations for specific actors or comparisons.

---

## Motivation

Current behavior:
- The 6-axis-compass OSF upload workflow triggers on every push to `main`
- All radar visualizations are regenerated and uploaded on each trigger
- No way to request a specific actor's radar or a specific comparison view
- common-enemy CI cannot directly request compass to generate/upload specific assets

Desired behavior:
- External systems can trigger compass CI with parameters specifying which visualizations to generate
- OSF uploads can be targeted (e.g., "upload only the SNP radar" or "upload the Brexit comparison view")
- Manual triggers available for ad-hoc regeneration without code changes

---

## Proposed API

### Repository Dispatch Event Types

Extend the `repository_dispatch` trigger in `.github/workflows/osf-upload.yml` to accept event payloads:

```yaml
on:
  repository_dispatch:
    types:
      - paper-revised          # existing: regenerate all assets
      - generate-radar         # new: generate specific radar(s)
      - upload-asset           # new: upload specific file to OSF
```

### `generate-radar` Event Payload

```json
{
  "event_type": "generate-radar",
  "client_payload": {
    "actors": ["SNP", "Plaid Cymru"],
    "radar_type": "declared",
    "output_format": "svg",
    "upload_to_osf": true,
    "osf_component": "actors",
    "requested_by": "common-enemy-ci"
  }
}
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `actors` | array | Yes | — | List of actor names to generate radars for |
| `radar_type` | string | No | `declared` | One of: `declared`, `structural`, `comparison` |
| `output_format` | string | No | `svg` | One of: `svg`, `png`, `html` |
| `upload_to_osf` | boolean | No | `true` | Whether to upload generated assets to OSF |
| `osf_component` | string | No | `actors` | OSF component folder: `actors`, `comparisons`, `archive` |
| `requested_by` | string | No | `manual` | Audit trail: which system requested this |

### `upload-asset` Event Payload

```json
{
  "event_type": "upload-asset",
  "client_payload": {
    "asset_path": "outputs/radar_charts/snp-declared-v1.0.0.svg",
    "osf_component": "actors",
    "osf_filename": "SNP-Declared-Radar-v1.0.0.svg",
    "requested_by": "common-enemy-ci"
  }
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `asset_path` | string | Yes | Path to asset within compass repo |
| `osf_component` | string | Yes | Target OSF component folder |
| `osf_filename` | string | Yes | Filename to use on OSF |
| `requested_by` | string | No | Audit trail |

---

## Implementation Steps

### 1. Update Workflow Trigger

Modify `.github/workflows/osf-upload.yml` in 6-axis-compass:

```yaml
on:
  push:
    branches: [main]
  repository_dispatch:
    types: [paper-revised, generate-radar, upload-asset]
```

### 2. Add Conditional Logic

Add job-level logic to handle different event types:

```yaml
jobs:
  generate:
    if: |
      github.event_name == 'push' ||
      github.event.action == 'generate-radar'
    runs-on: ubuntu-latest
    steps:
      # ... existing generation logic ...

  upload:
    needs: generate
    if: |
      github.event.action != 'generate-radar' ||
      github.event.client_payload.upload_to_osf == true
    runs-on: ubuntu-latest
    steps:
      # ... existing upload logic ...
```

### 3. Add Authentication

Require a secret token for dispatch events:

```yaml
- name: Verify dispatch token
  if: github.event_name == 'repository_dispatch'
  run: |
    if [ "${{ secrets.DISPATCH_TOKEN }}" != "${{ github.event.client_payload.token }}" ]; then
      echo "Unauthorized dispatch request"
      exit 1
    fi
```

Add to common-enemy's dispatch workflow:
```json
"token": "${{ secrets.COMPASS_DISPATCH_TOKEN }}"
```

### 4. Update common-enemy Dispatch Workflow

Modify `.github/workflows/trigger-compass-osf.yml`:

```yaml
- name: Dispatch paper-revised event to 6-axis-compass
  uses: peter-evans/repository-dispatch@v3
  with:
    token: ${{ secrets.COMPASS_REPO_PAT }}
    repository: earlution/6-axis-compass
    event-type: paper-revised
    client-payload: |
      {
        "token": "${{ secrets.COMPASS_DISPATCH_TOKEN }}",
        "paper_version": "${{ steps.meta.outputs.version }}",
        "commit_hash": "${{ steps.meta.outputs.commit }}",
        "paper_path": "${{ steps.meta.outputs.paper_path }}",
        "timestamp": "${{ steps.meta.outputs.timestamp }}"
      }
```

---

## OSF Project Structure

Proposed reorganization to match the API's component targeting:

```
A Common Enemy (osf.io/ubtz8)
├── academic-paper/
│   ├── academic-paper-v0.1.9.pdf
│   ├── academic-paper-v0.1.9.md
│   └── references.bib
├── governance/
│   ├── defining-principles-v0.2.1.md
│   ├── axis-scale-specification-and-radar-methodology-v0.0.2.md
│   ├── axis-coding-questionnaire-v0.0.1.md
│   └── linguistic-register-v0.0.1.md
├── episode-scripts/
│   ├── episode-01-the-wrong-fight-v0.1.7.md
│   ├── episode-02-nationalist-about-what-v0.2.6.md
│   ├── episode-03-what-bretton-woods-actually-was-v0.3.1.md
│   └── episode-04-globalisation-discontents-left-v0.4.1.md
├── actors/                    # Individual actor radars
│   ├── SNP-Declared-Radar-v1.0.0.svg
│   ├── Plaid-Cymru-Declared-Radar-v1.0.0.svg
│   └── ...
├── comparisons/               # Multi-actor comparison radars
│   ├── Brexit-Components-Comparison-v0.0.1.svg
│   └── ...
├── archive/                   # Superseded versions
│   └── ...
└── LICENSE
```

---

## Security Considerations

1. **Dispatch Token** — Generate a dedicated GitHub PAT with `repo` scope for compass repo access
2. **Token Rotation** — Document token rotation procedure in compass README
3. **Rate Limiting** — Consider adding a cooldown period between dispatch triggers
4. **Audit Logging** — Log all dispatch events with `requested_by` field for traceability

---

## Definition of Done

- [ ] 6-axis-compass workflow accepts `generate-radar` and `upload-asset` event types
- [ ] Dispatch token authentication implemented
- [ ] common-enemy CI can trigger compass with parameters
- [ ] OSF project reorganized with `actors/`, `comparisons/`, `archive/` folders
- [ ] README.md updated with API documentation
- [ ] Test dispatch triggered successfully from common-enemy

---

## Dependencies

- 6-axis-compass repo must have OSF secrets configured (`OSF_PAT`, `OSF_NODE_ID`, `OSF_USERNAME`)
- common-enemy must have `COMPASS_DISPATCH_TOKEN` secret configured
- OSF project structure reorganization (manual one-time task)

---

## Future Enhancements

1. **Webhook Endpoint** — Replace repository_dispatch with a dedicated webhook for finer-grained control
2. **Batch Operations** — Support generating multiple actors in a single dispatch
3. **Versioned Assets** — Automatic versioning and archive management on OSF
4. **Public API** — Expose generation endpoint for external researchers (authenticated)

---

*A Common Enemy | Feature Request: 6-Axis Compass API | Version 0.0.1*

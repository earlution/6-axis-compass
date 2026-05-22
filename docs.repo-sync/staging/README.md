# Google Drive staging (Six-Axis Compass)

**Git is canonical.** Working docs: **`google-drive/docs/`** on Drive.

Repo **`docs/`** is **deprecated** (stub only). Git release mirror: **`docs.repo-sync/`**.

```bash
bash scripts/link-google-drive-staging.sh      # → mearsruari …/My Drive/6-Axis Compass
bash scripts/consolidate-docs-to-drive.sh      # merge archive / for-common-enemy if needed
bash scripts/sync-docs-to-git.sh               # google-drive/docs → docs.repo-sync/
```

Config pointer: `.staging-config/STAGING_ROOT.local` (gitignored).

Outbound common-enemy coordination: **`google-drive/handoff/for-common-enemy/`**.

Release: commit **`docs.repo-sync/`** after sync, then tag as usual.

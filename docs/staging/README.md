# Documentation staging

**Git canonical:** repo **`docs/`**  
**Drive mount:** **`docs-google-drive/`** → Google Drive **`6-Axis Compass`**

```bash
bash scripts/link-docs-google-drive.sh
bash scripts/sync-docs-from-drive.sh    # Drive → docs/ before commit
bash scripts/sync-docs-to-drive.sh      # docs/ → Drive after repo edits
```

Outbound common-enemy coordination: **`docs-google-drive/handoff/for-common-enemy/`** (Drive only).

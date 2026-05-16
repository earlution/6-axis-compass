// Usage: source .env && node scripts/upload-to-osf.mjs
// Or: export $(grep -v '^#' .env | xargs) && node scripts/upload-to-osf.mjs

import { readdirSync, statSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(ROOT, 'paper-artifacts');

const OSF_TOKEN = process.env.OSF_PAT || process.env.OSF_PAN;
const OSF_NODE_ID = process.env.OSF_NODE_ID;
const OSF_BASE_URL = 'https://api.osf.io/v2';

// ── Validation ───────────────────────────────────────────────────────

if (!OSF_TOKEN) {
  console.error('Error: OSF_PAT environment variable is required.');
  console.error('Set it in GitHub Actions secrets or in a .env file for local testing.');
  process.exit(1);
}

if (!OSF_NODE_ID) {
  console.error('Error: OSF_NODE_ID environment variable is required.');
  console.error('Find your node ID in the OSF project URL: https://osf.io/ABCDE/ -> ABCDE');
  process.exit(1);
}

// ── Helpers ──────────────────────────────────────────────────────────

async function osfFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${OSF_BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${OSF_TOKEN}`,
      'Content-Type': 'application/vnd.api+json',
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const body = await res.text().catch(() => 'No body');
    throw new Error(`OSF API error ${res.status} ${res.statusText}: ${body.slice(0, 500)}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json') || contentType.includes('application/vnd.api+json')) {
    return res.json();
  }
  return res.text();
}

function getAllFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function getMimeType(filePath) {
  if (filePath.endsWith('.json')) return 'application/json';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  if (filePath.endsWith('.tex')) return 'text/x-tex';
  if (filePath.endsWith('.md')) return 'text/markdown';
  if (filePath.endsWith('.pdf')) return 'application/pdf';
  return 'application/octet-stream';
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  console.log(`Uploading paper artifacts to OSF node ${OSF_NODE_ID}...`);

  // 1. Verify node exists and we have access
  const node = await osfFetch(`/nodes/${OSF_NODE_ID}/`);
  console.log(`Connected to OSF project: "${node.data.attributes.title}"`);

  // 2. Get the OSF Storage provider upload URL
  const providers = await osfFetch(`/nodes/${OSF_NODE_ID}/files/`);
  const osfStorage = providers.data.find(p => p.attributes.provider === 'osfstorage');
  if (!osfStorage) {
    throw new Error('OSF Storage provider not found on this node.');
  }

  const rootUploadUrl = osfStorage.links.upload;
  console.log(`Using OSF Storage: ${rootUploadUrl}`);

  // 3. Create parent folders (fatal on failure)
  const folders = readdirSync(ARTIFACTS_DIR)
    .filter(entry => statSync(join(ARTIFACTS_DIR, entry)).isDirectory());
  for (const folder of folders) {
    const createUrl = `${rootUploadUrl}?kind=folder&name=${encodeURIComponent(folder)}`;
    const res = await fetch(createUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${OSF_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    if (res.ok || res.status === 409) {
      console.log(`  ✓ folder: ${folder}`);
    } else {
      const body = await res.text().catch(() => 'No body');
      throw new Error(`Failed to create folder "${folder}": ${res.status} ${res.statusText} — ${body.slice(0, 200)}`);
    }
  }

  // 4. Re-fetch file list to get folder-specific upload URLs
  console.log('Fetching folder upload URLs...');
  const fileList = await osfFetch(`/nodes/${OSF_NODE_ID}/files/osfstorage/`);
  const folderUploadUrls = {};
  for (const item of fileList.data) {
    if (item.attributes.kind === 'folder') {
      folderUploadUrls[item.attributes.name] = item.links.upload;
      console.log(`  ✓ upload URL for "${item.attributes.name}": ${item.links.upload}`);
    }
  }

  // 5. Collect all files
  const files = getAllFiles(ARTIFACTS_DIR);
  console.log(`Found ${files.length} files to upload.`);

  // 6. Upload each file — abort on hard failure, skip conflicts
  let uploaded = 0;
  let skipped = 0;

  for (const localPath of files) {
    const relPath = relative(ARTIFACTS_DIR, localPath).replace(/\\/g, '/');
    const parts = relPath.split('/');
    const folder = parts[0];
    const fileName = parts[1];

    if (!folderUploadUrls[folder]) {
      throw new Error(`No upload URL found for folder "${folder}".`);
    }

    const uploadUrl = `${folderUploadUrls[folder]}?kind=file&name=${encodeURIComponent(fileName)}`;
    const buf = readFileSync(localPath);

    const res = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${OSF_TOKEN}`
      },
      body: buf
    });

    if (res.status === 409) {
      skipped++;
      console.log(`  ⏭ ${relPath} (already exists)`);
      continue;
    }

    if (!res.ok) {
      const body = await res.text().catch(() => 'No body');
      throw new Error(`Upload failed for "${relPath}": ${res.status} ${res.statusText} — ${body.slice(0, 300)}`);
    }

    uploaded++;
    console.log(`  ✓ ${relPath}`);
  }

  console.log(`\nDone. Uploaded ${uploaded}/${files.length} files. Skipped ${skipped} (already exist).`);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});

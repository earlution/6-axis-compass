// Usage: node scripts/upload-asset-to-osf.mjs --file path/to/file.svg --component actors --filename My-File.svg

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const OSF_TOKEN = process.env.OSF_PAT || process.env.OSF_PAN;
const OSF_NODE_ID = process.env.OSF_NODE_ID;
const OSF_BASE_URL = 'https://api.osf.io/v2';

// ── Parse CLI flags ────────────────────────────────────────────────────

const args = process.argv.slice(2);
const flags = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
    flags[key] = val;
    if (val !== 'true') i++;
  }
}

const FILE_PATH = flags.file;
const COMPONENT = flags.component;
const OSF_FILENAME = flags.filename;

if (!FILE_PATH || !COMPONENT || !OSF_FILENAME) {
  console.error('Usage: node scripts/upload-asset-to-osf.mjs --file path/to/file --component actors --filename Name-On-OSF.svg');
  process.exit(1);
}

if (!existsSync(FILE_PATH)) {
  console.error(`File not found: ${FILE_PATH}`);
  process.exit(1);
}

// ── Validation ─────────────────────────────────────────────────────────

if (!OSF_TOKEN) {
  console.error('Error: OSF_PAT environment variable is required.');
  process.exit(1);
}

if (!OSF_NODE_ID) {
  console.error('Error: OSF_NODE_ID environment variable is required.');
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

function getMimeType(filePath) {
  if (filePath.endsWith('.json')) return 'application/json';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  if (filePath.endsWith('.tex')) return 'text/x-tex';
  if (filePath.endsWith('.md')) return 'text/markdown';
  if (filePath.endsWith('.pdf')) return 'application/pdf';
  return 'application/octet-stream';
}

// ── Main ───────────────────────────────────────────────────────────────

async function main() {
  console.log(`Uploading ${FILE_PATH} to OSF component "${COMPONENT}" as "${OSF_FILENAME}"...`);

  // 1. Verify node exists
  const node = await osfFetch(`/nodes/${OSF_NODE_ID}/`);
  console.log(`Connected to OSF project: "${node.data.attributes.title}"`);

  // 2. Get OSF Storage provider
  const providers = await osfFetch(`/nodes/${OSF_NODE_ID}/files/`);
  const osfStorage = providers.data.find(p => p.attributes.provider === 'osfstorage');
  if (!osfStorage) {
    throw new Error('OSF Storage provider not found on this node.');
  }
  const rootUploadUrl = osfStorage.links.upload;

  // 3. Ensure target folder exists
  const createUrl = `${rootUploadUrl}?kind=folder&name=${encodeURIComponent(COMPONENT)}`;
  const folderRes = await fetch(createUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${OSF_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  if (!folderRes.ok && folderRes.status !== 409) {
    const body = await folderRes.text().catch(() => 'No body');
    throw new Error(`Failed to create folder "${COMPONENT}": ${folderRes.status} — ${body.slice(0, 200)}`);
  }
  console.log(`  ${folderRes.status === 409 ? 'Folder exists' : 'Created folder'}: ${COMPONENT}`);

  // 4. Get folder-specific upload URL
  const fileList = await osfFetch(`/nodes/${OSF_NODE_ID}/files/osfstorage/`);
  const targetFolder = fileList.data.find(item => item.attributes.kind === 'folder' && item.attributes.name === COMPONENT);
  if (!targetFolder) {
    throw new Error(`Folder "${COMPONENT}" not found after creation.`);
  }

  // 5. Upload the file
  const uploadUrl = `${targetFolder.links.upload}?kind=file&name=${encodeURIComponent(OSF_FILENAME)}`;
  const buf = readFileSync(FILE_PATH);

  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${OSF_TOKEN}`
    },
    body: buf
  });

  if (!res.ok) {
    const body = await res.text().catch(() => 'No body');
    throw new Error(`Upload failed: ${res.status} ${res.statusText} — ${body.slice(0, 300)}`);
  }

  console.log(`  Uploaded: ${OSF_FILENAME} → OSF/${COMPONENT}/`);
  console.log('Done.');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});

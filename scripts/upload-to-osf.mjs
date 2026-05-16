import { config } from 'dotenv';
config();

import { readdirSync, statSync, readFileSync, createReadStream } from 'fs';
import { join, relative, posix } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ARTIFACTS_DIR = join(ROOT, 'paper-artifacts');

const OSF_TOKEN = process.env.OSF_PAT || process.env.OSF_PAN;
const OSF_NODE_ID = process.env.OSF_NODE_ID;
const OSF_BASE_URL = 'https://api.osf.io/v2';
const OSF_FILES_URL = 'https://files.osf.io/v1';

// ── Validation ───────────────────────────────────────────────────────

if (!OSF_TOKEN) {
  console.error('Error: OSF_PAN environment variable is required.');
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
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
}

function getAllFiles(dir, base = dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, base));
    } else {
      files.push(fullPath);
    }
  }
  return files;
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

  const uploadBaseUrl = osfStorage.links.upload;
  console.log(`Using OSF Storage: ${uploadBaseUrl}`);

  // 3. Collect all files
  const files = getAllFiles(ARTIFACTS_DIR);
  console.log(`Found ${files.length} files to upload.`);

  // 4. Upload each file
  let uploaded = 0;
  let failed = 0;

  for (const localPath of files) {
    const relPath = relative(ARTIFACTS_DIR, localPath).replace(/\\/g, '/');
    const posixPath = relPath.split('/').map(encodeURIComponent).join('/');
    const uploadUrl = `${uploadBaseUrl}${posixPath}`;

    const blob = new Blob([readFileSync(localPath)], {
      type: getMimeType(localPath)
    });

    try {
      const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${OSF_TOKEN}`,
          'Content-Type': getMimeType(localPath)
        },
        body: blob
      });

      if (!res.ok) {
        const body = await res.text().catch(() => 'No body');
        throw new Error(`${res.status} ${res.statusText}: ${body.slice(0, 200)}`);
      }

      uploaded++;
      console.log(`  ✓ ${relPath}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${relPath}: ${err.message}`);
    }
  }

  console.log(`\nDone. Uploaded ${uploaded}/${files.length} files.`);
  if (failed > 0) {
    console.error(`${failed} files failed.`);
    process.exit(1);
  }
}

function getMimeType(filePath) {
  if (filePath.endsWith('.json')) return 'application/json';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  if (filePath.endsWith('.tex')) return 'text/x-tex';
  if (filePath.endsWith('.md')) return 'text/markdown';
  return 'application/octet-stream';
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});

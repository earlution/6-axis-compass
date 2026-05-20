import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));

import { API_VERSION, isPublicReadEnabled } from '../lib/config.js';

export async function handleHealth(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 'ok',
    version: pkg.version,
    apiVersion: API_VERSION,
    publicRead: isPublicReadEnabled()
  }));
}

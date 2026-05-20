import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const specPath = join(__dirname, '..', 'openapi-v2.0.0.json');

export async function handleOpenApi(req, res) {
  const spec = readFileSync(specPath, 'utf-8');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.end(spec);
}

import { axesCatalog } from '../lib/axis-labels.js';

export async function handleAxes(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.end(JSON.stringify(axesCatalog()));
}

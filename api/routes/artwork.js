import { createReadStream } from 'fs';
import { getLocalArtworkPath } from '../lib/artwork-storage.js';

export async function handleArtwork(req, res, filename) {
  const filepath = getLocalArtworkPath(filename);
  if (!filepath) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  createReadStream(filepath).pipe(res);
}

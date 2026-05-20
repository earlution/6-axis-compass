import { createHash } from 'crypto';
import { getActorBySlug, getActorFileStat } from '../lib/actor-store.js';

export async function handleActorDetail(req, res, slug) {
  const actor = getActorBySlug(slug);
  if (!actor) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Actor not found' }));
    return;
  }

  const stat = getActorFileStat(slug);
  const body = JSON.stringify(actor);
  if (stat) {
    const etag = `"${createHash('md5').update(`${stat.mtimeMs}-${stat.size}`).digest('hex')}"`;
    res.setHeader('ETag', etag);
    res.setHeader('Last-Modified', stat.mtime.toUTCString());
    if (req.headers['if-none-match'] === etag) {
      res.statusCode = 304;
      res.end();
      return;
    }
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.end(body);
}

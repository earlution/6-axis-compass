import { getActorBySlug } from '../lib/actor-store.js';

export async function handleActorDetail(req, res, slug) {
  const actor = getActorBySlug(slug);
  if (!actor) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Actor not found' }));
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(actor));
}

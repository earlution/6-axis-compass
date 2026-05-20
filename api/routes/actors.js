import { listActors } from '../lib/actor-store.js';
import { ACTOR_SCHEMA_VERSION, CANONICAL_AXES } from '../lib/config.js';

export async function handleActors(req, res) {
  const actors = listActors();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.end(JSON.stringify({
    actors,
    meta: {
      count: actors.length,
      schemaVersion: ACTOR_SCHEMA_VERSION,
      axesOrder: CANONICAL_AXES
    }
  }));
}

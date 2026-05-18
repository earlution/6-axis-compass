import { listActors } from '../lib/actor-store.js';

export async function handleActors(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ actors: listActors() }));
}

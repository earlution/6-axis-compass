import { readdirSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const DATA_DIR = join(ROOT, 'data', 'actors');

let cachedActors = null;

export function loadActors() {
  if (cachedActors) return cachedActors;

  const files = readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  const actors = [];

  for (const file of files.sort()) {
    const raw = JSON.parse(readFileSync(join(DATA_DIR, file), 'utf-8'));
    const scores = {};
    const scoreMeta = {};
    for (const [axis, data] of Object.entries(raw.scores)) {
      if (typeof data === 'number') {
        scores[axis] = data;
        scoreMeta[axis] = {
          confidence: 'medium',
          rationale: 'Axis score stored as a bare number (migrated structural register).',
          sources: []
        };
      } else {
        scores[axis] = data.value;
        scoreMeta[axis] = {
          confidence: data.confidence,
          rationale: data.rationale,
          sources: data.sources || []
        };
      }
    }

    actors.push({
      name: raw.actor.name,
      slug: raw.actor.slug,
      color: raw.actor.color,
      scores,
      responses: raw.responses || null,
      dualRegister: raw.dualRegister || null,
      _meta: {
        category: raw.actor.category,
        version: raw.actor.version,
        lastUpdated: raw.actor.lastUpdated,
        curator: raw.actor.curator,
        contributors: raw.actor.contributors || []
      },
      _scoreMeta: scoreMeta
    });
  }

  cachedActors = actors;
  return actors;
}

export function invalidateActorCache() {
  cachedActors = null;
}

export function getActorByName(name) {
  return loadActors().find(a => a.name === name);
}

export function getActorBySlug(slug) {
  return loadActors().find(a => a.slug === slug);
}

export function listActors() {
  return loadActors().map(a => ({ name: a.name, slug: a.slug, color: a.color }));
}

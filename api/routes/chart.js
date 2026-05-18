import { renderSVG, renderPNG } from '../lib/chart-renderer.js';
import { loadActors } from '../lib/actor-store.js';

const AXES = ['Cultural', 'Economic', 'Military', 'Sovereignty', 'Governance', 'Class'];

function validateScores(scores) {
  if (!scores || typeof scores !== 'object') return 'scores must be an object';
  for (const [axis, val] of Object.entries(scores)) {
    if (!AXES.includes(axis)) return `Unknown axis: ${axis}`;
    if (typeof val !== 'number' || val < 0 || val > 10) return `Invalid score for ${axis}: must be 0–10`;
  }
  return null;
}

function resolveActors(names) {
  if (!names) return [];
  const all = loadActors();
  const resolved = [];
  for (const name of names) {
    const actor = all.find(a => a.name === name);
    if (!actor) throw new Error(`Unknown actor: ${name}`);
    resolved.push({ name: actor.name, scores: actor.scores, color: actor.color });
  }
  return resolved;
}

export async function handleChart(req, res, body) {
  const scores = body.scores || Object.fromEntries(AXES.map(a => [a, 0]));
  const scoreErr = validateScores(scores);
  if (scoreErr) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: scoreErr }));
    return;
  }

  let actors;
  try {
    actors = resolveActors(body.actors);
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message }));
    return;
  }

  const format = body.format || 'svg';
  const config = {
    scores,
    axes: AXES,
    orientation: body.orientation || 'flat',
    actors,
    showUser: body.showUser !== false,
    userColor: body.colors?.user || '#c8a84b',
    title: body.title || 'Chart'
  };

  if (format === 'svg') {
    const svg = renderSVG(config);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.end(svg);
  } else if (format === 'png') {
    const width = body.width || 600;
    const height = body.height || 600;
    const png = await renderPNG(config, width, height);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/png');
    res.end(png);
  } else {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Invalid format. Use svg or png.' }));
  }
}

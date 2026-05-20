import { renderSVG, renderPNG } from '../lib/chart-renderer.js';
import { loadActors } from '../lib/actor-store.js';
import {
  CANONICAL_AXES,
  SPATIAL_AXES,
  SPATIAL_DISPLAY_INVERT
} from '../lib/config.js';

const AXES = CANONICAL_AXES;
const MAX_ACTOR_OVERLAYS = 8;
const MAX_TITLE_LEN = 200;
const MAX_DIMENSION = 4096;
const MAX_PIXELS = 16_777_216;

function validateScores(scores) {
  if (!scores || typeof scores !== 'object') return 'scores must be an object';
  for (const [axis, val] of Object.entries(scores)) {
    if (!AXES.includes(axis)) return `Unknown axis: ${axis}`;
    if (typeof val !== 'number' || val < 0 || val > 10) return `Invalid score for ${axis}: must be 0–10`;
  }
  return null;
}

function resolveActors(names, register = 'primary') {
  if (!names) return [];
  const all = loadActors();
  const resolved = [];
  for (const name of names) {
    const actor = all.find(a => a.name === name);
    if (!actor) throw new Error(`Unknown actor: ${name}`);
    let scores = actor.scores;
    if (register === 'structural' && actor.dualRegister?.structural) {
      scores = actor.dualRegister.structural;
    } else if (register === 'declared' && actor.dualRegister?.declared) {
      scores = actor.dualRegister.declared;
    }
    resolved.push({
      name: actor.name,
      scores,
      color: actor.color,
      dualRegister: actor.dualRegister || null
    });
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

  if (Array.isArray(body.actors) && body.actors.length > MAX_ACTOR_OVERLAYS) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: `At most ${MAX_ACTOR_OVERLAYS} actor overlays allowed` }));
    return;
  }

  const title = body.title || 'Chart';
  if (typeof title === 'string' && title.length > MAX_TITLE_LEN) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: `title must be at most ${MAX_TITLE_LEN} characters` }));
    return;
  }

  const register = ['primary', 'declared', 'structural'].includes(body.register)
    ? body.register
    : 'primary';

  let actors;
  try {
    actors = resolveActors(body.actors, register);
  } catch (err) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message }));
    return;
  }

  const format = body.format || 'svg';
  const layout = body.layout === 'pedagogical' ? 'pedagogical' : 'spatial';

  const defaultAxes = layout === 'pedagogical' ? CANONICAL_AXES : SPATIAL_AXES;
  const axes = Array.isArray(body.axes) && body.axes.length === 6 &&
    body.axes.every(a => AXES.includes(a)) && new Set(body.axes).size === 6
    ? body.axes
    : defaultAxes;

  const defaultOrientation = layout === 'pedagogical' ? 'flat' : 'spatial';
  const orientation = ['flat', 'pointy', 'spatial'].includes(body.orientation)
    ? body.orientation
    : defaultOrientation;

  let invertedAxes;
  if (Array.isArray(body.invertedAxes)) {
    invertedAxes = new Set(body.invertedAxes.filter(a => AXES.includes(a)));
  } else if (layout === 'spatial') {
    invertedAxes = new Set(SPATIAL_DISPLAY_INVERT);
  } else {
    invertedAxes = new Set();
  }

  const config = {
    scores,
    axes,
    orientation,
    invertedAxes,
    actors,
    showUser: body.showUser !== false,
    userColor: body.colors?.user || '#c8a84b',
    title,
    register
  };

  if (format === 'svg') {
    const svg = renderSVG(config);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/svg+xml');
    res.end(svg);
  } else if (format === 'png') {
    const width = body.width || 600;
    const height = body.height || 600;
    if (width > MAX_DIMENSION || height > MAX_DIMENSION || width * height > MAX_PIXELS) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        error: `PNG dimensions must be ≤${MAX_DIMENSION} per side and width×height ≤ ${MAX_PIXELS}`
      }));
      return;
    }
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

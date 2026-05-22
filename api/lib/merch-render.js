import { renderSVG, renderPNG } from './chart-renderer.js';
import { renderMugPNG } from './mug-renderer.js';
import { loadActors } from './actor-store.js';
import {
  CANONICAL_AXES,
  SPATIAL_AXES,
  SPATIAL_DISPLAY_INVERT,
  SPATIAL_STRUCTURAL_DISPLAY_INVERT
} from './config.js';
import { validateMerchSelection } from './printful-catalog.js';

const AXES = CANONICAL_AXES;
const MAX_UPLOADED_MAP_BYTES = 512 * 1024;

function axesFromOrderKey(key) {
  if (key === 'cemslg') return [...CANONICAL_AXES];
  if (key === 'egacsm') return [...SPATIAL_AXES];
  return null;
}

function resolveActorsFromSlugs(slugs, customActors = [], register = 'primary') {
  const all = [...loadActors(), ...customActors];
  const resolved = [];
  for (const slug of (slugs || []).slice(0, 2)) {
    let actor = null;
    if (slug.startsWith('c:')) {
      actor = customActors.find(a =>
        a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug.slice(2)
      );
    } else {
      actor = all.find(a => a._actorMeta?.slug === slug);
    }
    if (!actor) continue;
    let scores = actor.scores;
    if (register === 'structural' && actor.dualRegister?.structural) {
      scores = actor.dualRegister.structural;
    } else if (register === 'declared' && actor.dualRegister?.declared) {
      scores = actor.dualRegister.declared;
    }
    resolved.push({ name: actor.name, scores, color: actor.color });
  }
  return resolved;
}

export function validateCheckoutBody(body) {
  if (!body || typeof body !== 'object') return 'Request body required';
  if (!body.scores || typeof body.scores !== 'object') return 'scores required';

  for (const axis of AXES) {
    const val = body.scores[axis];
    if (val !== undefined && (typeof val !== 'number' || val < 0 || val > 10)) {
      return `Invalid score for ${axis}`;
    }
  }

  const productType = body.productType === 'mug' ? 'mug' : 'apparel';
  const selection = validateMerchSelection({
    productType,
    garment: body.garment,
    garmentColor: body.garmentColor,
    size: body.size,
    mugSize: body.mugSize
  });
  if (!selection.ok) return selection.error;

  if (body.uploadedMap?.data) {
    const len = body.uploadedMap.data.length;
    if (len > MAX_UPLOADED_MAP_BYTES) return 'uploadedMap too large';
  }

  return null;
}

export function buildRenderConfig(body) {
  const layout = body.axesOrder === 'cemslg' ? 'pedagogical' : 'spatial';
  const axes = axesFromOrderKey(body.axesOrder) ||
    (layout === 'pedagogical' ? CANONICAL_AXES : SPATIAL_AXES);
  const orientation = body.orientation || (layout === 'pedagogical' ? 'flat' : 'spatial');
  const register = ['primary', 'declared', 'structural'].includes(body.register)
    ? body.register
    : 'primary';

  let invertedAxes;
  if (Array.isArray(body.invertedAxes)) {
    invertedAxes = new Set(body.invertedAxes.filter(a => AXES.includes(a)));
  } else if (layout === 'spatial' && register === 'structural') {
    invertedAxes = new Set(SPATIAL_STRUCTURAL_DISPLAY_INVERT);
  } else if (layout === 'spatial') {
    invertedAxes = new Set(SPATIAL_DISPLAY_INVERT);
  } else {
    invertedAxes = new Set();
  }

  const garmentColor = body.garmentColor || 'white';
  const chartTheme = body.chartTheme || (garmentColor === 'black' ? 'dark' : 'light');
  let background = body.background;
  if (!background) {
    if (body.productType === 'mug') background = 'white';
    else if (garmentColor === 'black' || chartTheme === 'dark') background = 'transparent';
    else background = 'white';
  }

  return {
    layout,
    scores: body.scores,
    axes,
    orientation,
    invertedAxes,
    actors: resolveActorsFromSlugs(body.actorSlugs, body.customActors, register),
    showUser: body.showUser !== false,
    userColor: body.userMapColor || (chartTheme === 'dark' ? '#ffffff' : '#c8a84b'),
    uploadedMap: body.uploadedMap || null,
    register,
    labelMode: 'trigram',
    labelMerch: true,
    background,
    title: 'Merch print',
    productType: body.productType === 'mug' ? 'mug' : 'apparel',
    mugLayout: body.mugLayout || 'radar'
  };
}

export async function renderMerchArtwork(body, product) {
  const config = buildRenderConfig(body);
  const printArea = product?.printArea || { width: 4500, height: 5400 };

  if (config.productType === 'mug') {
    return renderMugPNG(config, printArea.width, printArea.height);
  }

  return renderPNG(config, printArea.width, printArea.height);
}

export function buildProductLabel(body) {
  const productType = body.productType === 'mug' ? 'mug' : body.garment;
  const selection = validateMerchSelection({
    productType: body.productType === 'mug' ? 'mug' : 'apparel',
    garment: body.garment,
    garmentColor: body.garmentColor,
    size: body.size,
    mugSize: body.mugSize
  });
  if (!selection.ok) return 'Six-Axis Compass print';

  const product = selection.product;
  if (body.productType === 'mug') {
    return `${product.label} (${body.mugSize || '11oz'})`;
  }
  const color = body.garmentColor === 'black' ? 'Black' : 'White';
  return `${product.label} — ${color} — ${body.size || 'M'}`;
}

export { renderSVG };

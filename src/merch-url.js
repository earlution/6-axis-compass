import { encodeHash, decodeHash } from './url.js';

const DRAFT_KEY = 'six-axis-compass-merch-draft';
const MAX_ACTOR_SLUGS = 2;

export function getActorSlug(actor) {
  if (actor._actorMeta?.slug) return actor._actorMeta.slug;
  return 'c:' + actor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function resolveActorBySlug(slug, customActors = []) {
  const all = [...(typeof ACTORS !== 'undefined' ? ACTORS : []), ...customActors];
  if (slug.startsWith('c:')) {
    const namePart = slug.slice(2).replace(/-/g, ' ');
    return customActors.find(a =>
      getActorSlug(a) === slug ||
      a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug.slice(2)
    ) || all.find(a => getActorSlug(a) === slug);
  }
  return all.find(a => a._actorMeta?.slug === slug || getActorSlug(a) === slug);
}

export function slugsFromSelectedActors(selectedNames, customActors = []) {
  const all = [...(typeof ACTORS !== 'undefined' ? ACTORS : []), ...customActors];
  return selectedNames
    .map(name => {
      const actor = all.find(a => a.name === name);
      return actor ? getActorSlug(actor) : null;
    })
    .filter(Boolean)
    .slice(0, MAX_ACTOR_SLUGS);
}

export function encodeMerchHash(state) {
  const {
    scores,
    orientation,
    axesOrder,
    invertedAxes,
    actorSlugs = [],
    garment = 'tee',
    garmentColor = 'white',
    chartTheme = 'light',
    register = 'primary'
  } = state;
  let hash = encodeHash(scores, orientation, axesOrder, invertedAxes);
  hash = hash.replace('#v2', '#v3');
  if (actorSlugs.length) hash += `;a=${actorSlugs.join(',')}`;
  hash += `;g=${garment};gc=${garmentColor};th=${chartTheme};reg=${register}`;
  return hash;
}

export function decodeMerchHash(hash) {
  if (!hash || hash.length < 2) return null;
  const str = hash.startsWith('#') ? hash.slice(1) : hash;
  const parts = str.split(';');
  const urlVersion = parts[0];

  if (urlVersion !== 'v3') {
    const v2 = decodeHash(hash.startsWith('#') ? hash : '#' + hash);
    if (!v2) return null;
    return {
      ...v2,
      actorSlugs: [],
      garment: 'tee',
      garmentColor: 'white',
      chartTheme: 'light',
      register: 'primary'
    };
  }

  const v2parts = parts.filter(p =>
    p && !p.startsWith('a=') && !p.startsWith('g=') && !p.startsWith('gc=') &&
    !p.startsWith('th=') && !p.startsWith('reg=')
  );
  const decoded = decodeHash('#' + v2parts.join(';').replace(/^v3/, 'v2'));
  if (!decoded) return null;

  let actorSlugs = [];
  let garment = 'tee';
  let garmentColor = 'white';
  let chartTheme = 'light';
  let register = 'primary';

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;
    if (part.startsWith('a=')) {
      actorSlugs = part.slice(2).split(',').filter(Boolean).slice(0, MAX_ACTOR_SLUGS);
    } else if (part.startsWith('gc=')) {
      garmentColor = part.slice(3);
    } else if (part.startsWith('th=')) {
      chartTheme = part.slice(3);
    } else if (part.startsWith('reg=')) {
      register = part.slice(4);
    } else if (part.startsWith('g=')) {
      garment = part.slice(2);
    }
  }

  return {
    ...decoded,
    actorSlugs,
    garment,
    garmentColor,
    chartTheme,
    register
  };
}

export function saveMerchDraft(draft) {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({
      ...draft,
      savedAt: new Date().toISOString()
    }));
  } catch (_) {}
}

export function loadMerchDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

export function clearMerchDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch (_) {}
}

export function buildDraftFromResults({
  scores,
  orientation,
  axesOrder,
  invertedAxes,
  selectedActorNames,
  customActors,
  uploadedMap,
  showUser,
  register,
  garment,
  garmentColor,
  chartTheme
}) {
  return {
    scores,
    orientation,
    axesOrder,
    invertedAxes: [...(invertedAxes || [])],
    actorSlugs: slugsFromSelectedActors([...selectedActorNames], customActors),
    selectedActorNames: [...selectedActorNames],
    customActors: customActors ? JSON.parse(JSON.stringify(customActors)) : [],
    uploadedMap: uploadedMap ? { ...uploadedMap } : null,
    showUser,
    register: register || 'primary',
    garment: garment || 'tee',
    garmentColor: garmentColor || 'white',
    chartTheme: chartTheme || (garmentColor === 'black' ? 'dark' : 'light'),
    size: 'M'
  };
}

export function mergeMerchState(hashDecoded, draft) {
  const base = hashDecoded || {};
  const d = draft || {};
  return {
    scores: d.scores || base.scores,
    orientation: d.orientation ?? base.orientation ?? 'flat',
    axesOrder: d.axesOrder || base.axesOrder,
    invertedAxes: d.invertedAxes?.length ? d.invertedAxes : (base.invertedAxes || []),
    actorSlugs: d.actorSlugs?.length ? d.actorSlugs : (base.actorSlugs || []),
    selectedActorNames: d.selectedActorNames || [],
    customActors: d.customActors || [],
    uploadedMap: d.uploadedMap ?? null,
    showUser: d.showUser !== false && base.showUser !== false,
    register: d.register || base.register || 'primary',
    garment: d.garment || base.garment || 'tee',
    garmentColor: d.garmentColor || base.garmentColor || 'white',
    chartTheme: d.chartTheme || base.chartTheme || 'light',
    size: d.size || 'M'
  };
}

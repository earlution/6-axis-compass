export const API_VERSION = '2.0.0';

/** Public read routes skip Bearer auth when true (default). Set API_PUBLIC_READ=false for legacy mode. */
export function isPublicReadEnabled() {
  const v = process.env.API_PUBLIC_READ;
  if (v === undefined || v === '') return true;
  return v === '1' || v.toLowerCase() === 'true';
}

/** OQ2 pedagogical / tabular order. */
export const CANONICAL_AXES = [
  'Cultural', 'Economic', 'Military', 'Sovereignty', 'Governance', 'Class'
];

/** OQ5 spatial radar circuit (clockwise from ~7:30). */
export const SPATIAL_AXES = [
  'Economic', 'Governance', 'Class', 'Cultural', 'Sovereignty', 'Military'
];

export const SPATIAL_DISPLAY_INVERT = [
  'Economic', 'Governance', 'Class', 'Sovereignty'
];

export const ACTOR_SCHEMA_VERSION = '1.1.0';

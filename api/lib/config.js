export const API_VERSION = '2.0.0';

/** Public read routes skip Bearer auth when true (default). Set API_PUBLIC_READ=false for legacy mode. */
export function isPublicReadEnabled() {
  const v = process.env.API_PUBLIC_READ;
  if (v === undefined || v === '') return true;
  return v === '1' || v.toLowerCase() === 'true';
}

export const CANONICAL_AXES = [
  'Cultural', 'Economic', 'Military', 'Sovereignty', 'Governance', 'Class'
];

export const ACTOR_SCHEMA_VERSION = '1.1.0';

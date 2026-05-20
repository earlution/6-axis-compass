export const GARMENTS = [
  { id: 'tee', labelKey: 'merch.garment.tee' },
  { id: 'sweatshirt', labelKey: 'merch.garment.sweatshirt' },
  { id: 'hoodie', labelKey: 'merch.garment.hoodie' }
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const STUB_PRICES_GBP = {
  tee: 24.99,
  sweatshirt: 34.99,
  hoodie: 39.99
};

export function garmentImagePath(garmentId, garmentColor) {
  return `assets/merch/${garmentId}-${garmentColor}.svg`;
}

export function chartInkColor(chartTheme) {
  return chartTheme === 'dark' ? '#ffffff' : '#000000';
}

/** Normalise hex colour from picker or hash (with or without #). */
export function normalizeHexColor(value, fallback = '#c8a84b') {
  if (!value || typeof value !== 'string') return fallback;
  let hex = value.trim().replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return fallback;
  return '#' + hex.toLowerCase();
}

export function formatPriceGBP(garmentId) {
  const n = STUB_PRICES_GBP[garmentId] ?? STUB_PRICES_GBP.tee;
  return '£' + n.toFixed(2);
}

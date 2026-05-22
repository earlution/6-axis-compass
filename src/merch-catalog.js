export const GARMENTS = [
  { id: 'tee', labelKey: 'merch.garment.tee', productType: 'apparel' },
  { id: 'sweatshirt', labelKey: 'merch.garment.sweatshirt', productType: 'apparel' },
  { id: 'hoodie', labelKey: 'merch.garment.hoodie', productType: 'apparel' },
  { id: 'mug', labelKey: 'merch.garment.mug', productType: 'mug' }
];

export const APPAREL_IDS = ['tee', 'sweatshirt', 'hoodie'];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const MUG_SIZES = ['11oz', '15oz'];

export const STUB_PRICES_GBP = {
  tee: 24.99,
  sweatshirt: 34.99,
  hoodie: 39.99,
  mug: 14.99
};

let livePrices = null;

export function setLivePrices(prices) {
  livePrices = prices;
}

export function getPriceGBP(productId) {
  if (livePrices?.[productId]?.priceGBP != null) {
    return livePrices[productId].priceGBP;
  }
  return STUB_PRICES_GBP[productId] ?? STUB_PRICES_GBP.tee;
}

export function garmentImagePath(garmentId, garmentColor) {
  if (garmentId === 'mug') {
    return 'assets/merch/mug-white.svg';
  }
  return `assets/merch/${garmentId}-${garmentColor}.svg`;
}

export function chartInkColor(chartTheme) {
  return chartTheme === 'dark' ? '#ffffff' : '#000000';
}

export function normalizeHexColor(value, fallback = '#c8a84b') {
  if (!value || typeof value !== 'string') return fallback;
  let hex = value.trim().replace(/^#/, '');
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return fallback;
  return '#' + hex.toLowerCase();
}

export function formatPriceGBP(productId) {
  const n = getPriceGBP(productId);
  return '£' + n.toFixed(2);
}

export function isApparel(productId) {
  return APPAREL_IDS.includes(productId);
}

export function isMug(productId) {
  return productId === 'mug';
}

export async function fetchLivePrices(apiBase) {
  if (!apiBase) return null;
  try {
    const res = await fetch(`${apiBase.replace(/\/$/, '')}/api/merch/prices`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.prices) setLivePrices(data.prices);
    return data.prices;
  } catch (_) {
    return null;
  }
}

export function getApiBase() {
  const meta = document.querySelector('meta[name="merch-api-base"]');
  const fromMeta = meta?.getAttribute('content')?.trim();
  if (fromMeta) return fromMeta.replace(/\/$/, '');
  if (typeof window !== 'undefined' && window.MERCH_API_BASE) {
    return String(window.MERCH_API_BASE).replace(/\/$/, '');
  }
  return 'http://localhost:3000';
}

export async function fetchOrderBySession(sessionId, apiBase) {
  if (!sessionId) return null;
  const base = (apiBase || getApiBase()).replace(/\/$/, '');
  try {
    const res = await fetch(`${base}/api/orders/session/${encodeURIComponent(sessionId)}`);
    if (!res.ok) return null;
    return res.json();
  } catch (_) {
    return null;
  }
}

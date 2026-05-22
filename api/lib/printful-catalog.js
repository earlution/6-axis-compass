import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = join(__dirname, '..', 'config', 'printful-catalog.json');

let cached = null;

export function loadCatalog() {
  if (!cached) {
    cached = JSON.parse(readFileSync(CATALOG_PATH, 'utf-8'));
  }
  return cached;
}

export function getProduct(productId) {
  const catalog = loadCatalog();
  return catalog.products?.[productId] || null;
}

export function resolveVariantId(productId, color, size) {
  const product = getProduct(productId);
  if (!product) return null;
  return product.variants?.[color]?.[size] ?? null;
}

export function getPriceGBP(productId) {
  const product = getProduct(productId);
  return product?.priceGBP ?? null;
}

export function listMerchPrices() {
  const catalog = loadCatalog();
  const prices = {};
  for (const [id, product] of Object.entries(catalog.products || {})) {
    prices[id] = {
      label: product.label,
      productType: product.productType,
      priceGBP: product.priceGBP
    };
  }
  return prices;
}

export function validateMerchSelection({
  productType = 'apparel',
  garment,
  garmentColor,
  size,
  mugSize
}) {
  const productId = productType === 'mug' ? 'mug' : garment;
  const product = getProduct(productId);
  if (!product) return { ok: false, error: `Unknown product: ${productId}` };

  if (productType === 'mug') {
    const ms = mugSize || '11oz';
    const variantId = product.variants?.white?.[ms];
    if (!variantId) return { ok: false, error: `Unknown mug size: ${ms}` };
    return { ok: true, productId, variantId, priceGBP: product.priceGBP, product };
  }

  const color = garmentColor || 'white';
  const sz = size || 'M';
  const variantId = product.variants?.[color]?.[sz];
  if (!variantId) return { ok: false, error: `Unknown variant: ${productId}/${color}/${sz}` };
  return { ok: true, productId, variantId, priceGBP: product.priceGBP, product };
}

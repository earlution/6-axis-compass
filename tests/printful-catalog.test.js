import { validateMerchSelection, listMerchPrices, resolveVariantId } from '../api/lib/printful-catalog.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const tee = validateMerchSelection({ productType: 'apparel', garment: 'tee', garmentColor: 'white', size: 'M' });
assert(tee.ok, 'tee white M valid');
assert(tee.variantId === 4014, 'tee variant id');
assert(tee.priceGBP === 24.99, 'tee price');

const mug = validateMerchSelection({ productType: 'mug', mugSize: '11oz' });
assert(mug.ok, 'mug 11oz valid');
assert(mug.variantId === 9327, 'mug variant id');

const bad = validateMerchSelection({ productType: 'apparel', garment: 'tee', garmentColor: 'white', size: 'XXXL' });
assert(!bad.ok, 'invalid size rejected');

const prices = listMerchPrices();
assert(prices.mug.priceGBP === 14.99, 'mug price in list');
assert(resolveVariantId('hoodie', 'black', 'L') === 4045, 'resolve variant');

console.log('printful-catalog.test.js: all passed');

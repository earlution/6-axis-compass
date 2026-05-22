import { sendJSON } from '../lib/auth.js';
import { listMerchPrices } from '../lib/printful-catalog.js';

export async function handleMerchPrices(req, res) {
  sendJSON(res, 200, { prices: listMerchPrices() });
}

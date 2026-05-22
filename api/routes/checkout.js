import { sendJSON } from '../lib/auth.js';
import { isCorsAllowed } from '../lib/cors.js';
import { createMerchCheckoutSession, isMerchEnabled } from '../lib/merch-orders.js';

export async function handleCheckoutSession(req, res, body) {
  if (!isCorsAllowed(req)) {
    sendJSON(res, 403, { error: 'Origin not allowed' });
    return;
  }

  if (!isMerchEnabled()) {
    sendJSON(res, 503, {
      error: 'Merch checkout is not configured',
      hint: 'Set STRIPE_SECRET_KEY on the API server'
    });
    return;
  }

  try {
    const result = await createMerchCheckoutSession(body);
    sendJSON(res, 200, result);
  } catch (err) {
    sendJSON(res, 400, { error: err.message });
  }
}

import { sendJSON } from '../lib/auth.js';
import { constructWebhookEvent } from '../lib/stripe-client.js';
import { fulfilOrderFromStripeSession } from '../lib/merch-orders.js';

export async function handleStripeWebhook(req, res, rawBody) {
  const signature = req.headers['stripe-signature'];
  if (!signature) {
    sendJSON(res, 400, { error: 'Missing stripe-signature header' });
    return;
  }

  let event;
  try {
    event = constructWebhookEvent(rawBody, signature);
  } catch (err) {
    sendJSON(res, 400, { error: `Webhook signature verification failed: ${err.message}` });
    return;
  }

  if (event.type === 'checkout.session.completed') {
    try {
      await fulfilOrderFromStripeSession(event.data.object);
    } catch (err) {
      console.error('Fulfilment error:', err);
      sendJSON(res, 500, { error: err.message });
      return;
    }
  }

  sendJSON(res, 200, { received: true });
}

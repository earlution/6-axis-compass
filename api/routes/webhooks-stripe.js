import { sendJSON } from '../lib/auth.js';
import { constructWebhookEvent } from '../lib/stripe-client.js';
import { scheduleFulfilment } from '../lib/merch-fulfilment-queue.js';

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
    scheduleFulfilment(event.data.object);
  }

  sendJSON(res, 200, { received: true });
}

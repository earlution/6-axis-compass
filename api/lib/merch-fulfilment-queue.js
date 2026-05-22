import { fulfilOrderFromStripeSession } from './merch-orders.js';
import { refundPayment, isStripeConfigured } from './stripe-client.js';
import { getOrderByStripeSession, updateOrder } from './order-store.js';

const pending = new Set();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function maxRetries() {
  return parseInt(process.env.MERCH_FULFIL_RETRIES || '3', 10);
}

function autoRefundEnabled() {
  return process.env.MERCH_AUTO_REFUND_ON_FAILURE === 'true';
}

async function runFulfilmentWithRetry(session, attempt = 1) {
  try {
    await fulfilOrderFromStripeSession(session);
  } catch (err) {
    console.error(`Fulfilment attempt ${attempt} failed for session ${session.id}:`, err.message);
    if (attempt < maxRetries()) {
      await sleep(2000 * attempt);
      return runFulfilmentWithRetry(session, attempt + 1);
    }

    if (autoRefundEnabled() && isStripeConfigured() && session.payment_intent) {
      try {
        await refundPayment(session.payment_intent);
        const order = getOrderByStripeSession(session.id);
        if (order) updateOrder(order.id, { status: 'refunded', error: err.message });
        console.error(`Refunded payment ${session.payment_intent} after fulfilment failure`);
      } catch (refundErr) {
        console.error('Auto-refund failed:', refundErr.message);
      }
    }
  }
}

export function scheduleFulfilment(session) {
  if (!session?.id) return;
  if (pending.has(session.id)) return;
  pending.add(session.id);
  setImmediate(() => {
    runFulfilmentWithRetry(session).finally(() => pending.delete(session.id));
  });
}

export function isFulfilmentPending(sessionId) {
  return pending.has(sessionId);
}

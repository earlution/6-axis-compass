import { createOrder, updateOrder, getOrderByStripeSession } from '../api/lib/order-store.js';
import { fulfilOrderFromStripeSession } from '../api/lib/merch-orders.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const scores = {
  Cultural: 5, Economic: 5, Military: 5,
  Sovereignty: 5, Class: 5, Governance: 5
};

const order = createOrder({
  config: {
    productType: 'apparel',
    scores,
    axesOrder: 'cemslg',
    orientation: 'flat',
    garment: 'tee',
    garmentColor: 'white',
    size: 'M',
    userMapColor: '#c8a84b'
  }
});

const session = {
  id: 'cs_test_fulfil_1',
  metadata: { orderId: order.id },
  customer_details: {
    email: 'test@example.com',
    name: 'Test User',
    address: {
      line1: '1 Test St',
      city: 'London',
      country: 'GB',
      postal_code: 'SW1A 1AA'
    }
  }
};

updateOrder(order.id, { stripeSessionId: session.id });

const first = await fulfilOrderFromStripeSession(session);
assert(first.status === 'awaiting_printful' || first.status === 'artwork_ready', 'first fulfilment progresses');

const second = await fulfilOrderFromStripeSession(session);
assert(second.id === first.id, 'idempotent second call');
assert(
  second.status === first.status || ['submitted', 'awaiting_printful', 'artwork_ready'].includes(second.status),
  'second call does not restart pipeline'
);

console.log('merch-fulfilment.test.js: all passed');

import Stripe from 'stripe';

let stripeClient = null;

export function isStripeConfigured() {
  return !!process.env.STRIPE_SECRET_KEY;
}

export function getStripe() {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export async function createCheckoutSession({
  orderId,
  productLabel,
  priceGBP,
  successUrl,
  cancelUrl,
  metadata = {}
}) {
  const stripe = getStripe();
  const amountPence = Math.round(priceGBP * 100);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'gbp',
        unit_amount: amountPence,
        product_data: {
          name: productLabel,
          description: 'Custom Six-Axis Political Compass print'
        }
      }
    }],
    shipping_address_collection: {
      allowed_countries: ['GB', 'IE', 'FR', 'DE', 'NL', 'BE', 'ES', 'IT', 'PT', 'AT', 'SE', 'DK', 'FI', 'NO', 'PL', 'CZ']
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      orderId,
      ...metadata
    }
  });

  return session;
}

export function constructWebhookEvent(rawBody, signature) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not set');
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}

export async function refundPayment(paymentIntentId) {
  const stripe = getStripe();
  return stripe.refunds.create({ payment_intent: paymentIntentId });
}

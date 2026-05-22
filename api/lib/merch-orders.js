import { createOrder, updateOrder, getOrder, getOrderByStripeSession } from './order-store.js';
import { validateCheckoutBody, buildProductLabel, renderMerchArtwork } from './merch-render.js';
import { validateMerchSelection } from './printful-catalog.js';
import { createCheckoutSession, isStripeConfigured } from './stripe-client.js';
import { createPrintfulOrder, isPrintfulConfigured } from './printful-client.js';
import { uploadArtwork } from './artwork-storage.js';

export function isMerchEnabled() {
  return isStripeConfigured();
}

export async function createMerchCheckoutSession(body) {
  const err = validateCheckoutBody(body);
  if (err) throw new Error(err);
  if (!isMerchEnabled()) throw new Error('Merch checkout is not configured (STRIPE_SECRET_KEY missing)');

  const productType = body.productType === 'mug' ? 'mug' : 'apparel';
  const selection = validateMerchSelection({
    productType,
    garment: body.garment,
    garmentColor: body.garmentColor,
    size: body.size,
    mugSize: body.mugSize
  });
  if (!selection.ok) throw new Error(selection.error);

  const order = createOrder({ config: { ...body, variantId: selection.variantId } });
  const productLabel = buildProductLabel(body);
  const successBase = process.env.MERCH_SUCCESS_URL || 'http://localhost:8080/shop.html?paid=1';
  const cancelBase = process.env.MERCH_CANCEL_URL || 'http://localhost:8080/shop.html';
  const successUrl = successBase.includes('{CHECKOUT_SESSION_ID}')
    ? successBase
    : `${successBase}${successBase.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = cancelBase;

  const session = await createCheckoutSession({
    orderId: order.id,
    productLabel,
    priceGBP: selection.priceGBP,
    successUrl,
    cancelUrl,
    metadata: { orderId: order.id }
  });

  updateOrder(order.id, { stripeSessionId: session.id, status: 'checkout_created' });
  return { url: session.url, orderId: order.id };
}

export async function fulfilOrderFromStripeSession(session) {
  const existing = getOrderByStripeSession(session.id);
  if (['submitted', 'fulfilled', 'awaiting_printful', 'artwork_ready'].includes(existing?.status)) {
    return existing;
  }

  const orderId = session.metadata?.orderId || existing?.id;
  if (!orderId) throw new Error('No orderId in Stripe session metadata');

  let order = existing || getOrder(orderId);
  if (!order) throw new Error(`Order not found: ${orderId}`);

  if (order.status === 'submitted') return order;

  updateOrder(orderId, { stripeSessionId: session.id, status: 'paid' });

  const body = order.config;
  const productType = body.productType === 'mug' ? 'mug' : 'apparel';
  const selection = validateMerchSelection({
    productType,
    garment: body.garment,
    garmentColor: body.garmentColor,
    size: body.size,
    mugSize: body.mugSize
  });
  if (!selection.ok) throw new Error(selection.error);

  const png = await renderMerchArtwork(body, selection.product);
  const { url: artworkUrl } = await uploadArtwork(png, 'png');
  updateOrder(orderId, { artworkUrl, status: 'artwork_ready' });

  const shipping = session.shipping_details || session.customer_details;
  const address = shipping?.address || session.customer_details?.address;
  const name = shipping?.name || session.customer_details?.name || 'Customer';
  const email = session.customer_details?.email;

  if (!address?.country) throw new Error('Missing shipping address from Stripe session');

  const artworkPublicUrl = artworkUrl.startsWith('http')
    ? artworkUrl
    : `${process.env.MERCH_ARTWORK_PUBLIC_ORIGIN || 'http://localhost:3000'}${artworkUrl}`;

  if (!isPrintfulConfigured()) {
    updateOrder(orderId, {
      status: 'awaiting_printful',
      error: 'PRINTFUL_API_KEY not set — artwork ready'
    });
    return getOrder(orderId);
  }

  try {
    const result = await createPrintfulOrder({
      recipient: {
        name,
        email,
        address1: address.line1,
        address2: address.line2,
        city: address.city,
        state: address.state,
        country_code: address.country,
        postal_code: address.postal_code
      },
      variantId: selection.variantId,
      artworkUrl: artworkPublicUrl,
      externalId: orderId
    });

    updateOrder(orderId, {
      printfulOrderId: result.id,
      status: 'submitted',
      error: null
    });
  } catch (err) {
    updateOrder(orderId, { status: 'failed', error: err.message });
    throw err;
  }

  return getOrder(orderId);
}

export function getPublicOrderStatus(orderId) {
  const order = getOrder(orderId);
  if (!order) return null;
  return publicStatusFromOrder(order);
}

export function getPublicOrderStatusBySession(sessionId) {
  const order = getOrderByStripeSession(sessionId);
  if (!order) return null;
  return publicStatusFromOrder(order);
}

function publicStatusFromOrder(order) {
  return {
    id: order.id,
    status: order.status,
    printfulOrderId: order.printfulOrderId,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt
  };
}

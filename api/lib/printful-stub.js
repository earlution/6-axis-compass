/**
 * Placeholder for future Printful + Stripe checkout integration.
 * Not used by the static merch prototype.
 */

export function createCheckoutSession() {
  throw new Error(
    'Printful checkout is not configured. See docs/merch-printful-integration.md'
  );
}

export function createPrintfulOrder() {
  throw new Error(
    'Printful API is not configured. Set PRINTFUL_API_KEY and implement webhook flow.'
  );
}

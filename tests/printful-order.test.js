process.env.PRINTFUL_API_KEY = 'test-printful-key';
process.env.MERCH_ARTWORK_PUBLIC_ORIGIN = 'https://api.example.com';

const originalFetch = globalThis.fetch;
let capturedBody = null;

globalThis.fetch = async (url, options) => {
  if (String(url).includes('api.printful.com/orders')) {
    capturedBody = JSON.parse(options.body);
    return {
      ok: true,
      json: async () => ({ result: { id: 999001 } })
    };
  }
  throw new Error(`Unexpected fetch: ${url}`);
};

const { createPrintfulOrder } = await import('../api/lib/printful-client.js');

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const result = await createPrintfulOrder({
  recipient: {
    name: 'Test User',
    email: 'test@example.com',
    address1: '1 Test St',
    city: 'London',
    country_code: 'GB',
    postal_code: 'SW1A 1AA'
  },
  variantId: 4014,
  artworkUrl: 'https://api.example.com/api/artwork/test.png',
  externalId: 'order-test-1'
});

assert(result.id === 999001, 'printful order id');
assert(capturedBody.items[0].variant_id === 4014, 'variant id in payload');
assert(capturedBody.items[0].files[0].url.includes('artwork'), 'artwork url');

globalThis.fetch = originalFetch;
delete process.env.PRINTFUL_API_KEY;

console.log('printful-order.test.js: all passed');

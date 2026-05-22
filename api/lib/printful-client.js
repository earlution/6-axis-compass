const PRINTFUL_API = 'https://api.printful.com';

export function isPrintfulConfigured() {
  return !!process.env.PRINTFUL_API_KEY;
}

export async function printfulRequest(path, { method = 'GET', body } = {}) {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) throw new Error('PRINTFUL_API_KEY is not set');

  const res = await fetch(`${PRINTFUL_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.result || data?.error?.message || res.statusText;
    throw new Error(`Printful API error (${res.status}): ${msg}`);
  }
  return data;
}

export async function createPrintfulOrder({ recipient, variantId, artworkUrl, externalId }) {
  const payload = {
    external_id: externalId,
    recipient: {
      name: recipient.name,
      address1: recipient.address1,
      address2: recipient.address2 || '',
      city: recipient.city,
      state_code: recipient.state || recipient.state_code || '',
      country_code: recipient.country || recipient.country_code,
      zip: recipient.postal_code || recipient.zip,
      email: recipient.email,
      phone: recipient.phone || ''
    },
    items: [{
      variant_id: variantId,
      quantity: 1,
      files: [{ type: 'default', url: artworkUrl }]
    }]
  };

  const data = await printfulRequest('/orders', { method: 'POST', body: payload });
  return data.result;
}

export async function getPrintfulOrder(id) {
  const data = await printfulRequest(`/orders/${id}`);
  return data.result;
}

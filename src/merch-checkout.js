import { isMug } from './merch-catalog.js';
import { getActorSlug } from './merch-url.js';

export function buildCheckoutPayload(state) {
  const mug = isMug(state.garment);
  const axesOrder = state.axesOrder?.length === 6
    ? (state.axesOrder[0] === 'Cultural' && state.axesOrder[1] === 'Economic' ? 'cemslg' : 'egacsm')
    : 'cemslg';

  return {
    productType: mug ? 'mug' : 'apparel',
    scores: state.scores,
    axesOrder,
    orientation: state.orientation,
    invertedAxes: [...(state.invertedAxes || [])],
    actorSlugs: state.actorSlugs || [],
    customActors: state.customActors || [],
    uploadedMap: state.uploadedMap || null,
    showUser: state.showUser !== false,
    garment: state.garment,
    garmentColor: mug ? 'white' : (state.garmentColor || 'white'),
    chartTheme: state.chartTheme || (state.garmentColor === 'black' ? 'dark' : 'light'),
    size: mug ? undefined : (state.size || 'M'),
    mugSize: mug ? (state.mugSize || '11oz') : undefined,
    userMapColor: state.userMapColor,
    register: state.register || 'primary'
  };
}

export async function startCheckout(payload, apiBase) {
  const base = (apiBase || 'http://localhost:3000').replace(/\/$/, '');
  const res = await fetch(`${base}/api/checkout/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Checkout failed (${res.status})`);
  }
  if (!data.url) throw new Error('No checkout URL returned');
  window.location.href = data.url;
}

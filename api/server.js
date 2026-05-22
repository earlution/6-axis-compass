import http from 'http';
import { URL } from 'url';
import { handleHealth } from './routes/health.js';
import { handleActors } from './routes/actors.js';
import { handleActorDetail } from './routes/actor-detail.js';
import { handleChart } from './routes/chart.js';
import { handleAxes } from './routes/axes.js';
import { handleOpenApi } from './routes/openapi.js';
import { handleCheckoutSession } from './routes/checkout.js';
import { handleStripeWebhook } from './routes/webhooks-stripe.js';
import { handleMerchPrices } from './routes/merch-prices.js';
import { handleOrderStatus, handleOrderStatusBySession } from './routes/orders.js';
import { handleArtwork } from './routes/artwork.js';
import { checkReadAuth, sendJSON } from './lib/auth.js';
import { applyPublicCors, handleOptions } from './lib/cors.js';
import { checkChartRateLimit, checkCheckoutRateLimit } from './lib/rate-limit.js';
import { isPublicReadEnabled } from './lib/config.js';

const PORT = process.env.API_PORT || 3000;

const PUBLIC_READ_ROUTES = new Set([
  'GET /api/health',
  'GET /api/actors',
  'GET /api/actors/',
  'GET /api/axes',
  'GET /api/openapi.json',
  'POST /api/chart',
  'GET /api/merch/prices',
  'GET /api/orders/',
  'GET /api/orders/session/',
  'POST /api/checkout/session'
]);

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

function parseRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function routeKey(method, pathname) {
  if (pathname.startsWith('/api/actors/') && pathname !== '/api/actors') {
    return 'GET /api/actors/';
  }
  if (pathname.startsWith('/api/orders/session/')) {
    return 'GET /api/orders/session/';
  }
  if (pathname.startsWith('/api/orders/')) {
    return 'GET /api/orders/';
  }
  if (pathname.startsWith('/api/artwork/')) {
    return 'GET /api/artwork/';
  }
  return `${method} ${pathname}`;
}

function isPublicRoute(method, pathname) {
  if (!isPublicReadEnabled()) return false;
  return PUBLIC_READ_ROUTES.has(routeKey(method, pathname));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (isPublicRoute(req.method, pathname) || pathname.startsWith('/api/')) {
    applyPublicCors(req, res);
  }
  if (req.method === 'OPTIONS' && pathname.startsWith('/api/')) {
    handleOptions(req, res);
    return;
  }

  try {
    if (pathname === '/api/health' && req.method === 'GET') {
      await handleHealth(req, res);
    } else if (pathname === '/api/actors' && req.method === 'GET') {
      if (!checkReadAuth(req, res)) return;
      await handleActors(req, res);
    } else if (pathname.startsWith('/api/actors/') && req.method === 'GET') {
      if (!checkReadAuth(req, res)) return;
      const slug = decodeURIComponent(pathname.slice('/api/actors/'.length));
      await handleActorDetail(req, res, slug);
    } else if (pathname === '/api/chart' && req.method === 'POST') {
      if (!checkReadAuth(req, res)) return;
      if (!checkChartRateLimit(req, res)) return;
      const body = await parseBody(req);
      await handleChart(req, res, body);
    } else if (pathname === '/api/axes' && req.method === 'GET') {
      if (!checkReadAuth(req, res)) return;
      await handleAxes(req, res);
    } else if (pathname === '/api/openapi.json' && req.method === 'GET') {
      if (!checkReadAuth(req, res)) return;
      await handleOpenApi(req, res);
    } else if (pathname === '/api/merch/prices' && req.method === 'GET') {
      await handleMerchPrices(req, res);
    } else if (pathname === '/api/checkout/session' && req.method === 'POST') {
      if (!checkCheckoutRateLimit(req, res)) return;
      const body = await parseBody(req);
      await handleCheckoutSession(req, res, body);
    } else if (pathname === '/api/webhooks/stripe' && req.method === 'POST') {
      const rawBody = await parseRawBody(req);
      await handleStripeWebhook(req, res, rawBody);
    } else if (pathname.startsWith('/api/orders/session/') && req.method === 'GET') {
      const sessionId = decodeURIComponent(pathname.slice('/api/orders/session/'.length));
      await handleOrderStatusBySession(req, res, sessionId);
    } else if (pathname.startsWith('/api/orders/') && req.method === 'GET') {
      const orderId = decodeURIComponent(pathname.slice('/api/orders/'.length));
      await handleOrderStatus(req, res, orderId);
    } else if (pathname.startsWith('/api/artwork/') && req.method === 'GET') {
      const filename = decodeURIComponent(pathname.slice('/api/artwork/'.length));
      await handleArtwork(req, res, filename);
    } else {
      sendJSON(res, 404, { error: 'Not found' });
    }
  } catch (err) {
    console.error(err);
    sendJSON(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  const actualPort = server.address().port;
  console.log(`API server listening on port ${actualPort} (public read: ${isPublicReadEnabled()})`);
});

export { server };

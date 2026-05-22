const WINDOW_MS = 60_000;
const MAX_CHART = parseInt(process.env.API_CHART_RATE_LIMIT || '60', 10);
const MAX_CHECKOUT = parseInt(process.env.MERCH_CHECKOUT_RATE_LIMIT || '20', 10);
const buckets = new Map();

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return String(forwarded).split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function checkLimit(req, res, scope, max) {
  const key = `${scope}:${clientKey(req)}`;
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(key, bucket);
  }
  bucket.count += 1;
  if (bucket.count > max) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Retry-After', String(retryAfter));
    res.end(JSON.stringify({ error: 'Too many requests', retryAfter }));
    return false;
  }
  return true;
}

export function checkChartRateLimit(req, res) {
  return checkLimit(req, res, 'chart', MAX_CHART);
}

export function checkCheckoutRateLimit(req, res) {
  return checkLimit(req, res, 'checkout', MAX_CHECKOUT);
}

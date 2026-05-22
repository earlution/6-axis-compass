const PUBLIC_METHODS = 'GET, POST, OPTIONS';
const PUBLIC_HEADERS = 'Content-Type, Authorization';

function allowedOrigins() {
  const raw = process.env.MERCH_CORS_ORIGINS || '';
  if (!raw.trim()) return null;
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

function requestOrigin(req) {
  const origin = req.headers.origin;
  if (origin) return origin;
  const referer = req.headers.referer;
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function applyPublicCors(req, res) {
  const allowlist = allowedOrigins();
  const origin = requestOrigin(req);

  if (!allowlist) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (origin && allowlist.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else if (origin) {
    res.setHeader('Access-Control-Allow-Origin', 'null');
  }

  res.setHeader('Access-Control-Allow-Methods', PUBLIC_METHODS);
  res.setHeader('Access-Control-Allow-Headers', PUBLIC_HEADERS);
}

export function handleOptions(req, res) {
  applyPublicCors(req, res);
  res.statusCode = 204;
  res.end();
}

export function isCorsAllowed(req) {
  const allowlist = allowedOrigins();
  if (!allowlist) return true;
  const origin = requestOrigin(req);
  if (!origin) return true;
  return allowlist.includes(origin);
}

const PUBLIC_METHODS = 'GET, POST, OPTIONS';
const PUBLIC_HEADERS = 'Content-Type, Authorization';

export function applyPublicCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', PUBLIC_METHODS);
  res.setHeader('Access-Control-Allow-Headers', PUBLIC_HEADERS);
}

export function handleOptions(req, res) {
  applyPublicCors(req, res);
  res.statusCode = 204;
  res.end();
}

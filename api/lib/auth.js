import { isPublicReadEnabled } from './config.js';

export function sendJSON(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/** Legacy read auth: optional when public read is on; required when API_PUBLIC_READ=false. */
export function checkReadAuth(req, res) {
  if (isPublicReadEnabled()) return true;

  const secret = process.env.API_SECRET;
  if (!secret) {
    sendJSON(res, 500, { error: 'API_SECRET not configured' });
    return false;
  }
  const auth = req.headers['authorization'] || '';
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || parts[1] !== secret) {
    sendJSON(res, 401, { error: 'Unauthorized' });
    return false;
  }
  return true;
}

/** Phase 2 — admin write routes (not wired yet). */
export function checkAdminAuth(req, res) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    sendJSON(res, 503, { error: 'ADMIN_SECRET not configured' });
    return false;
  }
  const auth = req.headers['authorization'] || '';
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer' || parts[1] !== secret) {
    sendJSON(res, 401, { error: 'Unauthorized' });
    return false;
  }
  return true;
}

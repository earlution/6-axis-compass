import http from 'http';
import { URL } from 'url';
import { handleHealth } from './routes/health.js';
import { handleActors } from './routes/actors.js';
import { handleChart } from './routes/chart.js';

const PORT = process.env.API_PORT || 3000;

function sendJSON(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
  });
}

function checkAuth(req, res) {
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

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (url.pathname === '/api/health' && req.method === 'GET') {
      await handleHealth(req, res);
    } else if (url.pathname === '/api/actors' && req.method === 'GET') {
      if (!checkAuth(req, res)) return;
      await handleActors(req, res);
    } else if (url.pathname === '/api/chart' && req.method === 'POST') {
      if (!checkAuth(req, res)) return;
      const body = await parseBody(req);
      await handleChart(req, res, body);
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
  console.log(`API server listening on port ${actualPort}`);
});

export { server };

import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let serverPort = null;
let serverProc = null;

function sendRequest(method, pathname, body) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: serverPort,
      path: pathname,
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {}
    }, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data || '{}') }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function startServer() {
  return new Promise((resolve, reject) => {
    serverProc = spawn('node', [path.join(__dirname, '..', 'api', 'server.js')], {
      env: {
        ...process.env,
        API_PUBLIC_READ: 'true',
        API_PORT: '0',
        STRIPE_SECRET_KEY: 'sk_test_fake_for_validation_only'
      },
      stdio: ['ignore', 'pipe', 'pipe']
    });
    let output = '';
    serverProc.stdout.on('data', (chunk) => {
      output += chunk.toString();
      const match = output.match(/listening on port (\d+)/);
      if (match && !serverPort) {
        serverPort = parseInt(match[1], 10);
        resolve();
      }
    });
    serverProc.stderr.on('data', (c) => process.stderr.write(c));
    serverProc.on('error', reject);
  });
}

function stopServer() {
  if (serverProc) serverProc.kill();
}

const scores = {
  Cultural: 5, Economic: 5, Military: 5,
  Sovereignty: 5, Class: 5, Governance: 5
};

await startServer();

const prices = await sendRequest('GET', '/api/merch/prices');
if (prices.status !== 200 || !prices.body.prices?.tee) {
  throw new Error('GET /api/merch/prices failed');
}

const bad = await sendRequest('POST', '/api/checkout/session', { scores: {} });
if (bad.status === 200) throw new Error('expected validation failure');

const valid = await sendRequest('POST', '/api/checkout/session', {
  productType: 'apparel',
  scores,
  axesOrder: 'cemslg',
  orientation: 'flat',
  garment: 'tee',
  garmentColor: 'white',
  size: 'M',
  userMapColor: '#c8a84b'
});

if (valid.status === 400) {
  // Stripe mock key may fail at session create — that's ok if error is Stripe-related
  if (!valid.body.error?.includes('Stripe')) {
    throw new Error(`unexpected checkout error: ${valid.body.error}`);
  }
} else if (valid.status !== 200 || !valid.body.url) {
  throw new Error(`checkout session failed: ${JSON.stringify(valid.body)}`);
}

stopServer();
console.log('checkout-session.test.js: all passed');

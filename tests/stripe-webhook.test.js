import http from 'http';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let serverPort = null;
let serverProc = null;

function request(method, pathname, headers, body) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: serverPort,
      path: pathname,
      method,
      headers: headers || {}
    }, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        let parsed = {};
        try { parsed = JSON.parse(data || '{}'); } catch (_) {}
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function startServer() {
  return new Promise((resolve, reject) => {
    serverProc = spawn('node', [path.join(__dirname, '..', 'api', 'server.js')], {
      env: { ...process.env, API_PUBLIC_READ: 'true', API_PORT: '0', STRIPE_WEBHOOK_SECRET: 'whsec_test' },
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
    serverProc.on('error', reject);
  });
}

await startServer();

const missingSig = await request('POST', '/api/webhooks/stripe', { 'Content-Type': 'application/json' }, '{}');
if (missingSig.status !== 400) {
  throw new Error(`expected 400 without signature, got ${missingSig.status}`);
}

const badSig = await request('POST', '/api/webhooks/stripe', {
  'Content-Type': 'application/json',
  'stripe-signature': 'bad'
}, '{}');
if (badSig.status !== 400) {
  throw new Error(`expected 400 for bad signature, got ${badSig.status}`);
}

serverProc.kill();
console.log('stripe-webhook.test.js: all passed');

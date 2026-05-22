const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const API_SECRET = 'test-secret-for-api-tests';
let serverPort = null;
let serverProc = null;

function sendRequest(method, path, headers, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: serverPort,
      path,
      method,
      headers: headers || {}
    };

    const req = http.request(options, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: buffer
        });
      });
    });

    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`FAIL: ${message}`);
    console.error(`  Expected: ${expected}`);
    console.error(`  Actual:   ${actual}`);
    process.exit(1);
  }
}

function assertTrue(value, message) {
  if (!value) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

async function startServer() {
  return new Promise((resolve, reject) => {
    const serverPath = path.join(__dirname, '..', 'api', 'server.js');
    serverProc = spawn('node', [serverPath], {
      env: { ...process.env, API_SECRET, API_PUBLIC_READ: 'true', API_PORT: '0' },
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

    serverProc.stderr.on('data', (chunk) => {
      console.error('Server stderr:', chunk.toString());
    });

    serverProc.on('error', reject);
    serverProc.on('exit', (code) => {
      if (!serverPort) {
        reject(new Error(`Server exited with code ${code} before port was logged`));
      }
    });

    setTimeout(() => {
      if (!serverPort) {
        reject(new Error('Server did not start within timeout'));
      }
    }, 10000);
  });
}

function stopServer() {
  if (serverProc) {
    serverProc.kill();
  }
}

async function runTests() {
  try {
    await startServer();
    console.log(`Server running on port ${serverPort}`);

    // Test 1: Health endpoint (unauthenticated)
    const health = await sendRequest('GET', '/api/health');
    assertEqual(health.statusCode, 200, 'Health should return 200');
    const healthJson = JSON.parse(health.body.toString());
    assertEqual(healthJson.status, 'ok', 'Health status should be ok');
    assertTrue(healthJson.version, 'Health should have version');
    assertEqual(healthJson.apiVersion, '2.0.2', 'Health should expose API 2.0.2');
    assertEqual(healthJson.publicRead, true, 'Health should report public read enabled');

    // Test 2: Public read — actors without auth
    const actorsNoAuth = await sendRequest('GET', '/api/actors');
    assertEqual(actorsNoAuth.statusCode, 200, 'Actors without auth should return 200 (public read)');
    const actorsPublic = JSON.parse(actorsNoAuth.body.toString());
    assertTrue(Array.isArray(actorsPublic.actors), 'Public actors response should contain actors array');
    assertTrue(actorsPublic.meta?.axesOrder?.length === 6, 'Actors meta should include axesOrder');

    // Test 3: Actors with optional bearer still works
    const actorsOk = await sendRequest('GET', '/api/actors', {
      'Authorization': `Bearer ${API_SECRET}`
    });
    assertEqual(actorsOk.statusCode, 200, 'Actors with optional auth should return 200');
    assertTrue(actorsOk.body.toString().includes('Green Party'), 'Actors should include Green Party');

    // Test 4: Chart SVG without auth (public read)
    const chartSvg = await sendRequest('POST', '/api/chart', {
      'Content-Type': 'application/json'
    }, {
      scores: { Cultural: 5, Economic: 5, Military: 5, Sovereignty: 5, Governance: 5, Class: 5 },
      format: 'svg'
    });
    assertEqual(chartSvg.statusCode, 200, 'Chart SVG should return 200');
    assertEqual(chartSvg.headers['content-type'], 'image/svg+xml', 'Chart SVG content-type should be image/svg+xml');
    const svgStr = chartSvg.body.toString();
    assertTrue(svgStr.includes('<svg'), 'Chart SVG should contain <svg tag');
    assertTrue(svgStr.includes('CUL'), 'Chart SVG should contain CUL trigram (default labelMode)');

    // Test 5: GET /api/axes
    const axes = await sendRequest('GET', '/api/axes');
    assertEqual(axes.statusCode, 200, 'Axes catalog should return 200');
    const axesJson = JSON.parse(axes.body.toString());
    assertEqual(axesJson.axesOrder[0], 'Cultural', 'First axis should be Cultural (OQ2)');
    assertEqual(axesJson.trigrams?.Cultural, 'CUL', 'Axes catalog should include trigrams');
    assertEqual(axesJson.axes[0]?.trigram, 'CUL', 'Axis entry should include trigram');

    // Test 6: Chart SVG with actor overlay
    const chartActors = await sendRequest('POST', '/api/chart', {
      'Content-Type': 'application/json'
    }, {
      scores: { Cultural: 5, Economic: 5, Military: 5, Sovereignty: 5, Governance: 5, Class: 5 },
      actors: ['Green Party'],
      format: 'svg'
    });
    assertEqual(chartActors.statusCode, 200, 'Chart with actors should return 200');
    const svgActorsStr = chartActors.body.toString();
    assertTrue(svgActorsStr.includes('<svg'), 'Chart with actors should contain <svg tag');

    // Test 7: Chart PNG
    const chartPng = await sendRequest('POST', '/api/chart', {
      'Content-Type': 'application/json'
    }, {
      scores: { Cultural: 5, Economic: 5, Military: 5, Sovereignty: 5, Governance: 5, Class: 5 },
      format: 'png'
    });
    assertEqual(chartPng.statusCode, 200, 'Chart PNG should return 200');
    assertEqual(chartPng.headers['content-type'], 'image/png', 'Chart PNG content-type should be image/png');
    assertTrue(chartPng.body.length > 0, 'Chart PNG body should not be empty');
    const pngMagic = chartPng.body.slice(0, 8).toString('hex');
    assertEqual(pngMagic, '89504e470d0a1a0a', 'Chart PNG should start with PNG magic bytes');

    // Test 8: Chart with invalid axis
    const chartBadAxis = await sendRequest('POST', '/api/chart', {
      'Content-Type': 'application/json'
    }, {
      scores: { Cultural: 5, InvalidAxis: 5 },
      format: 'svg'
    });
    assertEqual(chartBadAxis.statusCode, 400, 'Chart with invalid axis should return 400');

    // Test 9: Chart with out-of-range score
    const chartBadScore = await sendRequest('POST', '/api/chart', {
      'Content-Type': 'application/json'
    }, {
      scores: { Cultural: 15 },
      format: 'svg'
    });
    assertEqual(chartBadScore.statusCode, 400, 'Chart with out-of-range score should return 400');

    // Test 10: Chart with unknown actor
    const chartBadActor = await sendRequest('POST', '/api/chart', {
      'Content-Type': 'application/json'
    }, {
      scores: { Cultural: 5, Economic: 5, Military: 5, Sovereignty: 5, Governance: 5, Class: 5 },
      actors: ['Totally Fake Actor'],
      format: 'svg'
    });
    assertEqual(chartBadActor.statusCode, 400, 'Chart with unknown actor should return 400');

    // Test 11: Chart with invalid format
    const chartBadFormat = await sendRequest('POST', '/api/chart', {
      'Content-Type': 'application/json'
    }, {
      scores: { Cultural: 5, Economic: 5, Military: 5, Sovereignty: 5, Governance: 5, Class: 5 },
      format: 'gif'
    });
    assertEqual(chartBadFormat.statusCode, 400, 'Chart with invalid format should return 400');

    console.log('All tests passed');
  } finally {
    stopServer();
  }
}

runTests().catch(err => {
  console.error('Test error:', err.message);
  stopServer();
  process.exit(1);
});

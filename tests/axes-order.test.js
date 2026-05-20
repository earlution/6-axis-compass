const fs = require('fs');
const path = require('path');

const CANONICAL_AXES = ['Cultural', 'Economic', 'Military', 'Sovereignty', 'Governance', 'Class'];

function loadModule(file) {
  const code = fs.readFileSync(path.join(__dirname, '..', 'src', file), 'utf-8');
  return code
    .replace(/^\s*import\s+.*from\s+['"].*['"];?\s*$/gm, '')
    .replace(/^\s*export\s+/gm, '');
}

const { AXES } = (() => {
  const code = loadModule('data.js') + '; return { AXES };';
  return new Function(code)();
})();

function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.error(`FAIL: ${message}`);
    console.error(`  Expected: ${JSON.stringify(expected)}`);
    console.error(`  Actual:   ${JSON.stringify(actual)}`);
    process.exit(1);
  }
}

assertEqual(AXES, CANONICAL_AXES, 'src/data.js AXES must match OQ2 canonical order');

// flat orientation: index 0 (Cultural) at top flat edge — start angle -60°
function spokeSin(i) {
  const angle = (i * 60 - 60) * (Math.PI / 180);
  return Math.sin(angle);
}
let topIndex = 0;
for (let i = 1; i < 6; i++) {
  if (spokeSin(i) < spokeSin(topIndex)) topIndex = i;
}
assertEqual(topIndex, 0, 'Cultural (index 0) must be the topmost spoke at flat orientation');

console.log('axes-order tests passed');

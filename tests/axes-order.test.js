const fs = require('fs');
const path = require('path');

const PEDAGOGICAL_AXES = ['Cultural', 'Economic', 'Military', 'Sovereignty', 'Governance', 'Class'];
const SPATIAL_AXES = ['Economic', 'Governance', 'Class', 'Cultural', 'Sovereignty', 'Military'];
const SPATIAL_DISPLAY_INVERT = ['Economic', 'Governance', 'Class', 'Sovereignty'];

function loadModule(file) {
  const code = fs.readFileSync(path.join(__dirname, '..', 'src', file), 'utf-8');
  return code
    .replace(/^\s*import\s+.*from\s+['"].*['"];?\s*$/gm, '')
    .replace(/^\s*export\s+/gm, '');
}

const data = (() => {
  const code = loadModule('data.js') + '; return { AXES, SPATIAL_AXES, SPATIAL_DISPLAY_INVERT };';
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

assertEqual(data.AXES, PEDAGOGICAL_AXES, 'AXES must match OQ2 pedagogical order');
assertEqual(data.SPATIAL_AXES, SPATIAL_AXES, 'SPATIAL_AXES must match OQ5 spatial circuit');
assertEqual(data.SPATIAL_DISPLAY_INVERT, SPATIAL_DISPLAY_INVERT, 'SPATIAL_DISPLAY_INVERT must match OQ5 defaults');

function spokeSin(i, start) {
  const angle = (i * 60 + start) * (Math.PI / 180);
  return Math.sin(angle);
}

// flat: Cultural at top (pedagogical)
let topIndex = 0;
for (let i = 1; i < 6; i++) {
  if (spokeSin(i, -60) < spokeSin(topIndex, -60)) topIndex = i;
}
assertEqual(topIndex, 0, 'Pedagogical flat: Cultural (index 0) topmost');

// spatial: Economic at lower-left (index 0, start 120°)
const x0 = Math.cos(120 * Math.PI / 180);
const y0 = Math.sin(120 * Math.PI / 180);
assertEqual(data.SPATIAL_AXES[0], 'Economic', 'Spatial index 0 is Economic');
if (!(x0 < 0 && y0 > 0)) {
  console.error('FAIL: Spatial index 0 spoke should point lower-left');
  process.exit(1);
}

console.log('axes-order tests passed');

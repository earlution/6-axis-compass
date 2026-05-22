import { encodeMerchHash, decodeMerchHash, mergeMerchState } from '../src/merch-url.js';
import { AXES } from '../src/data.js';

const scores = Object.fromEntries(AXES.map((a, i) => [a, i + 1]));

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const hash = encodeMerchHash({
  scores,
  orientation: 'flat',
  axesOrder: [...AXES],
  invertedAxes: new Set(),
  actorSlugs: ['Green-Party'],
  garment: 'hoodie',
  garmentColor: 'black',
  chartTheme: 'dark',
  register: 'primary',
  userMapColor: '#c8a84b'
});

assert(hash.startsWith('#v3'), 'merch hash v3');
const decoded = decodeMerchHash(hash);
assert(decoded.scores.Cultural === 1, 'scores round-trip');
assert(decoded.garment === 'hoodie', 'garment');
assert(decoded.garmentColor === 'black', 'garmentColor');
assert(decoded.actorSlugs[0] === 'Green-Party', 'actor slugs');
assert(decoded.chartTheme === 'dark', 'chartTheme');
assert(decoded.userMapColor === '#c8a84b', 'userMapColor');
assert(hash.includes(';uc=c8a84b'), 'hash includes uc');

const mugHash = encodeMerchHash({
  scores,
  orientation: 'flat',
  axesOrder: [...AXES],
  invertedAxes: new Set(),
  garment: 'mug',
  garmentColor: 'white',
  chartTheme: 'light',
  mugSize: '15oz'
});
assert(mugHash.includes(';g=mug'), 'mug garment in hash');
assert(mugHash.includes(';ms=15oz'), 'mug size in hash');
const mugDecoded = decodeMerchHash(mugHash);
assert(mugDecoded.garment === 'mug', 'mug decode');
assert(mugDecoded.mugSize === '15oz', 'mug size decode');

const merged = mergeMerchState(decoded, { size: 'L' });
assert(merged.size === 'L', 'merge draft size');

console.log('merch-url.test.js: all passed');

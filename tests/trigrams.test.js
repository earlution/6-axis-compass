import {
  AXES,
  AXIS_TRIGRAMS,
  getAxisTrigram,
  TRIGRAM_RING_PEDAGOGICAL,
  TRIGRAM_RING_SPATIAL
} from '../src/data.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

assert(AXES.length === 6, 'six axes');

const codes = AXES.map(ax => AXIS_TRIGRAMS[ax]);
assert(new Set(codes).size === 6, 'trigrams must be unique');
codes.forEach(c => {
  assert(c === c.toUpperCase(), `${c} must be uppercase`);
  assert(c.length === 3, `${c} must be three letters`);
});

assert(AXIS_TRIGRAMS.Cultural === 'CUL', 'Cultural is CUL not CTE');
assert(AXIS_TRIGRAMS.Cultural !== 'CTE', 'explicitly not CTE');
assert(getAxisTrigram('Governance') === 'GOV', 'getAxisTrigram');

assert(TRIGRAM_RING_PEDAGOGICAL === 'CUL ECO MIL SOV GOV CLA', 'pedagogical ring');
assert(TRIGRAM_RING_SPATIAL === 'ECO GOV CLA CUL SOV MIL', 'spatial ring');

console.log('trigrams.test.js: all passed');

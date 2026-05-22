import { renderSVG, normalizeBackground } from '../api/lib/chart-renderer.js';
import { renderMugPNG } from '../api/lib/mug-renderer.js';

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const baseConfig = {
  scores: {
    Cultural: 5, Economic: 5, Military: 5,
    Sovereignty: 5, Governance: 5, Class: 5
  },
  layout: 'pedagogical',
  labelMerch: true
};

const whiteSvg = renderSVG({ ...baseConfig, background: 'white' });
assert(whiteSvg.includes('#ffffff'), 'white background present');
assert(whiteSvg.includes('CUL') || whiteSvg.includes('getAxisTrigram'), 'trigram labels');

const transparentSvg = renderSVG({ ...baseConfig, background: 'transparent' });
assert(!transparentSvg.includes('fill="#ffffff"') || transparentSvg.indexOf('fill="#ffffff"') > transparentSvg.indexOf('<polygon'), 'no white bg rect for transparent');

const darkSvg = renderSVG({ ...baseConfig, background: 'dark' });
assert(darkSvg.includes('#1a1a1a'), 'dark background');

assert(normalizeBackground('invalid') === 'white', 'invalid bg defaults white');

const mugPng = await renderMugPNG({
  ...baseConfig,
  productType: 'mug',
  mugLayout: 'radar'
}, 900, 375);
assert(mugPng.length > 1000, 'mug png generated');
assert(mugPng[0] === 0x89 && mugPng[1] === 0x50, 'png magic bytes');

console.log('chart-renderer-themes.test.js: all passed');

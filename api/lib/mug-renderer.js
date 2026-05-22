import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sharp from 'sharp';
import { renderSVG } from './chart-renderer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', '..', 'src');

function loadModule(file) {
  const code = readFileSync(join(SRC, file), 'utf-8');
  return code
    .replace(/^\s*import\s+.*from\s+['"].*['"];?\s*$/gm, '')
    .replace(/^\s*export\s+/gm, '');
}

const { AXIS_TRIGRAMS, TRIGRAM_RING_PEDAGOGICAL } = new Function(
  loadModule('data.js') + '\nreturn { AXIS_TRIGRAMS, TRIGRAM_RING_PEDAGOGICAL };'
)();

/** Mug wrap safe zone: chart centred left of handle dead zone (~right 25%). */
const MUG_VIEWBOX = '0 0 900 375';
const CHART_OFFSET_X = 70;
const CHART_SCALE = 0.85;

function renderTrigramRingSVG(config) {
  const ring = (config.axes || []).map(ax => AXIS_TRIGRAMS[ax] || ax.slice(0, 3).toUpperCase());
  const text = ring.join('  ');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MUG_VIEWBOX}" width="2700" height="1125">
  <rect width="900" height="375" fill="#ffffff"/>
  <text x="340" y="195" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,sans-serif"
    font-size="42" font-weight="600" letter-spacing="0.15em" fill="#333">${text}</text>
  <text x="340" y="240" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,sans-serif"
    font-size="18" fill="#666">Six-Axis Political Compass</text>
</svg>`;
}

function wrapRadarInMugLayout(radarSvgString) {
  const inner = radarSvgString
    .replace(/<\?xml[^?]*\?>/, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MUG_VIEWBOX}" width="2700" height="1125">
  <rect width="900" height="375" fill="#ffffff"/>
  <g transform="translate(${CHART_OFFSET_X}, 27.5) scale(${CHART_SCALE})">
    ${inner}
  </g>
</svg>`;
}

export async function renderMugPNG(config, width = 2700, height = 1125) {
  let svgString;
  if (config.mugLayout === 'ring') {
    svgString = renderTrigramRingSVG(config);
  } else {
    const radarSvg = renderSVG({ ...config, background: 'white' });
    svgString = wrapRadarInMugLayout(radarSvg);
  }

  return sharp(Buffer.from(svgString))
    .resize(width, height)
    .png()
    .toBuffer();
}

export { TRIGRAM_RING_PEDAGOGICAL };

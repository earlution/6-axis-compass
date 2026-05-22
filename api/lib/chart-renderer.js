import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sharp from 'sharp';
import {
  CANONICAL_AXES,
  SPATIAL_AXES,
  SPATIAL_DISPLAY_INVERT,
  SPATIAL_STRUCTURAL_DISPLAY_INVERT
} from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SRC = join(ROOT, 'src');

function loadModule(file) {
  const code = readFileSync(join(SRC, file), 'utf-8');
  return code
    .replace(/^\s*import\s+.*from\s+['"].*['"];?\s*$/gm, '')
    .replace(/^\s*export\s+/gm, '');
}

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

const { getEffectiveScores, getAxisTrigram } = new Function(
  loadModule('data.js') + '\nreturn { getEffectiveScores, getAxisTrigram };'
)();
const modulesCode = loadModule('i18n.js') + '\n\n' + loadModule('chart.js');
const moduleScope = new Function(
  'getEffectiveScores',
  'getAxisTrigram',
  modulesCode + '\nreturn { drawRadar, setLanguage };'
)(getEffectiveScores, getAxisTrigram);
const { drawRadar, setLanguage } = moduleScope;

setLanguage('en');

function createPrintSVG(viewBox = '0 0 320 320', width = 600, height = 600) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  svg.setAttribute('role', 'img');
  return svg;
}

function normalizeBackground(background) {
  if (background === 'transparent' || background === 'dark' || background === 'white') {
    return background;
  }
  return 'white';
}

function postProcessSVG(svg, title, background = 'white') {
  const bgMode = normalizeBackground(background);
  const isLightOnDark = bgMode === 'transparent' || bgMode === 'dark';

  if (bgMode === 'white') {
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', '0');
    bg.setAttribute('y', '0');
    bg.setAttribute('width', '320');
    bg.setAttribute('height', '320');
    bg.setAttribute('fill', '#ffffff');
    svg.insertBefore(bg, svg.firstChild);
  } else if (bgMode === 'dark') {
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', '0');
    bg.setAttribute('y', '0');
    bg.setAttribute('width', '320');
    bg.setAttribute('height', '320');
    bg.setAttribute('fill', '#1a1a1a');
    svg.insertBefore(bg, svg.firstChild);
  }

  const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  titleEl.textContent = `Six-Axis Political Compass — ${title}`;
  svg.insertBefore(titleEl, svg.firstChild);

  if (!isLightOnDark) {
    const polygons = svg.querySelectorAll('polygon');
    polygons.forEach(poly => {
      const stroke = poly.getAttribute('stroke') || '';
      const fill = poly.getAttribute('fill') || '';
      if (stroke.includes('rgba(255,255,255')) {
        poly.setAttribute('stroke', stroke.replace('rgba(255,255,255', 'rgba(0,0,0').replace('0.07)', '0.10)').replace('0.1)', '0.15)'));
      }
      if (fill.includes('rgba(255,255,255')) {
        poly.setAttribute('fill', fill.replace('rgba(255,255,255', 'rgba(0,0,0'));
      }
      if (stroke === 'var(--chart-grid)') {
        poly.setAttribute('stroke', 'rgba(0,0,0,0.15)');
      }
    });

    const lines = svg.querySelectorAll('line');
    lines.forEach(line => {
      const stroke = line.getAttribute('stroke') || '';
      if (stroke.includes('rgba(255,255,255')) {
        line.setAttribute('stroke', stroke.replace('rgba(255,255,255', 'rgba(0,0,0').replace('0.1)', '0.15)'));
      }
      if (stroke === 'var(--chart-axis)') {
        line.setAttribute('stroke', 'rgba(0,0,0,0.2)');
      }
    });

    const texts = svg.querySelectorAll('text');
    texts.forEach(text => {
      const fill = text.getAttribute('fill') || '';
      if (fill.includes('rgba(232,228,218')) {
        text.setAttribute('fill', '#333333');
      }
      if (fill === 'var(--chart-label)') {
        text.setAttribute('fill', '#333333');
      }
    });

    const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    border.setAttribute('x', '0');
    border.setAttribute('y', '0');
    border.setAttribute('width', '320');
    border.setAttribute('height', '320');
    border.setAttribute('fill', 'none');
    border.setAttribute('stroke', '#cccccc');
    border.setAttribute('stroke-width', '1');
    svg.appendChild(border);
  } else {
    const polygons = svg.querySelectorAll('polygon');
    polygons.forEach(poly => {
      if (poly.getAttribute('stroke') === 'var(--chart-grid)') {
        poly.setAttribute('stroke', 'rgba(255,255,255,0.15)');
      }
    });
    const lines = svg.querySelectorAll('line');
    lines.forEach(line => {
      if (line.getAttribute('stroke') === 'var(--chart-axis)') {
        line.setAttribute('stroke', 'rgba(255,255,255,0.25)');
      }
    });
    const texts = svg.querySelectorAll('text');
    texts.forEach(text => {
      if (text.getAttribute('fill') === 'var(--chart-label)') {
        text.setAttribute('fill', 'rgba(232,228,218,0.95)');
      }
    });
  }
}

export function renderSVG(config) {
  const layout = config.layout === 'pedagogical' ? 'pedagogical' : 'spatial';
  const axes = config.axes || (layout === 'pedagogical' ? CANONICAL_AXES : SPATIAL_AXES);
  const orientation = config.orientation || (layout === 'pedagogical' ? 'flat' : 'spatial');
  let invertedAxes;
  if (config.invertedAxes instanceof Set) {
    invertedAxes = config.invertedAxes;
  } else if (Array.isArray(config.invertedAxes)) {
    invertedAxes = new Set(config.invertedAxes);
  } else if (layout === 'spatial' && config.register === 'structural') {
    invertedAxes = new Set(SPATIAL_STRUCTURAL_DISPLAY_INVERT);
  } else if (layout === 'spatial') {
    invertedAxes = new Set(SPATIAL_DISPLAY_INVERT);
  } else {
    invertedAxes = new Set();
  }

  const background = normalizeBackground(config.background || 'white');
  const svg = createPrintSVG();
  drawRadar(svg, {
    scores: config.scores || {},
    axes,
    orientation,
    actors: config.actors || [],
    showUser: config.showUser !== false,
    userColor: config.userColor || '#c8a84b',
    uploadedMap: config.uploadedMap || null,
    uploadedColor: config.uploadedColor || '#b478dc',
    invertedAxes,
    register: config.register || 'primary',
    labelMode: config.labelMode || 'trigram',
    labelMerch: config.labelMerch === true
  });
  postProcessSVG(svg, config.title || 'Chart', background);
  return svg.outerHTML;
}

export async function renderPNG(config, width = 600, height = 600) {
  const svgString = renderSVG(config);
  const background = normalizeBackground(config.background || 'white');
  let pipeline = sharp(Buffer.from(svgString)).resize(width, height);

  if (background === 'transparent') {
    pipeline = pipeline.png();
  } else {
    pipeline = pipeline.png();
  }

  return pipeline.toBuffer();
}

export { normalizeBackground };

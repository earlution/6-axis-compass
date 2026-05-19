import { getEffectiveScores } from './data.js';
import { t } from './i18n.js';

const NS = 'http://www.w3.org/2000/svg';

function createSVGElement(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function axisPoint(cx, cy, maxR, index, value, orientation) {
  const start = orientation === 'flat' ? -60 : -90;
  const angle = (index * 60 + start) * (Math.PI / 180);
  const dist = (value / 10) * maxR;
  return [cx + dist * Math.cos(angle), cy + dist * Math.sin(angle)];
}

function polygonPoints(cx, cy, maxR, scores, axes, orientation) {
  return axes.map((ax, i) => {
    const [x, y] = axisPoint(cx, cy, maxR, i, scores[ax] || 0, orientation);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
}

export function drawRadar(svg, {
  scores,
  axes,
  orientation = 'flat',
  actors = [],
  uploadedMap = null,
  showUser = true,
  userColor = '#c8a84b',
  uploadedColor = '#b478dc',
  invertedAxes = new Set(),
  register = 'primary'
}) {
  svg.innerHTML = '';
  const cx = 160, cy = 160, maxR = 108;

  function displayScore(ax, val) {
    return invertedAxes && invertedAxes.has(ax) ? 10 - val : val;
  }

  function displayScores(source) {
    const out = {};
    for (const ax of axes) out[ax] = displayScore(ax, source[ax] || 0);
    return out;
  }

  // Grid polygons at levels 2, 4, 6, 8, 10
  for (const level of [2, 4, 6, 8, 10]) {
    const gridScores = Object.fromEntries(axes.map(a => [a, level]));
    svg.appendChild(createSVGElement('polygon', {
      points: polygonPoints(cx, cy, maxR, gridScores, axes, orientation),
      fill: 'none',
      stroke: 'var(--chart-grid)',
      'stroke-width': '1'
    }));
  }

  // Axis lines
  axes.forEach((_, i) => {
    const [x, y] = axisPoint(cx, cy, maxR, i, 10, orientation);
    svg.appendChild(createSVGElement('line', {
      x1: cx, y1: cy, x2: x, y2: y,
      stroke: 'var(--chart-axis)', 'stroke-width': '1'
    }));
  });

  // User profile (drawn first so actors overlay it)
  if (showUser) {
    const disp = displayScores(scores);
    svg.appendChild(createSVGElement('polygon', {
      points: polygonPoints(cx, cy, maxR, disp, axes, orientation),
      fill: userColor + '1e',
      stroke: userColor,
      'stroke-width': '2.5'
    }));
    axes.forEach((ax, i) => {
      const [x, y] = axisPoint(cx, cy, maxR, i, disp[ax], orientation);
      svg.appendChild(createSVGElement('circle', { cx: x, cy: y, r: '4', fill: userColor }));
    });
  }

  // Uploaded map overlay
  if (uploadedMap) {
    const disp = displayScores(uploadedMap.scores);
    svg.appendChild(createSVGElement('polygon', {
      points: polygonPoints(cx, cy, maxR, disp, axes, orientation),
      fill: 'rgba(180,120,220,0.12)',
      stroke: uploadedColor,
      'stroke-width': '2',
      'stroke-dasharray': '6,3'
    }));
    axes.forEach((ax, i) => {
      const [x, y] = axisPoint(cx, cy, maxR, i, disp[ax], orientation);
      svg.appendChild(createSVGElement('circle', { cx: x, cy: y, r: '3.5', fill: uploadedColor }));
    });
  }

  // Actor overlays (drawn last so they sit on top)
  for (const actor of actors) {
    const effectiveScores = getEffectiveScores(actor, register);
    svg.appendChild(createSVGElement('polygon', {
      points: polygonPoints(cx, cy, maxR, displayScores(effectiveScores), axes, orientation),
      fill: actor.color + '18',
      stroke: actor.color + '80',
      'stroke-width': '1.5'
    }));
  }

  // Axis labels
  axes.forEach((ax, i) => {
    const [lx, ly] = axisPoint(cx, cy, maxR + 26, i, 10, orientation);
    const labelEl = createSVGElement('text', {
      x: lx.toFixed(2), y: ly.toFixed(2),
      'text-anchor': 'middle', 'dominant-baseline': 'middle',
      'font-size': '11', 'font-family': '-apple-system,BlinkMacSystemFont,sans-serif',
      fill: 'var(--chart-label)'
    });
    labelEl.textContent = t('axis.' + ax);
    svg.appendChild(labelEl);
  });
}

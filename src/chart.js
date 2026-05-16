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
  uploadedColor = '#b478dc'
}) {
  svg.innerHTML = '';
  const cx = 160, cy = 160, maxR = 108;

  // Grid polygons at levels 2, 4, 6, 8, 10
  for (const level of [2, 4, 6, 8, 10]) {
    const gridScores = Object.fromEntries(axes.map(a => [a, level]));
    svg.appendChild(createSVGElement('polygon', {
      points: polygonPoints(cx, cy, maxR, gridScores, axes, orientation),
      fill: 'none',
      stroke: 'rgba(255,255,255,0.07)',
      'stroke-width': '1'
    }));
  }

  // Axis lines
  axes.forEach((_, i) => {
    const [x, y] = axisPoint(cx, cy, maxR, i, 10, orientation);
    svg.appendChild(createSVGElement('line', {
      x1: cx, y1: cy, x2: x, y2: y,
      stroke: 'rgba(255,255,255,0.1)', 'stroke-width': '1'
    }));
  });

  // Actor overlays
  for (const actor of actors) {
    svg.appendChild(createSVGElement('polygon', {
      points: polygonPoints(cx, cy, maxR, actor.scores, axes, orientation),
      fill: actor.color + '18',
      stroke: actor.color + '80',
      'stroke-width': '1.5'
    }));
  }

  // Uploaded map overlay
  if (uploadedMap) {
    svg.appendChild(createSVGElement('polygon', {
      points: polygonPoints(cx, cy, maxR, uploadedMap.scores, axes, orientation),
      fill: 'rgba(180,120,220,0.12)',
      stroke: uploadedColor,
      'stroke-width': '2',
      'stroke-dasharray': '6,3'
    }));
    axes.forEach((ax, i) => {
      const [x, y] = axisPoint(cx, cy, maxR, i, uploadedMap.scores[ax] || 0, orientation);
      svg.appendChild(createSVGElement('circle', { cx: x, cy: y, r: '3.5', fill: uploadedColor }));
    });
  }

  // User profile
  if (showUser) {
    svg.appendChild(createSVGElement('polygon', {
      points: polygonPoints(cx, cy, maxR, scores, axes, orientation),
      fill: userColor + '1e',
      stroke: userColor,
      'stroke-width': '2.5'
    }));
    axes.forEach((ax, i) => {
      const [x, y] = axisPoint(cx, cy, maxR, i, scores[ax] || 0, orientation);
      svg.appendChild(createSVGElement('circle', { cx: x, cy: y, r: '4', fill: userColor }));
    });
  }

  // Axis labels
  axes.forEach((ax, i) => {
    const [lx, ly] = axisPoint(cx, cy, maxR + 26, i, 10, orientation);
    const labelEl = createSVGElement('text', {
      x: lx.toFixed(2), y: ly.toFixed(2),
      'text-anchor': 'middle', 'dominant-baseline': 'middle',
      'font-size': '11', 'font-family': '-apple-system,BlinkMacSystemFont,sans-serif',
      fill: 'rgba(232,228,218,0.55)'
    });
    labelEl.textContent = t('axis.' + ax);
    svg.appendChild(labelEl);
  });
}

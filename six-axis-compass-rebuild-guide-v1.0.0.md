# Six-Axis Compass — Incremental Rebuild Guide

## Context

The Six-Axis Political Compass is currently a single 24KB HTML file living inside the `common-enemy` monorepo at `tools/six-axis-compass/six-axis-compass-v0.0.5.html`. It is a zero-dependency, self-contained web app: a 24-question Likert quiz across six political axes, rendering an SVG hexagonal radar chart with actor overlays, export/import, and live configuration.

This document instructs an AI agent on how to incrementally rebuild the compass as a standalone open-source project, commit by commit, preserving the zero-dependency deployable constraint while adding proper project structure, maintainability, and open-source hygiene.

## Design Constraints

1. **Zero runtime dependencies** — the deployed artifact must remain a single self-contained HTML file with no external JS/CSS/CDN references.
2. **No build step required for deployment** — a pre-built `dist/index.html` must always be present and functional if checked out.
3. **Modular source for maintainability** — source files use ES modules, proper file separation, and modern JS patterns.
4. **Development tooling is optional** — `package.json` and build scripts are for DX only; they must not be required to run the app.
5. **Backwards compatible data format** — exported JSON/XML from the original compass v0.0.5 must be readable by the rebuilt version.

## Source Material

The agent should read these files from the parent repo before starting:
- `tools/six-axis-compass/six-axis-compass-v0.0.5.html` — the current minified version (functional reference)
- `tools/six-axis-compass/six-axis-compass.html` — the older unminified version with inline changelog (readable reference for structure and evolution)
- `README.md` lines 37–53 — the six-axis model definition (for documentation)

## Commit-by-Commit Rebuild

---

### Commit 1 — Repository Scaffolding

**Message:** `feat: initialize six-axis-compass as standalone open-source project`

**Create:**

```
six-axis-compass/
├── README.md
├── LICENSE
├── .gitignore
├── src/
│   ├── index.html          (shell only — no inline JS/CSS)
│   ├── data.js
│   ├── quiz.js
│   ├── chart.js
│   ├── ui.js
│   └── styles.css
├── dist/
│   └── index.html          (build output — initially a copy of src/index.html)
└── scripts/
    └── build.js            (Node.js inliner — optional)
```

**Content guidelines:**

`README.md`:
- Title: "Six-Axis Political Compass"
- Tagline: "The standard left-right spectrum collapses six distinct political dimensions into one. This tool maps your position across all of them."
- Include the six-axis table from the parent README (Cultural, Economic, Military, Sovereignty, Liberty, Class) with ranges and explanations.
- Usage: open `dist/index.html` in any browser. No build step, no server, no dependencies.
- Development: edit files in `src/`, run `node scripts/build.js` to inline into `dist/index.html`.
- License section referencing MIT.
- Acknowledgement: "Originally developed as part of [The Common Enemy](https://github.com/earlution/common-enemy)."

`LICENSE`: MIT License, copyright "The Common Enemy contributors".

`.gitignore`:
```
node_modules/
.DS_Store
*.log
```

`src/index.html` — skeleton only:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Six-Axis Political Compass</title>
<meta name="description" content="Map your position across six political axes: Cultural, Economic, Military, Sovereignty, Liberty, and Class.">
<style>
/* styles.css will be inlined here by build.js */
</style>
</head>
<body>
<div id="app"></div>
<script type="module">
// modules will be inlined here by build.js
</script>
</body>
</html>
```

**Verification:** `dist/index.html` opens in a browser and shows an empty dark page with no errors.

---

### Commit 2 — Data Model Extraction

**Message:** `feat: extract questions, axes, actors, and response scales into data.js`

**Modify `src/data.js`:**

Port the following from the original compass (lines 19–23 of v0.0.5, or the readable v0.0.4 source):

```javascript
export const AXES = ['Cultural', 'Sovereignty', 'Military', 'Economic', 'Class', 'Liberty'];

export const AXIS_META = {
  Cultural:     { low: 'Cultural internationalism', high: 'Cultural nationalism' },
  Economic:     { low: 'Economic internationalism', high: 'Economic nationalism' },
  Military:     { low: 'Non-interventionist',         high: 'Interventionist' },
  Sovereignty:  { low: 'Supranational',               high: 'National sovereignty' },
  Liberty:      { low: 'State coercion only',         high: 'Includes private coercion' },
  Class:        { low: 'Class harmony',               high: 'Class conflict' }
};

export const RESPONSES = [
  { label: 'Strongly agree', value: 4 },
  { label: 'Agree', value: 3 },
  { label: 'Neither agree nor disagree', value: 2 },
  { label: 'Disagree', value: 1 },
  { label: 'Strongly disagree', value: 0 }
];

export const QUESTIONS = [
  // Cultural
  { axis: 'Cultural', text: "Preserving a nation's distinct cultural identity should be a primary concern of government.", reverse: false },
  { axis: 'Cultural', text: 'Immigration enriches societies more than it disrupts them.', reverse: true },
  { axis: 'Cultural', text: 'Rapid demographic change in communities is a legitimate concern deserving serious political attention.', reverse: false },
  { axis: 'Cultural', text: 'People should be as free to settle in any country as to move within it.', reverse: true },
  // Economic
  { axis: 'Economic', text: 'Governments should actively protect domestic industries from foreign competition.', reverse: false },
  { axis: 'Economic', text: 'The free movement of capital across borders generally benefits the economies involved.', reverse: true },
  { axis: 'Economic', text: 'Strategic industries such as energy and transport should be under national democratic control.', reverse: false },
  { axis: 'Economic', text: 'Removing trade barriers between nations creates prosperity for all participants.', reverse: true },
  // Military
  { axis: 'Military', text: 'My country should withdraw from or significantly reduce its commitments to NATO.', reverse: true },
  { axis: 'Military', text: 'Western military intervention in foreign states can be a legitimate and effective instrument of policy.', reverse: false },
  { axis: 'Military', text: 'A nation should be willing to use military force to protect its strategic interests abroad.', reverse: false },
  { axis: 'Military', text: 'Foreign military involvement should be avoided except in direct self-defence.', reverse: true },
  // Sovereignty
  { axis: 'Sovereignty', text: "A country's elected parliament should have the final say on all laws affecting its citizens.", reverse: false },
  { axis: 'Sovereignty', text: 'International institutions provide necessary constraints on national governments.', reverse: true },
  { axis: 'Sovereignty', text: "A nation's democratic decisions should not be overridden by international legal obligations.", reverse: false },
  { axis: 'Sovereignty', text: 'Sharing sovereignty with other nations can help solve problems that individual countries cannot address alone.', reverse: true },
  // Liberty
  { axis: 'Liberty', text: 'Large employers hold coercive power over workers that the law needs to check.', reverse: false },
  { axis: 'Liberty', text: 'Government regulation is the primary threat to individual freedom.', reverse: true },
  { axis: 'Liberty', text: 'The power a landlord holds over a tenant is a form of coercion requiring political attention.', reverse: false },
  { axis: 'Liberty', text: 'Reducing taxation is one of the most effective ways to increase personal freedom.', reverse: true },
  // Class
  { axis: 'Class', text: 'The interests of employers and employees are fundamentally in tension.', reverse: false },
  { axis: 'Class', text: 'Economic growth generally benefits both business owners and workers.', reverse: true },
  { axis: 'Class', text: 'The wealth gap between rich and poor is a structural problem requiring political solutions.', reverse: false },
  { axis: 'Class', text: 'What is good for business is generally good for the country as a whole.', reverse: true }
];

export const ACTORS = [
  { name: 'Conservative Party', scores: { Cultural: 7, Economic: 3, Military: 8, Sovereignty: 6, Liberty: 2, Class: 1 }, color: '#1A75BB' },
  { name: 'Labour Party',       scores: { Cultural: 5, Economic: 3, Military: 7, Sovereignty: 5, Liberty: 5, Class: 3 }, color: '#c0392b' },
  { name: 'Reform UK',          scores: { Cultural: 8, Economic: 5, Military: 5, Sovereignty: 8, Liberty: 3, Class: 2 }, color: '#12B6CF' },
  { name: 'Liberal Democrats',  scores: { Cultural: 3, Economic: 4, Military: 5, Sovereignty: 4, Liberty: 6, Class: 4 }, color: '#FAA61A' },
  { name: 'Green Party',        scores: { Cultural: 2, Economic: 7, Military: 2, Sovereignty: 5, Liberty: 8, Class: 8 }, color: '#5A9E3F' },
  { name: 'SNP',                scores: { Cultural: 6, Economic: 6, Military: 2, Sovereignty: 9, Liberty: 7, Class: 7 }, color: '#FDF38E' },
  { name: 'Plaid Cymru',        scores: { Cultural: 8, Economic: 6, Military: 2, Sovereignty: 8, Liberty: 7, Class: 7 }, color: '#3CB371' },
  { name: 'US Democrats',       scores: { Cultural: 3, Economic: 4, Military: 7, Sovereignty: 4, Liberty: 6, Class: 4 }, color: '#3C6EC9' },
  { name: 'US Republicans',     scores: { Cultural: 8, Economic: 4, Military: 8, Sovereignty: 7, Liberty: 2, Class: 1 }, color: '#C0392B' }
];
```

**Guidelines:**
- Use `export` for every constant.
- Use camelCase for property names (`label`, `value`, `reverse`, `scores`) — this is the one breaking change from the original's single-letter keys. The agent must remember to update all references in downstream commits.
- Add a JSDoc comment block at the top of the file documenting the scoring algorithm: 4 questions per axis, forward/reverse scored, raw 0–16 normalised to 0–10.

**Verification:** The file can be imported in a browser console (via `import('./src/data.js')`) and all exports are present.

---

### Commit 3 — Scoring Engine

**Message:** `feat: add quiz state management and scoring engine`

**Modify `src/quiz.js`:**

```javascript
import { AXES, QUESTIONS, RESPONSES } from './data.js';

/**
 * @param {Record<number, number>} answers — question index → response value
 * @returns {Record<string, number>} axis name → score 0–10
 */
export function computeScores(answers) {
  const scores = {};
  for (const axis of AXES) {
    const axisQuestions = QUESTIONS
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => q.axis === axis);
    let total = 0;
    for (const q of axisQuestions) {
      const v = answers[q.index] !== undefined ? answers[q.index] : 2; // default to neutral
      total += q.reverse ? (4 - v) : v;
    }
    scores[axis] = parseFloat(((total / 16) * 10).toFixed(1));
  }
  return scores;
}

export function createQuiz() {
  let current = 0;
  const answers = {};

  return {
    get current() { return current; },
    get total() { return QUESTIONS.length; },
    get isComplete() { return current >= QUESTIONS.length; },
    get question() { return QUESTIONS[current]; },
    get progress() { return Math.round((current / QUESTIONS.length) * 100); },
    get stepLabel() { return `${current + 1} / ${QUESTIONS.length}`; },

    answer(value) {
      answers[current] = value;
      current++;
      return this.isComplete;
    },

    back() {
      if (current > 0) current--;
    },

    getAnswers() { return { ...answers }; },
    getScores() { return computeScores(answers); }
  };
}
```

**Guidelines:**
- The scoring algorithm must exactly match the original: `tot += q.r ? 4 - v : v` where the original divides by 16 and multiplies by 10.
- `createQuiz()` returns an object with getters and methods. This replaces the global mutable state (`cur`, `answers`) from the original.
- No DOM code in this file — pure logic only.

**Verification:** In browser console, `createQuiz().getScores()` with an empty answers object returns all 1.25 (neutral default). Answering all 4s returns all 10s. Answering all 0s returns all 0s.

---

### Commit 4 — SVG Radar Chart Renderer

**Message:** `feat: add hexagonal SVG radar chart with flat/pointy orientation`

**Modify `src/chart.js`:**

```javascript
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
    const t = createSVGElement('text', {
      x: lx.toFixed(2), y: ly.toFixed(2),
      'text-anchor': 'middle', 'dominant-baseline': 'middle',
      'font-size': '11', 'font-family': '-apple-system,BlinkMacSystemFont,sans-serif',
      fill: 'rgba(232,228,218,0.55)'
    });
    t.textContent = ax;
    svg.appendChild(t);
  });
}
```

**Guidelines:**
- All SVG rendering must exactly match the original visual output: grid levels, stroke colors, opacity values, label positions.
- The `drawRadar` function takes an options object — this is cleaner than the original's global mutable state.
- `axisPoint` and `polygonPoints` are internal helpers, not exported.

**Verification:** Call `drawRadar(document.getElementById('radar'), { scores: { Cultural: 5, Sovereignty: 5, Military: 5, Economic: 5, Class: 5, Liberty: 5 }, axes: ['Cultural', 'Sovereignty', 'Military', 'Economic', 'Class', 'Liberty'] })` produces a regular hexagon centered in the SVG.

---

### Commit 5 — Core UI and Styles

**Message:** `feat: add intro, quiz, and results screens with full styling`

**Modify `src/styles.css`:**

Port the CSS from the original (v0.0.5 line 9 or v0.0.4 lines 90+) into a readable, commented stylesheet. Group by component:

1. CSS variables (`:root`)
2. Base styles (`body`, `.wrap`)
3. Screen management (`.screen`, `.screen.active`)
4. Intro screen (`.eyebrow`, `.intro-title`, `.intro-body`, `.intro-meta`, `.intro-disclaimer`, `.btn` variants)
5. Quiz screen (`.progress-wrap`, `.progress-bar`, `.progress-fill`, `.axis-tag`, `.q-text`, `.responses`, `.response-btn`)
6. Results screen (`.results-title`, `.chart-wrap`, `.actor-row`, `.legend`, `.legend-item`, `.score-bars`, `.score-header`, `.score-track`, `.score-fill`, `.score-ends`, `.divider`, `.footer-note`)
7. Configuration panel styles (inline in `ui.js` or extracted here)
8. Media query for mobile (`@media(max-width:420px)`)

**Modify `src/ui.js`:**

```javascript
import { AXIS_META, ACTORS } from './data.js';
import { drawRadar } from './chart.js';

export function renderIntro(container, onStart) {
  container.innerHTML = `
    <div class="screen active" id="s-intro">
      <p class="eyebrow">Six-Axis Political Compass</p>
      <h1 class="intro-title">Where do you sit<br>on the six axes?</h1>
      <p class="intro-body">The standard left–right spectrum collapses six distinct political dimensions into one. This tool maps your position across all of them: cultural, economic, military, sovereignty, liberty, and class.</p>
      <p class="intro-meta">24 statements · approximately 5 minutes</p>
      <button class="btn btn-primary" id="btn-start">Begin</button>
      <p class="intro-disclaimer">Your answers are not stored or transmitted anywhere.</p>
    </div>
  `;
  document.getElementById('btn-start').addEventListener('click', onStart);
}

export function renderQuiz(container, { question, progress, stepLabel, axis, onAnswer, onBack, canGoBack }) {
  // ...render progress bar, axis tag, question text, response buttons...
  // Use AXIS_META for display labels if needed
}

export function renderResults(container, { scores, axes, orientation, showUser, selectedActors, uploadedMap, onToggleActor, onToggleUser, onSetOrientation, onDownloadChart, onDownloadData, onUpload, onClearUpload, onRestart, axisOrder, onReorder }) {
  // ...render full results screen with chart, actor toggles, legend, score bars, config panel...
  // Call drawRadar with the appropriate options
}
```

**Modify `src/index.html`:**

Replace the skeleton with a functional shell that imports `ui.js` and `quiz.js` and wires them together. The `<script type="module">` block should:
1. Create a quiz instance
2. Render the intro screen
3. On start, render the first question
4. On answer, advance; on completion, render results
5. Handle back navigation
6. Handle all results-screen interactions

**Guidelines:**
- The UI should be visually identical to the original v0.0.5.
- All inline event handlers from the original (`onclick` attributes) must be replaced with `addEventListener` calls.
- State must not use global variables — pass quiz instance and config state through function parameters or a lightweight state object.

**Verification:** Open `src/index.html` directly in a browser (using a local server or `file://` with ES module support). The full quiz flow works: intro → quiz → results → retake.

---

### Commit 6 — Export and Import

**Message:** `feat: add PNG, SVG, JSON, and XML export; JSON/XML import`

**Create `src/export.js`:**

```javascript
export function downloadChart(svgElement, filename = 'my-six-axis-compass.png') {
  const svg = svgElement.cloneNode(true);
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);

  const img = new Image();
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  img.onload = () => {
    ctx.drawImage(img, 0, 0, 640, 640);
    const a = document.createElement('a');
    a.download = filename;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  img.onerror = () => {
    // Fallback to SVG download
    const a = document.createElement('a');
    a.download = filename.replace('.png', '.svg');
    a.href = url;
    a.click();
  };

  img.src = url;
}

export function downloadMapData(scores, format = 'json') {
  const payload = {
    source: 'Six-Axis Political Compass',
    version: '1.0.0',
    generated: new Date().toISOString(),
    axes: scores
  };

  let content, mime, ext;
  if (format === 'json') {
    content = JSON.stringify(payload, null, 2);
    mime = 'application/json';
    ext = 'json';
  } else {
    content = `<?xml version="1.0" encoding="UTF-8"?>\n<compass source="${payload.source}" version="${payload.version}" generated="${payload.generated}">\n` +
      Object.entries(scores).map(([k, v]) => `  <axis name="${k}" score="${v}"/>`).join('\n') +
      '\n</compass>';
    mime = 'application/xml';
    ext = 'xml';
  }

  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `my-six-axis-compass.${ext}`;
  a.href = url;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function parseUpload(fileContent, fileName) {
  if (fileName.endsWith('.json')) {
    const p = JSON.parse(fileContent);
    if (!p.axes) throw new Error('No axes field');
    return { scores: p.axes, label: 'Uploaded map' };
  }
  if (fileName.endsWith('.xml')) {
    const dom = new DOMParser().parseFromString(fileContent, 'application/xml');
    const axisEls = dom.querySelectorAll('axis');
    if (!axisEls.length) throw new Error('No axis elements');
    const scores = {};
    axisEls.forEach(el => {
      scores[el.getAttribute('name')] = parseFloat(el.getAttribute('score'));
    });
    return { scores, label: 'Uploaded map' };
  }
  throw new Error('Unsupported file format');
}
```

**Modify `src/ui.js`:** Wire the export/import functions into the results screen buttons.

**Guidelines:**
- The JSON/XML schema must be backwards compatible with v0.0.5 exports (same `axes` field, same XML element structure).
- The `source` field in exports should say "Six-Axis Political Compass" instead of "The Common Enemy" to reflect the spun-off identity.
- `parseUpload` must handle both the new format and the old v0.0.5 format (which has `source: 'The Common Enemy — Six-Axis Political Compass'`).

**Verification:**
1. Export JSON from the rebuilt compass.
2. The old compass v0.0.5 can import it (if accessible for testing).
3. An export from the old compass can be imported by the rebuilt compass.

---

### Commit 7 — Configuration Panel

**Message:** `feat: add orientation toggle, axis reordering, and user map visibility`

**Modify `src/ui.js`:** Add the configuration panel to the results screen:

1. **Orientation toggle** — two buttons: "Edge up" / "Vertex up". Calls `onSetOrientation('flat' | 'pointy')`.
2. **Show/hide user map** — toggles `showUser` state and refreshes chart.
3. **Download buttons** — PNG, JSON, XML.
4. **Upload section** — hidden file input accepting `.json,.xml`, with parse and error handling.
5. **Axis reordering** — draggable list using HTML5 drag-and-drop. Each axis item shows a grip handle, name, and position number. On drop, swap positions and call `onReorder(newOrder)`.

**Create `src/drag.js` (optional):** If the drag-and-drop logic is complex enough to warrant its own module, extract it here. Otherwise keep it in `ui.js`.

**Guidelines:**
- The drag-and-drop implementation must match the original: `dragstart` sets opacity, `dragover` prevents default, `drop` splices the array.
- Touchscreen limitation is acceptable — document it in a code comment.
- The axis order resets to default on retake (handled by re-creating the quiz/state object).

**Verification:** In the results screen, all configuration controls work: orientation flips the hexagon, toggling actors updates overlays, drag-and-drop reorders axes live, upload shows a dashed purple overlay.

---

### Commit 8 — Build Script and package.json

**Message:** `chore: add Node.js build script to inline modules into dist/index.html`

**Create `package.json`:**

```json
{
  "name": "six-axis-compass",
  "version": "1.0.0",
  "description": "A zero-dependency political compass mapping six axes: Cultural, Economic, Military, Sovereignty, Liberty, and Class.",
  "main": "dist/index.html",
  "scripts": {
    "build": "node scripts/build.js",
    "dev": "node scripts/build.js --watch"
  },
  "keywords": ["political-compass", "politics", "quiz", "radar-chart", "svg"],
  "license": "MIT",
  "devDependencies": {}
}
```

**Create `scripts/build.js`:**

```javascript
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const DIST = path.join(__dirname, '..', 'dist');

function read(file) {
  return fs.readFileSync(path.join(SRC, file), 'utf-8');
}

function inlineModules() {
  // Read source files
  const html = read('index.html');
  const css = read('styles.css');
  const data = read('data.js');
  const quiz = read('quiz.js');
  const chart = read('chart.js');
  const ui = read('ui.js');
  const exp = read('export.js');

  // Strip import/export statements and inline
  const stripImports = code => code.replace(/^\s*import\s+.*from\s+['"].*['"];?\s*$/gm, '');
  const stripExports = code => code.replace(/^\s*export\s+/gm, '');
  const inline = code => stripExports(stripImports(code));

  const js = [data, quiz, chart, ui, exp].map(inline).join('\n\n');

  const output = html
    .replace('<style>\n/* styles.css will be inlined here by build.js */\n</style>', `<style>\n${css}\n</style>`)
    .replace('<script type="module">\n// modules will be inlined here by build.js\n</script>', `<script>\n${js}\n</script>`);

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, 'index.html'), output, 'utf-8');
  console.log('Built dist/index.html');
}

inlineModules();

// Optional watch mode
if (process.argv.includes('--watch')) {
  const files = ['index.html', 'styles.css', 'data.js', 'quiz.js', 'chart.js', 'ui.js', 'export.js'];
  files.forEach(f => {
    fs.watchFile(path.join(SRC, f), () => {
      console.log(`Rebuilding: ${f}`);
      inlineModules();
    });
  });
}
```

**Guidelines:**
- The build script is intentionally naive — regex-based import stripping is sufficient for this project's simple module graph. No bundler (webpack, rollup, esbuild) is required, keeping devDependencies at zero.
- The script handles the `import { X } from './data.js'` pattern used throughout.
- `export function` becomes `function`, `export const` becomes `const`.

**Verification:** Run `node scripts/build.js`. The resulting `dist/index.html` is a single self-contained file that opens in a browser and functions identically to the original v0.0.5. It has no external references and no `<script type="module">` tags.

---

### Commit 9 — Documentation and Examples

**Message:** `docs: add axis explanations, example exports, and screenshots`

**Create `docs/axes.md`:**

```markdown
# The Six Axes

## Cultural: Nationalism ↔ Internationalism
Maps attitudes toward national identity, immigration, demographic change, and cultural preservation versus openness.

## Economic: Nationalism (protectionist) ↔ Internationalism (open capital)
Maps attitudes toward trade barriers, capital mobility, domestic industry protection, and strategic nationalisation.

## Military: Non-interventionism ↔ Active interventionism
Maps attitudes toward military alliances, foreign military engagement, and the use of force abroad.

## Sovereignty: Unilateralism ↔ Pooled governance
Maps attitudes toward the supremacy of national democratic institutions versus international legal frameworks and shared governance.

## Liberty: Substantive (includes corporate coercion) ↔ Formal (state coercion only)
Maps whether threats to individual freedom are understood as primarily state-based or include private power (employers, landlords).

## Class: Conflict (capital vs labour structurally opposed) ↔ Harmony (aligned interests)
Maps whether employer-employee interests are seen as fundamentally opposed or mutually beneficial.
```

**Create `docs/examples/`:**
- `centrist.json` — scores all around 5.0
- `green-party.json` — Green Party scores
- `reform-uk.json` — Reform UK scores

**Update `README.md`:**
- Add "How it works" section with scoring explanation.
- Add "Development" section with `npm run build` / `node scripts/build.js` instructions.
- Add screenshot placeholders (to be filled when the UI is stable).

**Verification:** `docs/axes.md` renders correctly in GitHub preview. Example JSON files validate against the export schema.

---

### Commit 10 — Testing and CI

**Message:** `test: add unit tests for scoring engine and export/import roundtrip`

**Create `tests/quiz.test.js`:**

```javascript
// Simple test runner — no external dependencies
const { computeScores, createQuiz } = require('../src/quiz.js');
// Note: requires build step or a test runner that handles ES modules

function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

// Test 1: All neutral answers → all scores = 1.25
const neutral = {};
for (let i = 0; i < 24; i++) neutral[i] = 2;
assertEqual(computeScores(neutral), {
  Cultural: 1.25, Economic: 1.25, Military: 1.25,
  Sovereignty: 1.25, Liberty: 1.25, Class: 1.25
}, 'All neutral should yield 1.25 per axis');

// Test 2: All strongly agree → all scores = 10
const agree = {};
for (let i = 0; i < 24; i++) agree[i] = 4;
assertEqual(computeScores(agree), {
  Cultural: 10, Economic: 10, Military: 10,
  Sovereignty: 10, Liberty: 10, Class: 10
}, 'All agree should yield 10 per axis');

// Test 3: All strongly disagree → all scores = 0
const disagree = {};
for (let i = 0; i < 24; i++) disagree[i] = 0;
assertEqual(computeScores(disagree), {
  Cultural: 0, Economic: 0, Military: 0,
  Sovereignty: 0, Liberty: 0, Class: 0
}, 'All disagree should yield 0 per axis');

console.log('All tests passed');
```

**Create `.github/workflows/ci.yml`:**

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: node scripts/build.js
      - run: node tests/quiz.test.js
      - name: Verify dist/index.html exists and is self-contained
        run: |
          grep -q '<script>' dist/index.html
          grep -q '<style>' dist/index.html
          ! grep -q 'type="module"' dist/index.html
          ! grep -q 'src=' dist/index.html
          ! grep -q 'href=' dist/index.html | grep -v 'data:'
```

**Guidelines:**
- Tests are simple Node.js scripts using `assert` — no Jest/Mocha dependency.
- The CI job verifies the build script works and the output is truly self-contained (no module scripts, no external src/href references).
- If `require()` doesn't work with ES modules, use a simple `eval(fs.readFileSync(...))` pattern or convert test file to `.mjs`.

**Verification:** Push to GitHub and verify the CI workflow passes.

---

## Post-Build Checklist

After all 10 commits, verify:

1. [ ] `dist/index.html` opens in Chrome, Firefox, Safari without errors.
2. [ ] The quiz flow works end-to-end: intro → 24 questions → results.
3. [ ] Radar chart renders correctly with flat and pointy orientations.
4. [ ] Actor toggles work (Conservative, Labour, Reform UK, Lib Dems, Greens, SNP, Plaid Cymru, US Democrats, US Republicans).
5. [ ] Axis reordering works via drag-and-drop.
6. [ ] PNG, JSON, and XML exports work.
7. [ ] JSON and XML imports work, including files exported from the original v0.0.5.
8. [ ] The file size of `dist/index.html` is comparable to the original (~24KB).
9. [ ] `node tests/quiz.test.js` passes.
10. [ ] CI passes on push.

## Optional Future Commits (not in the initial rebuild)

These are noted for the AI agent but not required for the initial release:

- **i18n support** — extract all user-facing strings into a translation file.
- **Shareable URLs** — encode scores in URL hash for direct linking.
- **Additional actors** — allow users to define custom actors.
- **Dark/light theme toggle** — the current dark theme is hardcoded.
- **Accessibility audit** — ARIA labels, keyboard navigation, screen reader testing.
- **PWA manifest** — make it installable as a web app.

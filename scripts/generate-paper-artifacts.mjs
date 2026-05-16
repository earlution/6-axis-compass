import { JSDOM } from 'jsdom';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'paper-artifacts');

// ── Helpers ──────────────────────────────────────────────────────────

function loadModule(file) {
  const code = readFileSync(join(ROOT, 'src', file), 'utf-8');
  return code
    .replace(/^\s*import\s+.*from\s+['"].*['"];?\s*$/gm, '')
    .replace(/^\s*export\s+/gm, '');
}

function loadModules(files) {
  return files.map(loadModule).join('\n\n');
}

function slugify(name) {
  return name.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function texCmd(name) {
  // "Franklin D. Roosevelt" -> "FranklinDRoosevelt"
  return name.replace(/[^a-zA-Z0-9]/g, '');
}

function getGitCommit() {
  try {
    return execSync('git rev-parse HEAD', { cwd: ROOT, encoding: 'utf-8' }).trim();
  } catch {
    return 'unknown';
  }
}

function getVersion() {
  try {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
    return pkg.version || '1.0.0';
  } catch {
    return '1.0.0';
  }
}

// ── Bootstrap DOM and load source modules ─────────────────────────────

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

const modulesCode = loadModules(['i18n.js', 'data.js', 'chart.js']);
const moduleScope = new Function(modulesCode + '\nreturn { ACTORS, AXES, drawRadar, t, setLanguage };')();
const { ACTORS, AXES, drawRadar, t, setLanguage } = moduleScope;

setLanguage('en');

const VERSION = getVersion();
const GIT_COMMIT = getGitCommit();
const GENERATED = new Date().toISOString();

// ── Ensure output directories ─────────────────────────────────────────

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'actors'), { recursive: true });
mkdirSync(join(OUT, 'comparisons'), { recursive: true });

// ── Individual actor artifacts ──────────────────────────────────────

for (const actor of ACTORS) {
  const slug = slugify(actor.name);
  const cmdPrefix = texCmd(actor.name);

  // JSON data file
  const json = {
    source: 'Six-Axis Political Compass',
    version: VERSION,
    gitCommit: GIT_COMMIT,
    generated: GENERATED,
    actor: actor.name,
    color: actor.color,
    axes: actor.scores
  };
  writeFileSync(join(OUT, 'actors', `${slug}.json`), JSON.stringify(json, null, 2) + '\n');

  // LaTeX command definitions
  const texEscape = s => s.replace(/#/g, '\\#');
  const texLines = [
    `% Provenance: Six-Axis Political Compass v${VERSION} (${GIT_COMMIT}) generated ${GENERATED}`,
    `% Source: src/data.js — actor "${actor.name}"`,
    `\\newcommand{\\${cmdPrefix}Color}{${texEscape(actor.color)}}`,
    ...AXES.map(ax => `\\newcommand{\\${cmdPrefix}${ax}}{${actor.scores[ax].toFixed(1)}}`),
    ''
  ];
  writeFileSync(join(OUT, 'actors', `${slug}.tex`), texLines.join('\n'));

  // SVG radar chart
  const svg = createPrintSVG();
  drawRadar(svg, {
    scores: actor.scores,
    axes: AXES,
    orientation: 'flat',
    actors: [],
    showUser: true,
    userColor: actor.color
  });
  postProcessSVG(svg, actor.name);
  writeFileSync(join(OUT, 'actors', `${slug}.svg`), svg.outerHTML + '\n');
}

// ── Comparison group artifacts ──────────────────────────────────────

let paperConfig;
try {
  paperConfig = JSON.parse(readFileSync(join(__dirname, 'paper-config.json'), 'utf-8'));
} catch (err) {
  console.error('Could not read paper-config.json:', err.message);
  process.exit(1);
}

for (const [groupId, group] of Object.entries(paperConfig.groups)) {
  const groupActors = group.actors
    .map(name => ACTORS.find(a => a.name === name))
    .filter(Boolean);

  if (groupActors.length === 0) {
    console.warn(`Group "${groupId}" has no matching actors, skipping.`);
    continue;
  }

  const svg = createPrintSVG();
  drawRadar(svg, {
    scores: Object.fromEntries(AXES.map(a => [a, 0])),
    axes: AXES,
    orientation: 'flat',
    actors: groupActors,
    showUser: false
  });
  postProcessSVG(svg, group.title);
  writeFileSync(join(OUT, 'comparisons', `${groupId}.svg`), svg.outerHTML + '\n');

  // Also write a combined JSON for the group
  const groupJson = {
    source: 'Six-Axis Political Compass',
    version: VERSION,
    gitCommit: GIT_COMMIT,
    generated: GENERATED,
    groupId,
    title: group.title,
    actors: groupActors.map(a => ({ name: a.name, color: a.color, axes: a.scores }))
  };
  writeFileSync(join(OUT, 'comparisons', `${groupId}.json`), JSON.stringify(groupJson, null, 2) + '\n');
}

// ── Helper functions ────────────────────────────────────────────────

function createPrintSVG() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('viewBox', '0 0 320 320');
  svg.setAttribute('width', '600');
  svg.setAttribute('height', '600');
  svg.setAttribute('role', 'img');
  return svg;
}

function postProcessSVG(svg, title) {
  // Add white background for print compatibility
  const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bg.setAttribute('x', '0');
  bg.setAttribute('y', '0');
  bg.setAttribute('width', '320');
  bg.setAttribute('height', '320');
  bg.setAttribute('fill', '#ffffff');
  svg.insertBefore(bg, svg.firstChild);

  // Add title element for accessibility
  const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  titleEl.textContent = `Six-Axis Political Compass — ${title}`;
  svg.insertBefore(titleEl, bg);

  // Convert dark-theme strokes to print-friendly dark greys
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
  });

  const lines = svg.querySelectorAll('line');
  lines.forEach(line => {
    const stroke = line.getAttribute('stroke') || '';
    if (stroke.includes('rgba(255,255,255')) {
      line.setAttribute('stroke', stroke.replace('rgba(255,255,255', 'rgba(0,0,0').replace('0.1)', '0.15)'));
    }
  });

  const texts = svg.querySelectorAll('text');
  texts.forEach(text => {
    const fill = text.getAttribute('fill') || '';
    if (fill.includes('rgba(232,228,218')) {
      text.setAttribute('fill', '#333333');
    }
  });

  // Add a subtle border
  const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  border.setAttribute('x', '0');
  border.setAttribute('y', '0');
  border.setAttribute('width', '320');
  border.setAttribute('height', '320');
  border.setAttribute('fill', 'none');
  border.setAttribute('stroke', '#cccccc');
  border.setAttribute('stroke-width', '1');
  svg.appendChild(border);
}

console.log(`Generated ${ACTORS.length} actor artifacts and ${Object.keys(paperConfig.groups).length} comparison charts in ${OUT}/`);

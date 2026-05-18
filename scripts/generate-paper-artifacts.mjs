import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { loadActors } from '../api/lib/actor-store.js';
import { renderSVG } from '../api/lib/chart-renderer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'paper-artifacts');

// ── Helpers ──────────────────────────────────────────────────────────

function slugify(name) {
  return name.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function texCmd(name) {
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

const VERSION = getVersion();
const GIT_COMMIT = getGitCommit();
const GENERATED = new Date().toISOString();
const ACTORS = loadActors();

const AXES = ['Cultural', 'Economic', 'Military', 'Sovereignty', 'Governance', 'Class'];

// ── Ensure output directories ─────────────────────────────────────────

rmSync(join(OUT, 'actors'), { recursive: true, force: true });
rmSync(join(OUT, 'comparisons'), { recursive: true, force: true });
mkdirSync(join(OUT, 'actors'), { recursive: true });
mkdirSync(join(OUT, 'comparisons'), { recursive: true });

// ── Individual actor artifacts ──────────────────────────────────────

for (const actor of ACTORS) {
  const slug = slugify(actor.name);
  const cmdPrefix = texCmd(actor.name);

  // JSON data file (with traceability)
  const json = {
    source: 'Six-Axis Political Compass',
    version: VERSION,
    gitCommit: GIT_COMMIT,
    generated: GENERATED,
    actor: actor.name,
    slug: actor._meta.slug,
    category: actor._meta.category,
    color: actor.color,
    axes: actor.scores,
    traceability: Object.fromEntries(
      AXES.map(ax => [ax, {
        confidence: actor._scoreMeta[ax].confidence,
        rationale: actor._scoreMeta[ax].rationale,
        sources: actor._scoreMeta[ax].sources
      }])
    )
  };
  writeFileSync(join(OUT, 'actors', `${slug}.json`), JSON.stringify(json, null, 2) + '\n');

  // LaTeX command definitions
  const texEscape = s => String(s).replace(/[\\{}#$%&_~^]/g, ch => ({
    '\\': '\\textbackslash{}',
    '{': '\\{',
    '}': '\\}',
    '#': '\\#',
    '$': '\\$',
    '%': '\\%',
    '&': '\\&',
    '_': '\\_',
    '~': '\\textasciitilde{}',
    '^': '\\textasciicircum{}'
  }[ch]));
  const texLines = [
    `% Provenance: Six-Axis Political Compass v${VERSION} (${GIT_COMMIT}) generated ${GENERATED}`,
    `% Source: data/actors/${slug}.json`,
    `\\newcommand{\\${cmdPrefix}Color}{${texEscape(actor.color)}}`,
    ...AXES.map(ax => `\\newcommand{\\${cmdPrefix}${ax}}{${actor.scores[ax].toFixed(1)}}`),
    ''
  ];
  writeFileSync(join(OUT, 'actors', `${slug}.tex`), texLines.join('\n'));

  // SVG radar chart
  const svg = renderSVG({
    scores: actor.scores,
    axes: AXES,
    orientation: 'flat',
    actors: [],
    showUser: true,
    userColor: actor.color,
    title: actor.name
  });
  writeFileSync(join(OUT, 'actors', `${slug}.svg`), svg + '\n');
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

  const svg = renderSVG({
    scores: Object.fromEntries(AXES.map(a => [a, 0])),
    axes: AXES,
    orientation: 'flat',
    actors: groupActors.map(a => ({ name: a.name, scores: a.scores, color: a.color })),
    showUser: false,
    title: group.title
  });
  writeFileSync(join(OUT, 'comparisons', `${groupId}.svg`), svg + '\n');

  // Combined JSON for the group (with traceability)
  const groupJson = {
    source: 'Six-Axis Political Compass',
    version: VERSION,
    gitCommit: GIT_COMMIT,
    generated: GENERATED,
    groupId,
    title: group.title,
    actors: groupActors.map(a => ({
      name: a.name,
      slug: a._meta.slug,
      color: a.color,
      axes: a.scores,
      traceability: Object.fromEntries(
        AXES.map(ax => [ax, {
          confidence: a._scoreMeta[ax].confidence,
          rationale: a._scoreMeta[ax].rationale,
          sources: a._scoreMeta[ax].sources
        }])
      )
    }))
  };
  writeFileSync(join(OUT, 'comparisons', `${groupId}.json`), JSON.stringify(groupJson, null, 2) + '\n');
}

console.log(`Generated ${ACTORS.length} actor artifacts and ${Object.keys(paperConfig.groups).length} comparison charts in ${OUT}/`);

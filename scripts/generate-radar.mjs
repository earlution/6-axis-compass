// Usage: node scripts/generate-radar.mjs --actors "SNP,Plaid Cymru"
//        node scripts/generate-radar.mjs --comparison uk-parties
//        node scripts/generate-radar.mjs --actors "SNP" --output-dir outputs/

import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { loadActors } from '../api/lib/actor-store.js';
import { renderSVG } from '../api/lib/chart-renderer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Parse CLI flags ────────────────────────────────────────────────────

const args = process.argv.slice(2);
const flags = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : 'true';
    flags[key] = val;
    if (val !== 'true') i++;
  }
}

const OUTPUT_DIR = flags['output-dir'] ? join(ROOT, flags['output-dir']) : join(ROOT, 'paper-artifacts');
const ACTOR_NAMES = flags.actors ? flags.actors.split(',').map(s => s.trim()) : [];
const COMPARISON_ID = flags.comparison;

if (ACTOR_NAMES.length === 0 && !COMPARISON_ID) {
  console.error('Usage: node scripts/generate-radar.mjs --actors "Name1,Name2" [--output-dir dir]');
  console.error('       node scripts/generate-radar.mjs --comparison group-id [--output-dir dir]');
  process.exit(1);
}

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

mkdirSync(join(OUTPUT_DIR, 'actors'), { recursive: true });
mkdirSync(join(OUTPUT_DIR, 'comparisons'), { recursive: true });

// ── Individual actor artifacts ──────────────────────────────────────

for (const actorName of ACTOR_NAMES) {
  const actor = ACTORS.find(a => a.name === actorName);
  if (!actor) {
    console.error(`Actor not found: "${actorName}"`);
    process.exit(1);
  }

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
  if (actor.responses) {
    json.responses = Object.fromEntries(
      Object.entries(actor.responses).map(([qid, data]) => [qid, {
        value: data.value,
        confidence: data.confidence,
        rationale: data.rationale,
        sources: data.sources || []
      }])
    );
  }
  writeFileSync(join(OUTPUT_DIR, 'actors', `${slug}.json`), JSON.stringify(json, null, 2) + '\n');

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
  writeFileSync(join(OUTPUT_DIR, 'actors', `${slug}.tex`), texLines.join('\n'));

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
  writeFileSync(join(OUTPUT_DIR, 'actors', `${slug}.svg`), svg + '\n');

  console.log(`Generated actor: ${actor.name}`);
}

// ── Comparison group artifacts ────────────────────────────────────────

if (COMPARISON_ID) {
  let paperConfig;
  try {
    paperConfig = JSON.parse(readFileSync(join(__dirname, 'paper-config.json'), 'utf-8'));
  } catch (err) {
    console.error('Could not read paper-config.json:', err.message);
    process.exit(1);
  }

  const group = paperConfig.groups[COMPARISON_ID];
  if (!group) {
    console.error(`Comparison group not found: "${COMPARISON_ID}"`);
    process.exit(1);
  }

  const groupActors = group.actors
    .map(name => ACTORS.find(a => a.name === name))
    .filter(Boolean);

  if (groupActors.length === 0) {
    console.error(`Group "${COMPARISON_ID}" has no matching actors.`);
    process.exit(1);
  }

  const svg = renderSVG({
    scores: Object.fromEntries(AXES.map(a => [a, 0])),
    axes: AXES,
    orientation: 'flat',
    actors: groupActors.map(a => ({ name: a.name, scores: a.scores, color: a.color })),
    showUser: false,
    title: group.title
  });
  writeFileSync(join(OUTPUT_DIR, 'comparisons', `${COMPARISON_ID}.svg`), svg + '\n');

  const groupJson = {
    source: 'Six-Axis Political Compass',
    version: VERSION,
    gitCommit: GIT_COMMIT,
    generated: GENERATED,
    groupId: COMPARISON_ID,
    title: group.title,
    actors: groupActors.map(a => ({
      name: a.name,
      slug: a._meta.slug,
      color: a.color,
      axes: a.scores,
      responses: a.responses || null,
      traceability: Object.fromEntries(
        AXES.map(ax => [ax, {
          confidence: a._scoreMeta[ax].confidence,
          rationale: a._scoreMeta[ax].rationale,
          sources: a._scoreMeta[ax].sources
        }])
      )
    }))
  };
  writeFileSync(join(OUTPUT_DIR, 'comparisons', `${COMPARISON_ID}.json`), JSON.stringify(groupJson, null, 2) + '\n');

  console.log(`Generated comparison: ${group.title} (${groupActors.length} actors)`);
}

console.log(`Done. Output in ${OUTPUT_DIR}/`);

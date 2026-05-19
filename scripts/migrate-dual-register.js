const fs = require('fs');
const path = require('path');

const RESEARCH_FILE = path.join(__dirname, '..', 'data', 'research', 'compass-data-v0.2.0.json');
const ACTORS_DIR = path.join(__dirname, '..', 'data', 'actors');

// Map dual-register actor identifiers to existing actor file basenames
const ID_MAP = {
  'conservative-2010-2024': 'Conservative-Party',
  'conservative': 'Conservative-Party',
  'labour-2024': 'Labour-Party',
  'labour': 'Labour-Party',
  'liberal-democrats-2020-2026': 'Liberal-Democrats',
  'libdem': 'Liberal-Democrats',
  'reform-uk-2024-2026': 'Reform-UK',
  'reform': 'Reform-UK',
  'restore-britain-2025-2026': 'restore-britain-2025-2026',
  'restore-britain': 'restore-britain-2025-2026',
  'green-party-2024-2026': 'Green-Party',
  'green': 'Green-Party',
  'snp-2007-2026': 'SNP',
  'snp': 'SNP',
  'plaid-cymru-2021-2026': 'Plaid-Cymru',
  'plaid': 'Plaid-Cymru'
};

const AXES = ['Cultural', 'Economic', 'Military', 'Sovereignty', 'Governance', 'Class'];

function normaliseActor(raw) {
  // Supports both v0.1.0 (coordinates/declared) and v0.2.0 (scores/declared) schemas
  const declared = raw.coordinates?.declared || raw.scores?.declared || {};
  const structural = raw.coordinates?.structural || raw.scores?.structural || {};
  const delta = raw.coordinates?.delta || raw.scores?.delta || {};
  const name = raw.name || raw.label || raw.id;
  return {
    name,
    display_name: raw.display_name || raw.label || name,
    id: raw.id,
    period: raw.period,
    status: raw.status,
    evidence_quality: raw.evidence_quality || raw.evidenceQuality,
    coordinates: { declared, structural, delta },
    confidence: raw.confidence || {},
    sources: raw.sources || { declared: [], structural: [] },
    taxonomy_note: raw.taxonomy_note || raw.taxonomyNote
  };
}

function capitaliseAxis(axis) {
  return axis.charAt(0).toUpperCase() + axis.slice(1);
}

function confidenceToLabel(num) {
  if (num >= 0.85) return 'very-high';
  if (num >= 0.70) return 'high';
  if (num >= 0.55) return 'medium';
  return 'low';
}

function makeSources(arr, type) {
  if (!arr || arr.length === 0) return [];
  return arr.map(title => ({
    type,
    title,
    url: '',
    date: '',
    relevantText: '',
    citation: title
  }));
}

function augmentExistingActor(basename, dualActor) {
  const filePath = path.join(ACTORS_DIR, `${basename}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`Actor file not found: ${filePath}`);
    return;
  }

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Build dualRegister block
  const declared = {};
  const structural = {};
  const delta = {};
  const confidence = {};
  const sources = {};

  for (const axis of Object.keys(dualActor.coordinates.declared)) {
    const capAxis = capitaliseAxis(axis);
    declared[capAxis] = dualActor.coordinates.declared[axis];
    structural[capAxis] = dualActor.coordinates.structural[axis];
    delta[capAxis] = dualActor.coordinates.delta[axis];
    confidence[capAxis] = dualActor.confidence[axis];
  }

  sources.declared = makeSources(dualActor.sources.declared, 'manifesto');
  sources.structural = makeSources(dualActor.sources.structural, 'legislation');

  raw.dualRegister = {
    protocol: 'Dual-Register Sourcing Protocol v0.2.0',
    period: dualActor.period,
    status: dualActor.status,
    evidenceQuality: dualActor.evidence_quality,
    declared,
    structural,
    delta,
    confidence,
    sources
  };

  // Also update actor metadata if present
  if (dualActor.display_name && !raw.actor.displayName) {
    raw.actor.displayName = dualActor.display_name;
  }

  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2) + '\n', 'utf-8');
  console.log(`Augmented: ${basename}.json`);
}

function createNewActor(dualActor) {
  const slug = dualActor.id;
  const basename = slug;
  const filePath = path.join(ACTORS_DIR, `${basename}.json`);

  if (fs.existsSync(filePath)) {
    console.warn(`Actor already exists: ${filePath}`);
    return;
  }

  // Use structural scores as primary scores (actual record over declared rhetoric)
  const scores = {};
  const scoreMeta = {};
  const responses = {};

  for (const axis of Object.keys(dualActor.coordinates.structural)) {
    const capAxis = capitaliseAxis(axis);
    const val = dualActor.coordinates.structural[axis];
    const conf = dualActor.confidence[axis];
    scores[capAxis] = val;
    scoreMeta[capAxis] = {
      confidence: confidenceToLabel(conf.structural),
      rationale: conf.note || `${dualActor.display_name} structural score`,
      sources: makeSources(dualActor.sources.structural, 'legislation')
    };
  }

  // Generate placeholder responses from structural scores
  for (let i = 1; i <= 24; i++) {
    const qid = `Q${i}`;
    responses[qid] = {
      value: 2,
      confidence: 'medium',
      rationale: `Inferred from structural axis scores for ${dualActor.display_name}.`,
      sources: []
    };
  }

  const actor = {
    schemaVersion: '1.1.0',
    actor: {
      name: dualActor.name,
      slug: dualActor.id,
      category: 'UK Political Party',
      activePeriod: dualActor.period,
      color: '#8B0000', // Dark red - Restore Britain brand
      version: '1.0.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      curator: 'A Common Enemy Project',
      contributors: ['Ruari Mears']
    },
    scores,
    responses,
    dualRegister: {
      protocol: 'Dual-Register Sourcing Protocol v0.2.0',
      period: dualActor.period,
      status: dualActor.status,
      evidenceQuality: dualActor.evidence_quality,
      declared: Object.fromEntries(
        Object.entries(dualActor.coordinates.declared).map(([k, v]) => [capitaliseAxis(k), v])
      ),
      structural: Object.fromEntries(
        Object.entries(dualActor.coordinates.structural).map(([k, v]) => [capitaliseAxis(k), v])
      ),
      delta: Object.fromEntries(
        Object.entries(dualActor.coordinates.delta).map(([k, v]) => [capitaliseAxis(k), v])
      ),
      confidence: dualActor.confidence,
      sources: {
        declared: makeSources(dualActor.sources.declared, 'manifesto'),
        structural: makeSources(dualActor.sources.structural, 'legislation')
      }
    }
  };

  // Add taxonomy note if present
  if (dualActor.taxonomy_note) {
    actor._researchNotes = { taxonomyNote: dualActor.taxonomy_note };
  }

  fs.writeFileSync(filePath, JSON.stringify(actor, null, 2) + '\n', 'utf-8');
  console.log(`Created: ${basename}.json`);
}

function main() {
  if (!fs.existsSync(RESEARCH_FILE)) {
    console.error(`Research file not found: ${RESEARCH_FILE}`);
    process.exit(1);
  }

  const research = JSON.parse(fs.readFileSync(RESEARCH_FILE, 'utf-8'));

  for (const rawActor of research.actors) {
    const dualActor = normaliseActor(rawActor);
    const basename = ID_MAP[dualActor.id];
    if (basename === undefined) {
      console.warn(`Unknown actor id: ${dualActor.id}`);
      continue;
    }
    if (basename === null) {
      createNewActor(dualActor);
    } else {
      augmentExistingActor(basename, dualActor);
    }
  }

  console.log('Migration complete.');
}

main();

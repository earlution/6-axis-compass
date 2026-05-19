const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data', 'actors');

// Question mapping based on src/data.js (current source of truth)
const QUESTIONS = [
  { id: 'Q1',  axis: 'Cultural',    reverse: false },
  { id: 'Q2',  axis: 'Cultural',    reverse: true },
  { id: 'Q3',  axis: 'Cultural',    reverse: false },
  { id: 'Q4',  axis: 'Cultural',    reverse: true },
  { id: 'Q5',  axis: 'Economic',    reverse: false },
  { id: 'Q6',  axis: 'Economic',    reverse: true },
  { id: 'Q7',  axis: 'Economic',    reverse: false },
  { id: 'Q8',  axis: 'Economic',    reverse: true },
  { id: 'Q9',  axis: 'Military',    reverse: true },
  { id: 'Q10', axis: 'Military',    reverse: false },
  { id: 'Q11', axis: 'Military',    reverse: false },
  { id: 'Q12', axis: 'Military',    reverse: true },
  { id: 'Q13', axis: 'Sovereignty', reverse: false },
  { id: 'Q14', axis: 'Sovereignty', reverse: true },
  { id: 'Q15', axis: 'Sovereignty', reverse: false },
  { id: 'Q16', axis: 'Sovereignty', reverse: true },
  { id: 'Q17', axis: 'Governance',  reverse: true },
  { id: 'Q18', axis: 'Governance',  reverse: false },
  { id: 'Q19', axis: 'Governance',  reverse: true },
  { id: 'Q20', axis: 'Governance',  reverse: false },
  { id: 'Q21', axis: 'Class',       reverse: false },
  { id: 'Q22', axis: 'Class',       reverse: true },
  { id: 'Q23', axis: 'Class',       reverse: false },
  { id: 'Q24', axis: 'Class',       reverse: true },
];

function computeScore(responses, axis) {
  const qs = QUESTIONS.filter(q => q.axis === axis);
  let total = 0;
  for (const q of qs) {
    const r = responses[q.id];
    if (r === undefined) return null;
    total += q.reverse ? (4 - r) : r;
  }
  return parseFloat(((total / 16) * 10).toFixed(1));
}

function findBestResponses(targetScore, axis) {
  const qs = QUESTIONS.filter(q => q.axis === axis);
  const forwards = qs.filter(q => !q.reverse);
  const reverses = qs.filter(q => q.reverse);

  let best = null;
  let bestScore = Infinity;

  // Brute-force all 5^4 = 625 combos
  for (let a = 0; a <= 4; a++) {
    for (let b = 0; b <= 4; b++) {
      for (let c = 0; c <= 4; c++) {
        for (let d = 0; d <= 4; d++) {
          const resp = {};
          resp[forwards[0].id] = a;
          resp[forwards[1].id] = b;
          resp[reverses[0].id] = c;
          resp[reverses[1].id] = d;

          const score = computeScore(resp, axis);
          const diff = Math.abs(score - targetScore);

          // Tie-breaker: lower variance of responses (more balanced)
          const values = [a, b, c, d];
          const mean = values.reduce((s, v) => s + v, 0) / 4;
          const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / 4;

          const scoreBetter = diff < bestScore;
          const tieBetter = diff === bestScore && best && variance < best.variance;

          if (scoreBetter || tieBetter) {
            best = { resp, score, diff, variance };
            bestScore = diff;
          }
        }
      }
    }
  }

  return best.resp;
}

function processActor(file) {
  const filePath = path.join(DATA_DIR, file);
  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const responses = {};
  for (const [axis, data] of Object.entries(raw.scores)) {
    const targetScore = parseFloat(data.value);
    const best = findBestResponses(targetScore, axis);
    Object.assign(responses, best);
  }

  // Add responses to actor JSON
  raw.responses = {};
  for (const q of QUESTIONS) {
    raw.responses[q.id] = {
      value: responses[q.id],
      confidence: raw.scores[q.axis].confidence || 'low',
      rationale: `Inferred from ${q.axis} axis score of ${raw.scores[q.axis].value}.`,
      sources: []
    };
  }

  // Bump schema version
  raw.schemaVersion = '1.1.0';
  raw.actor.version = raw.actor.version || '1.0.0';
  raw.actor.lastUpdated = new Date().toISOString().split('T')[0];

  fs.writeFileSync(filePath, JSON.stringify(raw, null, 2) + '\n', 'utf-8');
  console.log(`Updated ${file} with 24 responses`);
}

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
for (const file of files.sort()) {
  processActor(file);
}

console.log(`\nProcessed ${files.length} actor files.`);

/**
 * Scoring algorithm:
 * - 4 questions per axis
 * - Forward-scored: response value 0–4 added directly
 * - Reverse-scored: (4 - response value) added
 * - Raw total 0–16 normalised to 0–10:
 *   score = (total / 16) * 10, rounded to 1 decimal place
 */

/** OQ2 — pedagogical / tabular order (WB-031 / A Common Enemy §II(a)). */
export const AXES = ['Cultural', 'Economic', 'Military', 'Sovereignty', 'Governance', 'Class'];

/** OQ5 — spatial radar circuit, clockwise from ~7:30 (§II(b)). */
export const SPATIAL_AXES = ['Economic', 'Governance', 'Class', 'Cultural', 'Sovereignty', 'Military'];

/** Default display inversion so §II 0-pole “left/right” values extend toward the rim on the correct side. */
export const SPATIAL_DISPLAY_INVERT = ['Economic', 'Governance', 'Class', 'Sovereignty'];

export const PEDAGOGICAL_AXES = AXES;

export const AXIS_META = {
  Cultural:    { low: 'Cultural internationalism', high: 'Cultural nationalism' },
  Economic:    { low: 'Economic internationalism', high: 'Economic nationalism' },
  Military:    { low: 'Non-interventionist',         high: 'Interventionist' },
  Sovereignty: { low: 'Supranational',               high: 'National sovereignty' },
  Governance:  { low: 'Maximal hierarchy / authority / coercive', high: 'Maximal autonomy / consent-based / democratic' },
  Class:       { low: 'Class harmony',               high: 'Class conflict' }
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
  { id: 'Q1',  axis: 'Cultural',    text: "Preserving a nation's distinct cultural identity should be a primary concern of government.", reverse: false },
  { id: 'Q2',  axis: 'Cultural',    text: 'Immigration enriches societies more than it disrupts them.', reverse: true },
  { id: 'Q3',  axis: 'Cultural',    text: 'Rapid demographic change in communities is a legitimate concern deserving serious political attention.', reverse: false },
  { id: 'Q4',  axis: 'Cultural',    text: 'People should be as free to settle in any country as to move within it.', reverse: true },
  // Economic
  { id: 'Q5',  axis: 'Economic',    text: 'Governments should actively protect domestic industries from foreign competition.', reverse: false },
  { id: 'Q6',  axis: 'Economic',    text: 'The free movement of capital across borders generally benefits the economies involved.', reverse: true },
  { id: 'Q7',  axis: 'Economic',    text: 'Strategic industries such as energy and transport should be under national democratic control.', reverse: false },
  { id: 'Q8',  axis: 'Economic',    text: 'Removing trade barriers between nations creates prosperity for all participants.', reverse: true },
  // Military
  { id: 'Q9',  axis: 'Military',    text: 'My country should withdraw from or significantly reduce its commitments to NATO.', reverse: true },
  { id: 'Q10', axis: 'Military',    text: 'Western military intervention in foreign states can be a legitimate and effective instrument of policy.', reverse: false },
  { id: 'Q11', axis: 'Military',    text: 'A nation should be willing to use military force to protect its strategic interests abroad.', reverse: false },
  { id: 'Q12', axis: 'Military',    text: 'Foreign military involvement should be avoided except in direct self-defence.', reverse: true },
  // Sovereignty
  { id: 'Q13', axis: 'Sovereignty', text: "A country's elected parliament should have the final say on all laws affecting its citizens.", reverse: false },
  { id: 'Q14', axis: 'Sovereignty', text: 'International institutions provide necessary constraints on national governments.', reverse: true },
  { id: 'Q15', axis: 'Sovereignty', text: "A nation's democratic decisions should not be overridden by international legal obligations.", reverse: false },
  { id: 'Q16', axis: 'Sovereignty', text: 'Sharing sovereignty with other nations can help solve problems that individual countries cannot address alone.', reverse: true },
  // Governance
  { id: 'Q17', axis: 'Governance',  text: 'Clear chains of command and delegated authority are necessary for any large organisation to function effectively.', reverse: true },
  { id: 'Q18', axis: 'Governance',  text: 'The most important collective decisions should be made through broad participatory consent rather than delegated to a small leadership group.', reverse: false },
  { id: 'Q19', axis: 'Governance',  text: 'A well-ordered society requires that people generally accept and defer to legitimate authority.', reverse: true },
  { id: 'Q20', axis: 'Governance',  text: 'Individuals and local communities should have the maximum feasible autonomy over decisions that directly affect their own lives.', reverse: false },
  // Class
  { id: 'Q21', axis: 'Class',       text: 'The interests of employers and employees are fundamentally in tension.', reverse: false },
  { id: 'Q22', axis: 'Class',       text: 'Economic growth generally benefits both business owners and workers.', reverse: true },
  { id: 'Q23', axis: 'Class',       text: 'The wealth gap between rich and poor is a structural problem requiring political solutions.', reverse: false },
  { id: 'Q24', axis: 'Class',       text: 'What is good for business is generally good for the country as a whole.', reverse: true }
];

const _FALLBACK_ACTORS = [
  // UK Political Parties
  { name: 'Conservative Party', scores: { Cultural: 7, Economic: 3, Military: 8, Sovereignty: 6, Governance: 5, Class: 1 }, color: '#1A75BB' },
  { name: 'Labour Party',       scores: { Cultural: 5, Economic: 3, Military: 7, Sovereignty: 5, Governance: 6, Class: 3 }, color: '#c0392b' },
  { name: 'Reform UK',          scores: { Cultural: 8, Economic: 5, Military: 5, Sovereignty: 8, Governance: 5, Class: 2 }, color: '#12B6CF' },
  { name: 'Liberal Democrats',  scores: { Cultural: 3, Economic: 4, Military: 5, Sovereignty: 4, Governance: 7, Class: 4 }, color: '#FAA61A' },
  { name: 'Green Party',        scores: { Cultural: 2, Economic: 7, Military: 2, Sovereignty: 5, Governance: 8, Class: 8 }, color: '#5A9E3F' },
  { name: 'SNP',                scores: { Cultural: 6, Economic: 6, Military: 2, Sovereignty: 9, Governance: 7, Class: 7 }, color: '#FDF38E' },
  { name: 'Plaid Cymru',        scores: { Cultural: 8, Economic: 6, Military: 2, Sovereignty: 8, Governance: 7, Class: 7 }, color: '#3CB371' },

  // US Political Parties
  { name: 'US Democrats',       scores: { Cultural: 3, Economic: 4, Military: 7, Sovereignty: 4, Governance: 6, Class: 4 }, color: '#3C6EC9' },
  { name: 'US Republicans',     scores: { Cultural: 8, Economic: 4, Military: 8, Sovereignty: 7, Governance: 4, Class: 1 }, color: '#C0392B' },

  // Economic Historical Figures
  { name: 'John Maynard Keynes', scores: { Cultural: 4, Economic: 7, Military: 2, Sovereignty: 5, Governance: 5, Class: 3 }, color: '#607D8B' },
  { name: 'Milton Friedman',     scores: { Cultural: 3, Economic: 2, Military: 6, Sovereignty: 4, Governance: 2, Class: 2 }, color: '#8D6E63' },

  // World War II Political Figures
  { name: 'Clement Attlee',          scores: { Cultural: 5, Economic: 7, Military: 7, Sovereignty: 5, Governance: 6, Class: 6 }, color: '#E74C3C' },
  { name: 'Winston Churchill',         scores: { Cultural: 8, Economic: 3, Military: 9, Sovereignty: 8, Governance: 7, Class: 2 }, color: '#1A237E' },
  { name: 'Adolf Hitler',              scores: { Cultural: 10, Economic: 8, Military: 10, Sovereignty: 10, Governance: 9, Class: 7 }, color: '#212121' },
  { name: 'Franklin D. Roosevelt',     scores: { Cultural: 4, Economic: 7, Military: 8, Sovereignty: 5, Governance: 6, Class: 5 }, color: '#1565C0' },
  { name: 'Benito Mussolini',          scores: { Cultural: 9, Economic: 7, Military: 9, Sovereignty: 9, Governance: 9, Class: 6 }, color: '#424242' },
  { name: 'Joseph Stalin',             scores: { Cultural: 7, Economic: 9, Military: 9, Sovereignty: 6, Governance: 10, Class: 10 }, color: '#B71C1C' },

  // Methodology anchor examples
  { name: 'Attlee government 1945–51', scores: { Cultural: 5, Economic: 0, Military: 5, Sovereignty: 5, Governance: 5, Class: 10 }, color: '#D32F2F' },
  { name: 'Thatcher government 1979–90', scores: { Cultural: 6, Economic: 10, Military: 6, Sovereignty: 6, Governance: 7, Class: 0 }, color: '#00BFFF' },
  { name: 'Bush/Blair Iraq position',  scores: { Cultural: 5, Economic: 5, Military: 10, Sovereignty: 4, Governance: 6, Class: 4 }, color: '#6B8E23' },
  { name: 'Stop the War Coalition',     scores: { Cultural: 3, Economic: 4, Military: 0, Sovereignty: 5, Governance: 4, Class: 6 }, color: '#FF4500' },
  { name: 'Enoch Powell 1968',          scores: { Cultural: 10, Economic: 7, Military: 5, Sovereignty: 9, Governance: 7, Class: 6 }, color: '#8B0000' },
  { name: 'Federalist EU tradition',    scores: { Cultural: 3, Economic: 3, Military: 4, Sovereignty: 10, Governance: 5, Class: 4 }, color: '#003399' },
  { name: 'Anarcho-communism',        scores: { Cultural: 3, Economic: 0, Military: 0, Sovereignty: 0, Governance: 10, Class: 10 }, color: '#9C27B0' },
  { name: 'Leninism',                 scores: { Cultural: 6, Economic: 10, Military: 7, Sovereignty: 5, Governance: 0, Class: 10 }, color: '#CC0000' },
  { name: 'Fascism',                  scores: { Cultural: 10, Economic: 8, Military: 9, Sovereignty: 9, Governance: 0, Class: 0 }, color: '#8B4513' },
  { name: "Orbán's Hungary",          scores: { Cultural: 9, Economic: 7, Military: 6, Sovereignty: 8, Governance: 0, Class: 7 }, color: '#006600' },

  // Brexit Factions
  { name: 'Hard Brexit',              scores: { Cultural: 8, Economic: 7, Military: 5, Sovereignty: 9, Governance: 5, Class: 5 }, color: '#8B0000' },
  { name: 'Soft Brexit',              scores: { Cultural: 5, Economic: 4, Military: 5, Sovereignty: 5, Governance: 6, Class: 4 }, color: '#FF8C00' },
  { name: "People's Vote",            scores: { Cultural: 3, Economic: 3, Military: 4, Sovereignty: 2, Governance: 7, Class: 5 }, color: '#1E90FF' },
  { name: 'Brexit Intersection',      scores: { Cultural: 5.3, Economic: 4.7, Military: 4.7, Sovereignty: 5.3, Governance: 6.0, Class: 4.7 }, color: '#800080' }
];

export const ACTORS = typeof __ACTORS !== 'undefined' ? __ACTORS : _FALLBACK_ACTORS;

export function getEffectiveScores(actor, register = 'primary') {
  if (register === 'declared' && actor.dualRegister?.declared) {
    return actor.dualRegister.declared;
  }
  if (register === 'structural' && actor.dualRegister?.structural) {
    return actor.dualRegister.structural;
  }
  return actor.scores;
}

export const ACTOR_GROUPS = {
  '2024–2029 UK Parliament': [
    'Conservative Party', 'Labour Party', 'Reform UK',
    'Liberal Democrats', 'Green Party', 'SNP', 'Plaid Cymru',
    'Restore Britain'
  ],
  'US Congress (current cycle)': ['US Democrats', 'US Republicans'],
  'Thatcher / Reagan era': ['Thatcher government 1979–90'],
  'World War II figures': [
    'Clement Attlee', 'Winston Churchill', 'Adolf Hitler',
    'Franklin D. Roosevelt', 'Benito Mussolini', 'Joseph Stalin'
  ],
  'Economic thinkers': ['John Maynard Keynes', 'Milton Friedman'],
  'Ideological anchors': [
    'Attlee government 1945–51', 'Bush/Blair Iraq position',
    'Stop the War Coalition', 'Enoch Powell 1968',
    'Federalist EU tradition', 'Anarcho-communism',
    'Leninism', 'Fascism', "Orbán's Hungary"
  ],
  'Brexit factions': [
    'Hard Brexit', 'Soft Brexit', "People's Vote", 'Brexit Intersection'
  ]
};

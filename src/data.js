/**
 * Scoring algorithm:
 * - 4 questions per axis
 * - Forward-scored: response value 0–4 added directly
 * - Reverse-scored: (4 - response value) added
 * - Raw total 0–16 normalised to 0–10:
 *   score = (total / 16) * 10, rounded to 1 decimal place
 */

export const AXES = ['Cultural', 'Economic', 'Military', 'Sovereignty', 'Class', 'Libertarian/Authoritarian'];

export const AXIS_META = {
  Cultural:                { low: 'Cultural internationalism', high: 'Cultural nationalism' },
  Economic:                { low: 'Economic internationalism', high: 'Economic nationalism' },
  Military:                { low: 'Non-interventionist',         high: 'Interventionist' },
  Sovereignty:             { low: 'Supranational',               high: 'National sovereignty' },
  'Libertarian/Authoritarian': { low: 'Libertarian / consent-based / democratic', high: 'Authoritarian / hierarchical / illiberal' },
  Class:                   { low: 'Class harmony',               high: 'Class conflict' }
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
  // Libertarian/Authoritarian
  { axis: 'Libertarian/Authoritarian', text: 'In times of serious crisis, the government should have the authority to suspend normal legal protections if doing so is necessary to protect national security or social order.', reverse: false },
  { axis: 'Libertarian/Authoritarian', text: 'Individual freedom of expression should be protected by law even when the views expressed are offensive to the majority.', reverse: true },
  { axis: 'Libertarian/Authoritarian', text: 'Social order and the preservation of traditional values are more important than protecting the rights of minority groups who challenge them.', reverse: false },
  { axis: 'Libertarian/Authoritarian', text: 'Hierarchical structures in government and society should be continuously open to challenge and accountable to the people subject to them.', reverse: true },
  // Class
  { axis: 'Class', text: 'The interests of employers and employees are fundamentally in tension.', reverse: false },
  { axis: 'Class', text: 'Economic growth generally benefits both business owners and workers.', reverse: true },
  { axis: 'Class', text: 'The wealth gap between rich and poor is a structural problem requiring political solutions.', reverse: false },
  { axis: 'Class', text: 'What is good for business is generally good for the country as a whole.', reverse: true }
];

const _FALLBACK_ACTORS = [
  // UK Political Parties
  { name: 'Conservative Party', scores: { Cultural: 7, Economic: 3, Military: 8, Sovereignty: 6, 'Libertarian/Authoritarian': 5, Class: 1 }, color: '#1A75BB' },
  { name: 'Labour Party',       scores: { Cultural: 5, Economic: 3, Military: 7, Sovereignty: 5, 'Libertarian/Authoritarian': 4, Class: 3 }, color: '#c0392b' },
  { name: 'Reform UK',          scores: { Cultural: 8, Economic: 5, Military: 5, Sovereignty: 8, 'Libertarian/Authoritarian': 5, Class: 2 }, color: '#12B6CF' },
  { name: 'Liberal Democrats',  scores: { Cultural: 3, Economic: 4, Military: 5, Sovereignty: 4, 'Libertarian/Authoritarian': 3, Class: 4 }, color: '#FAA61A' },
  { name: 'Green Party',        scores: { Cultural: 2, Economic: 7, Military: 2, Sovereignty: 5, 'Libertarian/Authoritarian': 2, Class: 8 }, color: '#5A9E3F' },
  { name: 'SNP',                scores: { Cultural: 6, Economic: 6, Military: 2, Sovereignty: 9, 'Libertarian/Authoritarian': 3, Class: 7 }, color: '#FDF38E' },
  { name: 'Plaid Cymru',        scores: { Cultural: 8, Economic: 6, Military: 2, Sovereignty: 8, 'Libertarian/Authoritarian': 3, Class: 7 }, color: '#3CB371' },

  // US Political Parties
  { name: 'US Democrats',       scores: { Cultural: 3, Economic: 4, Military: 7, Sovereignty: 4, 'Libertarian/Authoritarian': 4, Class: 4 }, color: '#3C6EC9' },
  { name: 'US Republicans',     scores: { Cultural: 8, Economic: 4, Military: 8, Sovereignty: 7, 'Libertarian/Authoritarian': 6, Class: 1 }, color: '#C0392B' },

  // Economic Historical Figures
  { name: 'John Maynard Keynes', scores: { Cultural: 4, Economic: 7, Military: 2, Sovereignty: 5, 'Libertarian/Authoritarian': 5, Class: 3 }, color: '#607D8B' },
  { name: 'Milton Friedman',     scores: { Cultural: 3, Economic: 2, Military: 6, Sovereignty: 4, 'Libertarian/Authoritarian': 8, Class: 2 }, color: '#8D6E63' },

  // World War II Political Figures
  { name: 'Clement Attlee',          scores: { Cultural: 5, Economic: 7, Military: 7, Sovereignty: 5, 'Libertarian/Authoritarian': 4, Class: 6 }, color: '#E74C3C' },
  { name: 'Winston Churchill',         scores: { Cultural: 8, Economic: 3, Military: 9, Sovereignty: 8, 'Libertarian/Authoritarian': 3, Class: 2 }, color: '#1A237E' },
  { name: 'Adolf Hitler',              scores: { Cultural: 10, Economic: 8, Military: 10, Sovereignty: 10, 'Libertarian/Authoritarian': 1, Class: 7 }, color: '#212121' },
  { name: 'Franklin D. Roosevelt',     scores: { Cultural: 4, Economic: 7, Military: 8, Sovereignty: 5, 'Libertarian/Authoritarian': 4, Class: 5 }, color: '#1565C0' },
  { name: 'Benito Mussolini',          scores: { Cultural: 9, Economic: 7, Military: 9, Sovereignty: 9, 'Libertarian/Authoritarian': 1, Class: 6 }, color: '#424242' },
  { name: 'Joseph Stalin',             scores: { Cultural: 7, Economic: 9, Military: 9, Sovereignty: 6, 'Libertarian/Authoritarian': 0, Class: 10 }, color: '#B71C1C' },

  // Methodology anchor examples
  { name: 'Attlee government 1945–51', scores: { Cultural: 5, Economic: 0, Military: 5, Sovereignty: 5, 'Libertarian/Authoritarian': 5, Class: 10 }, color: '#D32F2F' },
  { name: 'Thatcher government 1979–90', scores: { Cultural: 6, Economic: 10, Military: 6, Sovereignty: 6, 'Libertarian/Authoritarian': 3, Class: 0 }, color: '#00BFFF' },
  { name: 'Bush/Blair Iraq position',  scores: { Cultural: 5, Economic: 5, Military: 10, Sovereignty: 4, 'Libertarian/Authoritarian': 4, Class: 4 }, color: '#6B8E23' },
  { name: 'Stop the War Coalition',     scores: { Cultural: 3, Economic: 4, Military: 0, Sovereignty: 5, 'Libertarian/Authoritarian': 6, Class: 6 }, color: '#FF4500' },
  { name: 'Enoch Powell 1968',          scores: { Cultural: 10, Economic: 7, Military: 5, Sovereignty: 9, 'Libertarian/Authoritarian': 3, Class: 6 }, color: '#8B0000' },
  { name: 'Federalist EU tradition',    scores: { Cultural: 3, Economic: 3, Military: 4, Sovereignty: 10, 'Libertarian/Authoritarian': 5, Class: 4 }, color: '#003399' },
  { name: 'Anarcho-communism',        scores: { Cultural: 3, Economic: 0, Military: 0, Sovereignty: 0, 'Libertarian/Authoritarian': 0, Class: 10 }, color: '#9C27B0' },
  { name: 'Leninism',                 scores: { Cultural: 6, Economic: 10, Military: 7, Sovereignty: 5, 'Libertarian/Authoritarian': 10, Class: 10 }, color: '#CC0000' },
  { name: 'Fascism',                  scores: { Cultural: 10, Economic: 8, Military: 9, Sovereignty: 9, 'Libertarian/Authoritarian': 10, Class: 0 }, color: '#8B4513' },
  { name: "Orbán's Hungary",          scores: { Cultural: 9, Economic: 7, Military: 6, Sovereignty: 8, 'Libertarian/Authoritarian': 10, Class: 7 }, color: '#006600' }
];

export const ACTORS = typeof __ACTORS !== 'undefined' ? __ACTORS : _FALLBACK_ACTORS;

export const ACTOR_GROUPS = {
  '2024–2029 UK Parliament': [
    'Conservative Party', 'Labour Party', 'Reform UK',
    'Liberal Democrats', 'Green Party', 'SNP', 'Plaid Cymru'
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
  ]
};

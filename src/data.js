/**
 * Scoring algorithm:
 * - 4 questions per axis
 * - Forward-scored: response value 0–4 added directly
 * - Reverse-scored: (4 - response value) added
 * - Raw total 0–16 normalised to 0–10:
 *   score = (total / 16) * 10, rounded to 1 decimal place
 */

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

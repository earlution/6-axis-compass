# Six-Axis Compass — Research Manifest

## Purpose

This document is a working reference for researchers seeking to ground every actor score in verifiable, citable evidence. Currently **30 of 31 actors have zero sources** in their data files. Only the Conservative Party has partial sourcing (11 citations across 6 axes). The goal is to move every score from an educated methodology-anchor estimate to a documented, auditable position backed by primary sources.

---

## Scoring Methodology

### Questionnaire structure
- 24 statements total (4 per axis)
- 5-point Likert scale:
  - Strongly agree = 4
  - Agree = 3
  - Neither agree nor disagree = 2
  - Disagree = 1
  - Strongly disagree = 0

### Score computation
- Forward-scored questions: response value (0–4) added directly
- Reverse-scored questions: (4 - response value) added
- Raw total per axis: 0–16 (4 questions × 4 max)
- Normalised to 0–10: `score = (total / 16) * 10`, rounded to 1 decimal place
- All neutral answers → 5.0 on every axis

### What a score means
- **0** = fully aligned with the LOW pole of the axis
- **10** = fully aligned with the HIGH pole of the axis
- **5** = neutral / balanced on that dimension

---

## The Six Axes

| Axis | Low (0) | High (10) |
|------|---------|-----------|
| **Cultural** | Cultural internationalism | Cultural nationalism |
| **Economic** | Economic internationalism | Economic nationalism |
| **Military** | Non-interventionist | Interventionist |
| **Sovereignty** | Supranational | National sovereignty |
| **Governance** | Maximal autonomy / consent-based / democratic | Maximal hierarchy / authority / coercive |
| **Class** | Class harmony | Class conflict |

---

## The 24 Questions (with Axis Mapping and Directionality)

### Cultural (4 questions)

| # | Text | Direction | What "Agree" means (score ↑) |
|---|------|-----------|------------------------------|
| 1 | Preserving a nation's distinct cultural identity should be a primary concern of government. | Forward | Cultural nationalism ↑ |
| 2 | Immigration enriches societies more than it disrupts them. | Reverse | Cultural nationalism ↑ (disagreeing = nationalist) |
| 3 | Rapid demographic change in communities is a legitimate concern deserving serious political attention. | Forward | Cultural nationalism ↑ |
| 4 | People should be as free to settle in any country as to move within it. | Reverse | Cultural nationalism ↑ (disagreeing = nationalist) |

### Economic (4 questions)

| # | Text | Direction | What "Agree" means (score ↑) |
|---|------|-----------|------------------------------|
| 5 | Governments should actively protect domestic industries from foreign competition. | Forward | Economic nationalism ↑ |
| 6 | The free movement of capital across borders generally benefits the economies involved. | Reverse | Economic nationalism ↑ (disagreeing = nationalist) |
| 7 | Strategic industries such as energy and transport should be under national democratic control. | Forward | Economic nationalism ↑ |
| 8 | Removing trade barriers between nations creates prosperity for all participants. | Reverse | Economic nationalism ↑ (disagreeing = nationalist) |

### Military (4 questions)

| # | Text | Direction | What "Agree" means (score ↑) |
|---|------|-----------|------------------------------|
| 9 | My country should withdraw from or significantly reduce its commitments to NATO. | Reverse | Interventionism ↑ (disagreeing = interventionist) |
| 10 | Western military intervention in foreign states can be a legitimate and effective instrument of policy. | Forward | Interventionism ↑ |
| 11 | A nation should be willing to use military force to protect its strategic interests abroad. | Forward | Interventionism ↑ |
| 12 | Foreign military involvement should be avoided except in direct self-defence. | Reverse | Interventionism ↑ (disagreeing = non-interventionist... wait: disagreeing with this statement = interventionist) |

### Sovereignty (4 questions)

| # | Text | Direction | What "Agree" means (score ↑) |
|---|------|-----------|------------------------------|
| 13 | A country's elected parliament should have the final say on all laws affecting its citizens. | Forward | National sovereignty ↑ |
| 14 | International institutions provide necessary constraints on national governments. | Reverse | National sovereignty ↑ (disagreeing = sovereignty) |
| 15 | A nation's democratic decisions should not be overridden by international legal obligations. | Forward | National sovereignty ↑ |
| 16 | Sharing sovereignty with other nations can help solve problems that individual countries cannot address alone. | Reverse | National sovereignty ↑ (disagreeing = sovereignty) |

### Governance (4 questions)

| # | Text | Direction | What "Agree" means (score ↑) |
|---|------|-----------|------------------------------|
| 17 | Clear chains of command and delegated authority are necessary for any large organisation to function effectively. | Forward | Hierarchy / authority ↑ |
| 18 | The most important collective decisions should be made through broad participatory consent rather than delegated to a small leadership group. | Reverse | Hierarchy / authority ↑ (disagreeing = hierarchical) |
| 19 | A well-ordered society requires that people generally accept and defer to legitimate authority. | Forward | Hierarchy / authority ↑ |
| 20 | Individuals and local communities should have the maximum feasible autonomy over decisions that directly affect their own lives. | Reverse | Hierarchy / authority ↑ (disagreeing = autonomous) |

### Class (4 questions)

| # | Text | Direction | What "Agree" means (score ↑) |
|---|------|-----------|------------------------------|
| 21 | The interests of employers and employees are fundamentally in tension. | Forward | Class conflict ↑ |
| 22 | Economic growth generally benefits both business owners and workers. | Reverse | Class conflict ↑ (disagreeing = class conflict) |
| 23 | The wealth gap between rich and poor is a structural problem requiring political solutions. | Forward | Class conflict ↑ |
| 24 | What is good for business is generally good for the country as a whole. | Reverse | Class conflict ↑ (disagreeing = class conflict) |

---

## How to Derive an Actor's Score from Evidence

For each actor and each axis, the research task is to estimate how that actor **would answer the 4 questions on that axis**, then compute the score using the formula above.

### Example: Conservative Party on Cultural axis (current score: 7.0)
The current rationale: "Consistent emphasis on controlled immigration, cultural preservation, and British values in manifestos and legislation since 2010."

Working backwards from a score of 7.0:
- Target total = (7.0 / 10) * 16 = 11.2
- This could come from answers like: Q1=3, Q2=2, Q3=4, Q4=2 → forward(3) + reverse(2) + forward(4) + reverse(2) = 3 + (4-2) + 4 + (4-2) = 3 + 2 + 4 + 2 = 11 → score = (11/16)*10 = 6.875 ≈ 6.9
- Or: Q1=4, Q2=1, Q3=4, Q4=1 → 4 + 3 + 4 + 3 = 14 → score = 8.75

The research task is not to reverse-engineer the exact answers, but to **find evidence that justifies the approximate score** and refine it if the evidence points elsewhere.

### Evidence types to look for

| Axis | Primary sources | Where to look |
|------|-----------------|---------------|
| **Cultural** | Manifesto sections on immigration, integration, nationality law; Hansard debates on Immigration Bills; party conference speeches | legislation.gov.uk, Hansard, party manifesto archives |
| **Economic** | Trade policy announcements, industrial strategy documents, budget speeches, subsidy/tariff decisions | gov.uk, Treasury publications, DIT trade agreements, Hansard Finance Bill debates |
| **Military** | Defence reviews, NATO commitments, overseas deployment votes, arms export decisions | Hansard defence debates, MoD policy papers, parliamentary votes on military action |
| **Sovereignty** | Brexit/EU-related legislation, ECHR positions, international treaty ratification records | legislation.gov.uk, Hansard EU/withdrawal debates, treaty databases |
| **Governance** | Constitutional reform positions, devolution policy, local government attitudes, protest/civil liberties legislation | Hansard constitutional debates, manifesto governance chapters, police powers legislation |
| **Class** | Employment law votes (strikes, minimum wage, unions), tax policy (progressive vs regressive), welfare reform | Hansard employment debates, Budget documents, union/employer body statements |

---

## Current Actor Scores (as of v2.2.1)

### UK Parliament 2024–2029

| Actor | C | M | S | E | Cl | G |
|-------|---|---|---|---|----|---|
| Conservative Party | 7.0 | 8.0 | 6.0 | 3.0 | 1.0 | 5.0 |
| Labour Party | 5.0 | 7.0 | 5.0 | 3.0 | 3.0 | 6.0 |
| Reform UK | 8.0 | 5.0 | 8.0 | 5.0 | 2.0 | 5.0 |
| Liberal Democrats | 3.0 | 5.0 | 4.0 | 4.0 | 4.0 | 7.0 |
| Green Party | 2.0 | 2.0 | 5.0 | 7.0 | 8.0 | 8.0 |
| SNP | 6.0 | 2.0 | 9.0 | 6.0 | 7.0 | 7.0 |
| Plaid Cymru | 8.0 | 2.0 | 8.0 | 6.0 | 7.0 | 7.0 |

### US Congress (current cycle)

| Actor | C | M | S | E | Cl | G |
|-------|---|---|---|---|----|---|
| US Democrats | 3.0 | 7.0 | 4.0 | 4.0 | 4.0 | 6.0 |
| US Republicans | 8.0 | 8.0 | 7.0 | 4.0 | 1.0 | 4.0 |

### Economic thinkers

| Actor | C | M | S | E | Cl | G |
|-------|---|---|---|---|----|---|
| John Maynard Keynes | 4.0 | 2.0 | 5.0 | 7.0 | 3.0 | 5.0 |
| Milton Friedman | 3.0 | 6.0 | 4.0 | 2.0 | 2.0 | 2.0 |

### World War II figures

| Actor | C | M | S | E | Cl | G |
|-------|---|---|---|---|----|---|
| Clement Attlee | 5.0 | 7.0 | 5.0 | 7.0 | 6.0 | 6.0 |
| Winston Churchill | 8.0 | 9.0 | 8.0 | 3.0 | 2.0 | 7.0 |
| Adolf Hitler | 10.0 | 10.0 | 10.0 | 8.0 | 7.0 | 9.0 |
| Franklin D. Roosevelt | 4.0 | 8.0 | 5.0 | 7.0 | 5.0 | 6.0 |
| Benito Mussolini | 9.0 | 9.0 | 9.0 | 7.0 | 6.0 | 9.0 |
| Joseph Stalin | 7.0 | 9.0 | 6.0 | 9.0 | 10.0 | 10.0 |

### Methodology anchors

| Actor | C | M | S | E | Cl | G |
|-------|---|---|---|---|----|---|
| Attlee government 1945–51 | 5.0 | 5.0 | 5.0 | 0.0 | 10.0 | 5.0 |
| Thatcher government 1979–90 | 6.0 | 6.0 | 6.0 | 10.0 | 0.0 | 7.0 |
| Bush/Blair Iraq position | 5.0 | 10.0 | 4.0 | 5.0 | 4.0 | 6.0 |
| Stop the War Coalition | 3.0 | 0.0 | 5.0 | 4.0 | 6.0 | 4.0 |
| Enoch Powell 1968 | 10.0 | 5.0 | 9.0 | 7.0 | 6.0 | 7.0 |
| Federalist EU tradition | 3.0 | 4.0 | 10.0 | 3.0 | 4.0 | 5.0 |
| Anarcho-communism | 3.0 | 0.0 | 0.0 | 0.0 | 10.0 | 10.0 |
| Leninism | 6.0 | 7.0 | 5.0 | 10.0 | 10.0 | 0.0 |
| Fascism | 10.0 | 9.0 | 9.0 | 8.0 | 0.0 | 0.0 |
| Orbán's Hungary | 9.0 | 6.0 | 8.0 | 7.0 | 7.0 | 0.0 |

### Brexit factions

| Actor | C | M | S | E | Cl | G |
|-------|---|---|---|---|----|---|
| Hard Brexit | 8.0 | 5.0 | 9.0 | 7.0 | 5.0 | 5.0 |
| Soft Brexit | 5.0 | 5.0 | 5.0 | 4.0 | 4.0 | 6.0 |
| People's Vote | 3.0 | 4.0 | 2.0 | 3.0 | 5.0 | 7.0 |
| Brexit Intersection | 5.3 | 4.7 | 5.3 | 4.7 | 4.7 | 6.0 |

---

## Provenance Status

| Actor | Sources | Confidence | Priority |
|-------|---------|------------|----------|
| Conservative Party | 11 | Mostly high | **PARTIALLY SOURCED** — needs Governance sources |
| All other 30 actors | 0 | N/A (methodology-anchor estimates) | **NEED FULL SOURCING** |

---

## Source Schema (for researchers adding citations)

Each axis score in an actor JSON can include:

```json
{
  "type": "manifesto | legislation | vote | policy | speech | academic | media | other",
  "title": "Short descriptive title",
  "date": "YYYY-MM-DD",
  "url": "https://...",
  "relevantText": "Quoted excerpt supporting the score",
  "citation": "Full academic or parliamentary citation"
}
```

### Confidence levels
- `very-high` — Multiple high-quality sources from different types, consistent over time
- `high` — Direct manifesto/legislative/vote evidence, clear alignment
- `medium` — Partial or inferential evidence, some ambiguity
- `low` — Methodology-anchor estimate, little direct evidence

---

## Research Priority Queue

1. **UK parties** — Most user-facing. Labour, Reform UK, Liberal Democrats, Green Party need manifesto and voting-record analysis.
2. **US parties** — Secondary but important for cross-country comparison. RNC/DNC platforms and congressional voting records.
3. **WWII figures** — Well-documented historical record. Speeches, policy documents, and contemporaneous academic analysis available.
4. **Methodology anchors** — Ideologically extreme positions (Fascism, Leninism, Anarcho-communism) should be the easiest to source since they have canonical texts (Mein Kampf, What Is To Be Done?, etc.).
5. **Economic thinkers** — Keynes and Friedman have extensive published works establishing their positions.
6. **Brexit factions** — Time-bounded (2016–2020), well-covered in media and parliamentary record.

---

## How to Contribute

1. Pick an actor and axis from the priority queue.
2. Find 1–3 primary sources (manifesto, legislation, vote, speech, academic work).
3. Draft a rationale: 1–2 sentences explaining why the evidence supports the score.
4. Add sources to the actor's JSON file under `scores.{axis}.sources`.
5. Update `confidence` if the evidence justifies it.
6. Update `lastUpdated` and bump `version` in the actor metadata.
7. Run `npm run build` and `npm run generate-artifacts`.
8. Submit a PR.

---

*Generated from six-axis-compass v2.2.1 | 31 actors | 186 axis scores | 11 sources total*

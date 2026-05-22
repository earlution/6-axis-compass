# Six-Axis Compass — Questionnaire Reference

## Overview
24 statements, 4 per axis. 5-point Likert scale:
- 4 = Strongly agree
- 3 = Agree
- 2 = Neither agree nor disagree
- 1 = Disagree
- 0 = Strongly disagree

**Direction:** F = Forward (agree increases axis score). R = Reverse (disagree increases axis score).

---

## Q1–Q4: Cultural (Cultural Nationalism ↑)

| Ref | Dir | Statement |
|-----|-----|-----------|
| Q1 | F | Preserving a nation's distinct cultural identity should be a primary concern of government. |
| Q2 | R | Immigration enriches societies more than it disrupts them. |
| Q3 | F | Rapid demographic change in communities is a legitimate concern deserving serious political attention. |
| Q4 | R | People should be as free to settle in any country as to move within it. |

## Q5–Q8: Economic (Economic Nationalism ↑)

| Ref | Dir | Statement |
|-----|-----|-----------|
| Q5 | F | Governments should actively protect domestic industries from foreign competition. |
| Q6 | R | The free movement of capital across borders generally benefits the economies involved. |
| Q7 | F | Strategic industries such as energy and transport should be under national democratic control. |
| Q8 | R | Removing trade barriers between nations creates prosperity for all participants. |

## Q9–Q12: Military (Interventionism ↑)

| Ref | Dir | Statement |
|-----|-----|-----------|
| Q9 | R | My country should withdraw from or significantly reduce its commitments to NATO. |
| Q10 | F | Western military intervention in foreign states can be a legitimate and effective instrument of policy. |
| Q11 | F | A nation should be willing to use military force to protect its strategic interests abroad. |
| Q12 | R | Foreign military involvement should be avoided except in direct self-defence. |

## Q13–Q16: Sovereignty (National Sovereignty ↑)

| Ref | Dir | Statement |
|-----|-----|-----------|
| Q13 | F | A country's elected parliament should have the final say on all laws affecting its citizens. |
| Q14 | R | International institutions provide necessary constraints on national governments. |
| Q15 | F | A nation's democratic decisions should not be overridden by international legal obligations. |
| Q16 | R | Sharing sovereignty with other nations can help solve problems that individual countries cannot address alone. |

## Q17–Q20: Governance (Hierarchy / Authority ↑)

| Ref | Dir | Statement |
|-----|-----|-----------|
| Q17 | F | Clear chains of command and delegated authority are necessary for any large organisation to function effectively. |
| Q18 | R | The most important collective decisions should be made through broad participatory consent rather than delegated to a small leadership group. |
| Q19 | F | A well-ordered society requires that people generally accept and defer to legitimate authority. |
| Q20 | R | Individuals and local communities should have the maximum feasible autonomy over decisions that directly affect their own lives. |

## Q21–Q24: Class (Class Conflict ↑)

| Ref | Dir | Statement |
|-----|-----|-----------|
| Q21 | F | The interests of employers and employees are fundamentally in tension. |
| Q22 | R | Economic growth generally benefits both business owners and workers. |
| Q23 | F | The wealth gap between rich and poor is a structural problem requiring political solutions. |
| Q24 | R | What is good for business is generally good for the country as a whole. |

---

## Actor Profile Notation

An actor's response profile can be recorded concisely as a 24-tuple of Likert scores, e.g.:

```
Winston Churchill (estimated): Q1=4, Q2=0, Q3=4, Q4=0, Q5=2, Q6=2, Q7=2, Q8=2, Q9=0, Q10=4, Q11=4, Q12=0, Q13=4, Q14=0, Q15=4, Q16=0, Q17=4, Q18=0, Q19=4, Q20=0, Q21=1, Q22=3, Q23=1, Q24=3
```

Or grouped by axis:

```
Cultural:     Q1=4, Q2=0, Q3=4, Q4=0
Economic:     Q5=2, Q6=2, Q7=2, Q8=2
Military:     Q9=0, Q10=4, Q11=4, Q12=0
Sovereignty:  Q13=4, Q14=0, Q15=4, Q16=0
Governance:   Q17=4, Q18=0, Q19=4, Q20=0
Class:        Q21=1, Q22=3, Q23=1, Q24=3
```

---

*Generated from six-axis-compass v2.2.1*

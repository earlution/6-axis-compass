# Six-Axis Compass — Post-Release Enhancement Plan

## Context

The Six-Axis Compass has been rebuilt as a standalone open-source project and deployed at `https://earlution.github.io/6-axis-compass/`. This plan covers two post-release workstreams:

1. **Optional enhancements** — six features that improve usability, accessibility, and reach.
2. **Axis restructure refactor** — updating the compass to reflect the framework change approved in `Defining Principles — Supplement v0.0.2`: the deprecated *liberty axis* (substantive/formal coercion) is replaced by a *libertarian/authoritarian axis* (consent-based vs. hierarchical order), with the old liberty content absorbed into the class axis and axis-conflation rhetoric treatments.

The source of truth for the new framework definitions is `docs/governance/axis-scale-specification-and-radar-methodology-v0.0.2.md` in the common-enemy repo. The canonical questionnaire for deriving coordinates is `docs/governance/axis-coding-questionnaire-v0.0.1.md`.

---

## Part A — Optional Future Commits (Enhancements)

Each feature is atomic and commits in isolation. No feature depends on another.

---

### Commit A1 — i18n Support

**Message:** `feat: add i18n infrastructure with English as default`

**Goal:** Extract all user-facing strings into a translation file so the compass can be localised.

**Scope:**
- Create `src/i18n.js` with a default English translation object containing:
  - Intro screen text (eyebrow, title, body, meta, disclaimer, button)
  - Quiz screen text (axis tags, back button)
  - Response labels (Strongly agree → Strongly disagree)
  - Results screen text (title, compare label, footer, retake button)
  - Configuration panel labels (Orientation, Edge up, Vertex up, Your map, Hide/Show, Download, Image, Data, Compare a saved map, Upload, Clear, Axis order, drag to reposition)
  - Axis names and pole labels (all six axes, low/high descriptors)
  - Actor names
  - Error messages (upload failure, unsupported format)
- Create `src/translations/en.json` as the canonical English file.
- Modify `src/ui.js` to import the active translation and render all text through a `t(key)` helper.
- Add a language selector to the configuration panel (default: English).
- Export/import JSON/XML should use axis keys (internal identifiers) not translated labels, so saved maps remain portable across languages.

**Backwards compatibility:** JSON/XML exports already use internal axis keys (`Cultural`, `Economic`, etc.) so they are unaffected.

**Verification:** Switching language updates all visible text. Exporting in English and importing in a (future) other language still plots correctly.

---

### Commit A2 — Shareable URLs

**Message:** `feat: encode scores in URL hash for direct linking`

**Goal:** After completing the quiz, the URL should contain the scores so users can share their profile directly.

**Scope:**
- On reaching the results screen, update `window.location.hash` with a compressed representation of the six scores, e.g. `#c=5.0,e=3.5,m=2.0,s=4.5,l=6.0,a=7.5` (using first letter of each axis).
- On page load with a hash present, skip the intro and quiz and render the results screen directly with the decoded scores.
- Include orientation and axis order in the hash so the shared view matches the user's configuration.
- The hash format should be versioned: `#v1;c=5.0,...` so future format changes can be handled gracefully.
- Add a "Copy link" button to the configuration panel.

**Backwards compatibility:** Users without a hash see the normal intro screen. Old bookmarks without a hash continue to work.

**Verification:**
1. Complete quiz → URL updates with hash.
2. Copy URL, open in new tab → results screen renders with correct scores and configuration.
3. Retake quiz → hash is cleared.

---

### Commit A3 — Additional Actors and Custom Actor Creation

**Message:** `feat: add custom actor creation and expanded preset actors`

**Goal:** Users can add their own actors to compare against, and the preset list is expanded with historically significant anchors from the methodology document.

**Scope:**
- Add preset actors from the methodology document's anchor examples:
  - `Attlee government 1945–51` (economic 0, class 0)
  - `Thatcher government 1979–90` (economic 10, class 10)
  - `Bush/Blair Iraq position` (military 10)
  - `Stop the War Coalition` (military 0)
  - `Enoch Powell 1968` (cultural 10)
  - `Federalist EU tradition` (sovereignty 10)
  - `Anarcho-communism` (libertarian/authoritarian 0, class 0)
  - `Leninism` (libertarian/authoritarian 10, class 0)
  - `Fascism` (cultural 10, libertarian/authoritarian 10, class 10)
  - `Orbán's Hungary` (libertarian/authoritarian 10)
- Add "Add custom actor" UI to the configuration panel:
  - Name input, colour picker, six score inputs (0–10 sliders or number fields).
  - Custom actors persist in `localStorage` and appear in the actor toggle list.
  - Custom actors can be deleted.
- Custom actors are not included in export/import (they are local-only).

**Backwards compatibility:** Existing preset actors unchanged. Export/import schema unchanged.

**Verification:**
1. Add a custom actor → appears in toggle list.
2. Refresh page → custom actor restored from `localStorage`.
3. Toggle custom actor on → radar overlay renders correctly.
4. Delete custom actor → removed from list and `localStorage`.

---

### Commit A4 — Dark/Light Theme Toggle

**Message:** `feat: add light theme with persistent toggle`

**Goal:** The current dark theme is hardcoded. Add a light theme.

**Scope:**
- Define a second CSS variable set for light mode in `src/styles.css`:
  - Background: `#f5f3ef`, text: `#1a1a1a`, borders: `rgba(0,0,0,0.08)`, gold accent: `#8b6914`.
- Add a `data-theme="light"` attribute toggle on `<html>`.
- Add a theme toggle button to the configuration panel.
- Persist theme choice in `localStorage`.
- Default remains dark.
- Ensure SVG chart colours remain readable in both themes (actor colours are fixed; grid/label colours use CSS variables).

**Backwards compatibility:** Default unchanged. No effect on export/import.

**Verification:**
1. Toggle light theme → all UI elements switch.
2. Refresh page → theme preference restored.
3. Chart remains legible: grid lines, labels, actor overlays all visible.

---

### Commit A5 — Accessibility Audit

**Message:** `feat: add ARIA labels, keyboard navigation, and focus management`

**Goal:** Pass WCAG 2.1 AA baseline.

**Scope:**
- Add `role="main"` to app container, `role="region"` `aria-label` to each screen.
- Response buttons: `role="radio"`, `aria-checked`, grouped in `role="radiogroup"` with `aria-label="Response options"`.
- Keyboard navigation:
  - Arrow keys move between response buttons.
  - Space/Enter selects.
  - Tab order is logical (intro → quiz → results → config).
- Focus management:
  - On screen change, focus moves to the new screen's heading.
  - On reaching results, focus moves to the chart's `aria-label`.
- Actor toggle buttons: `aria-pressed` state.
- Configuration panel: `aria-expanded` on collapsible sections (if implemented).
- Colour contrast: verify all text meets 4.5:1 against backgrounds. The current `--text2: #8a8680` on `--bg: #0f0f0f` may need adjustment.
- Skip link: add a "Skip to main content" link for keyboard users.
- Announce screen changes with an `aria-live="polite"` region.

**Backwards compatibility:** No visual changes unless contrast fixes are needed.

**Verification:**
1. Tab through entire quiz flow without a mouse.
2. Run axe-core or Lighthouse accessibility audit → score ≥ 95.
3. Screen reader (VoiceOver/NVDA) announces each question and response selection.

---

### Commit A6 — PWA Manifest

**Message:** `feat: add PWA manifest and service worker for offline use`

**Goal:** Make the compass installable as a standalone web app.

**Scope:**
- Create `src/manifest.json`:
  - `name`: "Six-Axis Political Compass"
  - `short_name`: "6-Axis Compass"
  - `start_url`: "."
  - `display`: "standalone"
  - `background_color`: "#0f0f0f"
  - `theme_color`: "#c8a84b"
  - Icons: generate 192×192 and 512×512 PNGs from a simple hexagonal SVG (gold on dark).
- Add `<link rel="manifest">` to `src/index.html`.
- Create a minimal service worker (`src/sw.js`) that caches `dist/index.html` for offline use.
- Register the service worker in the app's JS.
- The build script (`scripts/build.js`) must inline the manifest link and service worker registration into `dist/index.html`.

**Backwards compatibility:** Works as a normal web page if PWA is not installed.

**Verification:**
1. Run Lighthouse PWA audit → passes "Installable" check.
2. Install on mobile → opens in standalone mode without browser chrome.
3. Enable airplane mode → app still loads and quiz works (no external dependencies).

---

## Part B — Axis Restructure Refactor

This refactor implements the framework change approved in `Defining Principles — Supplement v0.0.2`: the *liberty axis* is deprecated and replaced by a *libertarian/authoritarian axis*. The old liberty axis content (substantive vs. formal coercion) is understood to be already reflected on the class axis; the new axis measures consent-based democratic organisation vs. hierarchical/illiberal order.

Source material for the new axis definitions:
- `docs/governance/axis-scale-specification-and-radar-methodology-v0.0.2.md` §II (scale), §III anchor specifications
- `docs/governance/axis-coding-questionnaire-v0.0.1.md` (operational questions — to be consulted for canonical question wording)

---

### Commit B1 — Rename Axis and Update Metadata

**Message:** `refactor: replace liberty axis with libertarian/authoritarian axis`

**Goal:** Update all axis names, labels, and metadata. No question or score changes yet.

**Scope:**
- In `src/data.js`:
  - Change `AXES` order. The methodology document §II lists: Cultural, Economic, Military, Sovereignty, Libertarian/Authoritarian, Class. However, the supplement §IX.OQ2 notes the order is an open editorial question. The current compass order is: Cultural, Sovereignty, Military, Economic, Class, Liberty. **Decision:** adopt the methodology document's order (Cultural, Economic, Military, Sovereignty, Libertarian/Authoritarian, Class) for alignment with the canonical framework.
  - Update `AXIS_META`:
    - Remove `Liberty` entry.
    - Add `Libertarian/Authoritarian`: `{ low: 'Libertarian / consent-based / democratic', high: 'Authoritarian / hierarchical / illiberal' }`.
  - Update all actor score objects: rename the `Liberty` key to `Libertarian/Authoritarian` (scores remain unchanged in this commit — they are updated in B3).
- In `src/index.html`: update `<title>` and `<meta name="description">`.
- In `src/ui.js`: update any hardcoded axis name references.
- In `src/export.js`: update `source` string and version bump.

**Backwards compatibility:** Export/import schema axis keys change from `Liberty` to `Libertarian/Authoritarian`. Old exports with `Liberty` key should be mapped on import (handled in B4).

**Verification:** Build succeeds. `dist/index.html` opens. Axis labels show "Libertarian/Authoritarian" instead of "Liberty". Actor scores still render (using old numeric values).

---

### Commit B2 — Rewrite Libertarian/Authoritarian Quiz Questions

**Message:** `refactor: rewrite liberty-axis questions as libertarian/authoritarian questions`

**Goal:** Replace the four old liberty questions with four questions that measure the libertarian/authoritarian dimension as defined in the methodology document.

**Old questions (liberty axis — substantive vs. formal coercion):**
1. "Large employers hold coercive power over workers that the law needs to check." (reverse: false)
2. "Government regulation is the primary threat to individual freedom." (reverse: true)
3. "The power a landlord holds over a tenant is a form of coercion requiring political attention." (reverse: false)
4. "Reducing taxation is one of the most effective ways to increase personal freedom." (reverse: true)

**New questions (libertarian/authoritarian axis — consent-based vs. hierarchical):**

The methodology document §III anchor specification defines:
- **0** = Libertarian / consent-based / democratic: legitimacy derives from consent, hierarchical structures require justification, liberal democratic constraints are constitutive.
- **10** = Authoritarian / hierarchical / illiberal: legitimacy derives from order/hierarchy/tradition, liberal democratic constraints are obstacles to be removed.

Draft questions (to be cross-checked against `Axis Coding Questionnaire v0.0.1` before finalising):

1. **Forward (authoritarian):** "In times of serious crisis, the government should have the authority to suspend normal legal protections if doing so is necessary to protect national security or social order."
   - Strongly agree (4) → score toward authoritarian (high)
   - `reverse: false`

2. **Reverse (libertarian):** "Individual freedom of expression should be protected by law even when the views expressed are offensive to the majority."
   - Strongly agree (4) → score toward libertarian (low)
   - `reverse: true`

3. **Forward (authoritarian):** "Social order and the preservation of traditional values are more important than protecting the rights of minority groups who challenge them."
   - Strongly agree (4) → score toward authoritarian (high)
   - `reverse: false`

4. **Reverse (libertarian):** "Hierarchical structures in government and society should be continuously open to challenge and accountable to the people subject to them."
   - Strongly agree (4) → score toward libertarian (low)
   - `reverse: true`

**Rationale:** These four questions capture the two poles of the axis:
- Questions 1 and 3 measure willingness to suspend democratic constraints and subordinate individual rights to collective order (authoritarian).
- Questions 2 and 4 measure commitment to individual autonomy, free expression, and accountability of hierarchy (libertarian).
- Two forward, two reverse — balanced.

**Note:** The old liberty questions (employer coercion, landlord power, taxation) are retired. Their analytical content is understood to be captured by the class axis (employer/landlord power = class-conflict position; taxation as freedom = class-harmony position).

**Verification:**
1. Answering all 4s → Libertarian/Authoritarian score = 0 (max libertarian).
2. Answering all 0s → Libertarian/Authoritarian score = 10 (max authoritarian).
3. Neutral answers (all 2s) → score = 5.0.

---

### Commit B3 — Update Actor Scores for the New Axis

**Message:** `refactor: recalibrate all actor scores for libertarian/authoritarian axis`

**Goal:** Replace the old liberty-axis scores (which measured substantive/formal coercion) with new libertarian/authoritarian scores based on the methodology document's 0–10 scale.

**Method:** The methodology document §III specifies anchor examples. Actor placements should be guided by:
- **0–2 (Libertarian):** Strong commitment to liberal democratic constraints, consent-based legitimacy, accountability of hierarchy.
- **3–4 (Democratic with libertarian lean):** Operates within liberal democracy, strong on civil liberties, sceptical of executive overreach.
- **5–6 (Conditional/centre):** Accepts liberal democracy in principle but tolerates significant exceptions.
- **7–8 (Authoritarian lean):** Frequent willingness to suspend democratic norms, strong nationalist/hierarchical tendencies, but still within electoral politics.
- **9–10 (Authoritarian):** Rejection of liberal democracy as an obstacle.

**Proposed new scores (first-cut, subject to inter-coder verification per methodology §V):**

| Actor | Old Liberty | New Lib/Auth | Rationale |
|---|---|---|---|
| Conservative Party | 2 | 5 | Within liberal democracy; expanded protest restrictions, voter ID, Rwanda policy show conditional-authoritarian lean |
| Labour Party | 5 | 4 | Within liberal democracy; civil-liberties record mixed (anti-terror expansions under Blair) |
| Reform UK | 3 | 5 | Within liberal democracy; nationalist rhetoric with some democratic-sceptical tendencies |
| Liberal Democrats | 6 | 3 | Strong civil-liberties tradition; devolution; anti-surveillance |
| Green Party | 8 | 2 | Participatory democracy, decentralisation, strong civil-liberties commitment |
| SNP | 7 | 3 | Devolutionary democratic tradition; some centralising tendencies in government |
| Plaid Cymru | 7 | 3 | Similar to SNP; community-based democratic tradition |
| US Democrats | 6 | 4 | Within liberal democracy; post-9/11 executive expansion under both parties |
| US Republicans | 2 | 6 | Within liberal democracy; significant authoritarian trends (election denial, protest restrictions) but still operates within electoral system |

**Note:** These are first-cut coordinates. The methodology document requires source-backed coordinates in the Reference Framework with inter-coder verification. These values are the compass's working defaults pending that process.

**Verification:**
1. Toggle each actor → radar overlay reflects new lib/auth position.
2. Conservative Party (5) and US Republicans (6) appear closer to the authoritarian pole than Liberal Democrats (3) and Green Party (2).
3. The visual pattern matches the methodology's anchor examples.

---

### Commit B4 — Update User-Facing Text and Backwards Compatibility

**Message:** `refactor: update intro text, footer, and export/import for new framework`

**Goal:** All user-facing text reflects the new framework. Old exports are handled gracefully.

**Scope:**
- Update intro text: "cultural, economic, military, sovereignty, libertarian/authoritarian, and class" (replace "liberty").
- Update footer: reference the common-enemy repo and the standalone compass repo.
- Update export metadata:
  - `source`: "Six-Axis Political Compass"
  - `version`: bump to `1.1.0` (reflecting the framework restructure as a minor bump).
- Update import (`parseUpload` in `src/export.js`):
  - Handle old exports that contain `Liberty` key: map `Liberty` score to `Libertarian/Authoritarian` score on import.
  - Handle old exports with `source: "The Common Enemy — Six-Axis Political Compass"` or `version: "0.0.5"`.
  - Display a notice: "This map was created with an earlier version of the compass. The Liberty axis has been replaced by the Libertarian/Authoritarian axis."

**Verification:**
1. Export a map → JSON contains `Libertarian/Authoritarian` key, not `Liberty`.
2. Import an old v0.0.5 export (with `Liberty` key) → maps correctly, notice displayed.
3. Import a new v1.1.0 export → works normally, no notice.

---

## Verification (End-to-End)

For each commit:
1. Run `node scripts/build.js` → `dist/index.html` builds without errors.
2. Open `dist/index.html` in a browser.
3. Complete the quiz flow: intro → 24 questions → results.
4. Verify radar chart renders with the new axis order and labels.
5. Toggle actors → overlays match expected positions.
6. Export JSON → open file, verify `Libertarian/Authoritarian` key exists.
7. Import old v0.0.5 JSON → verify backwards compatibility and notice.

For Part A features specifically:
- A1: Change a string in `src/translations/en.json`, rebuild, verify text updates.
- A2: Copy URL with hash, open in incognito, verify direct results render.
- A3: Add custom actor, refresh, verify persistence.
- A4: Toggle light theme, verify all elements switch.
- A5: Run Lighthouse accessibility audit, verify score ≥ 95.
- A6: Install as PWA on mobile, verify offline functionality.

---

## Post-Refactor Checklist

- [ ] All six axes are ordered: Cultural, Economic, Military, Sovereignty, Libertarian/Authoritarian, Class.
- [ ] Axis labels read: "Libertarian / consent-based / democratic" ↔ "Authoritarian / hierarchical / illiberal".
- [ ] 24 questions total, 4 per axis, 2 forward + 2 reverse per axis.
- [ ] All 9 preset actors have recalibrated scores for the new axis.
- [ ] Old exports (v0.0.5–v1.0.x) import correctly with a notice.
- [ ] New exports use `Libertarian/Authoritarian` key.
- [ ] `dist/index.html` size remains comparable to pre-refactor (~24KB).
- [ ] Zero external dependencies maintained.
- [ ] No build step required for deployment.

---

*Six-Axis Compass | Post-Release Enhancement Plan*
*Covers: Optional enhancements (A1–A6) + Axis restructure refactor (B1–B4)*

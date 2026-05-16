# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[1.3.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.3.0
[1.2.0]: https://github.com/earlution/six-axis-compass/releases/tag/v1.2.0

## [Unreleased]

### Added
- **Persistent footer:** Site-wide footer showing copyright, MIT licence link, and version number injected from `package.json` at build time.

### Added
- **Grouped actor comparison:** Actor toggle buttons are now arranged into labelled sets under Compare:
  - 2024–2029 UK Parliament (7 actors)
  - US Congress (current cycle) (2 actors)
  - Thatcher / Reagan era (1 actor)
  - World War II figures (6 actors)
  - Economic thinkers (2 actors)
  - Ideological anchors (9 actors)
  - Custom actors appear in a separate "Custom actors" group.
  - Ungrouped actors fall through to an "Other" group.
  - `ACTOR_GROUPS` map added to `src/data.js`.

### Changed
- **Radar chart spatial layout (revised):** Reordered `AXES` so the left half of the radar chart consistently represents traditionally left-associated values and the right half represents traditionally right-associated values.
  - New order: Cultural, Military, Sovereignty, Economic, Class, Libertarian/Authoritarian.
  - Left side (120°–240°): Economic (nationalism), Class (conflict), Libertarian/Authoritarian (libertarian).
  - Right side (-60°–60°): Cultural (nationalism), Military (interventionist), Sovereignty (national sovereignty).
  - **BREAKING:** Inverted the `Libertarian/Authoritarian` axis so that "libertarian" is now the HIGH (outward) value and "authoritarian" is the LOW (inward) value. This was necessary to position libertarian on the left side of the chart.
  - All 4 Libertarian/Authoritarian quiz questions have their `reverse` flags swapped.
  - All 27 actor JSON files and `_FALLBACK_ACTORS` have their Libertarian/Authoritarian scores recomputed as `10 - old_score`.
  - `AXIS_META` labels swapped: low = "Authoritarian / hierarchical / illiberal", high = "Libertarian / consent-based / democratic".
  - Export version bumped to `1.1.1`. `parseUpload()` detects v1.1.0 exports and inverts the Libertarian/Authoritarian score for backwards compatibility.

### Changed
- **Radar chart spatial layout (initial):** Reordered `AXES` so left-associated values appear on the left side of the radar chart and right-associated values on the right.
  - Order: Cultural, Economic, Military, Sovereignty, Class, Libertarian/Authoritarian.
  - Superseded by the revised layout above.

### Fixed
- **Class axis data audit:** Corrected inverted Class scores for 5 methodology anchor actors whose values were entered with the opposite convention.
  - `Anarcho-communism`: 0 → 10 (class conflict)
  - `Attlee government 1945–51`: 0 → 10 (class conflict)
  - `Leninism`: 0 → 10 (class conflict)
  - `Thatcher government 1979–90`: 10 → 0 (class harmony)
  - `Fascism`: 10 → 0 (class harmony)
  - `src/data.js` `_FALLBACK_ACTORS` and `data/actors/*.json` updated.
  - `src/actors-generated.js` regenerated.

### Changed
- **Axis restructure (B1):** Renamed the deprecated *Liberty* axis to *Libertarian/Authoritarian*.
  - `src/data.js`: `AXES` order updated to Cultural, Economic, Military, Sovereignty, Libertarian/Authoritarian, Class.
  - `AXIS_META` updated with new low/high labels: "Libertarian / consent-based / democratic" ↔ "Authoritarian / hierarchical / illiberal".
  - All actor score objects renamed the axis key (values unchanged in this commit).
  - `src/url.js`, `src/i18n.js`, `src/translations/en.json`, `src/index.html`, `src/export.js` updated.
  - `data/actors/*.json` and regenerated `src/actors-generated.js`.

### Changed
- **Axis restructure (B2):** Rewrote the four Libertarian/Authoritarian quiz questions to measure consent-based democratic organisation vs. hierarchical/illiberal order.
  - Two forward (authoritarian) and two reverse (libertarian), balanced.
  - Old liberty questions (employer coercion, landlord power, taxation) retired.

### Changed
- **Axis restructure (B3):** Recalibrated Libertarian/Authoritarian scores for 9 preset UK/US parties:
  - Conservative Party 2 → 5, Labour Party 5 → 4, Reform UK 3 → 5,
    Liberal Democrats 6 → 3, Green Party 8 → 2, SNP 7 → 3,
    Plaid Cymru 7 → 3, US Democrats 6 → 4, US Republicans 2 → 6.
  - data/actors/*.json updated and src/actors-generated.js rebuilt.

### Changed
- **Axis restructure (B4):** Updated user-facing text and export/import backwards compatibility.
  - Intro text and meta description now reference "libertarian/authoritarian".
  - Export version bumped to `1.1.0`.
  - `parseUpload()` detects old exports (v0.0.x or `Liberty` key) and:
    - Maps `Liberty` scores to `Libertarian/Authoritarian`.
    - Returns a descriptive label warning that the map was created with an earlier version.

### Added
- Forkable, traceable actor data architecture:
  - `data/actors/*.json` — 27 canonical actor files with per-axis confidence, rationale, and cited sources.
  - `data/schema.json` — JSON Schema v7 defining the actor data structure.
  - `scripts/sync-actor-data.js` — reads JSON files and generates `src/actors-generated.js` at build time.
  - Backward compatibility: `src/data.js` falls back to hardcoded `_FALLBACK_ACTORS` when `__ACTORS` is undefined.
- Actor data browser UI:
  - Information icon ("i") next to each actor toggle button in the results screen.
  - Modal panel showing actor metadata, per-axis score breakdowns with confidence badges, rationale text, and full source citations with clickable links.
  - Keyboard accessible (Escape to close, focus management, `role="dialog"`).
  - New i18n keys for confidence levels, source types, and modal labels.
- Paper artifact documentation:
  - `paper-artifacts/README.md` — full guide to artifact formats, LaTeX integration, and provenance.
  - `paper-artifacts/latex-example.tex` — minimal working LaTeX example.
- Updated `README.md` with forkable data model, contributing guide, and data schema documentation.

## [2.0.0] - 2026-05-16

### Added
- Progressive Web App (PWA) support:
  - `src/manifest.json` with app metadata, theme colours, and PNG icon references.
  - `src/sw.js` minimal service worker that caches `index.html` for offline use.
  - Service worker registration in the inline module script.
  - `src/icon.svg` and `scripts/generate-icons.js` (using `sharp`) to produce 192×192 and 512×512 PNGs.
  - `apple-touch-icon` link for iOS home-screen addition.
  - `scripts/build.js` copies `manifest.json` and `sw.js` into `dist/` alongside `index.html`.

## [1.9.0] - 2026-05-16

### Added
- Accessibility audit and WCAG 2.1 AA baseline improvements:
  - Skip-to-content link for keyboard users.
  - `aria-live="polite"` announcer region for screen-reader feedback on screen changes.
  - `role="region"` and `aria-label` on intro, quiz, and results screens.
  - Quiz response buttons use `role="radio"`, `aria-checked`, and keyboard arrow navigation within a `role="radiogroup"`.
  - Actor toggle buttons expose `aria-pressed` state.
  - Focus management: on screen change, focus moves to the active screen container.
- Colour contrast fixes across dark and light themes:
  - `--text3` adjusted to `#9a9690` (dark) and `#6a665e` (light) to meet 4.5:1.
  - Replaced hardcoded `rgba()` values in configuration panel with theme-aware CSS variables.

## [1.8.0] - 2026-05-16

### Added
- Dark / light theme toggle in the results configuration panel.
- Theme preference persists in `localStorage` (`six-axis-compass-theme`).
- `data-theme="light"` attribute applied to `<html>`; all colours are driven by CSS custom properties so the switch is instant and covers both DOM and inline SVG.
- `loadTheme()` / `saveTheme()` utilities in the inline module script.

## [1.7.0] - 2026-05-16

### Added
- 10 new preset actors from the methodology document's anchor examples:
  Attlee government 1945–51, Thatcher government 1979–90, Bush/Blair Iraq position,
  Stop the War Coalition, Enoch Powell 1968, Federalist EU tradition,
  Anarcho-communism, Leninism, Fascism, Orbán's Hungary.
- Custom actor creation UI in the configuration panel:
  name input, colour picker, and six score inputs (0–10).
- Custom actors persist in `localStorage` and appear in the actor toggle list.
- Custom actors can be deleted via a small × button on their toggle.
- Custom actors are not included in export/import (local-only).
- `src/i18n.js` and `src/translations/en.json` updated with translations for all new and historical actors.

## [1.6.0] - 2026-05-16

### Added
- Shareable URLs: scores, orientation, and axis order are encoded in the URL hash (`#v1;c=5.0,...;o=flat;x=cemsla`).
- On reaching the results screen, the URL hash updates automatically so users can copy their profile link directly.
- On page load with a valid hash, the app skips the intro and quiz and renders results immediately with the decoded scores.
- "Copy link" button added to the results configuration panel.
- `src/url.js` with `encodeHash()`, `decodeHash()`, and `copyToClipboard()` utilities.
- Versioned hash format (`v1`) for graceful future format changes.

## [1.5.0] - 2026-05-16

### Added
- Paper artifact generation pipeline (`npm run generate-artifacts`) producing static, peer-reviewable outputs for the *A Common Enemy* academic paper.
- New script `scripts/generate-paper-artifacts.mjs` renders SVG radar charts via jsdom, generates JSON data files, and emits LaTeX `\newcommand` definitions for every actor.
- New `scripts/paper-config.json` defines comparison groups: UK parties, US parties, Brexit factions, economic historical figures, WWII figures, and UK–US cross-country.
- 8 new historical actors added to `src/data.js`: John Maynard Keynes, Milton Friedman, Clement Attlee, Winston Churchill, Adolf Hitler, Franklin D. Roosevelt, Benito Mussolini, Joseph Stalin.
- `paper-artifacts/` directory containing per-actor `.json`, `.svg`, `.tex` files and comparison-group charts.
- `paper-artifacts/README.md` and `latex-example.tex` documenting how to include artifacts in a LaTeX paper.
- `jsdom` added as a devDependency for server-side SVG generation.
- CI workflow updated to validate artifact generation on every push.

### Changed
- `src/i18n.js` updated with translations for all new historical actors.

## [1.4.0] - 2026-05-16

### Added
- i18n infrastructure with English as the default language (`src/i18n.js`, `src/translations/en.json`).
- All user-facing strings are now rendered through a `t(key)` helper, enabling future localisation.
- Language selector added to the results configuration panel (currently English only).
- Axis names, actor names, response labels, and UI text are all translatable while preserving internal English keys for export portability.
- `scripts/build.js` updated to inline `src/i18n.js` before dependent modules.

## [1.3.0] - 2026-05-16

### Changed
- "Your map" toggle moved from the configuration panel into the **Compare** row alongside party buttons.
- Score bars section is now always visible and dynamically shows bars for every selected profile.
- Each axis row displays a colour-coded mini-bar for the user (gold) and every selected party (their brand colour).
- Actor bars include a name label, a thin coloured track, and a numeric score — matching the radar chart overlay pattern.
- Empty state shown when no profiles are selected.

## [1.2.0] - 2026-05-16

### Changed
- Toggling "Hide your map" now also hides the score bars section alongside the radar chart polygon.
- This reduces visual noise when comparing only party maps.

## [1.1.1] - 2026-05-16

### Fixed
- `scripts/build.js` now extracts and includes the inline module script from `src/index.html`.
- Previously the build replaced the entire `<script type="module">` block with only the 5 module files, losing all app initialization code (`renderIntro(app, startQuiz)`, event handlers, state management).
- This caused the deployed artifact to render an empty black page.

## [1.1.0] - 2026-05-16

### Added
- Automated deployment to GitHub Pages via GitHub Actions.
- `deploy` job added to `.github/workflows/ci.yml` that publishes `dist/` on every push to `main`.
- Uses `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`.
- Workflow permissions updated to allow `pages: write` and `id-token: write`.

## [1.0.0] - 2026-05-16

### Added
- `tests/quiz.test.js` — zero-dependency unit tests for the scoring engine.
  - Verifies neutral, balanced agree/disagree, maximum, and minimum score scenarios.
  - Verifies `createQuiz()` state progression, back navigation, and answer capture.
- `.github/workflows/ci.yml` — GitHub Actions CI workflow.
  - Runs `node scripts/build.js` on every push and pull request.
  - Runs `node tests/quiz.test.js` to validate scoring logic.
  - Verifies `dist/index.html` is self-contained (no `type="module"`, no external `src` or `href` dependencies).
- Project reaches stable release with full feature parity to the original v0.0.5.

## [0.9.0] - 2026-05-16

### Added
- `docs/axes.md` with detailed explanations of each of the six political axes.
- `docs/examples/` containing sample export files:
  - `centrist.json` — neutral scores across all axes.
  - `green-party.json` — Green Party scores.
  - `reform-uk.json` — Reform UK scores.
- Updated `README.md` with "How it works" section explaining the scoring algorithm.
- Expanded "Development" section with source file map, build instructions, and watch mode.
- Screenshot placeholder section in `README.md`.

## [0.8.0] - 2026-05-16

### Added
- `package.json` with project metadata, build and dev scripts, and zero devDependencies.
- `scripts/build.js` Node.js inliner that reads `src/` files and produces a self-contained `dist/index.html`.
- Regex-based stripping of `import` and `export` statements to inline ES modules.
- Optional `--watch` mode that rebuilds on any source file change.
- `dist/index.html` is generated and verified as self-contained (no module scripts, no external src/href).

## [0.7.0] - 2026-05-16

### Added
- Orientation toggle in results screen: "Edge up" (flat) and "Vertex up" (pointy) buttons.
- Show/hide user map toggle to overlay or hide the user's own radar polygon.
- Axis reordering via HTML5 drag-and-drop in a configuration panel.
- Grip handle and position label on each draggable axis item.
- Config panel CSS classes for sections, headings, buttons, file labels, and axis list.
- Drag-and-drop state managed entirely within `renderResults()` via `addEventListener`.

## [0.6.0] - 2026-05-16

### Added
- `src/export.js` with PNG chart export, JSON/XML data export, and JSON/XML import.
- `downloadChart()` clones the SVG, renders it to a canvas, and downloads as PNG with SVG fallback.
- `downloadMapData()` exports scores as JSON or XML with metadata (source, version, timestamp).
- `parseUpload()` reads exported JSON or XML files and returns scores; handles original v0.0.5 format.
- Download buttons (PNG, JSON, XML) wired into the results screen.
- Upload section with file input accepting `.json` and `.xml`; shows parsed map as dashed purple overlay.
- Clear upload button to remove imported map.

## [0.5.0] - 2026-05-16

### Added
- Intro screen with title, description, and start button.
- Quiz screen with progress bar, axis tag, question text, and Likert response buttons.
- Results screen with SVG radar chart, actor comparison toggles, legend, and score bars.
- Full CSS stylesheet ported from original with variables, component classes, and mobile breakpoint.
- `renderIntro()`, `renderQuiz()`, and `renderResults()` in `src/ui.js`.
- Wired `src/index.html` module script handling full quiz flow: intro → quiz → results → retake.
- All inline event handlers replaced with `addEventListener` calls.
- State passed through function parameters — no global mutable variables.

## [0.4.0] - 2026-05-16

### Added
- Hexagonal SVG radar chart renderer in `src/chart.js`.
- `drawRadar()` accepts options object for scores, axes, orientation, actors, uploaded map, and visibility.
- Support for flat (edge-up) and pointy (vertex-up) hexagon orientations.
- Grid polygons at levels 2, 4, 6, 8, 10 with original opacity values.
- Actor overlays with party colours and translucent fills.
- Uploaded map overlay with dashed purple stroke.
- User profile polygon with gold stroke and dot markers.
- Axis labels positioned outside the chart perimeter.

## [0.3.0] - 2026-05-16

### Added
- Quiz state management via `createQuiz()` factory.
- `computeScores()` scoring engine matching original algorithm.
- Immutable quiz instance with getters for current question, progress, and completion state.
- Answer/back navigation with answers stored in an internal record.
- Pure logic module — no DOM dependencies.

## [0.2.0] - 2026-05-16

### Added
- Extract questions, axes, actors, and response scales into `src/data.js`.
- `AXES` array defining the six political dimensions.
- `AXIS_META` object with low/high labels for each axis.
- `RESPONSES` array with Likert-scale labels and values.
- `QUESTIONS` array: 24 statements mapped to axes with forward/reverse scoring flags.
- `ACTORS` array: 9 political parties with pre-defined scores and colours.
- JSDoc comment block documenting the scoring algorithm.

## [0.1.0] - 2026-05-16

### Added
- Repository scaffolding for standalone open-source project.
- `src/` directory with modular ES module files (`index.html`, `data.js`, `quiz.js`, `chart.js`, `ui.js`, `styles.css`).
- `dist/` directory for pre-built deployable artifact.
- `scripts/` directory for build tooling.
- `README.md` with project overview, six-axis table, usage, and development instructions.
- `.gitignore` ignoring `node_modules/`, `.DS_Store`, and `*.log`.

[0.1.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.1.0
[0.2.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.2.0
[0.3.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.3.0
[0.4.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.4.0
[0.5.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.5.0
[0.6.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.6.0
[0.7.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.7.0
[0.8.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.8.0
[0.9.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.9.0

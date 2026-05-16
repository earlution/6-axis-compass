# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[1.1.1]: https://github.com/earlution/six-axis-compass/releases/tag/v1.1.1

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

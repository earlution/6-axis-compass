# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[0.2.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.2.0

[0.4.0]: https://github.com/earlution/six-axis-compass/releases/tag/v0.4.0

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

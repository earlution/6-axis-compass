# Six-Axis Political Compass

The standard left–right spectrum collapses six distinct political dimensions into one. This tool maps your position across all of them.

## The Six Axes

| Axis | Low (0) | High (10) |
|------|---------|-----------|
| **Cultural** | Cultural internationalism | Cultural nationalism |
| **Economic** | Economic internationalism | Economic nationalism |
| **Military** | Non-interventionist | Interventionist |
| **Sovereignty** | Supranational | National sovereignty |
| **Liberty** | State coercion only | Includes private coercion |
| **Class** | Class harmony | Class conflict |

## Usage

Open `dist/index.html` in any modern browser. No build step, no server, no dependencies.

## How it works

1. You are presented with **24 statements** (4 per axis).
2. For each statement, select how much you **agree or disagree** on a 5-point Likert scale.
3. Your answers are scored:
   - Forward-scored questions add the response value (0–4) directly.
   - Reverse-scored questions subtract the value from 4.
   - Each axis raw total (0–16) is normalised to a 0–10 scale.
4. Your profile is plotted on a **hexagonal radar chart**.
5. Optionally **compare your profile** against pre-loaded political parties or upload a saved map.

## Development

The source is organised as ES modules under `src/`:

| File | Purpose |
|------|---------|
| `src/data.js` | Axes, questions, response scales, and actor scores |
| `src/quiz.js` | Quiz state management and scoring engine |
| `src/chart.js` | SVG radar chart renderer |
| `src/ui.js` | Intro, quiz, and results screen rendering |
| `src/export.js` | PNG, JSON, and XML export; JSON/XML import |
| `src/styles.css` | Full component stylesheet |
| `src/index.html` | Shell that imports and wires the modules |

To build the self-contained deployable artifact:

```bash
node scripts/build.js
```

For watch mode (rebuilds on every source change):

```bash
npm run dev
# or
node scripts/build.js --watch
```

The resulting `dist/index.html` is a single file with zero external dependencies.

## Screenshots

*(To be added once the UI is stable.)*

## License

MIT License — see [LICENSE](./LICENSE).

## Acknowledgements

Originally developed as part of [A Common Enemy](https://github.com/earlution/common-enemy).

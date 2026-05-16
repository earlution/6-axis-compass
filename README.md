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

## Forkable, Traceable Actor Data

Every political actor in the compass is defined by a standalone JSON file in `data/actors/`. Each file contains:

- **Metadata** — name, slug, category, colour, active period, curator, version, last-updated date
- **Scores** — a 0–10 value on each of the six axes
- **Traceability** — per-axis confidence level, rationale, and a list of cited sources

Sources can be manifestos, legislation, parliamentary votes, speeches, academic papers, or policy documents. Each source includes a title, date, URL, quoted relevant text, and a full citation.

### Contributing New Actors or Improved Scores

Researchers are invited to fork this repository and submit pull requests with new actor data or better-sourced scores. The data schema is defined in `data/schema.json` and every file is validated against it. See [Contributing](#contributing) below.

### Browsing Evidence in the App

In the results screen, every pre-loaded actor has an **information icon** ("i") next to its toggle button. Clicking it opens a detail panel showing:

- Actor metadata (curator, version, last updated)
- Per-axis score with confidence badge
- Rationale text
- Full source citations with clickable links to Hansard, legislation.gov.uk, and other primary sources

This makes the compass a living research instrument: users can inspect the evidence behind every score rather than taking it on trust.

## Paper Artifacts

For academic publication, `npm run generate-artifacts` produces static, versioned files in `paper-artifacts/`:

| Format | Purpose |
|--------|---------|
| `.json` | Raw scores + full provenance (version, git commit, generation timestamp, traceability) |
| `.svg` | Print-ready vector radar chart (600×600, white background, self-contained) |
| `.tex` | LaTeX `\newcommand` definitions for each axis score |

Comparison charts (multi-actor overlays) are also generated based on `scripts/paper-config.json`. See [`paper-artifacts/README.md`](paper-artifacts/README.md) for LaTeX integration instructions.

## Development

The source is organised as ES modules under `src/`:

| File | Purpose |
|------|---------|
| `src/data.js` | Axes, questions, response scales, and actor scores (with fallback) |
| `src/i18n.js` | Translation dictionary and `t()` helper |
| `src/url.js` | Shareable URL encoding/decoding |
| `src/quiz.js` | Quiz state management and scoring engine |
| `src/chart.js` | SVG radar chart renderer |
| `src/ui.js` | Intro, quiz, and results screen rendering (including actor modal) |
| `src/export.js` | PNG, JSON, and XML export; JSON/XML import |
| `src/styles.css` | Full component stylesheet |
| `src/index.html` | Shell that imports and wires the modules |

Actor data is loaded at build time from `data/actors/*.json` into `src/actors-generated.js`, which is then inlined into the deployable artifact. This preserves the zero-dependency constraint while making the data traceable and forkable.

### Build

```bash
npm run build
```

This runs `scripts/sync-actor-data.js` (regenerates `src/actors-generated.js` from `data/actors/`) followed by `scripts/build.js` (inlines all modules into `dist/index.html`).

### Watch mode

```bash
npm run dev
```

Rebuilds on every source file change.

### Paper artifacts

```bash
npm run generate-artifacts
```

Requires `jsdom` (installed via `npm install`).

## Contributing

### Adding or updating an actor

1. Create or edit a file in `data/actors/{slug}.json` matching the schema in `data/schema.json`.
2. Include at least one source per axis with a URL and citation.
3. Run `npm run build` to regenerate `src/actors-generated.js` and `dist/index.html`.
4. Run `npm run generate-artifacts` to update the paper artifacts.
5. Commit both the data file and the regenerated artifacts.

### Data schema

```json
{
  "schemaVersion": "1.0.0",
  "actor": {
    "name": "...",
    "slug": "...",
    "category": "...",
    "color": "#RRGGBB",
    "version": "1.0.0",
    "lastUpdated": "YYYY-MM-DD",
    "curator": "...",
    "contributors": ["..."]
  },
  "scores": {
    "Cultural": {
      "value": 5,
      "confidence": "high",
      "rationale": "...",
      "sources": [
        {
          "type": "manifesto",
          "title": "...",
          "date": "YYYY-MM-DD",
          "url": "https://...",
          "relevantText": "Quoted excerpt...",
          "citation": "Full citation..."
        }
      ]
    }
  }
}
```

Confidence levels: `low`, `medium`, `high`, `very-high`.
Source types: `manifesto`, `legislation`, `vote`, `policy`, `speech`, `book`, `academic`, `other`.

## License

MIT License — see [LICENSE](./LICENSE).

## Acknowledgements

Originally developed as part of [A Common Enemy](https://github.com/earlution/common-enemy).

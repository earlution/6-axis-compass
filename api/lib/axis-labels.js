import { CANONICAL_AXES } from './config.js';

/** Keep in sync with `src/data.js` `AXIS_TRIGRAMS`. */
export const AXIS_TRIGRAMS = {
  Cultural: 'CUL',
  Economic: 'ECO',
  Military: 'MIL',
  Sovereignty: 'SOV',
  Governance: 'GOV',
  Class: 'CLA'
};

export const AXIS_META = {
  Cultural: { low: 'Cultural internationalism', high: 'Cultural nationalism' },
  Economic: { low: 'Economic internationalism', high: 'Economic nationalism' },
  Military: { low: 'Non-interventionist', high: 'Interventionist' },
  Sovereignty: { low: 'Supranational', high: 'National sovereignty' },
  Governance: { low: 'Maximal hierarchy / authority / coercive', high: 'Maximal autonomy / consent-based / democratic' },
  Class: { low: 'Class harmony', high: 'Class conflict' }
};

export function axesCatalog() {
  return {
    axesOrder: CANONICAL_AXES,
    scale: { min: 0, max: 10, description: '0 = less-critical pole; 10 = more-critical pole (methodology §II)' },
    trigrams: { ...AXIS_TRIGRAMS },
    axes: CANONICAL_AXES.map(name => ({
      name,
      trigram: AXIS_TRIGRAMS[name],
      low: AXIS_META[name].low,
      high: AXIS_META[name].high
    }))
  };
}

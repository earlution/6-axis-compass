const AXIS_KEYS = {
  Cultural: 'c',
  Economic: 'e',
  Military: 'm',
  Sovereignty: 's',
  'Libertarian/Authoritarian': 'l',
  Class: 'a'
};

const KEY_TO_AXIS = Object.fromEntries(
  Object.entries(AXIS_KEYS).map(([k, v]) => [v, k])
);

export function encodeHash(scores, orientation, axesOrder) {
  const scoreParts = axesOrder.map(ax => `${AXIS_KEYS[ax]}=${scores[ax].toFixed(1)}`);
  const orderCode = axesOrder.map(ax => AXIS_KEYS[ax]).join('');
  return `#v1;${scoreParts.join(',')};o=${orientation};x=${orderCode}`;
}

export function decodeHash(hash) {
  if (!hash || hash.length < 2) return null;
  const str = hash.startsWith('#') ? hash.slice(1) : hash;
  const parts = str.split(';');
  if (parts[0] !== 'v1') return null;

  const scores = {};
  let orientation = 'flat';
  let axesOrder = null;

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;
    if (part.startsWith('o=')) {
      orientation = part.slice(2);
    } else if (part.startsWith('x=')) {
      axesOrder = part.slice(2).split('').map(k => KEY_TO_AXIS[k]).filter(Boolean);
    } else if (part.includes('=')) {
      const pairs = part.split(',');
      pairs.forEach(pair => {
        const [pk, pv] = pair.split('=');
        const axis = KEY_TO_AXIS[pk];
        if (axis) scores[axis] = parseFloat(pv);
      });
    }
  }

  if (Object.keys(scores).length === 0) return null;
  return { scores, orientation, axesOrder };
}

export function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (_) {}
    document.body.removeChild(ta);
    resolve();
  });
}

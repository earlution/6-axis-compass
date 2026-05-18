export function downloadChart(svgElement, filename = 'my-six-axis-compass.png') {
  const svg = svgElement.cloneNode(true);
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);

  const img = new Image();
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  img.onload = () => {
    ctx.drawImage(img, 0, 0, 640, 640);
    const a = document.createElement('a');
    a.download = filename;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  img.onerror = () => {
    const a = document.createElement('a');
    a.download = filename.replace('.png', '.svg');
    a.href = url;
    a.click();
  };

  img.src = url;
}

export function downloadMapData(scores, format = 'json') {
  const payload = {
    source: 'Six-Axis Political Compass',
    version: '1.1.1',
    generated: new Date().toISOString(),
    axes: scores
  };

  let content, mime, ext;
  if (format === 'json') {
    content = JSON.stringify(payload, null, 2);
    mime = 'application/json';
    ext = 'json';
  } else {
    content = `<?xml version="1.0" encoding="UTF-8"?>\n<compass source="${payload.source}" version="${payload.version}" generated="${payload.generated}">\n` +
      Object.entries(scores).map(([k, v]) => `  <axis name="${k}" score="${v}"/>`).join('\n') +
      '\n</compass>';
    mime = 'application/xml';
    ext = 'xml';
  }

  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `my-six-axis-compass.${ext}`;
  a.href = url;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function parseUpload(fileContent, fileName) {
  let scores = {};
  let isOld = false;
  let p = null;
  let versionAttr = null;

  if (fileName.endsWith('.json')) {
    p = JSON.parse(fileContent);
    if (!p.axes) throw new Error('No axes field');
    scores = p.axes;
    const oldVersion = p.version && p.version.startsWith('0.0.');
    const oldSource = p.source && p.source.includes('Common Enemy');
    if (oldVersion || oldSource) isOld = true;
  } else if (fileName.endsWith('.xml')) {
    const dom = new DOMParser().parseFromString(fileContent, 'application/xml');
    const axisEls = dom.querySelectorAll('axis');
    if (!axisEls.length) throw new Error('No axis elements');
    axisEls.forEach(el => {
      scores[el.getAttribute('name')] = parseFloat(el.getAttribute('score'));
    });
    versionAttr = dom.documentElement.getAttribute('version');
    const sourceAttr = dom.documentElement.getAttribute('source');
    if ((versionAttr && versionAttr.startsWith('0.0.')) || (sourceAttr && sourceAttr.includes('Common Enemy'))) {
      isOld = true;
    }
  } else {
    throw new Error('Unsupported file format');
  }

  // Backwards compatibility: map old Libertarian/Authoritarian axis to Liberty
  if (scores['Libertarian/Authoritarian'] !== undefined) {
    scores.Liberty = scores['Libertarian/Authoritarian'];
    delete scores['Libertarian/Authoritarian'];
  }

  // Backwards compatibility: invert old Liberty scores from pre-v1.2.0 exports
  // prior to v1.2.0 (old convention: 0=libertarian, 10=authoritarian)
  let invertedAxis = false;
  if (scores.Liberty !== undefined) {
    const needsInvert = isOld || (p && p.version && p.version === '1.1.0') || (versionAttr && versionAttr === '1.1.0');
    if (needsInvert) {
      scores.Liberty = parseFloat((10 - scores.Liberty).toFixed(1));
      invertedAxis = true;
    }
  }

  const labelParts = [];
  if (isOld) labelParts.push('earlier version');
  if (invertedAxis) labelParts.push('Liberty score inverted for v1.2.0 convention');
  const label = labelParts.length > 0
    ? 'Uploaded map (' + labelParts.join('; ') + ')'
    : 'Uploaded map';

  return { scores, label };
}

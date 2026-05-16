import { AXIS_META, ACTORS } from './data.js';
import { drawRadar } from './chart.js';

export function renderIntro(container, onStart) {
  container.innerHTML = `
    <div class="wrap">
      <div class="screen active" id="s-intro">
        <p class="eyebrow">Six-Axis Political Compass</p>
        <h1 class="intro-title">Where do you sit<br>on the six axes?</h1>
        <p class="intro-body">The standard left–right spectrum collapses six distinct political dimensions into one. This tool maps your position across all of them: cultural, economic, military, sovereignty, liberty, and class.</p>
        <p class="intro-meta">24 statements · approximately 5 minutes</p>
        <button class="btn btn-primary" id="btn-start">Begin</button>
        <p class="intro-disclaimer">Your answers are not stored or transmitted anywhere.</p>
      </div>
    </div>
  `;
  document.getElementById('btn-start').addEventListener('click', onStart);
}

export function renderQuiz(container, { question, progress, stepLabel, axis, onAnswer, onBack, canGoBack }) {
  container.innerHTML = `
    <div class="wrap">
      <div class="screen active" id="s-quiz">
        <div class="progress-wrap">
          <div class="progress-bar"><div class="progress-fill" id="prog" style="width:${progress}%"></div></div>
          <span class="progress-label">${stepLabel}</span>
        </div>
        <p class="axis-tag">${axis} axis</p>
        <p class="q-text">${question.text}</p>
        <div class="responses" id="responses"></div>
        <div style="margin-top:1.25rem;height:32px;display:flex;align-items:center;">
          <button class="btn-text" id="back-btn" style="visibility:${canGoBack ? 'visible' : 'hidden'}">← Back</button>
        </div>
      </div>
    </div>
  `;

  const responsesEl = document.getElementById('responses');
  const labels = ['Strongly agree', 'Agree', 'Neither agree nor disagree', 'Disagree', 'Strongly disagree'];
  labels.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.className = 'response-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => onAnswer(4 - i));
    responsesEl.appendChild(btn);
  });

  if (canGoBack) {
    document.getElementById('back-btn').addEventListener('click', onBack);
  }
}

export function renderResults(container, {
  scores,
  axes,
  orientation,
  showUser,
  selectedActors,
  uploadedMap,
  onToggleActor,
  onRestart,
  onDownloadChart,
  onDownloadData,
  onUpload,
  onClearUpload,
  onToggleUser,
  onSetOrientation,
  onReorder
}) {
  const actors = ACTORS.filter(a => selectedActors.has(a.name));

  container.innerHTML = `
    <div class="wrap">
      <div class="screen active" id="s-results">
        <p class="eyebrow">Your results</p>
        <h2 class="results-title">Your six-axis profile</h2>
        <div class="chart-wrap">
          <svg id="radar" width="320" height="320" viewBox="0 0 320 320" aria-label="Six-axis radar chart showing your political profile"></svg>
        </div>
        <div class="actor-row">
          <span class="actor-label">Compare:</span>
          <div class="actor-btns" id="actor-btns"></div>
        </div>
        <div class="legend" id="legend"></div>
        <div class="score-bars" id="score-bars"></div>
        <hr class="divider">
        <div class="config-section">
          <p class="config-heading">Orientation</p>
          <div class="config-row">
            <button class="config-btn ${orientation === 'flat' ? 'active' : ''}" id="btn-orient-flat">Edge up</button>
            <button class="config-btn ${orientation === 'pointy' ? 'active' : ''}" id="btn-orient-pointy">Vertex up</button>
          </div>
        </div>
        <div class="config-section">
          <p class="config-heading">Download</p>
          <div class="config-row">
            <button class="config-btn" id="btn-dl-png">Image (PNG)</button>
            <button class="config-btn" id="btn-dl-json">Data (JSON)</button>
            <button class="config-btn" id="btn-dl-xml">Data (XML)</button>
          </div>
        </div>
        <div class="config-section">
          <p class="config-heading">Compare a saved map</p>
          <div class="config-row">
            <label class="config-file-label">
              Upload JSON or XML
              <input type="file" class="config-file-input" id="file-upload" accept=".json,.xml">
            </label>
            <button class="config-btn" id="btn-clear-upload" style="display:${uploadedMap ? '' : 'none'};color:rgba(180,120,220,0.7);">Clear</button>
          </div>
          <p class="config-note">Only files exported from this tool are supported. No data is transmitted anywhere.</p>
        </div>
        <div class="config-section">
          <p class="config-heading">Axis order — drag to reposition</p>
          <div class="axis-list" id="axis-list"></div>
        </div>
        <hr class="divider">
        <p class="footer-note">This framework is the analytical foundation of <em>The Common Enemy</em> — a podcast and academic project examining the structural causes of contemporary British political crisis. <a href="https://github.com/earlution/common-enemy" target="_blank" rel="noopener">Learn more</a>.</p>
        <button class="btn" id="btn-restart">Retake</button>
      </div>
    </div>
  `;

  const svg = document.getElementById('radar');
  drawRadar(svg, {
    scores,
    axes,
    orientation,
    actors,
    uploadedMap,
    showUser
  });

  // Actor toggle buttons
  const abtn = document.getElementById('actor-btns');

  // Your map toggle
  const userBtn = document.createElement('button');
  userBtn.className = 'btn btn-sm';
  userBtn.textContent = 'Your map';
  if (showUser) {
    userBtn.style.borderColor = '#c8a84b';
    userBtn.style.color = '#c8a84b';
    userBtn.style.background = 'rgba(200,168,75,0.1)';
  }
  userBtn.addEventListener('click', onToggleUser);
  abtn.appendChild(userBtn);

  ACTORS.forEach(actor => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm';
    btn.textContent = actor.name;
    if (selectedActors.has(actor.name)) {
      btn.style.borderColor = actor.color;
      btn.style.color = actor.color;
      btn.style.background = actor.color + '1a';
    }
    btn.addEventListener('click', () => onToggleActor(actor.name));
    abtn.appendChild(btn);
  });

  // Legend
  const leg = document.getElementById('legend');
  const addLegend = (name, color, solid, dashed) => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    const dot = document.createElement('div');
    dot.className = 'legend-dot';
    dot.style.background = solid ? color : color + '50';
    dot.style.border = (dashed ? '1.5px dashed ' : '1.5px solid ') + color;
    const span = document.createElement('span');
    span.className = 'legend-name';
    span.textContent = name;
    item.append(dot, span);
    leg.appendChild(item);
  };
  if (showUser) addLegend('You', '#c8a84b', true, false);
  actors.forEach(a => addLegend(a.name, a.color, false, false));
  if (uploadedMap) addLegend(uploadedMap.label || 'Uploaded map', '#b478dc', false, true);

  // Score bars
  const bars = document.getElementById('score-bars');
  const profiles = [];
  if (showUser) profiles.push({ name: 'You', color: '#c8a84b', scores });
  actors.forEach(a => profiles.push({ name: a.name, color: a.color, scores: a.scores }));
  if (uploadedMap) profiles.push({ name: uploadedMap.label || 'Uploaded map', color: '#b478dc', scores: uploadedMap.scores });

  if (profiles.length === 0) {
    bars.innerHTML = '<p class="config-note" style="text-align:center;padding:1rem 0;">Select a profile above to see scores.</p>';
  } else {
    axes.forEach(ax => {
      const meta = AXIS_META[ax];
      const div = document.createElement('div');
      div.className = 'score-row';
      let rowsHtml = '';
      profiles.forEach(p => {
        const sc = p.scores[ax];
        rowsHtml += `
          <div class="actor-bar-row">
            <span class="actor-bar-name">${p.name}</span>
            <div class="actor-bar-track">
              <div class="actor-bar-fill" style="width:${sc * 10}%;background:${p.color}"></div>
            </div>
            <span class="actor-bar-val">${sc.toFixed(1)}</span>
          </div>
        `;
      });
      div.innerHTML = `
        <div class="score-header">
          <span class="score-name">${ax}</span>
        </div>
        ${rowsHtml}
        <div class="score-ends">
          <span class="score-end">${meta.low}</span>
          <span class="score-end">${meta.high}</span>
        </div>
      `;
      bars.appendChild(div);
    });
  }

  document.getElementById('btn-restart').addEventListener('click', onRestart);

  if (onDownloadChart) {
    document.getElementById('btn-dl-png').addEventListener('click', onDownloadChart);
  }
  if (onDownloadData) {
    document.getElementById('btn-dl-json').addEventListener('click', () => onDownloadData('json'));
    document.getElementById('btn-dl-xml').addEventListener('click', () => onDownloadData('xml'));
  }
  if (onUpload) {
    document.getElementById('file-upload').addEventListener('change', onUpload);
  }
  if (onClearUpload) {
    const clearBtn = document.getElementById('btn-clear-upload');
    if (clearBtn) clearBtn.addEventListener('click', onClearUpload);
  }
  if (onSetOrientation) {
    document.getElementById('btn-orient-flat').addEventListener('click', () => onSetOrientation('flat'));
    document.getElementById('btn-orient-pointy').addEventListener('click', () => onSetOrientation('pointy'));
  }
  if (onReorder) {
    const list = document.getElementById('axis-list');
    axes.forEach((ax, i) => {
      const item = document.createElement('div');
      item.className = 'axis-item';
      item.draggable = true;
      item.dataset.idx = i;
      item.innerHTML = `
        <span class="axis-grip">⠿</span>
        <span class="axis-name">${ax}</span>
        <span class="axis-position">position ${i + 1}</span>
      `;
      list.appendChild(item);
    });
    let dragSrcIdx = null;
    list.querySelectorAll('.axis-item').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        dragSrcIdx = parseInt(item.dataset.idx);
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(item.dataset.idx);
        if (dragSrcIdx === null || dragSrcIdx === targetIdx) return;
        const newOrder = [...axes];
        const moved = newOrder.splice(dragSrcIdx, 1)[0];
        newOrder.splice(targetIdx, 0, moved);
        dragSrcIdx = null;
        onReorder(newOrder);
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
    });
  }
}

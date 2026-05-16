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
  onRestart
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
  ['Cultural', 'Economic', 'Military', 'Sovereignty', 'Liberty', 'Class'].forEach(ax => {
    const sc = scores[ax];
    const meta = AXIS_META[ax];
    const div = document.createElement('div');
    div.className = 'score-row';
    div.innerHTML = `
      <div class="score-header">
        <span class="score-name">${ax}</span>
        <span class="score-val">${sc.toFixed(1)} / 10</span>
      </div>
      <div class="score-track">
        <div class="score-fill" style="width:${sc * 10}%"></div>
      </div>
      <div class="score-ends">
        <span class="score-end">${meta.low}</span>
        <span class="score-end">${meta.high}</span>
      </div>
    `;
    bars.appendChild(div);
  });

  document.getElementById('btn-restart').addEventListener('click', onRestart);
}

import { ACTOR_GROUPS, AXIS_META, ACTORS, AXES, getEffectiveScores } from './data.js';
import { drawRadar } from './chart.js';
import { t } from './i18n.js';
import { buildMerchPreviewHTML, initMerchCarousel, syncMerchRadarFromMain } from './merch.js';

export function renderIntro(container, { onStart, onUpload } = {}) {
  container.innerHTML = `
    <div class="wrap">
      <div class="screen active" id="s-intro" role="region" aria-label="${t('intro.eyebrow')}" tabindex="-1">
        <p class="eyebrow">${t('intro.eyebrow')}</p>
        <h1 class="intro-title">${t('intro.title')}</h1>
        <p class="intro-body">${t('intro.body')}</p>
        <p class="intro-meta">${t('intro.meta')}</p>
        <button class="btn btn-primary" id="btn-start">${t('intro.begin')}</button>
        <div class="intro-upload">
          <label class="intro-file-label">
            ${t('intro.uploadLabel')}
            <input type="file" class="intro-file-input" id="intro-file-upload" accept=".json,.xml">
          </label>
        </div>
        <p class="intro-disclaimer">${t('intro.disclaimer')}</p>
      </div>
    </div>
  `;
  document.getElementById('btn-start').addEventListener('click', onStart);
  if (onUpload) {
    document.getElementById('intro-file-upload').addEventListener('change', onUpload);
  }
}

export function renderQuiz(container, { question, progress, stepLabel, axis, onAnswer, onBack, canGoBack }) {
  container.innerHTML = `
    <div class="wrap">
      <div class="screen active" id="s-quiz" role="region" aria-label="${t('quiz.back').replace('← ', '')}" tabindex="-1">
        <div class="progress-wrap">
          <div class="progress-bar"><div class="progress-fill" id="prog" style="width:${progress}%"></div></div>
          <span class="progress-label">${stepLabel}</span>
        </div>
        <p class="axis-tag">${t('quiz.axisTag', { axis: t('axis.' + axis) })}</p>
        <p class="q-text">${question.text}</p>
        <div class="responses" id="responses" role="radiogroup" aria-label="${t('response.stronglyAgree')} – ${t('response.stronglyDisagree')}"></div>
        <div style="margin-top:1.25rem;height:32px;display:flex;align-items:center;">
          <button class="btn-text" id="back-btn" style="visibility:${canGoBack ? 'visible' : 'hidden'}">${t('quiz.back')}</button>
        </div>
      </div>
    </div>
  `;

  const responsesEl = document.getElementById('responses');
  const labels = [
    t('response.stronglyAgree'),
    t('response.agree'),
    t('response.neutral'),
    t('response.disagree'),
    t('response.stronglyDisagree')
  ];
  const buttons = [];
  labels.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.className = 'response-btn';
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', 'false');
    btn.setAttribute('tabindex', i === 0 ? '0' : '-1');
    btn.textContent = label;
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.setAttribute('aria-checked', 'false');
        b.setAttribute('tabindex', '-1');
      });
      btn.setAttribute('aria-checked', 'true');
      btn.setAttribute('tabindex', '0');
      onAnswer(4 - i);
    });
    responsesEl.appendChild(btn);
    buttons.push(btn);
  });

  responsesEl.addEventListener('keydown', (e) => {
    const idx = buttons.findIndex(b => b.getAttribute('tabindex') === '0');
    if (idx < 0) return;
    let next = idx;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      next = (idx + 1) % buttons.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      next = (idx - 1 + buttons.length) % buttons.length;
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      buttons[idx].click();
      return;
    }
    if (next !== idx) {
      buttons[idx].setAttribute('tabindex', '-1');
      buttons[next].setAttribute('tabindex', '0');
      buttons[next].focus();
    }
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
  customActors,
  invertedAxes,
  onToggleActor,
  onRestart,
  onDownloadChart,
  onDownloadData,
  onUpload,
  onClearUpload,
  onToggleUser,
  onSetOrientation,
  onReorder,
  onSetLanguage,
  onCopyLink,
  onAddCustomActor,
  onDeleteCustomActor,
  onSetTheme,
  onToggleInvertAxis,
  onReorderGroups,
  onSetRegister,
  onBuyMerch,
  merchGarment = 'tee',
  merchGarmentColor = 'white',
  groupOrder,
  register = 'primary',
  theme,
  language
}) {
  const allActors = [...ACTORS, ...(customActors || [])];
  const actors = allActors.filter(a => selectedActors.has(a.name));
  const userColor = theme === 'light' ? '#000000' : '#ffffff';

  container.innerHTML = `
    <div class="wrap wrap--wide">
      <div class="screen active" id="s-results" role="region" aria-label="${t('results.title')}" tabindex="-1">
        <div class="results-layout">
          <div class="chart-pane">
            <p class="eyebrow">${t('results.eyebrow')}</p>
            <h2 class="results-title">${t('results.title')}</h2>
            <div class="chart-wrap">
              <svg id="radar" width="320" height="320" viewBox="0 0 320 320" aria-label="${t('chart.ariaLabel')}"></svg>
            </div>
            <div class="legend" id="legend"></div>
            ${onBuyMerch ? `<div id="merch-preview-mount"></div>` : ''}
          </div>
          <div class="content-pane">
            <div class="actor-groups" id="actor-groups"></div>
            <a class="data-link" href="data.html">Browse the full actor dataset &rarr;</a>
            <div class="score-bars" id="score-bars"></div>
            <hr class="divider">
            <div class="config-section">
              <p class="config-heading">${t('config.language')}</p>
              <div class="config-row">
                <select class="config-btn" id="lang-select" style="background:transparent;color:inherit;border:1px solid var(--border2);padding:0.5rem 0.75rem;border-radius:6px;">
                  <option value="en" ${language === 'en' ? 'selected' : ''}>English</option>
                </select>
              </div>
            </div>
            <div class="config-section">
              <p class="config-heading">${t('config.theme')}</p>
              <div class="config-row">
                <button class="config-btn ${theme === 'dark' ? 'active' : ''}" id="btn-theme-dark">${t('results.dark')}</button>
                <button class="config-btn ${theme === 'light' ? 'active' : ''}" id="btn-theme-light">${t('results.light')}</button>
              </div>
            </div>
            <div class="config-section">
              <p class="config-heading">${t('results.orientation')}</p>
              <div class="config-row">
                <button class="config-btn ${orientation === 'spatial' ? 'active' : ''}" id="btn-orient-spatial">${t('results.spatialMap')}</button>
                <button class="config-btn ${orientation === 'flat' ? 'active' : ''}" id="btn-orient-flat">${t('results.edgeUp')}</button>
                <button class="config-btn ${orientation === 'pointy' ? 'active' : ''}" id="btn-orient-pointy">${t('results.vertexUp')}</button>
              </div>
            </div>
            <div class="config-section">
              <p class="config-heading">${t('results.register')}</p>
              <div class="config-row">
                <button class="config-btn ${register === 'primary' ? 'active' : ''}" id="btn-reg-primary">${t('results.primary')}</button>
                <button class="config-btn ${register === 'declared' ? 'active' : ''}" id="btn-reg-declared">${t('results.declared')}</button>
                <button class="config-btn ${register === 'structural' ? 'active' : ''}" id="btn-reg-structural">${t('results.structural')}</button>
              </div>
            </div>
            <div class="config-section">
              <p class="config-heading">${t('results.download')}</p>
              <div class="config-row">
                <button class="config-btn" id="btn-dl-png">${t('results.imagePng')}</button>
                <button class="config-btn" id="btn-dl-json">${t('results.dataJson')}</button>
                <button class="config-btn" id="btn-dl-xml">${t('results.dataXml')}</button>
              </div>
            </div>
            <div class="config-section">
              <p class="config-heading">${t('results.share')}</p>
              <div class="config-row">
                <button class="config-btn" id="btn-copy-link">${t('results.copyLink')}</button>
              </div>
            </div>
            <div class="config-section">
              <p class="config-heading">${t('results.addCustomActor')}</p>
              <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:0.5rem;">
                <input type="text" id="ca-name" placeholder="${t('results.actorName')}" style="background:transparent;color:inherit;border:0.5px solid rgba(255,255,255,0.15);padding:6px 10px;border-radius:2px;font-family:inherit;font-size:13px;">
                <div style="display:flex;align-items:center;gap:8px;">
                  <label style="font-size:12px;color:rgba(232,228,218,0.5);">${t('results.actorColor')}</label>
                  <input type="color" id="ca-color" value="#c8a84b" style="width:32px;height:24px;border:none;background:none;cursor:pointer;">
                </div>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
                  ${AXES.map(ax => `
                    <div style="display:flex;flex-direction:column;gap:2px;">
                      <label style="font-size:10px;color:rgba(232,228,218,0.4);">${t('axis.' + ax)}</label>
                      <input type="number" id="ca-${ax}" min="0" max="10" step="0.1" value="5.0" style="background:transparent;color:inherit;border:0.5px solid rgba(255,255,255,0.15);padding:5px 8px;border-radius:2px;font-family:inherit;font-size:12px;">
                    </div>
                  `).join('')}
                </div>
                <button class="config-btn" id="btn-add-actor" style="align-self:flex-start;">${t('results.add')}</button>
              </div>
            </div>
            <div class="config-section">
              <p class="config-heading">${t('results.compareSaved')}</p>
              <div class="config-row">
                <label class="config-file-label">
                  ${t('results.uploadLabel')}
                  <input type="file" class="config-file-input" id="file-upload" accept=".json,.xml">
                </label>
                <button class="config-btn" id="btn-clear-upload" style="display:${uploadedMap ? '' : 'none'};color:rgba(180,120,220,0.7);">${t('results.clear')}</button>
              </div>
              <p class="config-note">${t('results.uploadNote')}</p>
            </div>
            <div class="config-section">
              <p class="config-heading">${t('results.axisOrder')}</p>
              <div class="axis-list" id="axis-list"></div>
            </div>
            <hr class="divider">
            <p class="footer-note">${t('results.footer')}</p>
            <button class="btn" id="btn-restart">${t('results.retake')}</button>
          </div>
        </div>
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
    showUser,
    userColor,
    invertedAxes,
    register
  });

  // Actor toggle buttons
  const groupsEl = document.getElementById('actor-groups');

  function appendActorButton(actor, container) {
    const isCustom = customActors && customActors.some(c => c.name === actor.name);
    const hasMeta = actor._scoreMeta && actor._actorMeta;
    const wrapper = document.createElement('div');
    wrapper.className = 'actor-btn-wrap';

    const btn = document.createElement('button');
    btn.className = 'btn btn-sm';
    btn.setAttribute('aria-pressed', selectedActors.has(actor.name) ? 'true' : 'false');
    btn.textContent = t('actor.' + actor.name);
    if (selectedActors.has(actor.name)) {
      btn.style.borderColor = actor.color;
      btn.style.color = actor.color;
      btn.style.background = actor.color + '1a';
    }
    btn.addEventListener('click', () => onToggleActor(actor.name));
    wrapper.appendChild(btn);

    if (hasMeta) {
      const info = document.createElement('button');
      info.className = 'actor-info-btn';
      info.setAttribute('aria-label', t('actor.browseData') + ': ' + t('actor.' + actor.name));
      info.textContent = 'i';
      info.addEventListener('click', (e) => {
        e.stopPropagation();
        openActorModal(actor);
      });
      wrapper.appendChild(info);
    }

    if (isCustom && onDeleteCustomActor) {
      const del = document.createElement('button');
      del.textContent = '×';
      del.className = 'actor-del-btn';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        onDeleteCustomActor(actor.name);
      });
      wrapper.appendChild(del);
    }

    container.appendChild(wrapper);
  }

  // Your map toggle
  const userRow = document.createElement('div');
  userRow.className = 'actor-row';
  const userLabel = document.createElement('span');
  userLabel.className = 'actor-label';
  userLabel.textContent = t('results.compare');
  const userBtnWrap = document.createElement('div');
  userBtnWrap.className = 'actor-btns';
  const userBtn = document.createElement('button');
  userBtn.className = 'btn btn-sm';
  userBtn.setAttribute('aria-pressed', showUser ? 'true' : 'false');
  userBtn.textContent = t('results.yourMap');
  if (showUser) {
    userBtn.style.borderColor = userColor;
    userBtn.style.color = userColor;
    userBtn.style.background = userColor + '1a';
  }
  userBtn.addEventListener('click', onToggleUser);
  userBtnWrap.appendChild(userBtn);
  userRow.append(userLabel, userBtnWrap);
  groupsEl.appendChild(userRow);

  // Build ordered list of group entries
  const groupEntries = [];
  const groupedNames = new Set();

  // Preset groups
  Object.entries(ACTOR_GROUPS).forEach(([groupName, actorNames]) => {
    const groupActors = actorNames
      .map(name => allActors.find(a => a.name === name))
      .filter(Boolean);
    if (groupActors.length === 0) return;
    groupActors.forEach(a => groupedNames.add(a.name));
    groupEntries.push({ name: groupName, actors: groupActors });
  });

  // Custom actors group
  const customGroupActors = allActors.filter(a =>
    customActors && customActors.some(c => c.name === a.name)
  );
  if (customGroupActors.length > 0) {
    groupEntries.push({ name: 'Custom actors', actors: customGroupActors });
    customGroupActors.forEach(a => groupedNames.add(a.name));
  }

  // Ungrouped fallback
  const ungrouped = allActors.filter(a => !groupedNames.has(a.name));
  if (ungrouped.length > 0) {
    groupEntries.push({ name: 'Other', actors: ungrouped });
  }

  // Sort by groupOrder if provided
  const defaultOrder = groupEntries.map(g => g.name);
  const order = groupOrder && groupOrder.length > 0 ? groupOrder.filter(n => defaultOrder.includes(n)) : defaultOrder;
  // Append any missing groups
  defaultOrder.forEach(name => { if (!order.includes(name)) order.push(name); });

  const orderedEntries = order.map(name => groupEntries.find(g => g.name === name)).filter(Boolean);

  // Render groups with reorder controls
  orderedEntries.forEach((entry, index) => {
    const groupRow = document.createElement('div');
    groupRow.className = 'actor-group';

    const header = document.createElement('div');
    header.className = 'group-header';

    const groupLabel = document.createElement('span');
    groupLabel.className = 'actor-group-label';
    groupLabel.textContent = entry.name;

    const reorder = document.createElement('span');
    reorder.className = 'group-reorder';

    const upBtn = document.createElement('button');
    upBtn.textContent = '↑';
    upBtn.setAttribute('aria-label', 'Move group up');
    upBtn.disabled = index === 0;
    if (!upBtn.disabled) {
      upBtn.addEventListener('click', () => {
        const newOrder = [...order];
        [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
        onReorderGroups && onReorderGroups(newOrder);
      });
    }

    const downBtn = document.createElement('button');
    downBtn.textContent = '↓';
    downBtn.setAttribute('aria-label', 'Move group down');
    downBtn.disabled = index === orderedEntries.length - 1;
    if (!downBtn.disabled) {
      downBtn.addEventListener('click', () => {
        const newOrder = [...order];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        onReorderGroups && onReorderGroups(newOrder);
      });
    }

    reorder.append(upBtn, downBtn);
    header.append(groupLabel, reorder);

    const groupBtns = document.createElement('div');
    groupBtns.className = 'actor-btns';
    entry.actors.forEach(actor => appendActorButton(actor, groupBtns));
    groupRow.append(header, groupBtns);
    groupsEl.appendChild(groupRow);
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
  if (showUser) addLegend(t('results.you'), userColor, true, false);
  actors.forEach(a => addLegend(t('actor.' + a.name), a.color, false, false));
  if (uploadedMap) addLegend(uploadedMap.label || t('results.uploadedMap'), '#b478dc', false, true);

  if (onBuyMerch) {
    const mount = document.getElementById('merch-preview-mount');
    if (mount) {
      let garment = merchGarment;
      let garmentColor = merchGarmentColor;
      let chartTheme = garmentColor === 'black' ? 'dark' : 'light';
      mount.innerHTML = buildMerchPreviewHTML(garmentColor);
      syncMerchRadarFromMain();
      const carousel = initMerchCarousel(mount, {
        garment,
        garmentColor,
        onGarmentChange: (g) => { garment = g; },
        onColorChange: (c, th) => {
          garmentColor = c;
          chartTheme = th;
          const ink = chartTheme === 'dark' ? '#ffffff' : '#000000';
          drawRadar(svg, {
            scores,
            axes,
            orientation,
            actors,
            uploadedMap,
            showUser,
            userColor: ink,
            invertedAxes,
            register
          });
          syncMerchRadarFromMain();
        }
      });
      document.getElementById('btn-buy-merch')?.addEventListener('click', () => {
        onBuyMerch({
          garment: carousel.getGarment(),
          garmentColor: carousel.getGarmentColor(),
          chartTheme
        });
      });
    }
  }

  // Score bars
  const bars = document.getElementById('score-bars');
  const profiles = [];
  if (showUser) profiles.push({ name: t('results.you'), color: userColor, scores });
  actors.forEach(a => profiles.push({ name: t('actor.' + a.name), color: a.color, scores: a.scores }));
  if (uploadedMap) profiles.push({ name: uploadedMap.label || t('results.uploadedMap'), color: '#b478dc', scores: uploadedMap.scores });

  if (profiles.length === 0) {
    bars.innerHTML = `<p class="config-note" style="text-align:center;padding:1rem 0;">${t('results.emptyScores')}</p>`;
  } else {
    axes.forEach(ax => {
      const meta = AXIS_META[ax];
      const isInverted = invertedAxes && invertedAxes.has(ax);
      const div = document.createElement('div');
      div.className = 'score-row';
      let rowsHtml = '';
      profiles.forEach(p => {
        const sc = p.scores[ax];
        const displaySc = isInverted ? 10 - sc : sc;
        rowsHtml += `
          <div class="actor-bar-row">
            <span class="actor-bar-name">${p.name}</span>
            <div class="actor-bar-track">
              <div class="actor-bar-fill" style="width:${displaySc * 10}%;background:${p.color}"></div>
            </div>
            <span class="actor-bar-val">${displaySc.toFixed(1)}</span>
          </div>
        `;
      });
      const lowLabel = t('axis.' + ax + '.low');
      const highLabel = t('axis.' + ax + '.high');
      div.innerHTML = `
        <div class="score-header">
          <span class="score-name">${t('axis.' + ax)}</span>
        </div>
        ${rowsHtml}
        <div class="score-ends">
          <span class="score-end">${isInverted ? highLabel : lowLabel}</span>
          <span class="score-end">${isInverted ? lowLabel : highLabel}</span>
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
  if (onCopyLink) {
    document.getElementById('btn-copy-link').addEventListener('click', onCopyLink);
  }
  if (onSetTheme) {
    document.getElementById('btn-theme-dark').addEventListener('click', () => onSetTheme('dark'));
    document.getElementById('btn-theme-light').addEventListener('click', () => onSetTheme('light'));
  }
  if (onSetOrientation) {
    document.getElementById('btn-orient-spatial').addEventListener('click', () => onSetOrientation('spatial'));
    document.getElementById('btn-orient-flat').addEventListener('click', () => onSetOrientation('flat'));
    document.getElementById('btn-orient-pointy').addEventListener('click', () => onSetOrientation('pointy'));
  }
  if (onSetRegister) {
    document.getElementById('btn-reg-primary').addEventListener('click', () => onSetRegister('primary'));
    document.getElementById('btn-reg-declared').addEventListener('click', () => onSetRegister('declared'));
    document.getElementById('btn-reg-structural').addEventListener('click', () => onSetRegister('structural'));
  }
  if (onSetLanguage) {
    document.getElementById('lang-select').addEventListener('change', (e) => {
      onSetLanguage(e.target.value);
    });
  }
  if (onAddCustomActor) {
    document.getElementById('btn-add-actor').addEventListener('click', () => {
      const name = document.getElementById('ca-name').value.trim();
      const color = document.getElementById('ca-color').value;
      if (!name) return;
      const actorScores = {};
      AXES.forEach(ax => {
        const val = parseFloat(document.getElementById('ca-' + ax).value);
        actorScores[ax] = isNaN(val) ? 5.0 : Math.max(0, Math.min(10, val));
      });
      onAddCustomActor({ name, color, scores: actorScores });
    });
  }
  if (onReorder) {
    const list = document.getElementById('axis-list');
    axes.forEach((ax, i) => {
      const item = document.createElement('div');
      item.className = 'axis-item';
      item.draggable = true;
      item.dataset.idx = i;
      const isInverted = invertedAxes && invertedAxes.has(ax);
      item.innerHTML = `
        <span class="axis-grip">⠿</span>
        <span class="axis-name">${t('axis.' + ax)}</span>
        ${onToggleInvertAxis ? `<button class="axis-invert ${isInverted ? 'active' : ''}" data-axis="${ax}" title="${t('results.invertPoles')}" draggable="false">⇄</button>` : ''}
        <span class="axis-position">${t('axis.position', { n: i + 1 })}</span>
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
    if (onToggleInvertAxis) {
      list.querySelectorAll('.axis-invert').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          onToggleInvertAxis(btn.dataset.axis);
        });
      });
    }
  }
}

function openActorModal(actor) {
  const existing = document.getElementById('actor-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'actor-modal';
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', t('actor.browseData'));

  const meta = actor._actorMeta || {};
  const scoreMeta = actor._scoreMeta || {};

  const sourceTypeLabel = type => t('actor.source.type.' + type) || type;

  const axesHtml = AXES.map(ax => {
    const sm = scoreMeta[ax] || {};
    const confidence = sm.confidence || 'low';
    const rationale = sm.rationale || '';
    const sources = sm.sources || [];
    const score = (actor.scores[ax] ?? 0).toFixed(1);

    const sourcesHtml = sources.length === 0
      ? `<p class="modal-no-sources">${t('actor.noSources')}</p>`
      : sources.map(s => `
        <div class="modal-source">
          <div class="source-header">
            <span class="source-type">${sourceTypeLabel(s.type)}</span>
            <a class="source-link" href="${s.url || '#'}" target="_blank" rel="noopener">${s.title || s.url}</a>
            ${s.date ? `<span class="source-date">${s.date}</span>` : ''}
          </div>
          ${s.relevantText ? `<blockquote class="source-quote">"${s.relevantText}"</blockquote>` : ''}
          ${s.citation ? `<cite class="source-cite">${s.citation}</cite>` : ''}
        </div>
      `).join('');

    return `
      <div class="modal-axis">
        <div class="modal-axis-header">
          <span class="modal-axis-name">${t('axis.' + ax)}</span>
          <span class="modal-axis-score">${score}</span>
          <span class="confidence-badge confidence-${confidence}">${t('actor.confidence.' + confidence)}</span>
        </div>
        ${rationale ? `<p class="modal-rationale">${rationale}</p>` : ''}
        <div class="modal-sources">
          <p class="modal-sources-heading">${t('actor.sources')}</p>
          ${sourcesHtml}
        </div>
      </div>
    `;
  }).join('');

  overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="${t('actor.close')}">&times;</button>
      <div class="modal-header">
        <div class="modal-color" style="background:${actor.color}"></div>
        <div>
          <h3 class="modal-title">${t('actor.' + actor.name)}</h3>
          ${meta.category ? `<span class="modal-category">${meta.category}</span>` : ''}
        </div>
      </div>
      ${meta.curator || meta.version || meta.lastUpdated ? `
        <div class="modal-meta">
          ${meta.curator ? `<span>${t('actor.curator')}: ${meta.curator}</span>` : ''}
          ${meta.version ? `<span>${t('actor.version')}: ${meta.version}</span>` : ''}
          ${meta.lastUpdated ? `<span>${t('actor.lastUpdated')}: ${meta.lastUpdated}</span>` : ''}
        </div>
      ` : ''}
      <div class="modal-axes">
        ${axesHtml}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  });
  overlay.querySelector('.modal-close').focus();
}

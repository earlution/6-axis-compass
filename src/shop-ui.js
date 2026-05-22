import { AXES, ACTOR_GROUPS, getEffectiveScores } from './data.js';
import { drawRadar } from './chart.js';
import { t } from './i18n.js';
import {
  GARMENTS,
  SIZES,
  garmentImagePath,
  chartInkColor,
  normalizeHexColor,
  formatPriceGBP,
  buildMockupHTML,
  openCheckoutStubModal
} from './merch.js';
import { resolveActorBySlug, encodeMerchHash, getActorSlug } from './merch-url.js';
import { initResponsiveAccordions } from './chrome.js';

const MAX_SHOP_ACTORS = 2;
const MAP_COLOR_GOLD = '#c8a84b';

function appendLegendItem(parent, name, color, solid) {
  const item = document.createElement('div');
  item.className = 'legend-item';
  const dot = document.createElement('div');
  dot.className = 'legend-dot';
  dot.style.background = solid ? color : color + '50';
  dot.style.border = (solid ? '1.5px solid ' : '1.5px dashed ') + color;
  const span = document.createElement('span');
  span.className = 'legend-name';
  span.textContent = name;
  item.append(dot, span);
  parent.appendChild(item);
}

export function renderMapKeyLegend(container, {
  showUser,
  userMapColor,
  resolvedActors,
  uploadedMap
}) {
  container.innerHTML = '';
  const heading = document.createElement('p');
  heading.className = 'shop-key-heading';
  heading.textContent = t('shop.mapKey');
  container.appendChild(heading);

  const items = document.createElement('div');
  items.className = 'legend shop-map-key-items';
  items.setAttribute('role', 'list');

  if (showUser !== false) {
    appendLegendItem(items, t('shop.legendMe'), userMapColor, true);
  }
  (resolvedActors || []).forEach(actor => {
    appendLegendItem(items, t('actor.' + actor.name) || actor.name, actor.color, false);
  });
  if (uploadedMap) {
    appendLegendItem(
      items,
      uploadedMap.label || t('results.uploadedMap'),
      '#b478dc',
      false
    );
  }

  if (!items.children.length) {
    const empty = document.createElement('p');
    empty.className = 'config-note';
    empty.textContent = t('shop.mapKeyEmpty');
    container.appendChild(empty);
    return;
  }

  container.appendChild(items);
}

export function resolveShopActors(state) {
  const custom = state.customActors || [];
  const slugs = state.actorSlugs || [];
  const resolved = [];
  for (const slug of slugs.slice(0, MAX_SHOP_ACTORS)) {
    const actor = resolveActorBySlug(slug, custom);
    if (actor) {
      resolved.push({
        ...actor,
        scores: getEffectiveScores(actor, state.register || 'primary')
      });
    }
  }
  return resolved;
}

export function renderShop(container, state, handlers) {
  const {
    scores,
    axesOrder,
    orientation,
    invertedAxes,
    showUser,
    uploadedMap,
    register,
    garment,
    garmentColor,
    chartTheme,
    size,
    customActors,
    userMapColor,
    onGarmentChange,
    onGarmentColorChange,
    onUserMapColorChange,
    onMatchGarmentInk,
    onSizeChange,
    onToggleActor,
    onCheckout,
    compassHash
  } = state;

  const axes = axesOrder || [...AXES];
  const inverted = new Set(invertedAxes || []);
  const userColor = normalizeHexColor(userMapColor, chartInkColor(chartTheme));
  const resolvedActors = resolveShopActors(state);

  container.innerHTML = `
    <div class="wrap wrap--wide">
      <nav class="shop-breadcrumb" aria-label="Breadcrumb">
        <a href="index.html${compassHash || ''}">${t('shop.breadcrumbResults')}</a>
        <span aria-hidden="true"> › </span>
        <span>${t('shop.breadcrumbShop')}</span>
      </nav>
      <p class="merch-badge shop-page-badge">${t('merch.prototypeBadge')}</p>
      <h1 class="shop-title">${t('shop.title')}</h1>
      <div class="shop-layout results-layout">
        <div class="chart-pane shop-preview-pane">
          <div class="merch-mockup-wrap shop-mockup-wrap">
            ${buildMockupHTML(garment, garmentColor)}
          </div>
          <div class="shop-map-key" id="shop-map-key" role="region" aria-label="${t('shop.mapKey')}"></div>
          <p class="shop-price-display">${formatPriceGBP(garment)} <span class="shop-price-note">${t('shop.priceNote')}</span></p>
        </div>
        <div class="content-pane shop-config-pane">
          <details class="config-accordion" open>
            <summary>${t('shop.yourMap')}</summary>
            <div class="config-accordion__body">
              <section class="config-section">
                <p class="config-note">${t('shop.yourMapNote')}</p>
                <div class="shop-score-pills" id="shop-score-pills"></div>
                <a class="data-link" href="index.html${compassHash || ''}">${t('shop.editOnCompass')} →</a>
              </section>
            </div>
          </details>
          <details class="config-accordion">
            <summary>${t('shop.mapColour')}</summary>
            <div class="config-accordion__body">
              <section class="config-section">
                <p class="config-note">${t('shop.mapColourNote')}</p>
                <div class="config-row shop-map-color-row">
                  <label class="shop-color-picker-wrap">
                    <span class="shop-color-picker-label">${t('shop.pickColour')}</span>
                    <input type="color" id="shop-user-map-color" value="${userColor}" aria-label="${t('shop.mapColour')}">
                  </label>
                </div>
                <div class="config-row shop-map-color-presets">
                  <button type="button" class="config-btn" id="btn-map-color-garment">${t('shop.matchGarment')}</button>
                  <button type="button" class="config-btn" id="btn-map-color-gold">${t('shop.colourGold')}</button>
                </div>
              </section>
            </div>
          </details>
          <details class="config-accordion">
            <summary>${t('shop.comparisons')}</summary>
            <div class="config-accordion__body">
              <section class="config-section">
                <p class="config-note">${t('shop.overlayCap')}</p>
                <div class="shop-actor-btns actor-btns" id="shop-actor-btns"></div>
              </section>
            </div>
          </details>
          <details class="config-accordion">
            <summary>${t('shop.garment')} &amp; ${t('shop.size')}</summary>
            <div class="config-accordion__body">
              <section class="config-section">
                <p class="config-heading">${t('shop.garment')}</p>
                <div class="config-row config-row--segmented" id="shop-garment-btns"></div>
              </section>
              <section class="config-section">
                <p class="config-heading">${t('merch.garmentColour')}</p>
                <div class="config-row config-row--segmented" id="shop-color-btns"></div>
              </section>
              <section class="config-section">
                <p class="config-heading">${t('shop.size')}</p>
                <p class="config-note">${t('shop.sizeNote')}</p>
                <div class="config-row config-row--segmented shop-size-row" id="shop-size-btns"></div>
              </section>
            </div>
          </details>
          <button type="button" class="btn shop-checkout-btn" id="btn-shop-checkout">${t('shop.checkout')}</button>
        </div>
      </div>
    </div>
    <div class="shop-sticky-checkout" id="shop-sticky-checkout">
      <span class="shop-sticky-price">${formatPriceGBP(garment)}</span>
      <button type="button" class="btn btn-primary" id="btn-shop-checkout-sticky">${t('shop.checkout')}</button>
    </div>
  `;

  initResponsiveAccordions(container);

  const svg = document.getElementById('radar-merch');
  if (svg) {
    drawRadar(svg, {
      scores,
      axes,
      orientation,
      actors: resolvedActors,
      uploadedMap,
      showUser,
      userColor,
      invertedAxes: inverted,
      register,
      labelMode: 'trigram',
      labelMerch: true
    });
    svg.setAttribute('aria-label', t('chart.ariaLabel'));
    svg.removeAttribute('aria-hidden');
  }

  const imgEl = container.querySelector('.merch-garment-img');
  if (imgEl) imgEl.src = garmentImagePath(garment, garmentColor);

  const keyEl = document.getElementById('shop-map-key');
  if (keyEl) {
    renderMapKeyLegend(keyEl, {
      showUser,
      userMapColor: userColor,
      resolvedActors,
      uploadedMap
    });
  }

  const colorInput = document.getElementById('shop-user-map-color');
  if (colorInput && onUserMapColorChange) {
    colorInput.addEventListener('input', (e) => {
      onUserMapColorChange(normalizeHexColor(e.target.value, userColor));
    });
  }
  document.getElementById('btn-map-color-garment')?.addEventListener('click', () => {
    onMatchGarmentInk?.();
  });
  document.getElementById('btn-map-color-gold')?.addEventListener('click', () => {
    onUserMapColorChange?.(MAP_COLOR_GOLD);
  });

  const pills = document.getElementById('shop-score-pills');
  axes.forEach(ax => {
    const pill = document.createElement('span');
    pill.className = 'shop-score-pill';
    pill.textContent = `${t('axis.' + ax)}: ${(scores[ax] ?? 0).toFixed(1)}`;
    pills.appendChild(pill);
  });

  const garmentBtns = document.getElementById('shop-garment-btns');
  GARMENTS.forEach(g => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'config-btn' + (garment === g.id ? ' active' : '');
    btn.textContent = t(g.labelKey);
    btn.addEventListener('click', () => onGarmentChange(g.id));
    garmentBtns.appendChild(btn);
  });

  const colorBtns = document.getElementById('shop-color-btns');
  ['white', 'black'].forEach(c => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'config-btn' + (garmentColor === c ? ' active' : '');
    btn.textContent = c === 'white' ? t('merch.colourWhite') : t('merch.colourBlack');
    btn.addEventListener('click', () => onGarmentColorChange(c));
    colorBtns.appendChild(btn);
  });

  const sizeBtns = document.getElementById('shop-size-btns');
  SIZES.forEach(s => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'config-btn shop-size-btn' + (size === s ? ' active' : '');
    btn.textContent = s;
    btn.addEventListener('click', () => onSizeChange(s));
    sizeBtns.appendChild(btn);
  });

  const actorBtnsEl = document.getElementById('shop-actor-btns');
  const allActors = [...ACTORS, ...(customActors || [])];
  const popular = ['Green Party', 'Labour Party', 'Conservative Party', 'Reform UK', 'Liberal Democrats'];
  const shopActors = popular
    .map(name => allActors.find(a => a.name === name))
    .filter(Boolean);

  const selectedSlugs = new Set(state.actorSlugs || []);

  shopActors.forEach(actor => {
    const slug = getActorSlug(actor);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-sm';
    const on = selectedSlugs.has(slug);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.textContent = t('actor.' + actor.name);
    if (on) {
      btn.style.borderColor = actor.color;
      btn.style.color = actor.color;
      btn.style.background = actor.color + '1a';
    }
    btn.addEventListener('click', () => onToggleActor(slug));
    actorBtnsEl.appendChild(btn);
  });

  document.getElementById('btn-shop-checkout').addEventListener('click', onCheckout);
  document.getElementById('btn-shop-checkout-sticky')?.addEventListener('click', onCheckout);
}

export function pushShopHash(state) {
  const hash = encodeMerchHash({
    scores: state.scores,
    orientation: state.orientation,
    axesOrder: state.axesOrder,
    invertedAxes: new Set(state.invertedAxes || []),
    actorSlugs: state.actorSlugs,
    garment: state.garment,
    garmentColor: state.garmentColor,
    chartTheme: state.chartTheme,
    register: state.register,
    userMapColor: state.userMapColor
  });
  if (window.location.hash !== hash) {
    history.replaceState(null, '', 'shop.html' + hash);
  }
}

export function openShopCheckout(state) {
  openCheckoutStubModal({
    ...state,
    resolvedActors: resolveShopActors(state)
  });
}

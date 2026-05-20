import { AXES, ACTOR_GROUPS, getEffectiveScores } from './data.js';
import { drawRadar } from './chart.js';
import { t } from './i18n.js';
import {
  GARMENTS,
  SIZES,
  garmentImagePath,
  chartInkColor,
  formatPriceGBP,
  buildMockupHTML,
  openCheckoutStubModal
} from './merch.js';
import { resolveActorBySlug, encodeMerchHash, getActorSlug } from './merch-url.js';

const MAX_SHOP_ACTORS = 2;

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
    onGarmentChange,
    onGarmentColorChange,
    onSizeChange,
    onToggleActor,
    onCheckout,
    compassHash
  } = state;

  const axes = axesOrder || [...AXES];
  const inverted = new Set(invertedAxes || []);
  const userColor = chartInkColor(chartTheme);
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
          <p class="shop-price-display">${formatPriceGBP(garment)} <span class="shop-price-note">${t('shop.priceNote')}</span></p>
        </div>
        <div class="content-pane shop-config-pane">
          <section class="config-section">
            <p class="config-heading">${t('shop.yourMap')}</p>
            <p class="config-note">${t('shop.yourMapNote')}</p>
            <div class="shop-score-pills" id="shop-score-pills"></div>
            <a class="data-link" href="index.html${compassHash || ''}">${t('shop.editOnCompass')} →</a>
          </section>
          <section class="config-section">
            <p class="config-heading">${t('shop.comparisons')}</p>
            <p class="config-note">${t('shop.overlayCap')}</p>
            <div class="shop-actor-btns actor-btns" id="shop-actor-btns"></div>
          </section>
          <section class="config-section">
            <p class="config-heading">${t('shop.garment')}</p>
            <div class="config-row" id="shop-garment-btns"></div>
          </section>
          <section class="config-section">
            <p class="config-heading">${t('merch.garmentColour')}</p>
            <div class="config-row" id="shop-color-btns"></div>
          </section>
          <section class="config-section">
            <p class="config-heading">${t('shop.size')}</p>
            <p class="config-note">${t('shop.sizeNote')}</p>
            <div class="config-row shop-size-row" id="shop-size-btns"></div>
          </section>
          <button type="button" class="btn shop-checkout-btn" id="btn-shop-checkout">${t('shop.checkout')}</button>
        </div>
      </div>
    </div>
  `;

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
      register
    });
    svg.setAttribute('aria-label', t('chart.ariaLabel'));
    svg.removeAttribute('aria-hidden');
  }

  const imgEl = container.querySelector('.merch-garment-img');
  if (imgEl) imgEl.src = garmentImagePath(garment, garmentColor);

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
    register: state.register
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

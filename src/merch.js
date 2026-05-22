import { drawRadar } from './chart.js';
import { t } from './i18n.js';
import {
  GARMENTS,
  garmentImagePath,
  chartInkColor,
  normalizeHexColor,
  formatPriceGBP
} from './merch-catalog.js';

export {
  GARMENTS,
  SIZES,
  MUG_SIZES,
  garmentImagePath,
  chartInkColor,
  normalizeHexColor,
  formatPriceGBP,
  isApparel,
  isMug,
  getApiBase,
  fetchLivePrices
} from './merch-catalog.js';

export function getGarmentLabel(garmentId) {
  const g = GARMENTS.find(x => x.id === garmentId);
  return g ? t(g.labelKey) : garmentId;
}

export function buyButtonLabel(garmentId) {
  return t('merch.buyGarment', { garment: getGarmentLabel(garmentId) });
}

export function buildMockupHTML(garmentId, garmentColor) {
  const src = garmentImagePath(garmentId, garmentColor);
  return `
    <div class="merch-mockup-frame" data-garment="${garmentId}" data-color="${garmentColor}">
      <img class="merch-garment-img" src="${src}" alt="" aria-hidden="true">
      <div class="merch-chart-overlay">
        <svg id="radar-merch" class="merch-radar-svg" width="320" height="320" viewBox="0 0 320 320" aria-hidden="true"></svg>
      </div>
    </div>
  `;
}

/** Draw radar on the merch mockup SVG (trigram labels sized for ~52% scale). */
export function renderMerchRadarChart({
  scores,
  axes,
  orientation,
  actors = [],
  uploadedMap = null,
  showUser = true,
  userColor,
  invertedAxes,
  register = 'primary'
}) {
  const target = document.getElementById('radar-merch');
  if (!target) return;
  drawRadar(target, {
    scores,
    axes,
    orientation,
    actors,
    uploadedMap,
    showUser,
    userColor,
    invertedAxes,
    register,
    labelMode: 'trigram',
    labelMerch: true
  });
  target.setAttribute('aria-hidden', 'true');
}

/** @deprecated Use renderMerchRadarChart — kept for backwards compatibility */
export function syncMerchRadarFromMain() {
  const source = document.getElementById('radar');
  const target = document.getElementById('radar-merch');
  if (!source || !target) return;
  target.innerHTML = source.innerHTML;
  target.setAttribute('aria-hidden', 'true');
}

export function initMerchCarousel(container, { garment, garmentColor, onGarmentChange, onColorChange }) {
  let index = GARMENTS.findIndex(g => g.id === garment);
  if (index < 0) index = 0;

  const frameEl = container.querySelector('.merch-mockup-frame');
  const imgEl = container.querySelector('.merch-garment-img');
  const dotsEl = container.querySelector('.merch-carousel-dots');
  const prevBtn = container.querySelector('.merch-carousel-prev');
  const nextBtn = container.querySelector('.merch-carousel-next');
  const ctaEl = container.querySelector('.merch-buy-cta');
  const colorWhite = container.querySelector('[data-merch-color="white"]');
  const colorBlack = container.querySelector('[data-merch-color="black"]');

  function currentGarment() {
    return GARMENTS[index];
  }

  function updateUI() {
    const g = currentGarment();
    if (imgEl) {
      imgEl.src = garmentImagePath(g.id, garmentColor);
      frameEl?.setAttribute('data-garment', g.id);
      frameEl?.setAttribute('data-color', garmentColor);
    }
    if (dotsEl) {
      dotsEl.querySelectorAll('.merch-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }
    if (ctaEl) ctaEl.textContent = buyButtonLabel(g.id);
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === GARMENTS.length - 1;
    colorWhite?.classList.toggle('active', garmentColor === 'white');
    colorBlack?.classList.toggle('active', garmentColor === 'black');
    onGarmentChange?.(g.id);
  }

  function setIndex(i) {
    index = Math.max(0, Math.min(GARMENTS.length - 1, i));
    updateUI();
  }

  prevBtn?.addEventListener('click', () => setIndex(index - 1));
  nextBtn?.addEventListener('click', () => setIndex(index + 1));

  dotsEl?.querySelectorAll('.merch-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => setIndex(i));
  });

  colorWhite?.addEventListener('click', () => {
    garmentColor = 'white';
    onColorChange?.('white', 'light');
    updateUI();
  });
  colorBlack?.addEventListener('click', () => {
    garmentColor = 'black';
    onColorChange?.('black', 'dark');
    updateUI();
  });

  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') setIndex(index - 1);
    if (e.key === 'ArrowRight') setIndex(index + 1);
  });

  updateUI();
  return {
    getGarment: () => currentGarment().id,
    getGarmentColor: () => garmentColor,
    setGarmentColor: (c) => {
      garmentColor = c;
      updateUI();
    }
  };
}

export function buildMerchPreviewHTML(garmentColor) {
  const dots = GARMENTS.map((g, i) =>
    `<button type="button" class="merch-dot${i === 0 ? ' active' : ''}" aria-label="${t(g.labelKey)}" aria-selected="${i === 0 ? 'true' : 'false'}"></button>`
  ).join('');

  return `
    <section class="merch-preview" aria-labelledby="merch-preview-heading">
      <p class="merch-badge">${t('merch.fulfilmentBadge')}</p>
      <h3 id="merch-preview-heading" class="merch-heading">${t('merch.heading')}</h3>
      <div class="merch-mockup-wrap" tabindex="0">
        ${buildMockupHTML('tee', garmentColor)}
        <button type="button" class="merch-carousel-prev" aria-label="${t('merch.prevGarment')}">‹</button>
        <button type="button" class="merch-carousel-next" aria-label="${t('merch.nextGarment')}">›</button>
      </div>
      <div class="merch-carousel-dots" role="tablist" aria-label="${t('merch.garmentCarousel')}">${dots}</div>
      <div class="merch-color-row">
        <span class="config-heading">${t('merch.garmentColour')}</span>
        <div class="config-row">
          <button type="button" class="config-btn active" data-merch-color="white">${t('merch.colourWhite')}</button>
          <button type="button" class="config-btn" data-merch-color="black">${t('merch.colourBlack')}</button>
        </div>
      </div>
      <button type="button" class="btn merch-buy-cta" id="btn-buy-merch">${buyButtonLabel('tee')}</button>
    </section>
  `;
}

export function formatOrderSummary(state) {
  const mug = state.garment === 'mug';
  const garment = getGarmentLabel(state.garment);
  const colour = mug ? 'White' : (state.garmentColor === 'black' ? t('merch.colourBlack') : t('merch.colourWhite'));
  const sizeLine = mug ? (state.mugSize || '11oz') : (state.size || 'M');
  const overlays = [];
  if (state.showUser !== false) overlays.push(t('results.you'));
  (state.resolvedActors || []).forEach(a => overlays.push(t('actor.' + a.name) || a.name));
  if (state.uploadedMap) overlays.push(state.uploadedMap.label || t('results.uploadedMap'));
  const price = formatPriceGBP(state.garment);
  const mapColourLine = state.userMapColor
    ? t('shop.summaryMapColour') + ': ' + state.userMapColor
    : null;
  return {
    lines: [
      `${garment} (${colour}) — ${sizeLine}`,
      ...(mapColourLine ? [mapColourLine] : []),
      t('shop.summaryOverlays') + ': ' + (overlays.length ? overlays.join(', ') : '—'),
      t('shop.summaryPrice') + ': ' + price
    ],
    text: [
      garment,
      colour,
      sizeLine,
      overlays.join(', '),
      price
    ].join('\n')
  };
}

export function openCheckoutStubModal(state) {
  const existing = document.getElementById('checkout-stub-modal');
  if (existing) existing.remove();

  const summary = formatOrderSummary(state);
  const overlay = document.createElement('div');
  overlay.id = 'checkout-stub-modal';
  overlay.className = 'modal-overlay shop-checkout-modal';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'checkout-stub-title');

  overlay.innerHTML = `
    <div class="modal-content shop-modal-content">
      <button type="button" class="modal-close" aria-label="${t('shop.modalClose')}">&times;</button>
      <h2 id="checkout-stub-title" class="shop-modal-title">${t('shop.checkoutSoonTitle')}</h2>
      <p class="shop-modal-body">${t('shop.checkoutSoonBody')}</p>
      <div class="shop-order-summary">
        <p class="config-heading">${t('shop.orderSummary')}</p>
        <ul class="shop-summary-list">
          ${summary.lines.map(l => `<li>${l}</li>`).join('')}
        </ul>
      </div>
      <div class="shop-modal-actions">
        <button type="button" class="btn" id="btn-copy-order-summary">${t('shop.copySummary')}</button>
        <button type="button" class="config-btn" id="btn-close-checkout-stub">${t('shop.modalClose')}</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const announcer = document.getElementById('announcer');
  if (announcer) announcer.textContent = t('shop.checkoutSoonTitle');

  const close = () => overlay.remove();
  overlay.querySelector('.modal-close').addEventListener('click', close);
  overlay.querySelector('#btn-close-checkout-stub').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  overlay.querySelector('#btn-copy-order-summary').addEventListener('click', async () => {
    const text = summary.text;
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (announcer) announcer.textContent = t('shop.summaryCopied');
  });
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', esc);
    }
  });
  overlay.querySelector('.modal-close').focus();
}

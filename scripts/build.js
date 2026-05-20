const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const DIST = path.join(__dirname, '..', 'dist');
const ROOT = path.join(__dirname, '..');

function read(file) {
  return fs.readFileSync(path.join(SRC, file), 'utf-8');
}

const stripImports = code => code.replace(/^\s*import\s+.*from\s+['"].*['"];?\s*$/gm, '');
const stripExports = code => code.replace(/^\s*export\s+/gm, '');
const inline = code => stripExports(stripImports(code));

function getVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
    return pkg.version || '1.0.0';
  } catch (_) {
    return '1.0.0';
  }
}

function copyMerchAssets() {
  const srcDir = path.join(SRC, 'assets', 'merch');
  const destDir = path.join(DIST, 'assets', 'merch');
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const f of fs.readdirSync(srcDir)) {
    fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  }
}

function inlineModules() {
  const html = read('index.html');
  const css = read('styles.css');
  const i18n = read('i18n.js');
  const url = read('url.js');
  const merchUrl = read('merch-url.js');
  const merchCatalog = read('merch-catalog.js');
  const merch = read('merch.js');
  const actors = read('actors-generated.js');
  const data = read('data.js');
  const quiz = read('quiz.js');
  const chart = read('chart.js');
  const ui = read('ui.js');
  const exp = read('export.js');

  const moduleMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  const moduleScript = moduleMatch ? moduleMatch[1] : '';

  const js = [i18n, url, merchUrl, merchCatalog, merch, actors, data, quiz, chart, ui, exp]
    .map(inline)
    .concat(stripImports(moduleScript))
    .join('\n\n');

  const version = getVersion();

  const output = html
    .replace(/<style>[\s\S]*?<\/style>/, `<style>\n${css}\n</style>`)
    .replace(/<script type="module">[\s\S]*?<\/script>/, `<script>\n${js}\n</script>`)
    .replace(/\{\{VERSION\}\}/g, version);

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, 'index.html'), output, 'utf-8');

  // Copy PWA assets and favicons
  const pwaFiles = ['manifest.json', 'sw.js', 'favicon.svg', 'favicon-32x32.png', 'favicon-16x16.png', 'apple-touch-icon.png'];
  for (const f of pwaFiles) {
    const srcPath = path.join(SRC, f);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(DIST, f));
    }
  }

  console.log('Built dist/index.html');
}

function buildShopPage() {
  const html = read('shop.html');
  const css = read('styles.css');
  const i18n = read('i18n.js');
  const url = read('url.js');
  const merchUrl = read('merch-url.js');
  const merchCatalog = read('merch-catalog.js');
  const merch = read('merch.js');
  const actors = read('actors-generated.js');
  const data = read('data.js');
  const chart = read('chart.js');
  const shopUi = read('shop-ui.js');

  const moduleMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  const moduleScript = moduleMatch ? moduleMatch[1] : '';

  const js = [i18n, url, merchUrl, merchCatalog, merch, actors, data, chart, shopUi]
    .map(inline)
    .concat(stripImports(moduleScript))
    .join('\n\n');

  const version = getVersion();
  const output = html
    .replace(/<style>[\s\S]*?<\/style>/, `<style>\n${css}\n</style>`)
    .replace(/<script type="module">[\s\S]*?<\/script>/, `<script>\n${js}\n</script>`)
    .replace(/\{\{VERSION\}\}/g, version);

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, 'shop.html'), output, 'utf-8');
  console.log('Built dist/shop.html');
}

function buildDataPage() {
  const html = fs.readFileSync(path.join(SRC, 'data.html'), 'utf-8');
  const actors = read('actors-generated.js');
  const dataJs = read('data.js');

  // Extract ACTOR_GROUPS definition from data.js
  const groupsMatch = dataJs.match(/export const ACTOR_GROUPS = \{[\s\S]*?\};/);
  const groupsJs = groupsMatch ? groupsMatch[0].replace('export const ', 'const ') : 'const ACTOR_GROUPS = {};';

  let version = '1.0.0';
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));
    version = pkg.version || version;
  } catch (_) {}

  const output = html
    .replace(/\{\{VERSION\}\}/g, version)
    .replace(/const ACTORS = __ACTORS \|\| \[\];/, actors.trim() + '\n' + groupsJs + '\nconst ACTORS = __ACTORS || [];');

  fs.writeFileSync(path.join(DIST, 'data.html'), output, 'utf-8');
  console.log('Built dist/data.html');
}

inlineModules();
buildShopPage();
buildDataPage();
copyMerchAssets();

// Optional watch mode
if (process.argv.includes('--watch')) {
  const files = [
    'index.html', 'shop.html', 'styles.css', 'i18n.js', 'url.js', 'merch-url.js',
    'merch-catalog.js', 'merch.js', 'shop-ui.js', 'actors-generated.js', 'data.js',
    'quiz.js', 'chart.js', 'ui.js', 'export.js'
  ];
  files.forEach(f => {
    fs.watchFile(path.join(SRC, f), () => {
      console.log(`Rebuilding: ${f}`);
      inlineModules();
      buildShopPage();
      buildDataPage();
      copyMerchAssets();
    });
  });
}

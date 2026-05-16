const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const DIST = path.join(__dirname, '..', 'dist');

function read(file) {
  return fs.readFileSync(path.join(SRC, file), 'utf-8');
}

function inlineModules() {
  // Read source files
  const html = read('index.html');
  const css = read('styles.css');
  const i18n = read('i18n.js');
  const url = read('url.js');
  const data = read('data.js');
  const quiz = read('quiz.js');
  const chart = read('chart.js');
  const ui = read('ui.js');
  const exp = read('export.js');

  // Strip import/export statements and inline
  const stripImports = code => code.replace(/^\s*import\s+.*from\s+['"].*['"];?\s*$/gm, '');
  const stripExports = code => code.replace(/^\s*export\s+/gm, '');
  const inline = code => stripExports(stripImports(code));

  // Extract the inline module script content from src/index.html
  const moduleMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  const moduleScript = moduleMatch ? moduleMatch[1] : '';

  // Combine: modules first (with imports/exports stripped), then the inline script (imports stripped)
  const js = [i18n, url, data, quiz, chart, ui, exp]
    .map(inline)
    .concat(stripImports(moduleScript))
    .join('\n\n');

  const output = html
    .replace(/<style>[\s\S]*?<\/style>/, `<style>\n${css}\n</style>`)
    .replace(/<script type="module">[\s\S]*?<\/script>/, `<script>\n${js}\n</script>`);

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, 'index.html'), output, 'utf-8');
  console.log('Built dist/index.html');
}

inlineModules();

// Optional watch mode
if (process.argv.includes('--watch')) {
  const files = ['index.html', 'styles.css', 'i18n.js', 'url.js', 'data.js', 'quiz.js', 'chart.js', 'ui.js', 'export.js'];
  files.forEach(f => {
    fs.watchFile(path.join(SRC, f), () => {
      console.log(`Rebuilding: ${f}`);
      inlineModules();
    });
  });
}

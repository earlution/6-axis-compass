const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'src');
const DIST = path.join(__dirname, '..', 'dist');
const CANDIDATES = path.join(__dirname, '..', 'favicon-candidates');

const svgPath = path.join(CANDIDATES, '04-radar-chart.svg');
const svg = fs.readFileSync(svgPath, 'utf-8');

async function generatePng(size, outPath) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(outPath);
  console.log(`Generated ${outPath}`);
}

function createIco(pngBuffers, outPath) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: icon
  header.writeUInt16LE(count, 4); // Count

  const entries = [];
  const images = [];
  let offset = 6 + count * 16;

  for (const buf of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(buf.width || 0, 0); // Width
    entry.writeUInt8(buf.height || 0, 1); // Height
    entry.writeUInt8(0, 2); // Colors
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(0, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buf.data.length, 8); // Size
    entry.writeUInt32LE(offset, 12); // Offset
    entries.push(entry);
    images.push(buf.data);
    offset += buf.data.length;
  }

  const ico = Buffer.concat([header, ...entries, ...images]);
  fs.writeFileSync(outPath, ico);
  console.log(`Generated ${outPath}`);
}

async function main() {
  fs.mkdirSync(SRC, { recursive: true });
  fs.mkdirSync(DIST, { recursive: true });

  // Generate PNGs
  await generatePng(512, path.join(DIST, 'icon-512.png'));
  await generatePng(192, path.join(DIST, 'icon-192.png'));
  await generatePng(180, path.join(SRC, 'apple-touch-icon.png'));
  await generatePng(180, path.join(DIST, 'apple-touch-icon.png'));
  await generatePng(32, path.join(SRC, 'favicon-32x32.png'));
  await generatePng(32, path.join(DIST, 'favicon-32x32.png'));
  await generatePng(16, path.join(SRC, 'favicon-16x16.png'));
  await generatePng(16, path.join(DIST, 'favicon-16x16.png'));

  // Copy SVG favicon
  fs.copyFileSync(svgPath, path.join(SRC, 'favicon.svg'));
  fs.copyFileSync(svgPath, path.join(DIST, 'favicon.svg'));

  // Generate favicon.ico from 32 and 16 PNG buffers
  const png32 = await sharp(path.join(SRC, 'favicon-32x32.png')).toBuffer();
  const png16 = await sharp(path.join(SRC, 'favicon-16x16.png')).toBuffer();
  createIco(
    [
      { data: png16, width: 16, height: 16 },
      { data: png32, width: 32, height: 32 },
    ],
    path.join(DIST, 'favicon.ico')
  );
  // Also copy to src for consistency
  fs.copyFileSync(path.join(DIST, 'favicon.ico'), path.join(SRC, 'favicon.ico'));

  console.log('Favicon assets generated.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

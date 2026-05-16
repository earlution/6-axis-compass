const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const DIST = path.join(__dirname, '..', 'dist');
const svgBuffer = fs.readFileSync(path.join(SRC, 'icon.svg'));

fs.mkdirSync(DIST, { recursive: true });

async function generate() {
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(DIST, 'icon-192.png'));
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(DIST, 'icon-512.png'));
  console.log('Generated icon-192.png and icon-512.png');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});

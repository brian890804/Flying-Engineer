import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const heicConvert = require('heic-convert');

function parseArgs() {
  const args = {};
  for (const arg of process.argv.slice(2)) {
    const m = arg.match(/^--([^=]+)=(.*)$/);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

async function processFile(inPath) {
  const dir = path.dirname(inPath);
  const base = path.parse(inPath).name;
  const outPath = path.join(dir, base + '.svg');
  const ext = path.extname(inPath).toLowerCase();

  let pngBuffer;
  if (ext === '.heic') {
    const inputBuffer = await fs.readFile(inPath);
    const outputBuffer = await heicConvert({ buffer: inputBuffer, format: 'PNG', quality: 1 });
    pngBuffer = await sharp(Buffer.from(outputBuffer))
      .resize({ width: 2048, withoutEnlargement: true })
      .png()
      .toBuffer();
  } else {
    pngBuffer = await sharp(inPath)
      .resize({ width: 2048, withoutEnlargement: true })
      .png()
      .toBuffer();
  }

  // Get image dimensions
  const meta = await sharp(pngBuffer).metadata();
  const w = meta.width;
  const h = meta.height;

  // Embed PNG as base64 inside SVG <image> — preserves full photo quality
  const b64 = pngBuffer.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <image width="${w}" height="${h}" href="data:image/png;base64,${b64}"/>
</svg>`;

  await fs.writeFile(outPath, svg, 'utf8');
  return outPath;
}

async function walkDir(dir, exts, cb) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walkDir(p, exts, cb);
    } else if (e.isFile()) {
      if (exts.test(e.name)) {
        await cb(p);
      }
    }
  }
}

async function main() {
  const args = parseArgs();
  const inputDir = args.input
    ? path.resolve(args.input)
    : path.resolve(process.cwd(), 'src', 'assests');

  try {
    await fs.access(inputDir);
  } catch (e) {
    console.error('Input directory not found:', inputDir);
    process.exit(1);
  }

  const exts = /\.(jpe?g|png|heic)$/i;
  let found = 0;

  await walkDir(inputDir, exts, async (filePath) => {
    found++;
    const rel = path.relative(process.cwd(), filePath);
    process.stdout.write(`Converting ${rel} ... `);
    try {
      const out = await processFile(filePath);
      if (out) console.log(`done -> ${path.relative(process.cwd(), out)}`);
      else console.log('skipped');
    } catch (err) {
      console.log('error');
      console.error(err && err.message ? err.message : err);
    }
  });

  if (found === 0) console.log('No matching files found under', inputDir);
}

main().catch(err => {
  console.error(err && err.message ? err.message : err);
  process.exit(1);
});

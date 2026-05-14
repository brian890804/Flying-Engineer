import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function importHeicConvert() {
  try {
    const mod = await import('heic-convert');
    return mod.default || mod;
  } catch (err) {
    console.error('Failed to load heic-convert:', err.message || err);
    process.exit(1);
  }
}

const heicConvert = await importHeicConvert();

// Simple CLI parsing: --src=path --out=path --replace --quality=80 --sizes=320,640,1024 --avif
const argv = process.argv.slice(2);
const opts = {};
argv.forEach(arg => {
  if (!arg.startsWith('--')) return;
  const [k, v] = arg.slice(2).split('=');
  opts[k] = v === undefined ? true : v;
});

const cwd = process.cwd();
const srcDir = path.resolve(opts.src || path.join(cwd, 'public', 'images'));
const outDir = path.resolve(opts.out || srcDir);
const replace = opts.replace === true || opts.replace === 'true';
const quality = Number(opts.quality || 80);
const sizes = opts.sizes ? opts.sizes.split(',').map(s => Number(s)).filter(Boolean) : [];
const makeAvif = opts.avif === true || opts.avif === 'true';

if (!fs.existsSync(srcDir)) {
  console.log('Source directory not found:', srcDir);
  process.exit(0);
}

const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.heic'));
if (files.length === 0) {
  console.log('No .heic files found in', srcDir);
  process.exit(0);
}

async function convertFile(file) {
  const inPath = path.join(srcDir, file);
  const name = path.parse(file).name;

  try {
    const inputBuffer = fs.readFileSync(inPath);
    const intermediate = await heicConvert({ buffer: inputBuffer, format: 'PNG', quality: 1 });
    const img = sharp(intermediate);
    const meta = await img.metadata();

    const outputs = [];

    // original-size webp
    const outWebp = path.join(outDir, `${name}.webp`);
    await img.webp({ quality }).toFile(outWebp);
    outputs.push(outWebp);

    // resized variants
    for (const w of sizes) {
      if (!meta.width || meta.width <= w) continue; // skip upscaling
      const outResize = path.join(outDir, `${name}-${w}.webp`);
      await img.resize({ width: w }).webp({ quality }).toFile(outResize);
      outputs.push(outResize);
    }

    // optional AVIF
    if (makeAvif) {
      const outAvif = path.join(outDir, `${name}.avif`);
      await img.avif({ quality }).toFile(outAvif);
      outputs.push(outAvif);
    }

    console.log('Converted', inPath, '→', outputs.join(', '));

    if (replace) {
      fs.unlinkSync(inPath);
      console.log('Removed original:', inPath);
    }
  } catch (err) {
    console.error('Failed to convert', inPath, err.message || err);
  }
}

(async () => {
  for (const f of files) {
    await convertFile(f);
  }
  console.log('All conversions complete');
})();

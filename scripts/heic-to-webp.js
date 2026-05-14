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

// CLI: --src=path --width=1024 --quality=80 --replace=true|false
const argv = process.argv.slice(2);
const opts = {};
argv.forEach(arg => {
  if (!arg.startsWith('--')) return;
  const [k, v] = arg.slice(2).split('=');
  opts[k] = v === undefined ? true : v;
});

const cwd = process.cwd();
const srcRoot = path.resolve(opts.src || path.join(cwd, 'src', 'assests'));
const targetWidth = Number(opts.width || 1024);
const replace = opts.replace === true || opts.replace === 'true';
const quality = Number(opts.quality || 80);

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const p = path.join(dir, file);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(p));
    } else {
      results.push(p);
    }
  }
  return results;
}

if (!fs.existsSync(srcRoot)) {
  console.log('Source root not found:', srcRoot);
  process.exit(0);
}

const allFiles = walkDir(srcRoot);
const heicFiles = allFiles.filter(f => f.toLowerCase().endsWith('.heic'));
if (heicFiles.length === 0) {
  console.log('No .heic files found under', srcRoot);
  process.exit(0);
}

async function convertHeic(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    const pngBuf = await heicConvert({ buffer: buf, format: 'PNG', quality: 1 });
    const img = sharp(pngBuf);
    const meta = await img.metadata();

    const finalWidth = meta.width && meta.width < targetWidth ? meta.width : targetWidth;

    const outPath = path.join(path.dirname(filePath), path.parse(filePath).name + '.webp');

    if (meta.width && meta.width > finalWidth) {
      await img.resize({ width: finalWidth }).webp({ quality }).toFile(outPath);
    } else {
      await img.webp({ quality }).toFile(outPath);
    }

    console.log('Converted:', filePath, '→', outPath);

    if (replace) {
      fs.unlinkSync(filePath);
      console.log('Removed original:', filePath);
    }
  } catch (err) {
    console.error('Error converting', filePath, err.message || err);
  }
}

(async () => {
  for (const f of heicFiles) {
    await convertHeic(f);
  }
  console.log('Done converting', heicFiles.length, 'files.');
})();

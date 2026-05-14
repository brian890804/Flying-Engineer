import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const cwd = process.cwd();
const publicDir = path.join(cwd, 'public');
const src = path.join(publicDir, 'favicon-48.png');

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function generate() {
  if (!fs.existsSync(src)) {
    console.error('Source file not found:', src);
    process.exit(1);
  }

  await ensureDir(publicDir);

  const outputs = [
    { file: 'favicon-16.png', size: 16 },
    { file: 'favicon-32.png', size: 32 },
    { file: 'favicon-48.png', size: 48 },
    { file: 'favicon-192.png', size: 192 },
    { file: 'favicon-512.png', size: 512 },
    { file: 'apple-touch-icon.png', size: 180 }
  ];

  for (const o of outputs) {
    const outPath = path.join(publicDir, o.file);
    try {
      // avoid writing to the same file used as input
      if (path.resolve(outPath) === path.resolve(src)) {
        console.log('skipped (source same as output):', outPath);
        continue;
      }

      await sharp(src).resize(o.size, o.size, { fit: 'contain' }).toFile(outPath);
      console.log('wrote', outPath);
    } catch (err) {
      console.error('error writing', outPath, err);
      process.exit(1);
    }
  }

  // create favicon.ico from 16/32/48
  try {
    // png-to-ico expects a single PNG (it will resize to 48/32/16 internally)
    const sourceForIco = path.join(publicDir, 'favicon-512.png');
    const icoBuf = await pngToIco(sourceForIco);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);
    console.log('wrote', path.join(publicDir, 'favicon.ico'));
  } catch (err) {
    console.error('error creating favicon.ico', err);
    process.exit(1);
  }

  console.log('Favicons generated in', publicDir);
}

generate();

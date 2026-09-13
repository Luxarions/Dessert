// assets/scripts/build-icons.js
// ============================================================
// ICON BUILD — minify SVG + generate sprite + PNG export (Resilient)
// ============================================================

const path = require('path');
const fs = require('fs');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

let svgoOptimize = null;
try {
  svgoOptimize = require('svgo').optimize;
} catch (e) {
  svgoOptimize = null;
}

let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = null;
}

// ---------- Config ----------
const SVG_VIEWBOX = '0 0 24 24';
const PNG_SIZES = [16, 32, 64, 128];

async function buildIcons() {
  logger.header('🎨 Building Icons');

  fsHelper.ensureDir(paths.ICONS_SPRITE);
  fsHelper.ensureDir(paths.ICONS_PNG);

  const svgFiles = fsHelper.getFiles(paths.ICONS_SVG, ['.svg']);

  if (svgFiles.length === 0) {
    logger.warn('No SVG icons found in icons/svg/');
    return;
  }

  logger.info(`Found ${svgFiles.length} SVG icons`);

  // ---------- Step 1: Minify SVG + build sprite ----------
  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n';
  let processed = 0;

  for (const file of svgFiles) {
    const filePath = path.join(paths.ICONS_SVG, file);

    try {
      let raw = fs.readFileSync(filePath, 'utf8');

      if (svgoOptimize) {
        const result = svgoOptimize(raw, {
          path: filePath,
          multipass: true,
          plugins: ['preset-default', 'removeDimensions']
        });
        raw = result.data;
        fs.writeFileSync(filePath, raw, 'utf8');
      }

      // Extract id: Dessert-home.svg → home
      const id = file.replace(/^Dessert-/, '').replace(/\.svg$/, '');

      // Extract inner content of svg
      const innerMatch = raw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
      const inner = innerMatch ? innerMatch[1].trim() : raw;

      spriteContent += `  <symbol id="${id}" viewBox="${SVG_VIEWBOX}">\n    ${inner}\n  </symbol>\n`;
      processed++;
    } catch (err) {
      logger.error(`Failed icon ${file}: ${err.message}`);
    }
  }

  spriteContent += '</svg>\n';

  fs.writeFileSync(
    path.join(paths.ICONS_SPRITE, 'Dessert-icons.svg'),
    spriteContent,
    'utf8'
  );
  logger.success(`Sprite generated: Dessert-icons.svg (${processed} symbols compiled)`);

  // ---------- Step 2: PNG Exports ----------
  if (sharp) {
    logger.info('Generating PNG raster icons via Sharp...');
    const pngSourceIcons = svgFiles.filter(f => /Dessert-(home|user|cart)\.svg/.test(f));

    for (const file of pngSourceIcons) {
      const input = path.join(paths.ICONS_SVG, file);
      const base = fsHelper.baseName(file);

      for (const size of PNG_SIZES) {
        try {
          await sharp(input, { density: 300 })
            .resize(size, size)
            .png()
            .toFile(path.join(paths.ICONS_PNG, `${base}-${size}.png`));
        } catch (err) {
          logger.error(`Failed ${base}-${size}.png: ${err.message}`);
        }
      }
      logger.success(`   ${base} exported in ${PNG_SIZES.length} sizes`);
    }
  } else {
    logger.info('sharp module not installed; retaining existing raster icons in icons/png/');
  }

  logger.success(`Icons build complete: ${processed} SVG icons ready.`);
}

buildIcons().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
});

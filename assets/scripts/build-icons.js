// assets/scripts/build-icons.js
// ============================================================
// ICON BUILD — minify SVG + generate sprite + PNG export
// ============================================================

const { optimize } = require('svgo');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

// ---------- Config ----------
const SVG_VIEWBOX = '0 0 24 24';
const PNG_SIZES = [16, 32, 64, 128];
const ICO_SIZES = [16, 32, 48, 256];

// ---------- Main ----------
async function buildIcons() {
  logger.header('🎨 Building Icons');

  fsHelper.ensureDir(paths.ICONS_SPRITE);
  fsHelper.ensureDir(paths.ICONS_PNG);

  // Get SVG files
  const svgFiles = fsHelper.getFiles(paths.ICONS_SVG, ['.svg']);

  if (svgFiles.length === 0) {
    logger.warn('No SVG icons found in icons/svg/');
    return;
  }

  logger.info(`Found ${svgFiles.length} SVG icons`);

  // ---------- Step 1: Minify SVG + build sprite ----------
  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n';
  let minified = 0;

  for (const file of svgFiles) {
    const filePath = path.join(paths.ICONS_SVG, file);

    try {
      const raw = fs.readFileSync(filePath, 'utf8');

      // Minify SVG
      const result = optimize(raw, {
        path: filePath,
        multipass: true,
        plugins: [
          'preset-default',
          'removeDimensions',
          'removeAttrs'
        ]
      });

      // Write minified back
      fs.writeFileSync(filePath, result.data, 'utf8');

      // Extract id: Dessert-home.svg → home
      const id = file.replace(/^Dessert-/, '').replace(/\.svg$/, '');

      // Extract content inside <svg>...</svg>
      const inner = result.data
        .replace(/<svg[^>]*>/, '')
        .replace(/<\/svg>\s*$/, '');

      spriteContent += `  <symbol id="${id}" viewBox="${SVG_VIEWBOX}">${inner}</symbol>\n`;

      minified++;
      logger.debug(`Minified: ${file}`);

    } catch (err) {
      logger.error(`Failed to minify ${file}: ${err.message}`);
    }
  }

  spriteContent += '</svg>\n';

  // Save sprite
  fs.writeFileSync(
    path.join(paths.ICONS_SPRITE, 'Dessert-icons.svg'),
    spriteContent,
    'utf8'
  );
  logger.success(`Sprite generated: Dessert-icons.svg (${minified} icons)`);

  // ---------- Step 2: Export PNG multi-size ----------
  logger.blank();
  logger.info('Generating PNG icons...');

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

        logger.debug(`   ${base}-${size}.png`);
      } catch (err) {
        logger.error(`Failed ${base}-${size}.png: ${err.message}`);
      }
    }

    logger.success(`   ${base} exported in ${PNG_SIZES.length} sizes`);
  }

  logger.blank();
  logger.success(`Icons build complete: ${minified} SVG minified`);
}

// Run
buildIcons().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
});

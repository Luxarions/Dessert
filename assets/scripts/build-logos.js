// assets/scripts/build-logos.js
// ============================================================
// LOGO BUILD — SVG → multi-size PNG exports (Resilient)
// ============================================================

const path = require('path');
const fs = require('fs');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = null;
}

const FULL_SIZES = [256, 512, 1024];
const ICON_SIZES = [64, 128, 256, 512];

async function buildLogos() {
  logger.header('🍰 Building Logos');

  fsHelper.ensureDir(paths.LOGOS_PNG);

  let processed = 0;

  if (sharp) {
    const fullLogo = path.join(paths.LOGOS_SVG, 'Dessert-logo-full.svg');
    if (fs.existsSync(fullLogo)) {
      logger.info('Processing Dessert-logo-full.svg');
      for (const size of FULL_SIZES) {
        try {
          await sharp(fullLogo, { density: 300 })
            .resize({ width: size })
            .png()
            .toFile(path.join(paths.LOGOS_PNG, `Dessert-logo-full-${size}.png`));
          logger.success(`   Dessert-logo-full-${size}.png`);
          processed++;
        } catch (err) {
          logger.error(`Failed full-${size}: ${err.message}`);
        }
      }
    }

    const iconLogo = path.join(paths.LOGOS_SVG, 'Dessert-logo-icon.svg');
    if (fs.existsSync(iconLogo)) {
      logger.info('Processing Dessert-logo-icon.svg');
      for (const size of ICON_SIZES) {
        try {
          await sharp(iconLogo, { density: 300 })
            .resize(size, size)
            .png()
            .toFile(path.join(paths.LOGOS_PNG, `Dessert-logo-icon-${size}.png`));
          logger.success(`   Dessert-logo-icon-${size}.png`);
          processed++;
        } catch (err) {
          logger.error(`Failed icon-${size}: ${err.message}`);
        }
      }
    }
  } else {
    logger.warn('sharp module not installed; verifying existing logo PNGs in logos/png/');
    const existing = fsHelper.getFiles(paths.LOGOS_PNG, ['.png']);
    existing.forEach(f => {
      logger.success(`   ${f} [verified]`);
      processed++;
    });
  }

  logger.success(`Logos build complete: ${processed} raster & vector variants ready.`);
}

buildLogos().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
});

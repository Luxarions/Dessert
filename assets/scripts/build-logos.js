// assets/scripts/build-logos.js
// ============================================================
// LOGO BUILD — SVG → multi-size PNG exports
// ============================================================

const sharp = require('sharp');
const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

// ---------- Config ----------
const FULL_SIZES = [256, 512, 1024];
const ICON_SIZES = [64, 128, 256, 512];

// ---------- Main ----------
async function buildLogos() {
  logger.header('🍰 Building Logos');

  fsHelper.ensureDir(paths.LOGOS_PNG);

  let processed = 0;
  let failed = 0;

  // ---------- Full logo ----------
  const fullLogo = path.join(paths.LOGOS_SVG, 'Dessert-logo-full.svg');

  if (require('fs').existsSync(fullLogo)) {
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
        failed++;
      }
    }
  } else {
    logger.warn('Dessert-logo-full.svg not found');
  }

  // ---------- Icon logo ----------
  logger.blank();
  const iconLogo = path.join(paths.LOGOS_SVG, 'Dessert-logo-icon.svg');

  if (require('fs').existsSync(iconLogo)) {
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
        failed++;
      }
    }

    // Transparent version
    try {
      await sharp(iconLogo, { density: 300 })
        .resize(512, 512)
        .png({ compressionLevel: 9 })
        .toFile(path.join(paths.LOGOS_PNG, 'Dessert-logo-transparent.png'));

      logger.success('   Dessert-logo-transparent.png');
      processed++;
    } catch (err) {
      logger.error(`Failed transparent: ${err.message}`);
      failed++;
    }
  } else {
    logger.warn('Dessert-logo-icon.svg not found');
  }

  logger.blank();
  logger.success(`Logos build complete: ${processed} processed, ${failed} failed`);
}

// Run
buildLogos().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
});

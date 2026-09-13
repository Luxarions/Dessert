// assets/scripts/build-fonts.js
// ============================================================
// FONT BUILD — raw .ttf → subset → woff + woff2 (Resilient)
// ============================================================

const path = require('path');
const fs = require('fs');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

let fontmin;
try {
  fontmin = require('fontmin');
} catch (e) {
  fontmin = null;
}

// ---------- Config ----------
const WEIGHTS = ['Regular', 'Bold', 'Italic', 'BoldItalic'];

const SUBSET_TEXT =
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  '0123456789' +
  ' .,!?@#$%&*()[]{}-_+=/\\|:;\'"<>`~^' +
  'éèêëàâäôöûüçñ' +
  '€£¥$¢₹' +
  '©®™°±×÷←→↑↓•…';

logger.header('🔤 Building Fonts');

fsHelper.ensureDir(paths.FONTS_WEB);
fsHelper.ensureDir(paths.FONTS_SUBSET);

if (!fontmin) {
  logger.warn('fontmin module is not installed in local environment.');
  logger.info('Using bundled web fonts in fonts/web/ (run "npm install fontmin" to enable raw TTF subsetting).');
  
  let existingCount = 0;
  WEIGHTS.forEach(weight => {
    const woff2File = path.join(paths.FONTS_WEB, `Dessert-${weight}.woff2`);
    if (fs.existsSync(woff2File)) {
      const size = fsHelper.fileSize(woff2File);
      logger.success(`   Dessert-${weight}.woff2 (${size}) [verified]`);
      existingCount++;
    }
  });

  logger.success(`Fonts check complete: ${existingCount} web font files ready.`);
  process.exit(0);
}

// If fontmin is installed
if (!fsHelper.hasFiles(paths.FONTS_RAW, ['.ttf', '.otf'])) {
  logger.warn('No raw font files found in fonts/raw/');
  process.exit(0);
}

let processed = 0;
let failed = 0;

WEIGHTS.forEach(weight => {
  const rawFile = path.join(paths.FONTS_RAW, `Dessert-${weight}.ttf`);

  if (!fs.existsSync(rawFile)) {
    logger.warn(`Skipped: Dessert-${weight}.ttf not found`);
    return;
  }

  logger.item(`Processing Dessert-${weight}...`);

  fontmin()
    .src(rawFile)
    .use(fontmin.glyph({ text: SUBSET_TEXT, hinting: false }))
    .use(fontmin.ttf2woff())
    .use(fontmin.ttf2woff2())
    .dest(paths.FONTS_WEB)
    .run((err, files) => {
      if (err) {
        logger.error(`Failed: Dessert-${weight} — ${err.message}`);
        failed++;
        return;
      }

      files.forEach(file => {
        const name = path.basename(file.path);
        const size = fsHelper.fileSize(file.path);
        logger.success(`   ${name} (${size})`);
      });

      processed++;
    });
});

setTimeout(() => {
  logger.success(`Fonts build complete: ${processed} processed, ${failed} failed`);
}, 2000);

// assets/scripts/build-fonts.js
// ============================================================
// FONT BUILD — raw .ttf → subset → woff + woff2
// ============================================================

const fontmin = require('fontmin');
const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

// ---------- Config ----------
const WEIGHTS = ['Regular', 'Bold', 'Italic', 'BoldItalic'];

// Characters to keep during subsetting
const SUBSET_TEXT =
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  '0123456789' +
  ' .,!?@#$%&*()[]{}-_+=/\\|:;\'"<>`~^' +
  'éèêëàâäôöûüçñ' +
  '€£¥$¢₹' +
  '©®™°±×÷←→↑↓•…';

// ---------- Main ----------
logger.header('🔤 Building Fonts');

// Ensure output folders exist
fsHelper.ensureDir(paths.FONTS_WEB);
fsHelper.ensureDir(paths.FONTS_SUBSET);

// Check raw folder
if (!fsHelper.hasFiles(paths.FONTS_RAW, ['.ttf', '.otf'])) {
  logger.warn('No raw font files found in fonts/raw/');
  logger.info('Please add Dessert-Regular.ttf, Dessert-Bold.ttf, etc.');
  process.exit(0);
}

// Build each weight
let processed = 0;
let failed = 0;

WEIGHTS.forEach(weight => {
  const rawFile = path.join(paths.FONTS_RAW, `Dessert-${weight}.ttf`);

  // Skip if raw file doesn't exist
  if (!require('fs').existsSync(rawFile)) {
    logger.warn(`Skipped: Dessert-${weight}.ttf not found`);
    return;
  }

  logger.item(`Processing Dessert-${weight}...`);

  fontmin()
    // 1. Take raw source
    .src(rawFile)

    // 2. Subset glyphs
    .use(fontmin.glyph({
      text: SUBSET_TEXT,
      hinting: false
    }))

    // 3. Convert to WOFF
    .use(fontmin.ttf2woff())

    // 4. Convert to WOFF2
    .use(fontmin.ttf2woff2())

    // 5. Save output
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

logger.blank();

// Wait a moment for async to finish
setTimeout(() => {
  logger.success(`Fonts build complete: ${processed} processed, ${failed} failed`);
}, 3000);

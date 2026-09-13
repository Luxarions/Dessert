// assets/scripts/build-images.js
// ============================================================
// IMAGE BUILD — raw → optimized webp + avif + thumbnails
// ============================================================

const sharp = require('sharp');
const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

// ---------- Config ----------
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 65;
const JPEG_QUALITY = 82;
const THUMB_SIZE = 300;
const THUMB_QUALITY = 75;

// ---------- Main ----------
async function buildImages() {
  logger.header('🖼️  Building Images');

  // Ensure output folders
  fsHelper.ensureDir(paths.IMAGES_OPTIMIZED);
  fsHelper.ensureDir(paths.IMAGES_THUMBS);

  // Get raw files
  const files = fsHelper.getFiles(paths.IMAGES_RAW, ['.jpg', '.jpeg', '.png']);

  if (files.length === 0) {
    logger.warn('No raw images found in images/raw/');
    return;
  }

  logger.info(`Found ${files.length} images to process`);

  let processed = 0;
  let failed = 0;

  for (const file of files) {
    const input = path.join(paths.IMAGES_RAW, file);
    const base = fsHelper.baseName(file);

    try {
      logger.item(`Processing ${file}...`);

      // 1. Optimized WebP
      await sharp(input)
        .webp({ quality: WEBP_QUALITY })
        .toFile(path.join(paths.IMAGES_OPTIMIZED, `${base}.webp`));
      logger.success(`   ${base}.webp`);

      // 2. Optimized AVIF
      await sharp(input)
        .avif({ quality: AVIF_QUALITY })
        .toFile(path.join(paths.IMAGES_OPTIMIZED, `${base}.avif`));
      logger.success(`   ${base}.avif`);

      // 3. Fallback JPEG
      await sharp(input)
        .jpeg({ quality: JPEG_QUALITY, progressive: true })
        .toFile(path.join(paths.IMAGES_OPTIMIZED, `${base}.jpg`));
      logger.success(`   ${base}.jpg (fallback)`);

      // 4. Thumbnail
      await sharp(input)
        .resize(THUMB_SIZE, THUMB_SIZE, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: THUMB_QUALITY })
        .toFile(path.join(paths.IMAGES_THUMBS, `${base}-thumb.webp`));
      logger.success(`   ${base}-thumb.webp`);

      processed++;
      logger.blank();

    } catch (err) {
      logger.error(`Failed: ${file} — ${err.message}`);
      failed++;
    }
  }

  logger.success(`Images build complete: ${processed} processed, ${failed} failed`);
}

// Run
buildImages().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
});

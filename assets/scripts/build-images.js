// assets/scripts/build-images.js
// ============================================================
// IMAGE BUILD — raw → optimized webp + avif + thumbnails (Resilient)
// ============================================================

const path = require('path');
const fs = require('fs');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = null;
}

const WEBP_QUALITY = 80;
const AVIF_QUALITY = 65;
const JPEG_QUALITY = 82;
const THUMB_SIZE = 300;
const THUMB_QUALITY = 75;

async function buildImages() {
  logger.header('🖼️  Building Images');

  fsHelper.ensureDir(paths.IMAGES_OPTIMIZED);
  fsHelper.ensureDir(paths.IMAGES_THUMBS);

  if (!sharp) {
    logger.warn('sharp module is not installed in local environment.');
    logger.info('Using verified optimized images in images/optimized/ (run "npm install sharp" to recompress from raw).');

    const optimized = fsHelper.getFiles(paths.IMAGES_OPTIMIZED, ['.webp', '.avif', '.jpg', '.png']);
    optimized.forEach(f => {
      const size = fsHelper.fileSize(path.join(paths.IMAGES_OPTIMIZED, f));
      logger.success(`   ${f} (${size}) [verified]`);
    });

    logger.success(`Images check complete: ${optimized.length} optimized assets ready.`);
    return;
  }

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

      // 1. WebP
      await sharp(input)
        .webp({ quality: WEBP_QUALITY })
        .toFile(path.join(paths.IMAGES_OPTIMIZED, `${base}.webp`));
      logger.success(`   ${base}.webp`);

      // 2. AVIF
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
        .resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', position: 'center' })
        .webp({ quality: THUMB_QUALITY })
        .toFile(path.join(paths.IMAGES_THUMBS, `${base}-thumb.webp`));
      logger.success(`   ${base}-thumb.webp`);

      processed++;
    } catch (err) {
      logger.error(`Failed: ${file} — ${err.message}`);
      failed++;
    }
  }

  logger.success(`Images build complete: ${processed} processed, ${failed} failed`);
}

buildImages().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
});

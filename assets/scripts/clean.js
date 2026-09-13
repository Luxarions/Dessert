// assets/scripts/clean.js
// ============================================================
// CLEAN — removes all generated output files
// ============================================================

const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

logger.header('🗑️  Cleaning generated files');

// ---------- Folders to remove entirely ----------
const FOLDERS = [
  paths.FONTS_SUBSET,
  paths.IMAGES_OPTIMIZED,
  paths.IMAGES_THUMBS,
  paths.ICONS_SPRITE,
  paths.FAVICON,
  paths.LOGOS_PNG
];

// ---------- File patterns to remove from folder ----------
const PATTERNS = [
  { folder: paths.FONTS_WEB,       pattern: /\.(woff|woff2|css)$/ },
  { folder: paths.ICONS_PNG,       pattern: /\.png$/ },
  { folder: paths.MEDIA_VIDEO,     pattern: /\.(mp4|webm|ogv|jpg|webp)$/ },
  { folder: paths.MEDIA_AUDIO,     pattern: /\.(mp3|ogg|wav)$/ }
];

let cleaned = 0;

// Remove folders
FOLDERS.forEach(folder => {
  if (require('fs').existsSync(folder)) {
    fsHelper.removeDir(folder);
    logger.success(`Removed folder: ${path.relative(paths.ROOT, folder)}`);
    cleaned++;
  }
});

// Remove files matching patterns
PATTERNS.forEach(({ folder, pattern }) => {
  if (require('fs').existsSync(folder)) {
    fsHelper.removeFiles(folder, pattern);
    logger.success(`Cleaned files in: ${path.relative(paths.ROOT, folder)}`);
    cleaned++;
  }
});

logger.blank();
logger.success(`Clean complete: ${cleaned} locations processed`);

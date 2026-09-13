// assets/scripts/utils/paths.js
// ============================================================
// PATHS — central path resolver for all build scripts
// ============================================================

const path = require('path');

// Root of assets/ folder (goes up 2 levels from scripts/utils/)
const ROOT = path.resolve(__dirname, '..', '..');

const paths = {
  ROOT,

  // Fonts
  FONTS_RAW:         path.join(ROOT, 'fonts/raw'),
  FONTS_SUBSET:      path.join(ROOT, 'fonts/subset'),
  FONTS_WEB:         path.join(ROOT, 'fonts/web'),

  // Images
  IMAGES_RAW:        path.join(ROOT, 'images/raw'),
  IMAGES_OPTIMIZED:  path.join(ROOT, 'images/optimized'),
  IMAGES_THUMBS:     path.join(ROOT, 'images/thumbnails'),
  IMAGES_BG:         path.join(ROOT, 'images/backgrounds'),

  // Icons
  ICONS_SVG:         path.join(ROOT, 'icons/svg'),
  ICONS_PNG:         path.join(ROOT, 'icons/png'),
  ICONS_ICO:         path.join(ROOT, 'icons/ico'),
  ICONS_SPRITE:      path.join(ROOT, 'icons/sprite'),
  ICONS_FONT:        path.join(ROOT, 'icons/font-icons'),

  // Favicon
  FAVICON:           path.join(ROOT, 'favicon'),

  // Logos
  LOGOS_SVG:         path.join(ROOT, 'logos/svg'),
  LOGOS_PNG:         path.join(ROOT, 'logos/png'),
  LOGOS_SOURCE:      path.join(ROOT, 'logos/source'),

  // Media
  MEDIA_VIDEO:       path.join(ROOT, 'media/video'),
  MEDIA_VIDEO_RAW:   path.join(ROOT, 'media/video/raw'),
  MEDIA_AUDIO:       path.join(ROOT, 'media/audio'),
  MEDIA_AUDIO_RAW:   path.join(ROOT, 'media/audio/raw'),

  // Docs
  DOCS:              path.join(ROOT, 'docs')
};

module.exports = paths;

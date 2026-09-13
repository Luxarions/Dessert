// assets/scripts/build-css.js
// ============================================================
// CSS BUILD — auto-generate fonts.css from woff2 files
// ============================================================

const fs = require('fs');
const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

// ---------- Config ----------
const FONT_FAMILY = 'Dessert';

// Map filename → CSS properties
const FONT_MAP = {
  'Regular':    { weight: 400, style: 'normal' },
  'Bold':       { weight: 700, style: 'normal' },
  'Italic':     { weight: 400, style: 'italic' },
  'BoldItalic': { weight: 700, style: 'italic' }
};

// ---------- Main ----------
function buildCSS() {
  logger.header('📄 Building CSS');

  fsHelper.ensureDir(paths.FONTS_WEB);

  // Find all woff2 files
  const woff2Files = fsHelper.getFiles(paths.FONTS_WEB, ['.woff2']);

  if (woff2Files.length === 0) {
    logger.warn('No .woff2 files found in fonts/web/');
    return;
  }

  logger.info(`Found ${woff2Files.length} woff2 files`);

  let css = `/* ============================================================
 * Dessert Fonts — Auto-generated
 * DO NOT EDIT MANUALLY — run "npm run build:css" to regenerate
 * ============================================================
 */

`;

  // Build @font-face for each font
  Object.entries(FONT_MAP).forEach(([variant, props]) => {
    const woff2 = `Dessert-${variant}.woff2`;
    const woff = `Dessert-${variant}.woff`;

    const hasWoff2 = fs.existsSync(path.join(paths.FONTS_WEB, woff2));
    const hasWoff = fs.existsSync(path.join(paths.FONTS_WEB, woff));

    if (!hasWoff2 && !hasWoff) {
      logger.warn(`Skipped: Dessert-${variant} (no files found)`);
      return;
    }

    css += `/* ${variant} — ${props.weight} ${props.style} */\n`;
    css += `@font-face {\n`;
    css += `  font-family: '${FONT_FAMILY}';\n`;

    // src with fallbacks
    const sources = [];
    if (hasWoff2) sources.push(`url('${woff2}') format('woff2')`);
    if (hasWoff) sources.push(`url('${woff}') format('woff')`);

    if (sources.length === 1) {
      css += `  src: ${sources[0]};\n`;
    } else {
      css += `  src: ${sources[0]},\n`;
      css += `       ${sources[1]};\n`;
    }

    css += `  font-weight: ${props.weight};\n`;
    css += `  font-style: ${props.style};\n`;
    css += `  font-display: swap;\n`;
    css += `}\n\n`;

    logger.success(`   Dessert-${variant}`);
  });

  // Add usage comments
  css += `/* ============================================================
 * USAGE EXAMPLES
 * ============================================================
 *
 * body {
 *   font-family: 'Dessert', sans-serif;
 *   font-weight: 400;
 * }
 *
 * h1, h2, h3 {
 *   font-family: 'Dessert', sans-serif;
 *   font-weight: 700;
 * }
 *
 * em, i {
 *   font-family: 'Dessert', sans-serif;
 *   font-style: italic;
 * }
 *
 * strong, b {
 *   font-family: 'Dessert', sans-serif;
 *   font-weight: 700;
 * }
 *
 * ============================================================ */
`;

  // Write file
  const outPath = path.join(paths.FONTS_WEB, 'fonts.css');
  fs.writeFileSync(outPath, css, 'utf8');

  logger.blank();
  logger.success(`fonts.css generated at ${outPath}`);
}

// Run
try {
  buildCSS();
} catch (err) {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
}

import { FileTreeItem } from '../types';

export const FILE_TREE_DATA: FileTreeItem = {
  id: 'assets-root',
  name: 'assets',
  path: 'assets',
  type: 'folder',
  children: [
    {
      id: 'pkg-json',
      name: 'package.json',
      path: 'assets/package.json',
      type: 'file',
      category: 'config',
      extension: 'json',
      size: '1.2 KB',
      description: 'NPM dependencies, execution scripts, and engines declaration for Dessert Assets pipeline.',
      previewType: 'json',
      content: `{
  "name": "dessert-assets",
  "version": "1.0.0",
  "description": "Complete build pipeline for all Dessert assets — fonts, images, icons, favicon, logos, media, docs",
  "main": "scripts/build-all.js",
  "type": "commonjs",
  "scripts": {
    "build":         "node scripts/build-all.js",
    "build:fonts":   "node scripts/build-fonts.js",
    "build:images":  "node scripts/build-images.js",
    "build:icons":   "node scripts/build-icons.js",
    "build:favicon": "node scripts/build-favicon.js",
    "build:logos":   "node scripts/build-logos.js",
    "build:video":   "node scripts/build-video.js",
    "build:audio":   "node scripts/build-audio.js",
    "build:css":     "node scripts/build-css.js",
    "clean":         "node scripts/clean.js",
    "rebuild":       "npm run clean && npm run build",
    "watch":         "node scripts/watch.js"
  },
  "dependencies": {
    "fontmin":              "^1.0.0",
    "sharp":                "^0.33.0",
    "svgo":                 "^3.0.0",
    "fluent-ffmpeg":        "^2.1.2",
    "ffmpeg-static":        "^5.2.0",
    "pwa-asset-generator":  "^6.3.1",
    "chokidar":             "^3.6.0",
    "chalk":                "^4.1.2",
    "ora":                  "^5.4.1",
    "fs-extra":             "^11.2.0",
    "glob":                 "^10.3.0"
  },
  "devDependencies": {},
  "keywords": [
    "dessert",
    "assets",
    "fonts",
    "images",
    "icons",
    "favicon",
    "logos",
    "media",
    "build",
    "pipeline"
  ],
  "author": "Dessert Project",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  }
}`
    },
    {
      id: 'readme-root',
      name: 'README.md',
      path: 'assets/README.md',
      type: 'file',
      category: 'doc',
      extension: 'md',
      size: '8.4 KB',
      description: 'Comprehensive documentation and engineering reference for the Dessert Assets pipeline.',
      previewType: 'code',
      content: `# 🍰 Dessert Assets — Complete Build Pipeline

Production-grade, automated build pipeline for all visual, typographic, and multimedia assets of the Dessert design system.

## 🛠️ Quick Start
\`\`\`bash
cd assets
npm install
npm run build
\`\`\`

## 📁 Architecture Order
1. Fonts (TTF -> WOFF2/WOFF + Subsetting)
2. Images (JPG/PNG -> WebP, AVIF, Fallback JPG, Thumbnails)
3. Icons (SVG -> SVGO Minify, <symbol> Sprite, Multi-resolution PNGs)
4. Favicon (Master PNG -> PWA, Apple, Android, manifest, browserconfig)
5. Logos (SVG -> 256, 512, 1024 PNGs + Transparent master)
6. Video (MOV -> MP4, WebM + 1280x720 Poster frame)
7. Audio (WAV -> 192k MP3 + Vorbis OGG)
8. CSS (@font-face fonts.css generator with font-display: swap)`
    },
    {
      id: 'gitignore',
      name: '.gitignore',
      path: 'assets/.gitignore',
      type: 'file',
      category: 'config',
      extension: 'gitignore',
      size: '420 B',
      description: 'Git ignore rules preventing build artifacts and node_modules from polluting version control.',
      previewType: 'code',
      content: `# ============================================================
# DESSERT ASSETS — GITIGNORE
# ============================================================

# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Build logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db
desktop.ini

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary build files
.tmp/
.cache/
temp/`
    },
    {
      id: 'npmrc',
      name: '.npmrc',
      path: 'assets/.npmrc',
      type: 'file',
      category: 'config',
      extension: 'ini',
      size: '180 B',
      description: 'Deterministic NPM settings (save-exact, engine-strict).',
      previewType: 'code',
      content: `# ============================================================
# DESSERT ASSETS — NPM CONFIG
# ============================================================

save-exact=true
engine-strict=true
fund=false
audit=false`
    },
    {
      id: 'scripts-dir',
      name: 'scripts',
      path: 'assets/scripts',
      type: 'folder',
      category: 'script',
      children: [
        {
          id: 'script-build-all',
          name: 'build-all.js',
          path: 'assets/scripts/build-all.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '2.4 KB',
          description: 'Master orchestrator executing all pipeline steps in strict dependency order.',
          previewType: 'code',
          content: `// assets/scripts/build-all.js
// ============================================================
// ORCHESTRATOR — runs every build script in the correct order
// ============================================================

const { execSync } = require('child_process');
const path = require('path');
const logger = require('./utils/logger');

const steps = [
  { name: 'Fonts',    script: 'build-fonts.js',   required: true  },
  { name: 'Images',   script: 'build-images.js',  required: true  },
  { name: 'Icons',    script: 'build-icons.js',   required: true  },
  { name: 'Favicon',  script: 'build-favicon.js', required: false },
  { name: 'Logos',    script: 'build-logos.js',   required: false },
  { name: 'Video',    script: 'build-video.js',   required: false },
  { name: 'Audio',    script: 'build-audio.js',   required: false },
  { name: 'CSS',      script: 'build-css.js',     required: true  }
];

logger.banner('🍰 DESSERT ASSETS BUILD');

const startTime = Date.now();
let successCount = 0;
let failCount = 0;
let skipCount = 0;

steps.forEach((step, index) => {
  logger.progress(index + 1, steps.length, \`Building \${step.name}...\`);
  const scriptPath = path.join(__dirname, step.script);
  const stepStart = Date.now();

  try {
    execSync(\`node "\${scriptPath}"\`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    });

    const duration = ((Date.now() - stepStart) / 1000).toFixed(2);
    logger.success(\`\${step.name} done in \${duration}s\`);
    logger.blank();
    successCount++;
  } catch (err) {
    if (step.required) {
      logger.error(\`\${step.name} FAILED (required) — stopping build\`);
      logger.error(err.message);
      process.exit(1);
    } else {
      logger.warn(\`\${step.name} failed (optional) — skipping\`);
      logger.warn(err.message);
      logger.blank();
      skipCount++;
    }
  }
});

const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
logger.banner('📊 BUILD SUMMARY');
console.log(\`   Total time:  \${totalDuration}s\`);
console.log(\`   Successful:  \${successCount}/\${steps.length}\`);
console.log(\`   Skipped:     \${skipCount}/\${steps.length}\`);
console.log(\`   Failed:      \${failCount}/\${steps.length}\`);
logger.blank();`
        },
        {
          id: 'script-build-fonts',
          name: 'build-fonts.js',
          path: 'assets/scripts/build-fonts.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '2.1 KB',
          description: 'Subsetting glyphs and generating WOFF & WOFF2 web fonts.',
          previewType: 'code',
          content: `// assets/scripts/build-fonts.js
// ============================================================
// FONT BUILD — raw .ttf → subset → woff + woff2
// ============================================================

const fontmin = require('fontmin');
const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

const WEIGHTS = ['Regular', 'Bold', 'Italic', 'BoldItalic'];

const SUBSET_TEXT =
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  '0123456789' +
  ' .,!?@#$%&*()[]{}-_+=/\\\\|:;\'"<>\`~^' +
  'éèêëàâäôöûüçñ' +
  '€£¥$¢₹' +
  '©®™°±×÷←→↑↓•…';

logger.header('🔤 Building Fonts');

fsHelper.ensureDir(paths.FONTS_WEB);
fsHelper.ensureDir(paths.FONTS_SUBSET);

if (!fsHelper.hasFiles(paths.FONTS_RAW, ['.ttf', '.otf'])) {
  logger.warn('No raw font files found in fonts/raw/');
  logger.info('Please add Dessert-Regular.ttf, Dessert-Bold.ttf, etc.');
  process.exit(0);
}

let processed = 0;
let failed = 0;

WEIGHTS.forEach(weight => {
  const rawFile = path.join(paths.FONTS_RAW, \`Dessert-\${weight}.ttf\`);
  if (!require('fs').existsSync(rawFile)) {
    logger.warn(\`Skipped: Dessert-\${weight}.ttf not found\`);
    return;
  }

  logger.item(\`Processing Dessert-\${weight}...\`);

  fontmin()
    .src(rawFile)
    .use(fontmin.glyph({ text: SUBSET_TEXT, hinting: false }))
    .use(fontmin.ttf2woff())
    .use(fontmin.ttf2woff2())
    .dest(paths.FONTS_WEB)
    .run((err, files) => {
      if (err) {
        logger.error(\`Failed: Dessert-\${weight} — \${err.message}\`);
        failed++;
        return;
      }
      files.forEach(file => {
        const name = path.basename(file.path);
        const size = fsHelper.fileSize(file.path);
        logger.success(\`   \${name} (\${size})\`);
      });
      processed++;
    });
});`
        },
        {
          id: 'script-build-images',
          name: 'build-images.js',
          path: 'assets/scripts/build-images.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '2.5 KB',
          description: 'Image compressor generating WebP, AVIF, fallback progressive JPEG, and 300px thumbs.',
          previewType: 'code',
          content: `// assets/scripts/build-images.js
// ============================================================
// IMAGE BUILD — raw → optimized webp + avif + thumbnails
// ============================================================

const sharp = require('sharp');
const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

const WEBP_QUALITY = 80;
const AVIF_QUALITY = 65;
const JPEG_QUALITY = 82;
const THUMB_SIZE = 300;
const THUMB_QUALITY = 75;

async function buildImages() {
  logger.header('🖼️  Building Images');
  fsHelper.ensureDir(paths.IMAGES_OPTIMIZED);
  fsHelper.ensureDir(paths.IMAGES_THUMBS);

  const files = fsHelper.getFiles(paths.IMAGES_RAW, ['.jpg', '.jpeg', '.png']);
  if (files.length === 0) {
    logger.warn('No raw images found in images/raw/');
    return;
  }

  logger.info(\`Found \${files.length} images to process\`);
  let processed = 0;
  let failed = 0;

  for (const file of files) {
    const input = path.join(paths.IMAGES_RAW, file);
    const base = fsHelper.baseName(file);

    try {
      logger.item(\`Processing \${file}...\`);
      await sharp(input).webp({ quality: WEBP_QUALITY }).toFile(path.join(paths.IMAGES_OPTIMIZED, \`\${base}.webp\`));
      await sharp(input).avif({ quality: AVIF_QUALITY }).toFile(path.join(paths.IMAGES_OPTIMIZED, \`\${base}.avif\`));
      await sharp(input).jpeg({ quality: JPEG_QUALITY, progressive: true }).toFile(path.join(paths.IMAGES_OPTIMIZED, \`\${base}.jpg\`));
      await sharp(input).resize(THUMB_SIZE, THUMB_SIZE, { fit: 'cover', position: 'center' }).webp({ quality: THUMB_QUALITY }).toFile(path.join(paths.IMAGES_THUMBS, \`\${base}-thumb.webp\`));

      logger.success(\`   \${base} (webp, avif, jpg fallback, thumb)\`);
      processed++;
    } catch (err) {
      logger.error(\`Failed: \${file} — \${err.message}\`);
      failed++;
    }
  }
}
buildImages();`
        },
        {
          id: 'script-build-icons',
          name: 'build-icons.js',
          path: 'assets/scripts/build-icons.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '2.8 KB',
          description: 'Minifies SVGs with SVGO, compiles a single SVG symbol sprite, and creates 16-128px PNGs.',
          previewType: 'code',
          content: `// assets/scripts/build-icons.js
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

const SVG_VIEWBOX = '0 0 24 24';
const PNG_SIZES = [16, 32, 64, 128];

async function buildIcons() {
  logger.header('🎨 Building Icons');
  fsHelper.ensureDir(paths.ICONS_SPRITE);
  fsHelper.ensureDir(paths.ICONS_PNG);

  const svgFiles = fsHelper.getFiles(paths.ICONS_SVG, ['.svg']);
  if (svgFiles.length === 0) {
    logger.warn('No SVG icons found in icons/svg/');
    return;
  }

  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\\n';
  for (const file of svgFiles) {
    const filePath = path.join(paths.ICONS_SVG, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const result = optimize(raw, { path: filePath, multipass: true, plugins: ['preset-default', 'removeDimensions', 'removeAttrs'] });
    fs.writeFileSync(filePath, result.data, 'utf8');

    const id = file.replace(/^Dessert-/, '').replace(/\\.svg$/, '');
    const inner = result.data.replace(/<svg[^>]*>/, '').replace(/<\\/svg>\\s*$/, '');
    spriteContent += \`  <symbol id="\${id}" viewBox="\${SVG_VIEWBOX}">\${inner}</symbol>\\n\`;
  }
  spriteContent += '</svg>\\n';
  fs.writeFileSync(path.join(paths.ICONS_SPRITE, 'Dessert-icons.svg'), spriteContent, 'utf8');
  logger.success(\`Sprite generated: Dessert-icons.svg (\${svgFiles.length} icons)\`);
}
buildIcons();`
        },
        {
          id: 'script-build-favicon',
          name: 'build-favicon.js',
          path: 'assets/scripts/build-favicon.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '3.1 KB',
          description: 'Creates Apple touch icons, Android Chrome icons, site.webmanifest, and browserconfig.xml.',
          previewType: 'code',
          content: `// assets/scripts/build-favicon.js
// ============================================================
// FAVICON BUILD — source PNG → all sizes + manifest
// ============================================================

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

const SIZES = [
  { size: 16,  name: 'Dessert-favicon-16x16.png' },
  { size: 32,  name: 'Dessert-favicon-32x32.png' },
  { size: 48,  name: 'Dessert-favicon-48x48.png' },
  { size: 96,  name: 'Dessert-favicon-96x96.png' },
  { size: 144, name: 'Dessert-favicon-144x144.png' },
  { size: 152, name: 'Dessert-apple-touch-icon-152x152.png' },
  { size: 180, name: 'Dessert-apple-touch-icon.png' },
  { size: 180, name: 'Dessert-apple-touch-icon-180x180.png' },
  { size: 192, name: 'Dessert-android-chrome-192.png' },
  { size: 512, name: 'Dessert-android-chrome-512.png' },
  { size: 150, name: 'Dessert-mstile-150x150.png' }
];

async function buildFavicon() {
  logger.header('🎯 Building Favicon');
  fsHelper.ensureDir(paths.FAVICON);
  // Iterates and writes site.webmanifest + browserconfig.xml
}`
        },
        {
          id: 'script-build-logos',
          name: 'build-logos.js',
          path: 'assets/scripts/build-logos.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '2.2 KB',
          description: 'Exports vector logos to multi-size PNGs (256, 512, 1024px) plus transparent PNG master.',
          previewType: 'code',
          content: `// assets/scripts/build-logos.js
// Exports Dessert-logo-full.svg and Dessert-logo-icon.svg into rasterized PNG sizes`
        },
        {
          id: 'script-build-video',
          name: 'build-video.js',
          path: 'assets/scripts/build-video.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '2.6 KB',
          description: 'Converts master video files to fast-start MP4, VP9 WebM, and extracts poster image.',
          previewType: 'code',
          content: `// assets/scripts/build-video.js
// Uses fluent-ffmpeg and ffmpeg-static to generate web-ready MP4/WebM + poster`
        },
        {
          id: 'script-build-audio',
          name: 'build-audio.js',
          path: 'assets/scripts/build-audio.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '2.1 KB',
          description: 'Converts master WAV audio cues to 192k MP3 and Vorbis OGG.',
          previewType: 'code',
          content: `// assets/scripts/build-audio.js
// Encodes sound effect cues into MP3 & OGG using ffmpeg`
        },
        {
          id: 'script-build-css',
          name: 'build-css.js',
          path: 'assets/scripts/build-css.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '2.4 KB',
          description: 'Generates fonts.css @font-face rules dynamically from woff2/woff output files.',
          previewType: 'code',
          content: `// assets/scripts/build-css.js
// Auto-generates fonts.css from woff2/woff files`
        },
        {
          id: 'script-clean',
          name: 'clean.js',
          path: 'assets/scripts/clean.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '1.4 KB',
          description: 'Purges generated files across fonts/web, images/optimized, favicon, logos/png.',
          previewType: 'code',
          content: `// assets/scripts/clean.js
// Removes compiled artifacts safely`
        },
        {
          id: 'script-watch',
          name: 'watch.js',
          path: 'assets/scripts/watch.js',
          type: 'file',
          category: 'script',
          extension: 'js',
          size: '1.9 KB',
          description: 'Chokidar watcher with debouncing to re-compile on source file additions or modifications.',
          previewType: 'code',
          content: `// assets/scripts/watch.js
// File system watcher with 500ms debounce`
        },
        {
          id: 'utils-dir',
          name: 'utils',
          path: 'assets/scripts/utils',
          type: 'folder',
          category: 'script',
          children: [
            {
              id: 'script-logger',
              name: 'logger.js',
              path: 'assets/scripts/utils/logger.js',
              type: 'file',
              category: 'script',
              extension: 'js',
              size: '1.8 KB',
              description: 'Pastel colored, timestamped ANSI terminal logger.',
              previewType: 'code',
              content: `// assets/scripts/utils/logger.js
// Styled with chalk for clear console reporting`
            },
            {
              id: 'script-paths',
              name: 'paths.js',
              path: 'assets/scripts/utils/paths.js',
              type: 'file',
              category: 'script',
              extension: 'js',
              size: '1.2 KB',
              description: 'Central path resolver for all asset directories.',
              previewType: 'code',
              content: `// assets/scripts/utils/paths.js
// Unified path mappings for fonts, images, icons, favicon, logos, media, docs`
            },
            {
              id: 'script-fs-helper',
              name: 'fs-helper.js',
              path: 'assets/scripts/utils/fs-helper.js',
              type: 'file',
              category: 'script',
              extension: 'js',
              size: '2.0 KB',
              description: 'Filesystem utilities for directory checking, filtering by extension, reading and sizing.',
              previewType: 'code',
              content: `// assets/scripts/utils/fs-helper.js
// Helper methods wrapping fs-extra`
            }
          ]
        }
      ]
    },
    {
      id: 'fonts-dir',
      name: 'fonts',
      path: 'assets/fonts',
      type: 'folder',
      category: 'font',
      children: [
        { id: 'fonts-readme', name: 'README.md', path: 'assets/fonts/README.md', type: 'file', extension: 'md', size: '600 B', previewType: 'code', content: '# Dessert Fonts\n\nRaw, subsetted, and web fonts for the Dessert brand typography.' },
        {
          id: 'fonts-raw-dir',
          name: 'raw',
          path: 'assets/fonts/raw',
          type: 'folder',
          children: [
            { id: 'f-raw-reg', name: 'Dessert-Regular.ttf', path: 'assets/fonts/raw/Dessert-Regular.ttf', type: 'file', size: '142 KB', previewType: 'font' },
            { id: 'f-raw-bold', name: 'Dessert-Bold.ttf', path: 'assets/fonts/raw/Dessert-Bold.ttf', type: 'file', size: '148 KB', previewType: 'font' },
            { id: 'f-raw-ital', name: 'Dessert-Italic.ttf', path: 'assets/fonts/raw/Dessert-Italic.ttf', type: 'file', size: '144 KB', previewType: 'font' },
            { id: 'f-raw-boldital', name: 'Dessert-BoldItalic.ttf', path: 'assets/fonts/raw/Dessert-BoldItalic.ttf', type: 'file', size: '150 KB', previewType: 'font' }
          ]
        },
        {
          id: 'fonts-subset-dir',
          name: 'subset',
          path: 'assets/fonts/subset',
          type: 'folder',
          children: [
            { id: 'f-sub-latin', name: 'Dessert-latin-basic.woff2', path: 'assets/fonts/subset/Dessert-latin-basic.woff2', type: 'file', size: '18 KB', previewType: 'font' },
            { id: 'f-sub-ext', name: 'Dessert-latin-extended.woff2', path: 'assets/fonts/subset/Dessert-latin-extended.woff2', type: 'file', size: '24 KB', previewType: 'font' },
            { id: 'f-sub-cyr', name: 'Dessert-cyrillic.woff2', path: 'assets/fonts/subset/Dessert-cyrillic.woff2', type: 'file', size: '22 KB', previewType: 'font' },
            { id: 'f-sub-sym', name: 'Dessert-symbols.woff2', path: 'assets/fonts/subset/Dessert-symbols.woff2', type: 'file', size: '12 KB', previewType: 'font' }
          ]
        },
        {
          id: 'fonts-web-dir',
          name: 'web',
          path: 'assets/fonts/web',
          type: 'folder',
          children: [
            { id: 'f-web-reg-w2', name: 'Dessert-Regular.woff2', path: 'assets/fonts/web/Dessert-Regular.woff2', type: 'file', size: '28 KB', previewType: 'font' },
            { id: 'f-web-reg-w', name: 'Dessert-Regular.woff', path: 'assets/fonts/web/Dessert-Regular.woff', type: 'file', size: '36 KB', previewType: 'font' },
            { id: 'f-web-bold-w2', name: 'Dessert-Bold.woff2', path: 'assets/fonts/web/Dessert-Bold.woff2', type: 'file', size: '29 KB', previewType: 'font' },
            { id: 'f-web-bold-w', name: 'Dessert-Bold.woff', path: 'assets/fonts/web/Dessert-Bold.woff', type: 'file', size: '37 KB', previewType: 'font' },
            { id: 'f-web-ital-w2', name: 'Dessert-Italic.woff2', path: 'assets/fonts/web/Dessert-Italic.woff2', type: 'file', size: '28 KB', previewType: 'font' },
            { id: 'f-web-ital-w', name: 'Dessert-Italic.woff', path: 'assets/fonts/web/Dessert-Italic.woff', type: 'file', size: '36 KB', previewType: 'font' },
            { id: 'f-web-boldital-w2', name: 'Dessert-BoldItalic.woff2', path: 'assets/fonts/web/Dessert-BoldItalic.woff2', type: 'file', size: '30 KB', previewType: 'font' },
            { id: 'f-web-boldital-w', name: 'Dessert-BoldItalic.woff', path: 'assets/fonts/web/Dessert-BoldItalic.woff', type: 'file', size: '38 KB', previewType: 'font' },
            {
              id: 'f-web-css',
              name: 'fonts.css',
              path: 'assets/fonts/web/fonts.css',
              type: 'file',
              size: '1.4 KB',
              previewType: 'code',
              content: `/* ============================================================
 * Dessert Fonts — Auto-generated
 * DO NOT EDIT MANUALLY — run "npm run build:css" to regenerate
 * ============================================================ */

@font-face {
  font-family: 'Dessert';
  src: url('Dessert-Regular.woff2') format('woff2'),
       url('Dessert-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Dessert';
  src: url('Dessert-Bold.woff2') format('woff2'),
       url('Dessert-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Dessert';
  src: url('Dessert-Italic.woff2') format('woff2'),
       url('Dessert-Italic.woff') format('woff');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Dessert';
  src: url('Dessert-BoldItalic.woff2') format('woff2'),
       url('Dessert-BoldItalic.woff') format('woff');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}`
            }
          ]
        }
      ]
    },
    {
      id: 'images-dir',
      name: 'images',
      path: 'assets/images',
      type: 'folder',
      category: 'image',
      children: [
        {
          id: 'img-opt-dir',
          name: 'optimized',
          path: 'assets/images/optimized',
          type: 'folder',
          children: [
            { id: 'img-hero-webp', name: 'Dessert-hero.webp', path: 'assets/images/optimized/Dessert-hero.webp', type: 'file', size: '104 KB', previewType: 'image' },
            { id: 'img-hero-avif', name: 'Dessert-hero.avif', path: 'assets/images/optimized/Dessert-hero.avif', type: 'file', size: '72 KB', previewType: 'image' },
            { id: 'img-hero-jpg', name: 'Dessert-hero.jpg', path: 'assets/images/optimized/Dessert-hero.jpg', type: 'file', size: '186 KB', previewType: 'image' },
            { id: 'img-prod-webp', name: 'Dessert-product.webp', path: 'assets/images/optimized/Dessert-product.webp', type: 'file', size: '82 KB', previewType: 'image' },
            { id: 'img-prod-avif', name: 'Dessert-product.avif', path: 'assets/images/optimized/Dessert-product.avif', type: 'file', size: '56 KB', previewType: 'image' },
            { id: 'img-prod-jpg', name: 'Dessert-product.jpg', path: 'assets/images/optimized/Dessert-product.jpg', type: 'file', size: '142 KB', previewType: 'image' }
          ]
        },
        {
          id: 'img-thumb-dir',
          name: 'thumbnails',
          path: 'assets/images/thumbnails',
          type: 'folder',
          children: [
            { id: 'img-th-hero', name: 'Dessert-hero-thumb.webp', path: 'assets/images/thumbnails/Dessert-hero-thumb.webp', type: 'file', size: '14 KB', previewType: 'image' },
            { id: 'img-th-prod', name: 'Dessert-product-thumb.webp', path: 'assets/images/thumbnails/Dessert-product-thumb.webp', type: 'file', size: '12 KB', previewType: 'image' }
          ]
        },
        {
          id: 'img-bg-dir',
          name: 'backgrounds',
          path: 'assets/images/backgrounds',
          type: 'folder',
          children: [
            { id: 'bg-pattern', name: 'Dessert-pattern.svg', path: 'assets/images/backgrounds/Dessert-pattern.svg', type: 'file', size: '3.2 KB', previewType: 'svg' },
            { id: 'bg-dots', name: 'Dessert-dots.svg', path: 'assets/images/backgrounds/Dessert-dots.svg', type: 'file', size: '2.1 KB', previewType: 'svg' },
            { id: 'bg-gradient', name: 'Dessert-gradient.svg', path: 'assets/images/backgrounds/Dessert-gradient.svg', type: 'file', size: '1.4 KB', previewType: 'svg' }
          ]
        }
      ]
    },
    {
      id: 'icons-dir',
      name: 'icons',
      path: 'assets/icons',
      type: 'folder',
      category: 'icon',
      children: [
        {
          id: 'icons-svg-dir',
          name: 'svg',
          path: 'assets/icons/svg',
          type: 'folder',
          children: [
            { id: 'ic-home', name: 'Dessert-home.svg', path: 'assets/icons/svg/Dessert-home.svg', type: 'file', size: '640 B', previewType: 'svg' },
            { id: 'ic-user', name: 'Dessert-user.svg', path: 'assets/icons/svg/Dessert-user.svg', type: 'file', size: '580 B', previewType: 'svg' },
            { id: 'ic-search', name: 'Dessert-search.svg', path: 'assets/icons/svg/Dessert-search.svg', type: 'file', size: '520 B', previewType: 'svg' },
            { id: 'ic-cart', name: 'Dessert-cart.svg', path: 'assets/icons/svg/Dessert-cart.svg', type: 'file', size: '690 B', previewType: 'svg' },
            { id: 'ic-menu', name: 'Dessert-menu.svg', path: 'assets/icons/svg/Dessert-menu.svg', type: 'file', size: '410 B', previewType: 'svg' },
            { id: 'ic-close', name: 'Dessert-close.svg', path: 'assets/icons/svg/Dessert-close.svg', type: 'file', size: '390 B', previewType: 'svg' },
            { id: 'ic-arrow-l', name: 'Dessert-arrow-left.svg', path: 'assets/icons/svg/Dessert-arrow-left.svg', type: 'file', size: '440 B', previewType: 'svg' },
            { id: 'ic-arrow-r', name: 'Dessert-arrow-right.svg', path: 'assets/icons/svg/Dessert-arrow-right.svg', type: 'file', size: '440 B', previewType: 'svg' },
            { id: 'ic-heart', name: 'Dessert-heart.svg', path: 'assets/icons/svg/Dessert-heart.svg', type: 'file', size: '620 B', previewType: 'svg' },
            { id: 'ic-star', name: 'Dessert-star.svg', path: 'assets/icons/svg/Dessert-star.svg', type: 'file', size: '590 B', previewType: 'svg' },
            { id: 'ic-check', name: 'Dessert-check.svg', path: 'assets/icons/svg/Dessert-check.svg', type: 'file', size: '410 B', previewType: 'svg' },
            { id: 'ic-info', name: 'Dessert-info.svg', path: 'assets/icons/svg/Dessert-info.svg', type: 'file', size: '510 B', previewType: 'svg' },
            { id: 'ic-warn', name: 'Dessert-warning.svg', path: 'assets/icons/svg/Dessert-warning.svg', type: 'file', size: '560 B', previewType: 'svg' },
            { id: 'ic-err', name: 'Dessert-error.svg', path: 'assets/icons/svg/Dessert-error.svg', type: 'file', size: '530 B', previewType: 'svg' },
            { id: 'ic-sett', name: 'Dessert-settings.svg', path: 'assets/icons/svg/Dessert-settings.svg', type: 'file', size: '840 B', previewType: 'svg' },
            { id: 'ic-mail', name: 'Dessert-mail.svg', path: 'assets/icons/svg/Dessert-mail.svg', type: 'file', size: '590 B', previewType: 'svg' },
            { id: 'ic-phone', name: 'Dessert-phone.svg', path: 'assets/icons/svg/Dessert-phone.svg', type: 'file', size: '680 B', previewType: 'svg' }
          ]
        },
        {
          id: 'icons-sprite-dir',
          name: 'sprite',
          path: 'assets/icons/sprite',
          type: 'folder',
          children: [
            { id: 'ic-sprite-svg', name: 'Dessert-icons.svg', path: 'assets/icons/sprite/Dessert-icons.svg', type: 'file', size: '9.4 KB', previewType: 'svg' },
            { id: 'ic-sprite-json', name: 'Dessert-icons.json', path: 'assets/icons/sprite/Dessert-icons.json', type: 'file', size: '1.8 KB', previewType: 'json' }
          ]
        }
      ]
    },
    {
      id: 'favicon-dir',
      name: 'favicon',
      path: 'assets/favicon',
      type: 'folder',
      category: 'favicon',
      children: [
        { id: 'fav-16', name: 'Dessert-favicon-16x16.png', path: 'assets/favicon/Dessert-favicon-16x16.png', type: 'file', size: '820 B', previewType: 'image' },
        { id: 'fav-32', name: 'Dessert-favicon-32x32.png', path: 'assets/favicon/Dessert-favicon-32x32.png', type: 'file', size: '1.4 KB', previewType: 'image' },
        { id: 'fav-192', name: 'Dessert-android-chrome-192.png', path: 'assets/favicon/Dessert-android-chrome-192.png', type: 'file', size: '14.2 KB', previewType: 'image' },
        { id: 'fav-512', name: 'Dessert-android-chrome-512.png', path: 'assets/favicon/Dessert-android-chrome-512.png', type: 'file', size: '38.6 KB', previewType: 'image' },
        { id: 'fav-manifest', name: 'site.webmanifest', path: 'assets/favicon/site.webmanifest', type: 'file', size: '480 B', previewType: 'json', content: `{\n  "name": "Dessert App",\n  "short_name": "Dessert",\n  "theme_color": "#FFB6C1",\n  "background_color": "#FFFFFF",\n  "display": "standalone"\n}` },
        { id: 'fav-browserconfig', name: 'browserconfig.xml', path: 'assets/favicon/browserconfig.xml', type: 'file', size: '260 B', previewType: 'code', content: `<?xml version="1.0" encoding="utf-8"?>\n<browserconfig>\n  <msapplication>\n    <tile>\n      <square150x150logo src="Dessert-mstile-150x150.png"/>\n      <TileColor>#FFB6C1</TileColor>\n    </tile>\n  </msapplication>\n</browserconfig>` }
      ]
    },
    {
      id: 'logos-dir',
      name: 'logos',
      path: 'assets/logos',
      type: 'folder',
      category: 'logo',
      children: [
        {
          id: 'logos-svg-dir',
          name: 'svg',
          path: 'assets/logos/svg',
          type: 'folder',
          children: [
            { id: 'logo-full-svg', name: 'Dessert-logo-full.svg', path: 'assets/logos/svg/Dessert-logo-full.svg', type: 'file', size: '4.2 KB', previewType: 'svg' },
            { id: 'logo-icon-svg', name: 'Dessert-logo-icon.svg', path: 'assets/logos/svg/Dessert-logo-icon.svg', type: 'file', size: '2.1 KB', previewType: 'svg' },
            { id: 'logo-grad-svg', name: 'Dessert-logo-gradient.svg', path: 'assets/logos/svg/Dessert-logo-gradient.svg', type: 'file', size: '2.6 KB', previewType: 'svg' }
          ]
        },
        {
          id: 'logos-png-dir',
          name: 'png',
          path: 'assets/logos/png',
          type: 'folder',
          children: [
            { id: 'logo-f-256', name: 'Dessert-logo-full-256.png', path: 'assets/logos/png/Dessert-logo-full-256.png', type: 'file', size: '18 KB', previewType: 'image' },
            { id: 'logo-f-512', name: 'Dessert-logo-full-512.png', path: 'assets/logos/png/Dessert-logo-full-512.png', type: 'file', size: '42 KB', previewType: 'image' },
            { id: 'logo-i-512', name: 'Dessert-logo-icon-512.png', path: 'assets/logos/png/Dessert-logo-icon-512.png', type: 'file', size: '31 KB', previewType: 'image' },
            { id: 'logo-trans', name: 'Dessert-logo-transparent.png', path: 'assets/logos/png/Dessert-logo-transparent.png', type: 'file', size: '28 KB', previewType: 'image' }
          ]
        }
      ]
    },
    {
      id: 'media-dir',
      name: 'media',
      path: 'assets/media',
      type: 'folder',
      category: 'media',
      children: [
        {
          id: 'media-video-dir',
          name: 'video',
          path: 'assets/media/video',
          type: 'folder',
          children: [
            { id: 'vid-mp4', name: 'Dessert-intro.mp4', path: 'assets/media/video/Dessert-intro.mp4', type: 'file', size: '3.4 MB', previewType: 'video' },
            { id: 'vid-webm', name: 'Dessert-intro.webm', path: 'assets/media/video/Dessert-intro.webm', type: 'file', size: '2.8 MB', previewType: 'video' },
            { id: 'vid-poster', name: 'Dessert-intro-poster.jpg', path: 'assets/media/video/Dessert-intro-poster.jpg', type: 'file', size: '86 KB', previewType: 'image' }
          ]
        },
        {
          id: 'media-audio-dir',
          name: 'audio',
          path: 'assets/media/audio',
          type: 'folder',
          children: [
            { id: 'aud-notif-mp3', name: 'Dessert-notif.mp3', path: 'assets/media/audio/Dessert-notif.mp3', type: 'file', size: '24 KB', previewType: 'audio' },
            { id: 'aud-click-mp3', name: 'Dessert-click.mp3', path: 'assets/media/audio/Dessert-click.mp3', type: 'file', size: '12 KB', previewType: 'audio' },
            { id: 'aud-succ-mp3', name: 'Dessert-success.mp3', path: 'assets/media/audio/Dessert-success.mp3', type: 'file', size: '36 KB', previewType: 'audio' },
            { id: 'aud-err-mp3', name: 'Dessert-error.mp3', path: 'assets/media/audio/Dessert-error.mp3', type: 'file', size: '22 KB', previewType: 'audio' }
          ]
        }
      ]
    },
    {
      id: 'docs-dir',
      name: 'docs',
      path: 'assets/docs',
      type: 'folder',
      category: 'doc',
      children: [
        { id: 'doc-license', name: 'Dessert-license.txt', path: 'assets/docs/Dessert-license.txt', type: 'file', size: '1.1 KB', previewType: 'code', content: 'MIT License\n\nCopyright (c) 2026 Dessert Project\n\nPermission is hereby granted, free of charge, to any person obtaining a copy...' },
        { id: 'doc-changelog', name: 'Dessert-changelog.md', path: 'assets/docs/Dessert-changelog.md', type: 'file', size: '1.6 KB', previewType: 'code', content: '# Dessert Assets Changelog\n\n## [1.0.0] - 2026\n- Initial release of complete Dessert Asset Build Pipeline.\n- Automated WOFF/WOFF2 font generation with Latin subsetting.\n- Sharp-backed WebP, AVIF, and progressive fallback JPEG exports.\n- SVGO sprite generator and multi-density PNG icon rendering.\n- PWA asset generator for Apple touch icons, Android Chrome, and site.webmanifest.' }
      ]
    }
  ]
};

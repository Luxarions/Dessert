// assets/scripts/build-favicon.js
// ============================================================
// FAVICON BUILD — source PNG → all sizes + manifest (Resilient)
// ============================================================

const fs = require('fs');
const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');
const fsHelper = require('./utils/fs-helper');

let sharp = null;
try {
  sharp = require('sharp');
} catch (e) {
  sharp = null;
}

const SOURCE_CANDIDATES = [
  path.join(paths.LOGOS_PNG, 'Dessert-logo-icon-512.png'),
  path.join(paths.LOGOS_PNG, 'Dessert-logo-icon-256.png'),
  path.join(paths.LOGOS_SVG, 'Dessert-logo-icon.svg')
];

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

  let processed = 0;

  if (sharp) {
    const source = SOURCE_CANDIDATES.find(f => fs.existsSync(f));
    if (source) {
      logger.info(`Source: ${path.basename(source)}`);
      for (const { size, name } of SIZES) {
        try {
          await sharp(source, { density: 300 })
            .resize(size, size)
            .png()
            .toFile(path.join(paths.FAVICON, name));
          processed++;
          logger.success(`   ${name}`);
        } catch (err) {
          logger.error(`Failed ${name}: ${err.message}`);
        }
      }
    }
  } else {
    logger.warn('sharp module not installed; verifying existing icon files in favicon/');
    SIZES.forEach(({ name }) => {
      const target = path.join(paths.FAVICON, name);
      if (fs.existsSync(target)) {
        processed++;
      }
    });
  }

  // ---------- Step 2: Generate site.webmanifest ----------
  logger.info('Generating site.webmanifest...');
  const manifest = {
    name: 'Dessert App',
    short_name: 'Dessert',
    description: 'A Dessert themed design system application',
    icons: [
      { src: 'Dessert-android-chrome-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'Dessert-android-chrome-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      { src: 'Dessert-favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: 'Dessert-apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    theme_color: '#FFB6C1',
    background_color: '#FFFFFF',
    display: 'standalone',
    orientation: 'portrait',
    start_url: '/'
  };

  fs.writeFileSync(
    path.join(paths.FAVICON, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  logger.success('   site.webmanifest');

  // ---------- Step 3: Generate browserconfig.xml ----------
  logger.info('Generating browserconfig.xml...');
  const browserconfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="Dessert-mstile-150x150.png"/>
      <TileColor>#FFB6C1</TileColor>
    </tile>
  </msapplication>
</browserconfig>
`;

  fs.writeFileSync(
    path.join(paths.FAVICON, 'browserconfig.xml'),
    browserconfig,
    'utf8'
  );
  logger.success('   browserconfig.xml');

  logger.success(`Favicon build complete: ${processed} icon files & manifests ready`);
}

buildFavicon().catch(err => {
  logger.error(`Build failed: ${err.message}`);
  process.exit(1);
});

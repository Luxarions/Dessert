// assets/scripts/watch.js
// ============================================================
// WATCH — auto-rebuild when raw files change
// ============================================================

const chokidar = require('chokidar');
const { execSync } = require('child_process');
const path = require('path');
const paths = require('./utils/paths');
const logger = require('./utils/logger');

logger.banner('👁️  WATCH MODE');

// ---------- Watch map: raw folder → build script ----------
const WATCH_MAP = [
  { folder: paths.FONTS_RAW,       script: 'build-fonts.js',   label: 'Fonts'   },
  { folder: paths.IMAGES_RAW,      script: 'build-images.js',  label: 'Images'  },
  { folder: paths.ICONS_SVG,       script: 'build-icons.js',   label: 'Icons'   },
  { folder: paths.LOGOS_SVG,       script: 'build-logos.js',   label: 'Logos'   },
  { folder: paths.MEDIA_VIDEO_RAW, script: 'build-video.js',   label: 'Video'   },
  { folder: paths.MEDIA_AUDIO_RAW, script: 'build-audio.js',   label: 'Audio'   }
];

// ---------- Debounce helper ----------
const debounceTimers = {};

function debounce(key, fn, delay = 500) {
  if (debounceTimers[key]) clearTimeout(debounceTimers[key]);
  debounceTimers[key] = setTimeout(fn, delay);
}

// ---------- Run build script ----------
function runBuild(script, label) {
  logger.info(`Change detected — rebuilding ${label}...`);

  try {
    execSync(`node "${path.join(__dirname, script)}"`, {
      stdio: 'inherit',
      cwd: paths.ROOT
    });
    logger.success(`${label} rebuilt`);
  } catch (err) {
    logger.error(`${label} build failed: ${err.message}`);
  }
}

// ---------- Set up watchers ----------
WATCH_MAP.forEach(({ folder, script, label }) => {
  if (!require('fs').existsSync(folder)) {
    logger.warn(`Watch skipped (folder missing): ${folder}`);
    return;
  }

  chokidar.watch(folder, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100
    }
  })
  .on('add',    (file) => debounce(script, () => runBuild(script, label)))
  .on('change', (file) => debounce(script, () => runBuild(script, label)))
  .on('unlink', (file) => debounce(script, () => runBuild(script, label)));

  logger.success(`Watching: ${path.relative(paths.ROOT, folder)} → ${label}`);
});

logger.blank();
logger.info('Press Ctrl+C to stop watching');

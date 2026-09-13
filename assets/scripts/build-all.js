// assets/scripts/build-all.js
// ============================================================
// ORCHESTRATOR — runs every build script in the correct order
// ============================================================

const { execSync } = require('child_process');
const path = require('path');
const logger = require('./utils/logger');

// ============================================================
// BUILD STEPS — order matters!
// Each step is a separate script in the same folder.
// `required: true` means build stops if it fails.
// ============================================================

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

// ============================================================
// MAIN
// ============================================================

logger.banner('🍰 DESSERT ASSETS BUILD');

const startTime = Date.now();
let successCount = 0;
let failCount = 0;
let skipCount = 0;

steps.forEach((step, index) => {
  logger.progress(index + 1, steps.length, `Building ${step.name}...`);

  const scriptPath = path.join(__dirname, step.script);
  const stepStart = Date.now();

  try {
    execSync(`node "${scriptPath}"`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    });

    const duration = ((Date.now() - stepStart) / 1000).toFixed(2);
    logger.success(`${step.name} done in ${duration}s`);
    logger.blank();
    successCount++;

  } catch (err) {
    if (step.required) {
      logger.error(`${step.name} FAILED (required) — stopping build`);
      logger.error(err.message);
      process.exit(1);
    } else {
      logger.warn(`${step.name} failed (optional) — skipping`);
      logger.warn(err.message);
      logger.blank();
      skipCount++;
    }
  }
});

// ============================================================
// SUMMARY
// ============================================================

const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);

logger.banner('📊 BUILD SUMMARY');

console.log(`   ${logger.constructor.name ? '' : ''}Total time:  ${totalDuration}s`);
console.log(`   Successful:  ${successCount}/${steps.length}`);
console.log(`   Skipped:     ${skipCount}/${steps.length}`);
console.log(`   Failed:      ${failCount}/${steps.length}`);
logger.blank();

if (failCount === 0 && skipCount === 0) {
  logger.success('🎉 All assets built successfully!');
} else if (failCount === 0) {
  logger.success(`🎉 Build complete (${skipCount} optional steps skipped)`);
} else {
  logger.error(`❌ Build completed with ${failCount} failures`);
  process.exit(1);
}

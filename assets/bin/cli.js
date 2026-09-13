#!/usr/bin/env node

/**
 * Dessert Assets CLI
 * 
 * Command-line runner for Dessert asset tasks:
 *   npx dessert-assets build
 *   npx dessert-assets build:fonts
 *   npx dessert-assets clean
 *   npx dessert-assets test
 */

const { spawnSync } = require('child_process');
const path = require('path');

const command = process.argv[2] || 'help';
const validScripts = [
  'build',
  'build:fonts',
  'build:images',
  'build:icons',
  'build:favicon',
  'build:logos',
  'build:video',
  'build:audio',
  'build:css',
  'clean',
  'test',
  'watch'
];

if (command === 'help' || command === '--help' || command === '-h') {
  console.log(`
🍰 Dessert Assets CLI v1.0.0

Usage:
  npx dessert-assets <command>

Available commands:
  build          Run full build pipeline (all assets)
  build:fonts    Subset and convert TTF/WOFF/WOFF2 fonts
  build:images   Compress WebP/AVIF/Thumbnails with Sharp
  build:icons    Minify SVGs and compile SVG sprite
  build:favicon  Generate complete favicon & PWA icon suite
  build:logos    Export multi-resolution raster & vector logos
  build:video    Transcode H.264/VP9 video & generate poster
  build:audio    Encode 192k MP3 & OGG sound effects
  build:css      Generate @font-face fonts.css definitions
  clean          Remove all generated output directories
  test           Validate integrity, manifests, and file budgets
  watch          Watch master source directories for live changes
`);
  process.exit(0);
}

if (!validScripts.includes(command)) {
  console.error(`❌ Unknown command: "${command}". Run "npx dessert-assets help" for list.`);
  process.exit(1);
}

const scriptName = command.startsWith('build:') ? command.replace('build:', 'build-') : (command === 'build' ? 'build-all' : command);
const targetScript = path.join(__dirname, '..', 'scripts', `${scriptName}.js`);

console.log(`🚀 [dessert-assets] Executing: node ${path.relative(process.cwd(), targetScript)}`);
const res = spawnSync(process.execPath, [targetScript], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..')
});

process.exit(res.status || 0);

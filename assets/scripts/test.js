/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Running Dessert Assets npm test suite...\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  }
}

// 1. Check Package Manifest
const pkgPath = path.join(__dirname, '..', 'package.json');
assert(fs.existsSync(pkgPath), 'package.json exists and is readable');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  assert(pkg.name === 'dessert-assets', 'package.json name matches "dessert-assets"');
  assert(pkg.version === '1.0.0', 'version is 1.0.0');
  assert(Boolean(pkg.bin), 'CLI binary entry declared in bin');
  assert(Array.isArray(pkg.files), 'Publish whitelist (files) is defined');
}

// 2. Check Web Manifest
const manifestPath = path.join(__dirname, '..', 'favicon', 'site.webmanifest');
assert(fs.existsSync(manifestPath), 'favicon/site.webmanifest exists');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert(manifest.name.includes('Dessert'), 'webmanifest contains valid brand name');
    assert(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'webmanifest has icon entries');
  } catch (err) {
    assert(false, `webmanifest JSON parse failed: ${err.message}`);
  }
}

// 3. Check Web Fonts CSS
const fontsCssPath = path.join(__dirname, '..', 'fonts', 'web', 'fonts.css');
assert(fs.existsSync(fontsCssPath), 'fonts/web/fonts.css exists');
if (fs.existsSync(fontsCssPath)) {
  const css = fs.readFileSync(fontsCssPath, 'utf8');
  assert(css.includes("@font-face"), 'fonts.css contains valid @font-face rules');
  assert(css.includes("font-family: 'Dessert'") || css.includes('font-family: "Dessert"'), 'fonts.css specifies Dessert font-family');
}

// 4. Check Icons Sprite
const spritePath = path.join(__dirname, '..', 'icons', 'sprite', 'Dessert-icons.svg');
assert(fs.existsSync(spritePath), 'icons/sprite/Dessert-icons.svg exists');
if (fs.existsSync(spritePath)) {
  const sprite = fs.readFileSync(spritePath, 'utf8');
  assert(sprite.includes('<svg') && sprite.includes('</svg>'), 'SVG sprite contains valid XML wrapping');
}

// 5. Check License
const licensePath = path.join(__dirname, '..', 'LICENSE');
assert(fs.existsSync(licensePath), 'LICENSE file present at assets root');

console.log(`\n========================================`);
console.log(`Test Results: ${passed} passed, ${failed} failed.`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All npm test assertions passed successfully!\n');
  process.exit(0);
}

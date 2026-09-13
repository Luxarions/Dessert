/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Dessert Assets Library — Main Entry Point
 */

const path = require('path');

const ROOT_DIR = __dirname;

module.exports = {
  name: 'dessert-assets',
  version: '1.0.0',
  paths: {
    root: ROOT_DIR,
    fonts: path.join(ROOT_DIR, 'fonts'),
    fontsCss: path.join(ROOT_DIR, 'fonts', 'web', 'fonts.css'),
    images: path.join(ROOT_DIR, 'images'),
    icons: path.join(ROOT_DIR, 'icons'),
    iconSprite: path.join(ROOT_DIR, 'icons', 'sprite', 'Dessert-icons.svg'),
    favicon: path.join(ROOT_DIR, 'favicon'),
    webmanifest: path.join(ROOT_DIR, 'favicon', 'site.webmanifest'),
    logos: path.join(ROOT_DIR, 'logos'),
    media: path.join(ROOT_DIR, 'media'),
    docs: path.join(ROOT_DIR, 'docs')
  },
  resolveIconSpriteHref(iconId) {
    return `/assets/icons/sprite/Dessert-icons.svg#${iconId}`;
  },
  resolveFavicon(size = 'ico') {
    if (size === 'ico') return '/assets/favicon/Dessert-favicon.ico';
    return `/assets/favicon/Dessert-favicon-${size}x${size}.png`;
  },
  resolveLogo(variant = 'full', ext = 'svg') {
    return `/assets/logos/${ext}/Dessert-logo-${variant}.${ext}`;
  }
};

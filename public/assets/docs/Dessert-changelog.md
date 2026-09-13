# 🍰 Dessert Assets Changelog

All notable changes to the Dessert asset pipeline will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-13
### Added
- Complete automated build pipeline orchestrated by `scripts/build-all.js`.
- Font subsetting and conversion pipeline via `fontmin` (`build-fonts.js`).
- Dynamic `fonts.css` generation with `@font-face` rules and `font-display: swap` (`build-css.js`).
- Photographic compression engine with `sharp` yielding WebP (q80), AVIF (q65), progressive JPEG fallback, and 300px thumbnails (`build-images.js`).
- SVG minification, monolithic SVG `<symbol>` sprite generator, and multi-density PNG icon rendering (`build-icons.js`).
- Multi-resolution favicon generator, Apple touch icon suite, and PWA `site.webmanifest` + `browserconfig.xml` (`build-favicon.js`).
- Vector logo rendering to 256, 512, 1024px PNGs and transparent badges (`build-logos.js`).
- Master video transcoding to faststart H.264 MP4 and VP9 WebM with automated 1280x720 poster extraction (`build-video.js`).
- Lossless WAV audio encoding to 192kbps MP3 and Vorbis OGG sound cues (`build-audio.js`).
- Selective artifact purge utility (`clean.js`).
- Chokidar file watcher with 500ms debouncing (`watch.js`).
- Centralized ANSI logger (`logger.js`), path resolver (`paths.js`), and filesystem helper (`fs-helper.js`).

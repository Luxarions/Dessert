# 🍰 Dessert Assets — Complete Build Pipeline

> Production-grade, automated build pipeline for all visual, typographic, and multimedia assets of the **Dessert** design system.

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Directory Structure](#-directory-structure)
3. [Prerequisites & Quick Start](#-prerequisites--quick-start)
4. [NPM Scripts & Command Reference](#-npm-scripts--command-reference)
5. [Pipeline Architecture & Order](#-pipeline-architecture--order)
6. [Subsystem Deep Dives](#-subsystem-deep-dives)
   - [Fonts Pipeline](#1-fonts-pipeline)
   - [Images Pipeline](#2-images-pipeline)
   - [Icons Pipeline](#3-icons-pipeline)
   - [Favicon & Manifest Pipeline](#4-favicon--manifest-pipeline)
   - [Logos Pipeline](#5-logos-pipeline)
   - [Video Pipeline](#6-video-pipeline)
   - [Audio Pipeline](#7-audio-pipeline)
   - [CSS Generator](#8-css-generator)
   - [Clean & Watch Utilities](#9-clean--watch-utilities)
7. [Asset Specifications & Quality Standards](#-asset-specifications--quality-standards)
8. [Frontend Integration Guide](#-frontend-integration-guide)
9. [Troubleshooting & FAQ](#-troubleshooting--faq)
10. [License](#-license)

---

## 🌟 Overview

The **Dessert Assets Pipeline** standardizes how brand elements, fonts, iconography, images, logos, sound effects, and videos are prepared for production. Instead of manually cropping images or running ad-hoc converter tools, this pipeline runs a unified, repeatable process that takes pristine master files and compiles them into heavily optimized modern formats (WOFF2, WebP, AVIF, SVG symbols, MP4/WebM, MP3/OGG) with zero quality loss and maximum compression.

### Key Capabilities
- **Font Subsetting & Conversion**: Compiles raw TTF/OTF into lightweight WOFF and WOFF2 fonts restricted to needed character sets, reducing font weights by up to 75%.
- **Next-Gen Image Transcoding**: Concurrently produces modern WebP and AVIF formats with high-fidelity fallback progressive JPEGs and crisp 300x300 thumbnails.
- **Monolithic SVG Spriting & Multi-Density PNGs**: SVGO-minified icons combined into a single zero-request SVG `<symbol>` sprite plus 16px to 128px PNGs for legacy environments.
- **Automated PWA Icons & Manifests**: Generates all Apple touch icons, Android Chrome icons, Microsoft tiles, `site.webmanifest`, and `browserconfig.xml` from a single master icon.
- **Video & Audio Encoding**: Leverages `fluent-ffmpeg` and `ffmpeg-static` to generate dual-format web videos (H.264 MP4 + VP9 WebM) with auto-captured poster frames, and audio alerts in MP3 and Vorbis OGG formats.
- **Self-Generating `fonts.css`**: Dynamically writes `@font-face` declarations with `font-display: swap` based on compiled artifacts.

---

## 📁 Directory Structure

```
assets/
│
├── package.json               # Pipeline dependencies & npm scripts
├── README.md                  # Comprehensive pipeline documentation
├── .gitignore                 # Exclusion rules for build artifacts & temp files
├── .npmrc                     # Strict deterministic npm settings
│
├── scripts/                   # Automated build scripts
│   ├── build-all.js           # Master orchestrator
│   ├── build-fonts.js         # Font subsetting & WOFF/WOFF2 conversion
│   ├── build-images.js        # Multi-format image optimization
│   ├── build-icons.js         # SVG minification, sprite & PNG exports
│   ├── build-favicon.js       # PWA icons, manifest & browserconfig
│   ├── build-logos.js         # Scaled logo rasterization
│   ├── build-video.js         # MP4, WebM & poster generation
│   ├── build-audio.js         # MP3, OGG encoding & master archiving
│   ├── build-css.js           # @font-face CSS auto-generation
│   ├── clean.js               # Output artifact purge
│   ├── watch.js               # Chokidar real-time rebuild daemon
│   └── utils/
│       ├── logger.js          # Unified ANSI pastel logger
│       ├── paths.js           # Central path resolver
│       └── fs-helper.js       # File system & file size helpers
│
├── fonts/                     # Typography assets
│   ├── raw/                   # Master TTF/OTF fonts
│   ├── subset/                # Glyphs subsetted archives
│   └── web/                   # Production WOFF, WOFF2 & fonts.css
│
├── images/                    # Visual assets
│   ├── raw/                   # Master photographs & composites
│   ├── optimized/             # WebP, AVIF & fallback JPGs
│   ├── thumbnails/            # 300x300 WebP square crops
│   └── backgrounds/           # Repeatable vectors, gradients & textures
│
├── icons/                     # UI Iconography
│   ├── svg/                   # 24x24 single SVG vectors
│   ├── png/                   # 16, 32, 64, 128px raster fallbacks
│   ├── ico/                   # Icon format archives
│   ├── sprite/                # Monolithic Dessert-icons.svg symbol sheet
│   └── font-icons/            # Optional icon font bundle
│
├── favicon/                   # Application icons & manifests
│   ├── site.webmanifest       # PWA manifest
│   ├── browserconfig.xml      # Windows Metro tile configuration
│   └── Dessert-*.png          # Apple, Android & desktop icons
│
├── logos/                     # Brand identity
│   ├── svg/                   # Full, Icon, Horizontal, Vertical & Mono vectors
│   ├── png/                   # Scaled PNGs (64, 128, 256, 512, 1024)
│   └── source/                # Master Figma, Illustrator & Sketch files
│
├── media/                     # Multimedia assets
│   ├── video/                 # MP4, WebM & poster images
│   └── audio/                 # MP3, OGG & master WAVs
│
└── docs/                      # Brand guidelines, templates & specifications
```

---

## ⚡ Prerequisites & Quick Start

### Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **NPM**: `v9.0.0` or higher
- All OS platform binaries for Sharp and FFmpeg are automatically resolved through `sharp` and `ffmpeg-static` dependencies without needing system-level tools installed.

### Installation

```bash
# Navigate to the assets root directory
cd assets

# Install dependencies deterministically
npm install
```

---

## 🛠️ NPM Scripts & Command Reference

| Script | Command | Description |
| :--- | :--- | :--- |
| **`npm run build`** | `node scripts/build-all.js` | Runs all pipeline steps in sequence with dependency bailouts |
| **`npm run build:fonts`** | `node scripts/build-fonts.js` | Subsets TTFs and generates WOFF & WOFF2 web fonts |
| **`npm run build:images`** | `node scripts/build-images.js` | Encodes WebP, AVIF, JPG fallbacks, and thumbnails |
| **`npm run build:icons`** | `node scripts/build-icons.js` | Minifies SVGs, builds `<symbol>` sprite, and renders PNGs |
| **`npm run build:favicon`** | `node scripts/build-favicon.js` | Generates PWA favicons, `site.webmanifest`, and `browserconfig.xml` |
| **`npm run build:logos`** | `node scripts/build-logos.js` | Exports multi-resolution logo PNGs (256, 512, 1024px) |
| **`npm run build:video`** | `node scripts/build-video.js` | Transcodes MOV masters to WebM + MP4 and extracts poster frame |
| **`npm run build:audio`** | `node scripts/build-audio.js` | Encodes master WAVs into web-ready MP3 & OGG files |
| **`npm run build:css`** | `node scripts/build-css.js` | Scans compiled fonts and writes `fonts/web/fonts.css` |
| **`npm run clean`** | `node scripts/clean.js` | Safely removes generated artifacts from output folders |
| **`npm run rebuild`** | `npm run clean && npm run build` | Complete clean wipe followed by a fresh rebuild |
| **`npm run watch`** | `node scripts/watch.js` | Watches raw source folders and triggers incremental builds on change |

---

## 🔄 Pipeline Architecture & Order

The master orchestrator (`scripts/build-all.js`) executes steps in a specific topological order to satisfy inter-asset dependencies:

```
┌─────────────────────────────────────────────────────────────┐
│  assets/scripts/build-all.js  (ORCHESTRATOR)                │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
  ┌──────────┐        ┌──────────┐        ┌──────────┐
  │  Fonts   │        │  Images  │        │  Icons   │
  │ .ttf →   │        │ .jpg →   │        │ .svg →   │
  │ .woff2   │        │ .webp    │        │ sprite   │
  └──────────┘        └──────────┘        └──────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
  ┌──────────┐        ┌──────────┐        ┌──────────┐
  │ Favicon  │        │  Logos   │        │  Media   │
  │ .png →   │        │ .svg →   │        │ .mov →   │
  │ multi    │        │ .png     │        │ .mp4     │
  └──────────┘        └──────────┘        └──────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │  CSS BUILD   │
                    │ fonts.css    │
                    └──────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │   SUMMARY    │
                    └──────────────┘
```

1. **Fonts, Images, Icons** run first (Required). If any required stage throws an unhandled error, the pipeline bails immediately.
2. **Favicon, Logos, Video, Audio** run next (Optional). If raw assets are absent or optional tools are skipped, warning notices are logged without aborting the overall process.
3. **CSS Generation** inspects newly minted `.woff2` and `.woff` files and generates syntactically clean `@font-face` rules.
4. **Summary Screen** displays execution timing, success/skip counts, and output metrics.

---

## 🔍 Subsystem Deep Dives

### 1. Fonts Pipeline
- **Script**: `scripts/build-fonts.js`
- **Input**: `fonts/raw/Dessert-{Regular,Bold,Italic,BoldItalic}.ttf`
- **Output**: `fonts/web/Dessert-{variant}.woff`, `fonts/web/Dessert-{variant}.woff2`
- **Subsetting**: Retains Latin basic (`a-z`, `A-Z`, `0-9`), punctuation, accents (`é`, `ñ`, `ç`, etc.), currency symbols (`$`, `€`, `£`, `¥`), and typographic marks (`•`, `…`, `©`). Unused CJK or archaic glyph blocks are pruned.

### 2. Images Pipeline
- **Script**: `scripts/build-images.js`
- **Input**: `images/raw/*.{jpg,png}`
- **Output**:
  - `images/optimized/{name}.webp` (Quality: 80)
  - `images/optimized/{name}.avif` (Quality: 65, superior compression)
  - `images/optimized/{name}.jpg` (Quality: 82, progressive scan)
  - `images/thumbnails/{name}-thumb.webp` (300x300px cover crop, Quality: 75)

### 3. Icons Pipeline
- **Script**: `scripts/build-icons.js`
- **Input**: `icons/svg/Dessert-*.svg`
- **Output**:
  - `icons/sprite/Dessert-icons.svg`: Minified `<symbol>` sprite containing all icons with sanitized `viewBox="0 0 24 24"`.
  - `icons/png/Dessert-{icon}-{16,32,64,128}.png`: Rendered multi-resolution PNGs for key navigation icons.

### 4. Favicon & Manifest Pipeline
- **Script**: `scripts/build-favicon.js`
- **Input**: `logos/png/Dessert-logo-icon-512.png` or `logos/svg/Dessert-logo-icon.svg`
- **Output**:
  - Standard favicons: `16x16`, `32x32`, `48x48`, `96x96`, `144x144`
  - Apple touch icons: `152x152`, `180x180`
  - Android Chrome icons: `192x192`, `512x512`
  - Microsoft tile: `mstile-150x150.png`
  - Configuration files: `site.webmanifest` and `browserconfig.xml`

### 5. Logos Pipeline
- **Script**: `scripts/build-logos.js`
- **Input**: `logos/svg/Dessert-logo-full.svg`, `logos/svg/Dessert-logo-icon.svg`
- **Output**:
  - Full logos: `Dessert-logo-full-{256,512,1024}.png`
  - Icon logos: `Dessert-logo-icon-{64,128,256,512}.png`
  - Transparent master: `Dessert-logo-transparent.png` (High compression level 9)

### 6. Video Pipeline
- **Script**: `scripts/build-video.js`
- **Input**: `media/video/raw/*.mov`
- **Output**:
  - MP4 (`libx264`, CRF 23, faststart flag enabled for instantaneous web streaming)
  - WebM (`libvpx-vp9`, CRF 30, Opus audio)
  - Poster frame (`{name}-poster.jpg` extracted at 00:00:01 at 1280x720)

### 7. Audio Pipeline
- **Script**: `scripts/build-audio.js`
- **Input**: `media/audio/raw/*.wav`
- **Output**:
  - MP3 (`libmp3lame`, constant 192 kbps bitrate)
  - OGG (`libvorbis`, quality scale 6)
  - Preserved master `.wav` in distribution folder for lossless usage

### 8. CSS Generator
- **Script**: `scripts/build-css.js`
- **Output**: `fonts/web/fonts.css`
- **Features**: Generates cascading `@font-face` definitions binding `woff2` with `woff` fallback, mapping font weights (400, 700) and styles (normal, italic) to the unified `'Dessert'` family.

### 9. Clean & Watch Utilities
- **Clean (`scripts/clean.js`)**: Safely removes all compiled directories without touching source raw assets.
- **Watch (`scripts/watch.js`)**: Chokidar-backed file watcher with 500ms debounce to prevent thrashing during rapid asset saves.

---

## 🎨 Asset Specifications & Quality Standards

| Asset Type | Source Format | Target Format | Resolution / Density | Target Weight |
| :--- | :--- | :--- | :--- | :--- |
| **Fonts** | `.ttf` / `.otf` | `.woff2` | Subsetted (Latin + Marks) | < 35 KB per style |
| **Hero Image** | `.jpg` / `.png` | `.avif` / `.webp` | 1920x1080 (adaptive) | < 120 KB |
| **Product Image** | `.jpg` / `.png` | `.webp` | 1200x800 | < 80 KB |
| **Thumbnails** | `.jpg` / `.png` | `.webp` | 300x300 (cover) | < 15 KB |
| **Icons** | `.svg` | Minified SVG | 24x24 `viewBox` | < 1 KB each |
| **Icon Sprite** | All `.svg` | Single `.svg` | Monolithic `<symbol>` | < 18 KB total |
| **Logo Icon** | `.svg` | `.png` | 512x512 | < 30 KB |
| **UI Audio** | `.wav` | `.mp3` / `.ogg` | 44.1 kHz, 192 kbps | < 40 KB per cue |

---

## 💻 Frontend Integration Guide

### 1. Using Fonts in CSS / Tailwind

Include the auto-generated `fonts.css` in your entry stylesheet:

```html
<link rel="stylesheet" href="/assets/fonts/web/fonts.css">
```

Or configure Tailwind CSS:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        dessert: ['Dessert', 'sans-serif'],
      },
    },
  },
};
```

```html
<h1 class="font-dessert font-bold text-3xl">Dessert Bakery</h1>
```

### 2. Using Responsive Images with `<picture>`

```html
<picture>
  <source srcset="/assets/images/optimized/Dessert-hero.avif" type="image/avif">
  <source srcset="/assets/images/optimized/Dessert-hero.webp" type="image/webp">
  <img
    src="/assets/images/optimized/Dessert-hero.jpg"
    alt="Delicious Dessert Platter"
    width="1920"
    height="1080"
    loading="lazy"
    decoding="async"
    class="w-full h-auto rounded-xl shadow-md"
  >
</picture>
```

### 3. Using the SVG Icon Sprite

```html
<!-- Load once or reference by URL -->
<svg class="w-6 h-6 text-pink-500 fill-current">
  <use href="/assets/icons/sprite/Dessert-icons.svg#cart" />
</svg>
```

### 4. Embedding Video with Fallback

```html
<video
  controls
  preload="none"
  poster="/assets/media/video/Dessert-intro-poster.jpg"
  class="w-full rounded-2xl overflow-hidden"
>
  <source src="/assets/media/video/Dessert-intro.webm" type="video/webm">
  <source src="/assets/media/video/Dessert-intro.mp4" type="video/mp4">
  Your browser does not support HTML5 video.
</video>
```

---

## ❓ Troubleshooting & FAQ

### Q1: `sharp` throws a compilation error during installation
- **Solution**: Sharp ships pre-compiled platform binaries for Linux, macOS, and Windows. If running on Alpine Linux or musl systems, ensure `libc6-compat` is installed.

### Q2: Font subsetting strips an accented character
- **Solution**: Inspect `SUBSET_TEXT` in `scripts/build-fonts.js` and add the specific Unicode character, then run `npm run build:fonts`.

### Q3: Why is `.ico` generation creating `_favicon-256-base.png`?
- **Solution**: Multi-layer Windows `.ico` binaries can be generated using `png-to-ico` or standard ImageMagick tools. The pipeline outputs the 256x256 master PNG ready for conversion.

---

## 📄 License

MIT License © Dessert Project. All rights reserved.

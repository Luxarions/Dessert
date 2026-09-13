import { BuildStepInfo, DessertFontVariant, DessertIcon, FileTreeItem } from '../types';

export const BUILD_STEPS: BuildStepInfo[] = [
  {
    id: 'fonts',
    name: 'Fonts',
    script: 'build-fonts.js',
    required: true,
    command: 'npm run build:fonts',
    description: 'Subsets raw TTF glyphs and converts them into ultra-compact WOFF & WOFF2 web fonts.',
    inputs: ['fonts/raw/Dessert-Regular.ttf', 'fonts/raw/Dessert-Bold.ttf', 'fonts/raw/Dessert-Italic.ttf', 'fonts/raw/Dessert-BoldItalic.ttf'],
    outputs: ['fonts/web/*.woff', 'fonts/web/*.woff2', 'fonts/subset/*.woff2'],
    estimatedDurationMs: 1400,
  },
  {
    id: 'images',
    name: 'Images',
    script: 'build-images.js',
    required: true,
    command: 'npm run build:images',
    description: 'Compresses photographic imagery into WebP (q80), AVIF (q65), progressive JPG fallbacks, and 300px square thumbnails.',
    inputs: ['images/raw/Dessert-hero.jpg', 'images/raw/Dessert-product.png', 'images/raw/Dessert-banner.jpg', 'images/raw/Dessert-about.jpg'],
    outputs: ['images/optimized/*.webp', 'images/optimized/*.avif', 'images/optimized/*.jpg', 'images/thumbnails/*-thumb.webp'],
    estimatedDurationMs: 1900,
  },
  {
    id: 'icons',
    name: 'Icons',
    script: 'build-icons.js',
    required: true,
    command: 'npm run build:icons',
    description: 'Minifies SVG icons using SVGO, compiles a monolithic SVG symbol sprite sheet, and renders multi-density PNGs.',
    inputs: ['icons/svg/Dessert-*.svg (17 icons)'],
    outputs: ['icons/sprite/Dessert-icons.svg', 'icons/png/*-16.png', 'icons/png/*-32.png', 'icons/png/*-64.png', 'icons/png/*-128.png'],
    estimatedDurationMs: 1200,
  },
  {
    id: 'favicon',
    name: 'Favicon',
    script: 'build-favicon.js',
    required: false,
    command: 'npm run build:favicon',
    description: 'Generates standard multi-resolution web favicons, Apple touch icons, Android Chrome icons, site.webmanifest, and browserconfig.xml.',
    inputs: ['logos/png/Dessert-logo-icon-512.png or logos/svg/Dessert-logo-icon.svg'],
    outputs: ['favicon/Dessert-favicon-*.png', 'favicon/site.webmanifest', 'favicon/browserconfig.xml', 'favicon/Dessert-apple-touch-icon-*.png'],
    estimatedDurationMs: 1100,
  },
  {
    id: 'logos',
    name: 'Logos',
    script: 'build-logos.js',
    required: false,
    command: 'npm run build:logos',
    description: 'Exports vector logos to multi-size PNGs (256, 512, 1024px) plus high-compression transparent badge PNGs.',
    inputs: ['logos/svg/Dessert-logo-full.svg', 'logos/svg/Dessert-logo-icon.svg'],
    outputs: ['logos/png/Dessert-logo-full-*.png', 'logos/png/Dessert-logo-icon-*.png', 'logos/png/Dessert-logo-transparent.png'],
    estimatedDurationMs: 900,
  },
  {
    id: 'video',
    name: 'Video',
    script: 'build-video.js',
    required: false,
    command: 'npm run build:video',
    description: 'Transcodes master MOV video assets into web-optimized H.264 MP4 and VP9 WebM formats with automatic 1280x720 poster extraction.',
    inputs: ['media/video/raw/Dessert-intro.mov'],
    outputs: ['media/video/Dessert-intro.mp4', 'media/video/Dessert-intro.webm', 'media/video/Dessert-intro-poster.jpg'],
    estimatedDurationMs: 2300,
  },
  {
    id: 'audio',
    name: 'Audio',
    script: 'build-audio.js',
    required: false,
    command: 'npm run build:audio',
    description: 'Encodes sound effect masters into high-clarity 192k MP3 and Vorbis OGG audio cues and archives master WAVs.',
    inputs: ['media/audio/raw/*.wav'],
    outputs: ['media/audio/*.mp3', 'media/audio/*.ogg', 'media/audio/*.wav'],
    estimatedDurationMs: 1000,
  },
  {
    id: 'css',
    name: 'CSS',
    script: 'build-css.js',
    required: true,
    command: 'npm run build:css',
    description: 'Scans compiled font outputs and automatically generates fonts.css with @font-face rules, font-display: swap, and usage guidelines.',
    inputs: ['fonts/web/*.woff2', 'fonts/web/*.woff'],
    outputs: ['fonts/web/fonts.css'],
    estimatedDurationMs: 400,
  }
];

export const DESSERT_ICONS: DessertIcon[] = [
  {
    id: 'home',
    name: 'Home',
    symbolId: 'home',
    filename: 'Dessert-home.svg',
    category: 'navigation',
    description: 'Bakery shopfront home icon with scalloped awning',
    svgPath: 'M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9z M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7'
  },
  {
    id: 'user',
    name: 'User / Chef',
    symbolId: 'user',
    filename: 'Dessert-user.svg',
    category: 'navigation',
    description: 'Customer account / Pastry chef silhouette with toque curve',
    svgPath: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 20.5c0-3.5 3.5-5.5 8-5.5s8 2 8 5.5'
  },
  {
    id: 'search',
    name: 'Search',
    symbolId: 'search',
    filename: 'Dessert-search.svg',
    category: 'navigation',
    description: 'Magnifier lens for searching pastries, cakes, and treats',
    svgPath: 'M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z M16 16l5 5'
  },
  {
    id: 'cart',
    name: 'Cart',
    symbolId: 'cart',
    filename: 'Dessert-cart.svg',
    category: 'navigation',
    description: 'Shopping basket for pastry checkout and orders',
    svgPath: 'M2 3h3l2.4 11.2a1 1 0 0 0 1 .8h10.2a1 1 0 0 0 1-.8L21 6H6 M9 20a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z M19 20a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'
  },
  {
    id: 'menu',
    name: 'Menu',
    symbolId: 'menu',
    filename: 'Dessert-menu.svg',
    category: 'navigation',
    description: 'Hamburger menu navigation toggle',
    svgPath: 'M4 6h16 M4 12h16 M4 18h16'
  },
  {
    id: 'close',
    name: 'Close',
    symbolId: 'close',
    filename: 'Dessert-close.svg',
    category: 'actions',
    description: 'Dismiss modal dialog or search drawer',
    svgPath: 'M18 6L6 18 M6 6l12 12'
  },
  {
    id: 'arrow-left',
    name: 'Arrow Left',
    symbolId: 'arrow-left',
    filename: 'Dessert-arrow-left.svg',
    category: 'navigation',
    description: 'Return to previous pastry category or page',
    svgPath: 'M19 12H5 M12 19l-7-7 7-7'
  },
  {
    id: 'arrow-right',
    name: 'Arrow Right',
    symbolId: 'arrow-right',
    filename: 'Dessert-arrow-right.svg',
    category: 'navigation',
    description: 'Advance to next dessert slide or step',
    svgPath: 'M5 12h14 M12 5l7 7-7 7'
  },
  {
    id: 'heart',
    name: 'Heart / Favorite',
    symbolId: 'heart',
    filename: 'Dessert-heart.svg',
    category: 'actions',
    description: 'Bookmark favorite sweet, recipe, or bakery item',
    svgPath: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
  },
  {
    id: 'star',
    name: 'Star / Rating',
    symbolId: 'star',
    filename: 'Dessert-star.svg',
    category: 'status',
    description: 'Pastry review rating and Michelin-star indicator',
    svgPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  },
  {
    id: 'check',
    name: 'Check / Done',
    symbolId: 'check',
    filename: 'Dessert-check.svg',
    category: 'status',
    description: 'Order confirmed or recipe step finished',
    svgPath: 'M20 6L9 17l-5-5'
  },
  {
    id: 'info',
    name: 'Info',
    symbolId: 'info',
    filename: 'Dessert-info.svg',
    category: 'status',
    description: 'Nutritional details, allergen disclaimer, or recipe tips',
    svgPath: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M12 16v-4 M12 8h.01'
  },
  {
    id: 'warning',
    name: 'Warning',
    symbolId: 'warning',
    filename: 'Dessert-warning.svg',
    category: 'status',
    description: 'Nut allergy notice or temperature alert',
    svgPath: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01'
  },
  {
    id: 'error',
    name: 'Error',
    symbolId: 'error',
    filename: 'Dessert-error.svg',
    category: 'status',
    description: 'Payment issue or sold-out dessert item',
    svgPath: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M15 9l-6 6 M9 9l6 6'
  },
  {
    id: 'settings',
    name: 'Settings',
    symbolId: 'settings',
    filename: 'Dessert-settings.svg',
    category: 'system',
    description: 'Bakery kitchen preferences and notification controls',
    svgPath: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'
  },
  {
    id: 'mail',
    name: 'Mail',
    symbolId: 'mail',
    filename: 'Dessert-mail.svg',
    category: 'actions',
    description: 'Subscribe to daily fresh oven specials or invoice delivery',
    svgPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6'
  },
  {
    id: 'phone',
    name: 'Phone',
    symbolId: 'phone',
    filename: 'Dessert-phone.svg',
    category: 'actions',
    description: 'Call pastry kitchen for custom wedding cake reservations',
    svgPath: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'
  }
];

export const DESSERT_FONTS: DessertFontVariant[] = [
  {
    weight: 400,
    style: 'normal',
    name: 'Dessert Regular',
    fileTtf: 'fonts/raw/Dessert-Regular.ttf',
    fileWoff: 'fonts/web/Dessert-Regular.woff',
    fileWoff2: 'fonts/web/Dessert-Regular.woff2',
    sampleText: 'Warm brioche filled with Madagascan vanilla custard and fresh raspberries.'
  },
  {
    weight: 700,
    style: 'normal',
    name: 'Dessert Bold',
    fileTtf: 'fonts/raw/Dessert-Bold.ttf',
    fileWoff: 'fonts/web/Dessert-Bold.woff',
    fileWoff2: 'fonts/web/Dessert-Bold.woff2',
    sampleText: 'Artisanal French Patisserie & Single-Origin Dark Chocolate Ganache'
  },
  {
    weight: 400,
    style: 'italic',
    name: 'Dessert Italic',
    fileTtf: 'fonts/raw/Dessert-Italic.ttf',
    fileWoff: 'fonts/web/Dessert-Italic.woff',
    fileWoff2: 'fonts/web/Dessert-Italic.woff2',
    sampleText: 'Delicately dusted with powdered cinnamon and edible gold leaf shimmer.'
  },
  {
    weight: 700,
    style: 'italic',
    name: 'Dessert Bold Italic',
    fileTtf: 'fonts/raw/Dessert-BoldItalic.ttf',
    fileWoff: 'fonts/web/Dessert-BoldItalic.woff',
    fileWoff2: 'fonts/web/Dessert-BoldItalic.woff2',
    sampleText: 'Signature Mille-Feuille with caramelized crisp puff pastry.'
  }
];

// Web Audio sound synthesizer for soundboard
export const playDessertSound = (soundType: 'notif' | 'click' | 'success' | 'error') => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (soundType === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (soundType === 'notif') {
      const notes = [587.33, 880]; // D5, A5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.36);
      });
    } else if (soundType === 'success') {
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.46);
      });
    } else if (soundType === 'error') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    }
  } catch {
    // ignore audio failure in headless environments
  }
};

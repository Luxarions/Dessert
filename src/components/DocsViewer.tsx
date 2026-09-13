import React, { useState } from 'react';
import { Copy, Check, BookOpen, Terminal, CheckCircle2, ChevronRight, FileCode } from 'lucide-react';

export const DocsViewer: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-300 text-stone-950 flex items-center justify-center font-bold text-xl shadow-md">
            📖
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-100 tracking-tight">
              Dessert Assets Pipeline Documentation
            </h1>
            <p className="text-xs text-stone-400 font-mono mt-0.5">
              Source: assets/README.md • Complete & Uncut Reference Manual
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Commands Bar */}
      <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-pink-300 font-mono flex items-center gap-2">
          <Terminal className="w-4 h-4" /> Quick Start Installation & Build
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: '1. Navigate', cmd: 'cd assets' },
            { label: '2. Install Tools', cmd: 'npm install' },
            { label: '3. Run Full Pipeline', cmd: 'npm run build' },
          ].map((item) => (
            <div
              key={item.cmd}
              onClick={() => copyCommand(item.cmd)}
              className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-pink-400/60 cursor-pointer flex items-center justify-between transition-all group"
            >
              <div>
                <div className="text-[10px] text-stone-500 font-sans">{item.label}</div>
                <div className="text-xs font-mono text-stone-200 group-hover:text-pink-200">
                  {item.cmd}
                </div>
              </div>
              <span className="text-stone-500 group-hover:text-stone-300">
                {copiedCmd === item.cmd ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Documentation Sections */}
      <div className="space-y-8 text-sm text-stone-300 leading-relaxed">
        {/* Section 1: Overview */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2 border-b border-stone-800 pb-2">
            <span className="text-pink-400 font-mono">01.</span> Overview
          </h2>
          <p>
            The <strong>Dessert Assets Build Pipeline</strong> is a centralized, zero-compromise automated workflow designed to transform raw creative deliverables into hyper-optimized, web-standard artifacts. It enforces consistent naming conventions (e.g. <code className="text-pink-300 font-mono">Dessert-[name].[ext]</code>), generates backwards-compatible fallbacks, and automates SVG symbol sprite sheets and web font CSS declarations.
          </p>
        </section>

        {/* Section 2: Directory Structure */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2 border-b border-stone-800 pb-2">
            <span className="text-pink-400 font-mono">02.</span> Complete Directory Structure
          </h2>
          <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 overflow-x-auto leading-relaxed">
{`assets/
├── package.json          # Pipeline dependencies and npm scripts
├── README.md             # Complete documentation
├── .gitignore            # Ignores node_modules, temp, build logs
├── .npmrc                # Deterministic npm settings
│
├── scripts/              # Build scripts and utilities
│   ├── build-all.js      # Orchestrator running all steps in order
│   ├── build-fonts.js    # TTF -> glyph subsetting -> WOFF/WOFF2
│   ├── build-images.js   # Sharp image compression (WebP, AVIF, JPG)
│   ├── build-icons.js    # SVGO minification + SVG sprite + PNGs
│   ├── build-favicon.js  # Favicon generator + PWA webmanifest
│   ├── build-logos.js    # Multi-resolution logo PNG exports
│   ├── build-video.js    # FFmpeg video transcoding + poster frame
│   ├── build-audio.js    # FFmpeg audio encoding to MP3/OGG
│   ├── build-css.js      # Auto-generates fonts.css @font-face rules
│   ├── clean.js          # Cleans all compiled outputs
│   ├── watch.js          # Chokidar live file watcher
│   └── utils/
│       ├── logger.js     # Pastel colored ANSI terminal logger
│       ├── paths.js      # Central path resolver
│       └── fs-helper.js  # File system utility helpers
│
├── fonts/                # Typography assets
│   ├── raw/              # Master TTF/OTF files
│   ├── subset/           # Latin basic, extended, cyrillic subsets
│   └── web/              # Web-ready WOFF/WOFF2 + fonts.css
│
├── images/               # Photographic assets
│   ├── raw/              # Master JPG/PNG files
│   ├── optimized/        # WebP (q80), AVIF (q65), fallback JPG
│   ├── thumbnails/       # 300px square cover thumbs
│   └── backgrounds/      # Decorative background patterns
│
├── icons/                # Iconography assets
│   ├── svg/              # 17 individual vector SVGs
│   ├── sprite/           # Dessert-icons.svg symbol sprite
│   └── png/              # Multi-density PNGs (16, 32, 64, 128px)
│
├── favicon/              # Browser tab icons, Apple touch, PWA manifest
├── logos/                # Vector logos & raster exports
├── media/                # Video and audio assets
└── docs/                 # License, changelog, and specifications`}
          </pre>
        </section>

        {/* Section 3: Scripts & Tools */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2 border-b border-stone-800 pb-2">
            <span className="text-pink-400 font-mono">03.</span> Scripts & Tools Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-800 rounded-xl overflow-hidden font-mono">
              <thead className="bg-stone-950 text-stone-300 uppercase tracking-wider">
                <tr>
                  <th className="p-3 border-b border-stone-800">Command</th>
                  <th className="p-3 border-b border-stone-800">Script</th>
                  <th className="p-3 border-b border-stone-800">Core Tool</th>
                  <th className="p-3 border-b border-stone-800">Required?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80 bg-stone-900/60 text-stone-300">
                <tr>
                  <td className="p-3 text-pink-300 font-bold">npm run build</td>
                  <td className="p-3">build-all.js</td>
                  <td className="p-3 font-sans text-stone-400">Node child_process</td>
                  <td className="p-3 text-emerald-400 font-sans">Orchestrator</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-300">npm run build:fonts</td>
                  <td className="p-3">build-fonts.js</td>
                  <td className="p-3 font-sans text-stone-400">fontmin</td>
                  <td className="p-3 text-red-300 font-sans">Yes (Required)</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-300">npm run build:images</td>
                  <td className="p-3">build-images.js</td>
                  <td className="p-3 font-sans text-stone-400">sharp</td>
                  <td className="p-3 text-red-300 font-sans">Yes (Required)</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-300">npm run build:icons</td>
                  <td className="p-3">build-icons.js</td>
                  <td className="p-3 font-sans text-stone-400">svgo + sharp</td>
                  <td className="p-3 text-red-300 font-sans">Yes (Required)</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-300">npm run build:favicon</td>
                  <td className="p-3">build-favicon.js</td>
                  <td className="p-3 font-sans text-stone-400">sharp</td>
                  <td className="p-3 text-stone-400 font-sans">Optional</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-300">npm run build:logos</td>
                  <td className="p-3">build-logos.js</td>
                  <td className="p-3 font-sans text-stone-400">sharp</td>
                  <td className="p-3 text-stone-400 font-sans">Optional</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-300">npm run build:video</td>
                  <td className="p-3">build-video.js</td>
                  <td className="p-3 font-sans text-stone-400">fluent-ffmpeg</td>
                  <td className="p-3 text-stone-400 font-sans">Optional</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-300">npm run build:audio</td>
                  <td className="p-3">build-audio.js</td>
                  <td className="p-3 font-sans text-stone-400">fluent-ffmpeg</td>
                  <td className="p-3 text-stone-400 font-sans">Optional</td>
                </tr>
                <tr>
                  <td className="p-3 text-pink-300">npm run build:css</td>
                  <td className="p-3">build-css.js</td>
                  <td className="p-3 font-sans text-stone-400">fs-extra</td>
                  <td className="p-3 text-red-300 font-sans">Yes (Required)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Workflow for adding new assets */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2 border-b border-stone-800 pb-2">
            <span className="text-pink-400 font-mono">04.</span> Adding New Assets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
              <h4 className="font-bold text-stone-200">Adding a New Icon</h4>
              <p className="text-stone-400">
                1. Save the SVG file as <code className="text-pink-300">assets/icons/svg/Dessert-[name].svg</code> with a 24x24 viewBox.
              </p>
              <p className="text-stone-400">
                2. Run <code className="text-pink-300">npm run build:icons</code> to minify and automatically append into <code className="text-stone-300">Dessert-icons.svg</code> sprite sheet.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
              <h4 className="font-bold text-stone-200">Adding a New Photographic Image</h4>
              <p className="text-stone-400">
                1. Place high-res master JPG/PNG into <code className="text-pink-300">assets/images/raw/Dessert-[name].jpg</code>.
              </p>
              <p className="text-stone-400">
                2. Run <code className="text-pink-300">npm run build:images</code> to automatically generate WebP, AVIF, progressive JPG, and 300px thumbs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

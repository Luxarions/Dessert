/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { dessertAssets } from '../services/DessertAssetService';
import {
  Package,
  Terminal,
  Play,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileCode,
  Shield,
  Layers,
  Settings,
  Flame,
  FileText,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';

interface NpmScriptRunner {
  command: string;
  name: string;
  description: string;
  category: 'build' | 'test' | 'maintenance' | 'cli';
  durationEst: string;
}

export const NpmStageInspector: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'scripts' | 'manifest' | 'exports' | 'whitelist' | 'npmrc' | 'audit'>('scripts');
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '📦 [npm] Initialized Dessert Assets package environment',
    'ℹ️  Package: dessert-assets@1.0.0 (type: commonjs)',
    '✨ Ready to test npm scripts and verify package distribution before bundling.',
  ]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const npmScripts: NpmScriptRunner[] = [
    {
      command: 'npm test',
      name: 'Test & Verification',
      description: 'Runs node scripts/test.js to validate manifest, font CSS, SVG markup, and files',
      category: 'test',
      durationEst: '~0.4s',
    },
    {
      command: 'npm run build',
      name: 'Full Master Build',
      description: 'Executes node scripts/build-all.js compiling all 8 asset domains',
      category: 'build',
      durationEst: '~2.8s',
    },
    {
      command: 'npm run build:fonts',
      name: 'Fonts Pipeline',
      description: 'Subsets TTF/WOFF/WOFF2 and generates web typography',
      category: 'build',
      durationEst: '~0.6s',
    },
    {
      command: 'npm run build:images',
      name: 'Images Optimizer',
      description: 'Converts master images to WebP, AVIF, and thumbnails via Sharp',
      category: 'build',
      durationEst: '~0.9s',
    },
    {
      command: 'npm run build:icons',
      name: 'SVG Icons & Sprite',
      description: 'Minifies 17 vector SVGs and compiles Dessert-icons.svg sprite',
      category: 'build',
      durationEst: '~0.5s',
    },
    {
      command: 'npm run build:favicon',
      name: 'Favicon & PWA Suite',
      description: 'Builds ICO, Apple Touch, Android Chrome, and Windows tiles',
      category: 'build',
      durationEst: '~0.7s',
    },
    {
      command: 'npm run pack:dry',
      name: 'NPM Pack Dry Run',
      description: 'Simulates tarball package creation and validates whitelist files',
      category: 'maintenance',
      durationEst: '~0.5s',
    },
    {
      command: 'npx dessert-assets help',
      name: 'CLI Binary Runner',
      description: 'Executes bin/cli.js command-line interface entry point',
      category: 'cli',
      durationEst: '~0.2s',
    },
    {
      command: 'npm run clean',
      name: 'Clean Build Dirs',
      description: 'Deletes all generated distribution folders and outputs',
      category: 'maintenance',
      durationEst: '~0.3s',
    },
  ];

  const runNpmCommand = async (script: NpmScriptRunner) => {
    setActiveCommand(script.command);
    dessertAssets.playAudioCue('click');

    const timestamp = new Date().toLocaleTimeString();
    setTerminalLogs((prev) => [
      ...prev,
      '',
      `[${timestamp}] $ ${script.command}`,
      `⚙️  Executing: ${script.description}...`,
    ]);

    await new Promise((r) => setTimeout(r, 600));

    if (script.command === 'npm test') {
      setTerminalLogs((prev) => [
        ...prev,
        '🧪 Running Dessert Assets npm test suite...',
        '  ✅ [PASS] package.json exists and is readable',
        '  ✅ [PASS] package.json name matches "dessert-assets"',
        '  ✅ [PASS] version is 1.0.0',
        '  ✅ [PASS] CLI binary entry declared in bin (dessert-assets)',
        '  ✅ [PASS] Publish whitelist (files) is defined',
        '  ✅ [PASS] favicon/site.webmanifest exists & valid JSON',
        '  ✅ [PASS] webmanifest contains valid brand name',
        '  ✅ [PASS] webmanifest has 4 valid icon declarations',
        '  ✅ [PASS] fonts/web/fonts.css exists',
        '  ✅ [PASS] fonts.css contains valid @font-face rules',
        '  ✅ [PASS] fonts.css specifies Dessert font-family',
        '  ✅ [PASS] icons/sprite/Dessert-icons.svg exists (17 symbols)',
        '  ✅ [PASS] SVG sprite contains valid XML wrapping',
        '  ✅ [PASS] LICENSE file present at assets root (MIT)',
        '========================================',
        'Test Results: 14 passed, 0 failed.',
        '========================================',
        '🎉 All npm test assertions passed successfully! Exit code 0.',
      ]);
      dessertAssets.playAudioCue('success');
    } else if (script.command === 'npm run pack:dry') {
      setTerminalLogs((prev) => [
        ...prev,
        'npm notice 📦  dessert-assets@1.0.0',
        'npm notice === Tarball Contents ===',
        'npm notice 1.1kB  LICENSE',
        'npm notice 2.4kB  README.md',
        'npm notice 2.1kB  package.json',
        'npm notice 1.4kB  bin/cli.js',
        'npm notice 873B   fonts/web/fonts.css',
        'npm notice 36.1kB fonts/web/Dessert-Regular.woff',
        'npm notice 28.4kB fonts/web/Dessert-Regular.woff2',
        'npm notice 9.4kB  icons/sprite/Dessert-icons.svg',
        'npm notice 1.2kB  favicon/site.webmanifest',
        'npm notice 1.4kB  favicon/Dessert-favicon.ico',
        'npm notice 104kB  images/optimized/Dessert-hero.webp',
        'npm notice 18kB   logos/png/Dessert-logo-full-256.png',
        'npm notice === Tarball Details ===',
        'npm notice name:          dessert-assets',
        'npm notice version:       1.0.0',
        'npm notice filename:      dessert-assets-1.0.0.tgz',
        'npm notice package size:  412.8 kB',
        'npm notice unpacked size: 1.2 MB',
        'npm notice total files:   72',
        '✅ NPM pack dry-run completed with zero packaging warnings.',
      ]);
      dessertAssets.playAudioCue('success');
    } else if (script.command === 'npx dessert-assets help') {
      setTerminalLogs((prev) => [
        ...prev,
        '🍰 Dessert Assets CLI v1.0.0',
        '',
        'Usage:',
        '  npx dessert-assets <command>',
        '',
        'Available commands:',
        '  build          Run full build pipeline (all assets)',
        '  build:fonts    Subset and convert TTF/WOFF/WOFF2 fonts',
        '  build:images   Compress WebP/AVIF/Thumbnails with Sharp',
        '  build:icons    Minify SVGs and compile SVG sprite',
        '  build:favicon  Generate complete favicon & PWA icon suite',
        '  build:logos    Export multi-resolution raster & vector logos',
        '  build:video    Transcode H.264/VP9 video & generate poster',
        '  build:audio    Encode 192k MP3 & OGG sound effects',
        '  build:css      Generate @font-face fonts.css definitions',
        '  clean          Remove all generated output directories',
        '  test           Validate integrity, manifests, and file budgets',
        '  watch          Watch master source directories for live changes',
      ]);
      dessertAssets.playAudioCue('notif');
    } else if (script.command === 'npm run clean') {
      setTerminalLogs((prev) => [
        ...prev,
        '🗑️  npm run clean: Removing generated artifacts...',
        '   ✓ fonts/subset',
        '   ✓ images/optimized',
        '   ✓ images/thumbnails',
        '   ✓ icons/sprite',
        '   ✓ favicon',
        '   ✓ logos/png',
        '   ✓ media/video/*.mp4',
        'Clean complete: All build directories reset to pristine state.',
      ]);
      dessertAssets.playAudioCue('notif');
    } else {
      setTerminalLogs((prev) => [
        ...prev,
        `🚀 Executing build target: ${script.name}...`,
        '   ✓ Verified master source assets in disk',
        '   ✓ Transformation & compression complete',
        `🎉 ${script.command} completed successfully.`,
      ]);
      dessertAssets.playAudioCue('success');
    }

    setActiveCommand(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-pink-500/10 text-pink-300 border border-pink-500/20">
                <Package className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-stone-100 tracking-tight">
                    NPM Stage: Package & Scripts Architecture
                  </h2>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                    Phase 1 (NPM Focus)
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
                  Fokus tahap NPM untuk konfigurasi <code className="text-pink-300 font-mono">package.json</code>, eksekusi skrip lifecycle (<code className="text-emerald-300 font-mono">npm test</code>, <code className="text-emerald-300 font-mono">npm run build</code>, <code className="text-emerald-300 font-mono">npm pack</code>), binary CLI, whitelist <code className="text-pink-300 font-mono">files</code>, dan aturan <code className="text-pink-300 font-mono">.npmrc</code> sebelum proses bundling.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-stone-950 px-4 py-3 rounded-xl border border-stone-800">
            <Shield className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-stone-200">NPM Package Status</div>
              <div className="text-[11px] font-mono text-emerald-400">100% Valid & Publish Ready</div>
            </div>
          </div>
        </div>

        {/* Subtabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-stone-800">
          {[
            { id: 'scripts', label: '⚡ NPM Scripts & CLI Runner', icon: <Play className="w-3.5 h-3.5" /> },
            { id: 'manifest', label: '📄 assets/package.json', icon: <FileCode className="w-3.5 h-3.5" /> },
            { id: 'exports', label: '🌐 Modern Subpath Exports', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'whitelist', label: '📦 Whitelist (files)', icon: <Package className="w-3.5 h-3.5" /> },
            { id: 'npmrc', label: '⚙️ .npmrc Config', icon: <Settings className="w-3.5 h-3.5" /> },
            { id: 'audit', label: '🛡️ Registry Audit (14/14)', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTab(tab.id as typeof selectedTab);
                dessertAssets.playAudioCue('click');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedTab === tab.id
                  ? 'bg-pink-400 text-stone-950 font-bold shadow-md shadow-pink-500/10'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/80'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: SCRIPTS RUNNER & INTERACTIVE TERMINAL */}
      {selectedTab === 'scripts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Scripts List */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider font-mono">
                Available NPM Scripts in assets/
              </h3>
              <span className="text-xs text-stone-500 font-mono">
                Click any script to execute
              </span>
            </div>

            <div className="space-y-2.5">
              {npmScripts.map((script) => {
                const isCurrentlyRunning = activeCommand === script.command;
                return (
                  <div
                    key={script.command}
                    onClick={() => !activeCommand && runNpmCommand(script)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                      isCurrentlyRunning
                        ? 'bg-pink-500/10 border-pink-400 text-pink-200 ring-2 ring-pink-400/20'
                        : 'bg-stone-900 border-stone-800 hover:border-stone-700 hover:bg-stone-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-pink-300 group-hover:text-pink-200 bg-stone-950 px-2.5 py-1 rounded-md border border-stone-800">
                          {script.command}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                          {script.durationEst}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-medium text-stone-500 group-hover:text-pink-300 flex items-center gap-1">
                        {isCurrentlyRunning ? (
                          <span className="text-pink-400 animate-pulse">Running...</span>
                        ) : (
                          <>
                            Run <Play className="w-3 h-3" />
                          </>
                        )}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-stone-300 font-medium">
                      {script.name}
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                      {script.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Terminal Output */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Terminal className="w-4 h-4 text-pink-300" />
                NPM Console Output
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(terminalLogs.join('\n'), 'terminal')}
                  className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] text-stone-400 hover:text-stone-200 flex items-center gap-1.5"
                >
                  {copied === 'terminal' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
                <button
                  onClick={() => setTerminalLogs(['✨ Terminal cleared. Ready for next npm command.'])}
                  className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] text-stone-400 hover:text-stone-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>
              </div>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 font-mono text-xs text-stone-300 h-[520px] overflow-y-auto space-y-1.5 shadow-inner">
              {terminalLogs.map((log, index) => {
                const isHeader = log.startsWith('===') || log.startsWith('🧪') || log.startsWith('🍰') || log.startsWith('npm notice ===');
                const isPass = log.includes('[PASS]') || log.includes('passed successfully') || log.includes('✓');
                const isCommand = log.startsWith('[');

                return (
                  <div
                    key={index}
                    className={`leading-relaxed whitespace-pre-wrap ${
                      isHeader
                        ? 'text-pink-300 font-bold pt-1 pb-0.5'
                        : isPass
                        ? 'text-emerald-400 font-semibold'
                        : isCommand
                        ? 'text-amber-300 font-semibold'
                        : 'text-stone-400'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANIFEST VIEWER */}
      {selectedTab === 'manifest' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div>
              <h3 className="text-base font-bold text-stone-100 font-mono flex items-center gap-2">
                <span>assets/package.json</span>
                <span className="text-xs px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                  Standard CommonJS Library
                </span>
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Lengkap dengan declaration binary CLI, subpath exports, whitelist files, dan dependensi pipeline.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(`{
  "name": "dessert-assets",
  "version": "1.0.0",
  "description": "Complete build pipeline for all Dessert assets — fonts, images, icons, favicon, logos, media, docs",
  "main": "index.js",
  "types": "index.d.ts",
  "type": "commonjs",
  "bin": {
    "dessert-assets": "./bin/cli.js"
  },
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "require": "./index.js",
      "import": "./index.js"
    },
    "./fonts": "./fonts/web/fonts.css",
    "./icons": "./icons/sprite/Dessert-icons.svg",
    "./favicon": "./favicon/site.webmanifest",
    "./package.json": "./package.json"
  },
  "files": [
    "bin",
    "fonts/web",
    "fonts/subset",
    "images/optimized",
    "images/thumbnails",
    "images/backgrounds",
    "icons/svg",
    "icons/sprite",
    "icons/png",
    "icons/font-icons",
    "favicon",
    "logos/svg",
    "logos/png",
    "media/video/*.mp4",
    "media/video/*.webm",
    "media/video/*.jpg",
    "media/audio/*.mp3",
    "media/audio/*.ogg",
    "docs",
    "scripts",
    "index.js",
    "index.d.ts",
    "LICENSE",
    "README.md"
  ],
  "scripts": {
    "build":         "node scripts/build-all.js",
    "build:fonts":   "node scripts/build-fonts.js",
    "build:images":  "node scripts/build-images.js",
    "build:icons":   "node scripts/build-icons.js",
    "build:favicon": "node scripts/build-favicon.js",
    "build:logos":   "node scripts/build-logos.js",
    "build:video":   "node scripts/build-video.js",
    "build:audio":   "node scripts/build-audio.js",
    "build:css":     "node scripts/build-css.js",
    "clean":         "node scripts/clean.js",
    "rebuild":       "npm run clean && npm run build",
    "test":          "node scripts/test.js",
    "pack:dry":      "npm pack --dry-run",
    "watch":         "node scripts/watch.js",
    "prepublishOnly": "npm test"
  },
  "dependencies": {
    "fontmin": "^1.0.0",
    "sharp": "^0.33.0",
    "svgo": "^3.0.0",
    "fluent-ffmpeg": "^2.1.2",
    "ffmpeg-static": "^5.2.0",
    "pwa-asset-generator": "^6.3.1",
    "chokidar": "^3.6.0",
    "chalk": "^4.1.2",
    "ora": "^5.4.1",
    "fs-extra": "^11.2.0",
    "glob": "^10.3.0"
  },
  "keywords": [
    "dessert", "assets", "fonts", "images", "icons", "favicon", "logos", "media", "build", "pipeline"
  ],
  "author": "Dessert Project",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  }
}`, 'manifest')}
              className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs font-mono text-stone-300 hover:text-pink-300 hover:border-pink-500/30 flex items-center gap-2"
            >
              {copied === 'manifest' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              Copy package.json
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-200 overflow-x-auto leading-relaxed max-h-[500px]">
{`{
  "name": "dessert-assets",
  "version": "1.0.0",
  "description": "Complete build pipeline for all Dessert assets — fonts, images, icons, favicon, logos, media, docs",
  "main": "index.js",
  "types": "index.d.ts",
  "type": "commonjs",
  "bin": {
    "dessert-assets": "./bin/cli.js"
  },
  "exports": {
    ".": {
      "types": "./index.d.ts",
      "require": "./index.js",
      "import": "./index.js"
    },
    "./fonts": "./fonts/web/fonts.css",
    "./icons": "./icons/sprite/Dessert-icons.svg",
    "./favicon": "./favicon/site.webmanifest",
    "./package.json": "./package.json"
  },
  "files": [
    "bin",
    "fonts/web",
    "fonts/subset",
    "images/optimized",
    "images/thumbnails",
    "images/backgrounds",
    "icons/svg",
    "icons/sprite",
    "icons/png",
    "icons/font-icons",
    "favicon",
    "logos/svg",
    "logos/png",
    "media/video/*.mp4",
    "media/video/*.webm",
    "media/video/*.jpg",
    "media/audio/*.mp3",
    "media/audio/*.ogg",
    "docs",
    "scripts",
    "index.js",
    "index.d.ts",
    "LICENSE",
    "README.md"
  ],
  "scripts": {
    "build":         "node scripts/build-all.js",
    "build:fonts":   "node scripts/build-fonts.js",
    "build:images":  "node scripts/build-images.js",
    "build:icons":   "node scripts/build-icons.js",
    "build:favicon": "node scripts/build-favicon.js",
    "build:logos":   "node scripts/build-logos.js",
    "build:video":   "node scripts/build-video.js",
    "build:audio":   "node scripts/build-audio.js",
    "build:css":     "node scripts/build-css.js",
    "clean":         "node scripts/clean.js",
    "rebuild":       "npm run clean && npm run build",
    "test":          "node scripts/test.js",
    "pack:dry":      "npm pack --dry-run",
    "watch":         "node scripts/watch.js",
    "prepublishOnly": "npm test"
  },
  "dependencies": {
    "fontmin": "^1.0.0",
    "sharp": "^0.33.0",
    "svgo": "^3.0.0",
    "fluent-ffmpeg": "^2.1.2",
    "ffmpeg-static": "^5.2.0",
    "pwa-asset-generator": "^6.3.1",
    "chokidar": "^3.6.0",
    "chalk": "^4.1.2",
    "ora": "^5.4.1",
    "fs-extra": "^11.2.0",
    "glob": "^10.3.0"
  },
  "keywords": [
    "dessert", "assets", "fonts", "images", "icons", "favicon", "logos", "media", "build", "pipeline"
  ],
  "author": "Dessert Project",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  }
}`}
          </pre>
        </div>
      )}

      {/* TAB 3: SUBPATH EXPORTS */}
      {selectedTab === 'exports' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-5">
          <div className="pb-3 border-b border-stone-800">
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-pink-300" />
              Modern Subpath Exports Map
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Memungkinkan aplikasi frontend dan backend mengimpor sub-modul aset secara langsung tanpa harus menavigasi struktur folder internal yang rentan pecah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                spec: 'import "@dessert/assets/fonts"',
                target: './fonts/web/fonts.css',
                desc: 'Mengimpor definisi @font-face Dessert langsung ke entry point CSS/TSX aplikasi.',
              },
              {
                spec: 'import icons from "@dessert/assets/icons"',
                target: './icons/sprite/Dessert-icons.svg',
                desc: 'Mengakses file SVG symbol sprite untuk tag <use href="...">.',
              },
              {
                spec: 'import manifest from "@dessert/assets/favicon"',
                target: './favicon/site.webmanifest',
                desc: 'Memuat konfigurasi Web App Manifest & ikon PWA.',
              },
              {
                spec: 'import assets from "@dessert/assets"',
                target: './index.js & ./index.d.ts',
                desc: 'Entry point modul JavaScript/TypeScript dengan helper fungsi resolusi path aset.',
              },
            ].map((exp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="font-mono text-xs font-bold text-emerald-400">
                  {exp.spec}
                </div>
                <div className="font-mono text-[11px] text-pink-300/90 bg-stone-900/80 px-2 py-1 rounded">
                  ➡️ {exp.target}
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PUBLISH WHITELIST (FILES) */}
      {selectedTab === 'whitelist' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-5">
          <div className="pb-3 border-b border-stone-800">
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <Package className="w-4 h-4 text-pink-300" />
              NPM Whitelist Files Filter
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Field <code className="text-pink-300 font-mono">"files"</code> memastikan aset mentah berukuran besar (.psd, .ai, .sketch, file pengujian) tidak ikut terunggah ke NPM registry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-stone-950 border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                <CheckCircle2 className="w-4 h-4" />
                DIPUBLIKASIKAN KE NPM (Distribusi Bersih)
              </div>
              <ul className="text-xs font-mono text-stone-300 space-y-1.5 list-disc list-inside">
                <li><code className="text-stone-100">bin/</code> (CLI executable runner)</li>
                <li><code className="text-stone-100">fonts/web/</code> (WOFF & WOFF2 webfonts)</li>
                <li><code className="text-stone-100">fonts/subset/</code> (Subsets font)</li>
                <li><code className="text-stone-100">images/optimized/</code> (WebP & AVIF)</li>
                <li><code className="text-stone-100">icons/svg/</code> & <code className="text-stone-100">icons/sprite/</code></li>
                <li><code className="text-stone-100">favicon/</code> (ICO, Apple Touch, Manifest)</li>
                <li><code className="text-stone-100">logos/svg/</code> & <code className="text-stone-100">logos/png/</code></li>
                <li><code className="text-stone-100">media/audio/*.mp3</code> & <code className="text-stone-100">*.ogg</code></li>
                <li><code className="text-stone-100">index.js</code> & <code className="text-stone-100">index.d.ts</code></li>
                <li><code className="text-stone-100">LICENSE</code> & <code className="text-stone-100">README.md</code></li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                <AlertCircle className="w-4 h-4" />
                DIKECUALIKAN DARI REGISTRY (Private Source)
              </div>
              <ul className="text-xs font-mono text-stone-400 space-y-1.5 list-disc list-inside">
                <li><code className="text-stone-300">fonts/raw/*.ttf</code> (Master fonts)</li>
                <li><code className="text-stone-300">images/raw/*.psd, *.ai</code> (Master design)</li>
                <li><code className="text-stone-300">logos/source/*.fig, *.sketch</code> (Source files)</li>
                <li><code className="text-stone-300">media/video/raw/</code> & <code className="text-stone-300">audio/raw/</code> (Lossless raw)</li>
                <li><code className="text-stone-300">node_modules/</code> & build caches</li>
                <li><code className="text-stone-300">.git/</code> & temporary files</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: NPMRC CONFIG */}
      {selectedTab === 'npmrc' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="pb-3 border-b border-stone-800">
            <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-pink-300" />
              assets/.npmrc Policy Enforcement
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Pengaturan deterministik pada level folder package untuk menjamin versi dependensi stabil dan bebas konflik engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                directive: 'save-exact=true',
                purpose: 'Mengunci dependensi pada versi eksak (misal: "0.33.0" bukan "^0.33.0"), mencegah breaking changes yang tidak terduga saat build di CI/CD.',
              },
              {
                directive: 'engine-strict=true',
                purpose: 'Memaksa proses npm install gagal jika versi Node.js di server kurang dari 18.0.0 (karena Sharp dan Fluent-FFmpeg membutuhkan Node >= 18).',
              },
              {
                directive: 'fund=false',
                purpose: 'Menonaktifkan pesan "please fund" di terminal agar log build CI/CD tetap bersih dan mudah diparse.',
              },
              {
                directive: 'audit=false',
                purpose: 'Mempercepat waktu npm install pada container build pipeline tanpa memblokir proses build lokal.',
              },
            ].map((rule, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="font-mono text-xs font-bold text-pink-300">
                  {rule.directive}
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {rule.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: AUDIT SCORECARD */}
      {selectedTab === 'audit' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div>
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                NPM Publish Readiness Audit (14/14 Passed)
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Semua checklist kepatuhan standar paket NPM telah terpenuhi 100%.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Grade: A+ (Ready)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: 'Package Manifest', desc: 'Valid JSON, correct name & version 1.0.0' },
              { title: 'CLI Executable', desc: 'bin/cli.js with #!/usr/bin/env node' },
              { title: 'Subpath Exports', desc: 'Conditional exports for fonts, icons & manifest' },
              { title: 'Whitelist Filters', desc: 'Only optimized web assets published' },
              { title: 'TypeScript Typings', desc: 'index.d.ts definitions included' },
              { title: 'License File', desc: 'Standard MIT LICENSE at package root' },
              { title: 'README Documentation', desc: 'Comprehensive guide in assets/README.md' },
              { title: 'Deterministic .npmrc', desc: 'save-exact & engine-strict active' },
              { title: 'Test Automation', desc: 'npm test script with 14 assertions' },
              { title: 'Web Manifest', desc: 'Valid JSON with icons array & brand name' },
              { title: 'CSS Font-Face', desc: 'Valid fonts.css with swap display' },
              { title: 'SVG Sprite Integrity', desc: '17 symbols with unique IDs & valid XML' },
            ].map((audit, i) => (
              <div key={i} className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-stone-200">{audit.title}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{audit.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default NpmStageInspector;

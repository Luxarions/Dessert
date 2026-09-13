import React, { useState } from 'react';
import { DESSERT_FONTS, DESSERT_ICONS } from '../data/pipelineData';
import { dessertAssets, DessertIconId, LogoVariant, ImageName, ImageFormat } from '../services/DessertAssetService';
import {
  Type,
  Sparkles,
  Volume2,
  Video,
  Copy,
  Check,
  Download,
  Eye,
  Sliders,
  Layers,
  Smartphone,
  CheckCircle2,
  ExternalLink,
  Code2,
  Terminal,
  ShieldCheck,
  Play
} from 'lucide-react';

export const AssetShowroom: React.FC = () => {
  const [subTab, setSubTab] = useState<'fonts' | 'icons' | 'logos' | 'favicons' | 'media' | 'integration'>('fonts');

  // Font workbench state
  const [fontText, setFontText] = useState(
    'French Raspberry Tartlet with Vanilla Bean Crème Pâtissière & Gold Leaf'
  );
  const [fontSize, setFontSize] = useState(32);
  const [activeFontVariant, setActiveFontVariant] = useState(0);

  // Icon modal / selection state
  const [selectedIcon, setSelectedIcon] = useState(DESSERT_ICONS[0]);
  const [copiedIconCode, setCopiedIconCode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIconCode(true);
    setTimeout(() => setCopiedIconCode(false), 2000);
  };

  const downloadSvgIcon = (icon: typeof DESSERT_ICONS[0]) => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n  <path d="${icon.svgPath}" />\n</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = icon.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-900 border border-stone-800 p-2.5 rounded-2xl shadow-md">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'fonts', label: '🔤 Typography & Subsetting', icon: <Type className="w-4 h-4" /> },
            { id: 'icons', label: '🎨 Vector Icons & Sprite', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'logos', label: '🍰 Brand Logos Suite', icon: <Layers className="w-4 h-4" /> },
            { id: 'favicons', label: '🎯 Favicons & PWA Icons', icon: <Smartphone className="w-4 h-4" /> },
            { id: 'media', label: '🎬 Audio & Video Studio', icon: <Volume2 className="w-4 h-4" /> },
            { id: 'integration', label: '🔌 Public vs Private Calls', icon: <Code2 className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as typeof subTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                subTab === tab.id
                  ? 'bg-pink-400 text-stone-950 font-semibold shadow-md shadow-pink-500/10'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="text-xs text-stone-500 font-mono hidden sm:block px-3">
          Output: <span className="text-pink-300">assets/*</span>
        </div>
      </div>

      {/* TAB 1: FONTS & SUBSETTING */}
      {subTab === 'fonts' && (
        <div className="space-y-6">
          {/* Font Controls & Interactive Specimen */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-800">
              <div>
                <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                  <span>Dessert Web Font Suite</span>
                  <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                    WOFF2 & WOFF + fontmin subset
                  </span>
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Subsetting reduced the raw 148 KB TTF down to a blazing-fast 28.4 KB WOFF2 (~81% bandwidth savings).
                </p>
              </div>

              {/* Variant selector */}
              <div className="flex items-center gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800">
                {DESSERT_FONTS.map((font, idx) => (
                  <button
                    key={font.name}
                    onClick={() => setActiveFontVariant(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeFontVariant === idx
                        ? 'bg-stone-800 text-pink-300 shadow-sm border border-stone-700'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {font.name.replace('Dessert ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Specimen Playground */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-pink-300" />
                  Font Size: {fontSize}px
                </span>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-48 accent-pink-400 cursor-pointer"
                />
              </div>

              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setFontText(e.currentTarget.textContent || fontText)}
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: DESSERT_FONTS[activeFontVariant].weight,
                  fontStyle: DESSERT_FONTS[activeFontVariant].style,
                  lineHeight: 1.4,
                }}
                className="w-full p-6 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-pink-400 transition-all cursor-text min-h-[120px] font-sans"
              >
                {fontText}
              </div>
            </div>

            {/* Subsetting Glyph Matrix */}
            <div className="pt-4 border-t border-stone-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono mb-3">
                Included Subsetted Glyphs (Latin Basic + Currency + Diacritics)
              </h4>
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 font-mono text-xs text-stone-300 leading-loose break-all select-all">
                abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 .,!?@#$%&*()[]{}-_+=/\:;'&lt;&gt;`~^ éèêëàâäôöûüçñ €£¥$¢₹ ©®™°±×÷←→↑↓•…
              </div>
            </div>
          </div>

          {/* Generated fonts.css Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-stone-100 font-mono">
                  fonts/web/fonts.css (Auto-Generated)
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Compiled by <code className="text-pink-300">build-css.js</code> with <code className="text-pink-300">font-display: swap</code>
                </p>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(`@font-face {
  font-family: 'Dessert';
  src: url('fonts/web/Dessert-Regular.woff2') format('woff2'),
       url('fonts/web/Dessert-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}`)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all"
              >
                {copiedIconCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy @font-face</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 overflow-x-auto">
{`@font-face {
  font-family: 'Dessert';
  src: url('Dessert-Regular.woff2') format('woff2'),
       url('Dessert-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Dessert';
  src: url('Dessert-Bold.woff2') format('woff2'),
       url('Dessert-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: ICONS & SPRITE */}
      {subTab === 'icons' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Icon Grid */}
            <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                    <span>Dessert Vector Icon Library</span>
                    <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                      17 SVGs Minified
                    </span>
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Compiled into <code className="text-pink-300">icons/sprite/Dessert-icons.svg</code> with individual &lt;symbol&gt; elements.
                  </p>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {DESSERT_ICONS.map((icon) => {
                  const isSelected = selectedIcon.id === icon.id;
                  return (
                    <button
                      key={icon.id}
                      onClick={() => {
                        setSelectedIcon(icon);
                        dessertAssets.playAudioCue('click');
                      }}
                      className={`p-3.5 rounded-xl flex flex-col items-center justify-center gap-2 transition-all border text-center ${
                        isSelected
                          ? 'bg-pink-500/20 border-pink-400 text-pink-200 ring-2 ring-pink-400/20 shadow-md'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:bg-stone-800/80 hover:text-stone-100'
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                      >
                        <path d={icon.svgPath} />
                      </svg>
                      <span className="text-[11px] font-mono truncate max-w-full font-medium">
                        {icon.id}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Icon Inspector */}
            <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <h4 className="text-sm font-bold text-stone-100 font-mono">
                    Icon Inspector: {selectedIcon.filename}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">
                    viewBox 0 0 24 24
                  </span>
                </div>

                {/* Big Preview with checkerboard */}
                <div className="my-5 p-8 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFB6C1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 relative z-10"
                  >
                    <path d={selectedIcon.svgPath} />
                  </svg>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-stone-500 font-mono block">Purpose:</span>
                    <span className="text-stone-300">{selectedIcon.description}</span>
                  </div>

                  <div>
                    <span className="text-stone-500 font-mono block">SVG Sprite Usage:</span>
                    <pre className="p-2.5 rounded bg-stone-950 border border-stone-800 text-pink-300 font-mono text-[11px] overflow-x-auto mt-1">
{`<svg class="icon">
  <use href="Dessert-icons.svg#${selectedIcon.symbolId}" />
</svg>`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 border-t border-stone-800">
                <button
                  onClick={() =>
                    copyToClipboard(`<svg viewBox="0 0 24 24"><use href="Dessert-icons.svg#${selectedIcon.symbolId}" /></svg>`)
                  }
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 transition-all"
                >
                  {copiedIconCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Code</span>
                </button>

                <button
                  onClick={() => downloadSvgIcon(selectedIcon)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-pink-400 hover:bg-pink-300 text-stone-950 transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download SVG</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOGOS */}
      {subTab === 'logos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Logo Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h4 className="text-sm font-bold text-stone-100 font-mono">
                Dessert-logo-full.svg (Master Brandmark)
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">
                256, 512, 1024px PNG
              </span>
            </div>

            <div className="p-8 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-pink-300 text-stone-950 flex items-center justify-center text-2xl font-bold shadow-lg">
                  🍰
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight text-stone-100 font-serif">
                    Dessert
                  </div>
                  <div className="text-[10px] tracking-widest text-pink-300 uppercase font-mono">
                    Artisanal Patisserie
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-stone-400 space-y-1">
              <p>• Vector source: <code className="text-stone-300">assets/logos/svg/Dessert-logo-full.svg</code></p>
              <p>• Generated PNGs: <code className="text-stone-300">Dessert-logo-full-256.png</code>, <code className="text-stone-300">512.png</code>, <code className="text-stone-300">1024.png</code></p>
            </div>
          </div>

          {/* Icon Mark Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h4 className="text-sm font-bold text-stone-100 font-mono">
                Dessert-logo-icon.svg (App Emblem)
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">
                512px Transparent PNG
              </span>
            </div>

            <div className="p-8 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 text-stone-950 flex items-center justify-center text-4xl shadow-xl ring-2 ring-pink-300/30">
                🍰
              </div>
            </div>

            <div className="text-xs text-stone-400 space-y-1">
              <p>• Vector source: <code className="text-stone-300">assets/logos/svg/Dessert-logo-icon.svg</code></p>
              <p>• Transparent PNG: <code className="text-stone-300">assets/logos/png/Dessert-logo-transparent.png</code></p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FAVICONS & PWA */}
      {subTab === 'favicons' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-6">
          <div>
            <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
              <span>Favicon & PWA Suite Matrix</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                All Formats Ready
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Generated by <code className="text-pink-300">build-favicon.js</code> for iOS, Android, and desktop browser tab bars.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { size: '16x16', name: 'Browser Tab', file: 'Dessert-favicon-16x16.png', px: 'w-6 h-6' },
              { size: '32x32', name: 'Retina Tab', file: 'Dessert-favicon-32x32.png', px: 'w-8 h-8' },
              { size: '180x180', name: 'Apple Touch', file: 'Dessert-apple-touch-icon.png', px: 'w-12 h-12' },
              { size: '192x192', name: 'Android Chrome', file: 'Dessert-android-chrome-192.png', px: 'w-14 h-14' },
              { size: '512x512', name: 'PWA Splash', file: 'Dessert-android-chrome-512.png', px: 'w-16 h-16' },
              { size: '150x150', name: 'Windows Tile', file: 'Dessert-mstile-150x150.png', px: 'w-12 h-12' },
            ].map((fav) => (
              <div
                key={fav.size}
                className="bg-stone-950 p-4 rounded-xl border border-stone-800 flex flex-col items-center text-center space-y-3"
              >
                <div className="h-16 flex items-center justify-center">
                  <div
                    className={`${fav.px} rounded-lg bg-pink-300 text-stone-950 flex items-center justify-center font-bold text-xs shadow`}
                  >
                    🍰
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-200">{fav.size}</div>
                  <div className="text-[10px] text-stone-500 truncate max-w-full font-mono mt-0.5">
                    {fav.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Manifest Snippet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-800">
            <div>
              <span className="text-xs font-bold font-mono text-stone-300 block mb-2">
                favicon/site.webmanifest
              </span>
              <pre className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-emerald-300 overflow-x-auto">
{`{
  "name": "Dessert App",
  "short_name": "Dessert",
  "theme_color": "#FFB6C1",
  "background_color": "#FFFFFF",
  "display": "standalone"
}`}
              </pre>
            </div>

            <div>
              <span className="text-xs font-bold font-mono text-stone-300 block mb-2">
                favicon/browserconfig.xml
              </span>
              <pre className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
{`<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="Dessert-mstile-150x150.png"/>
      <TileColor>#FFB6C1</TileColor>
    </tile>
  </msapplication>
</browserconfig>`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MEDIA & AUDIO */}
      {subTab === 'media' && (
        <div className="space-y-6">
          {/* Audio Soundboard */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div>
              <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                <span>Dessert Audio Cues Soundboard</span>
                <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                  build-audio.js (192k MP3 & OGG)
                </span>
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Click any cue below to test the genuine audio output synthesized in real time via Web Audio API.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { type: 'notif', name: 'Dessert-notif.mp3', label: 'Sweet Bell Chime', desc: 'Bell alert for fresh pastry notifications' },
                { type: 'click', name: 'Dessert-click.mp3', label: 'Soft Bubble Tap', desc: 'Light tactile tap on navigation & buttons' },
                { type: 'success', name: 'Dessert-success.mp3', label: 'Harmonic Arpeggio', desc: 'Sweet chord on order placement' },
                { type: 'error', name: 'Dessert-error.mp3', label: 'Gentle Low Buzz', desc: 'Warning cue for sold out items' },
              ].map((sound) => (
                <button
                  key={sound.type}
                  id={`btn-sound-${sound.type}`}
                  onClick={() => dessertAssets.playAudioCue(sound.type as 'notif' | 'click' | 'success' | 'error')}
                  className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-pink-400 hover:bg-stone-800/60 transition-all text-left group active:scale-95 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 group-hover:bg-pink-400 group-hover:text-stone-950 transition-colors">
                      <Volume2 className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 uppercase">Play</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-200 group-hover:text-pink-200">
                      {sound.label}
                    </div>
                    <div className="text-[11px] font-mono text-pink-300/80 mt-0.5">
                      {sound.name}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1">
                      {sound.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Video Poster Preview */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h4 className="text-sm font-bold text-stone-100 font-mono">
                media/video/Dessert-intro (H.264 MP4 + VP9 WebM + Poster)
              </h4>
              <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">
                build-video.js
              </span>
            </div>

            <div className="aspect-video w-full rounded-xl bg-stone-950 border border-stone-800 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />
              <div className="relative z-10 text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-pink-400 text-stone-950 flex items-center justify-center shadow-xl mx-auto ring-4 ring-pink-400/20">
                  <Video className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-stone-200">Dessert-intro-poster.jpg</div>
                <div className="text-xs text-stone-400 font-mono">
                  1280x720 • Timestamp 00:00:01 • Faststart Flag Active
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: INTEGRATION PATTERNS (PUBLIC VS PRIVATE) */}
      {subTab === 'integration' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-pink-500/10 text-pink-300 border border-pink-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-100">
                  Asset Calling Architecture: Public Path vs Private Encapsulation
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Bagaimana <code className="text-pink-300 font-mono">index.html</code> dan komponen di <code className="text-pink-300 font-mono">src/</code> seharusnya memanggil aset secara baku dan aman.
                </p>
              </div>
            </div>
          </div>

          {/* 2-Column Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* HTML Column */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <h4 className="text-sm font-bold text-stone-100 font-mono">
                    1. index.html (Public Static Path)
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Public Root Access
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                File <code className="text-stone-200">index.html</code> dieksekusi browser sebelum bundler JavaScript aktif. Karena itu, aset harus dipanggil langsung via path statis publik:
              </p>
              <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 font-mono text-[11px] text-pink-200 overflow-x-auto leading-relaxed">
{`<!-- index.html -->
<head>
  <!-- Favicon Standar -->
  <link rel="icon" type="image/x-icon" 
        href="/favicon/Dessert-favicon.ico" />
  
  <!-- Apple Touch & PWA Manifest -->
  <link rel="apple-touch-icon" sizes="180x180" 
        href="/favicon/Dessert-apple-touch-icon-180x180.png" />
  <link rel="manifest" 
        href="/favicon/site.webmanifest" />
  
  <!-- Auto-generated Web Fonts CSS -->
  <link rel="stylesheet" 
        href="/fonts/web/fonts.css" />
</head>`}
              </pre>
              <div className="text-[11px] text-stone-400 bg-stone-950/60 p-3 rounded-lg border border-stone-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Keuntungan:</strong> Browser dapat mem-preload favicon dan webfont saat HTML parsing, tanpa menunggu JS bundle diunduh.
                </span>
              </div>
            </div>

            {/* React / src Column */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
                  <h4 className="text-sm font-bold text-stone-100 font-mono">
                    2. src/ (Private Encapsulated Service)
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                  Encapsulated Helper
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Di dalam <code className="text-stone-200">src/</code>, jangan hardcode path string mentah. Gunakan modul layanan privat <code className="text-pink-300 font-mono">dessertAssets</code> yang bertipe ketat (type-safe):
              </p>
              <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
{`// src/components/CartButton.tsx
import { dessertAssets } from '../services/DessertAssetService';

export function CartButton() {
  const handleClick = () => {
    // 🔊 Memutar audio cue terenkapsulasi
    dessertAssets.playAudioCue('click');
  };

  return (
    <button onClick={handleClick}>
      {/* 🎨 Memanggil SVG sprite secara modular */}
      <svg className="w-5 h-5">
        <use href={dessertAssets.getIconSpriteHref('cart')} />
      </svg>
      Checkout
    </button>
  );
}`}
              </pre>
              <div className="text-[11px] text-stone-400 bg-stone-950/60 p-3 rounded-lg border border-stone-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Keuntungan:</strong> Autocomplete TypeScript, sanitasi otomatis, fallback synthesizer jika audio belum ada, dan bebas typo.
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Live Playground of dessertAssets */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h4 className="text-sm font-bold text-stone-100 font-mono flex items-center gap-2">
                <Play className="w-4 h-4 text-pink-300" />
                Live Test: Internal Method Resolvers (dessertAssets)
              </h4>
              <span className="text-xs text-stone-500 font-mono">
                Click to inspect resolved paths & trigger methods
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                {
                  title: 'getIconSpriteHref("cart")',
                  result: dessertAssets.getIconSpriteHref('cart'),
                  action: () => dessertAssets.playAudioCue('click'),
                  badge: 'Icon Sprite',
                },
                {
                  title: 'getLogoSvgUrl("full")',
                  result: dessertAssets.getLogoSvgUrl('full'),
                  action: () => dessertAssets.playAudioCue('click'),
                  badge: 'Vector Logo',
                },
                {
                  title: 'getImageUrl("hero", "webp")',
                  result: dessertAssets.getImageUrl('hero', 'webp'),
                  action: () => dessertAssets.playAudioCue('click'),
                  badge: 'Sharp Image',
                },
                {
                  title: 'playAudioCue("success")',
                  result: 'Triggers audio synthesis',
                  action: () => dessertAssets.playAudioCue('success'),
                  badge: 'Audio Cue',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={item.action}
                  className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-pink-400 hover:bg-stone-900/60 transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-400 group-hover:bg-pink-400 group-hover:text-stone-950 transition-colors">
                      {item.badge}
                    </span>
                    <Play className="w-3 h-3 text-stone-500 group-hover:text-pink-300 transition-colors" />
                  </div>
                  <div className="text-xs font-mono font-bold text-stone-200 group-hover:text-pink-200 truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 truncate">
                    {item.result}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

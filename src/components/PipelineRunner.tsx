import React, { useState, useEffect, useRef } from 'react';
import { BUILD_STEPS, playDessertSound } from '../data/pipelineData';
import { BuildStepId, TerminalLogLine } from '../types';
import {
  Play,
  RotateCcw,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Layers,
  ChevronRight,
  Terminal as TerminalIcon,
  AlertCircle
} from 'lucide-react';

interface PipelineRunnerProps {
  logs: TerminalLogLine[];
  setLogs: React.Dispatch<React.SetStateAction<TerminalLogLine[]>>;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  onIncrementBuildCount: () => void;
}

export const PipelineRunner: React.FC<PipelineRunnerProps> = ({
  logs,
  setLogs,
  isRunning,
  setIsRunning,
  onIncrementBuildCount,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isWatchMode, setIsWatchMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copiedLogs, setCopiedLogs] = useState<boolean>(false);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const addLog = (
    type: TerminalLogLine['type'],
    text: string,
    meta?: TerminalLogLine['meta']
  ) => {
    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: getTimestamp(),
        type,
        text,
        meta,
      },
    ]);
  };

  useEffect(() => {
    if (autoScroll && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  // Execute single step simulation
  const runSingleStep = async (stepId: BuildStepId) => {
    if (isRunning) return;

    if (soundEnabled) playDessertSound('click');
    setIsRunning(true);

    if (stepId === 'clean') {
      addLog('header', '🗑️  Cleaning generated files');
      addLog('info', 'Scanning build output directories...');
      await new Promise((r) => setTimeout(r, 400));
      addLog('success', 'Removed folder: fonts/subset');
      addLog('success', 'Removed folder: images/optimized');
      addLog('success', 'Removed folder: images/thumbnails');
      addLog('success', 'Removed folder: icons/sprite');
      addLog('success', 'Removed folder: favicon');
      addLog('success', 'Removed folder: logos/png');
      addLog('success', 'Cleaned files in: fonts/web');
      addLog('success', 'Clean complete: 10 locations processed');
      addLog('blank', '');
      if (soundEnabled) playDessertSound('notif');
      setIsRunning(false);
      return;
    }

    const step = BUILD_STEPS.find((s) => s.id === stepId);
    if (!step) {
      setIsRunning(false);
      return;
    }

    addLog('header', `Running ${step.name} Pipeline (${step.script})`);
    addLog('info', step.description);

    const stepStart = Date.now();
    await simulateStepWork(step);
    const duration = ((Date.now() - stepStart) / 1000).toFixed(2);

    addLog('success', `${step.name} finished successfully in ${duration}s`);
    addLog('blank', '');
    if (soundEnabled) playDessertSound('success');
    setIsRunning(false);
  };

  // Helper simulating file-by-file output
  const simulateStepWork = async (step: typeof BUILD_STEPS[0]) => {
    if (step.id === 'fonts') {
      addLog('info', 'Found 4 master font files in fonts/raw/');
      await new Promise((r) => setTimeout(r, 200));
      addLog('item', 'Processing Dessert-Regular.ttf (Glyph subsetting)...');
      await new Promise((r) => setTimeout(r, 250));
      addLog('success', '   Dessert-Regular.woff (36.1 KB)');
      addLog('success', '   Dessert-Regular.woff2 (28.4 KB)');
      addLog('item', 'Processing Dessert-Bold.ttf (Glyph subsetting)...');
      await new Promise((r) => setTimeout(r, 250));
      addLog('success', '   Dessert-Bold.woff (37.2 KB)');
      addLog('success', '   Dessert-Bold.woff2 (29.1 KB)');
      addLog('item', 'Processing Dessert-Italic.ttf (Glyph subsetting)...');
      await new Promise((r) => setTimeout(r, 250));
      addLog('success', '   Dessert-Italic.woff (36.4 KB)');
      addLog('success', '   Dessert-Italic.woff2 (28.6 KB)');
      addLog('item', 'Processing Dessert-BoldItalic.ttf (Glyph subsetting)...');
      await new Promise((r) => setTimeout(r, 250));
      addLog('success', '   Dessert-BoldItalic.woff (38.0 KB)');
      addLog('success', '   Dessert-BoldItalic.woff2 (30.2 KB)');
    } else if (step.id === 'images') {
      addLog('info', 'Optimizing raw images with sharp (WebP q80, AVIF q65, JPG q82)...');
      await new Promise((r) => setTimeout(r, 300));
      addLog('item', 'Transcoding Dessert-hero.jpg...');
      await new Promise((r) => setTimeout(r, 300));
      addLog('success', '   Dessert-hero.webp (104 KB - saved 44%)');
      addLog('success', '   Dessert-hero.avif (72 KB - saved 61%)');
      addLog('success', '   Dessert-hero.jpg (186 KB progressive fallback)');
      addLog('success', '   Dessert-hero-thumb.webp (14 KB 300x300 cover)');
      addLog('item', 'Transcoding Dessert-product.png...');
      await new Promise((r) => setTimeout(r, 300));
      addLog('success', '   Dessert-product.webp (82 KB - saved 52%)');
      addLog('success', '   Dessert-product.avif (56 KB - saved 68%)');
      addLog('success', '   Dessert-product-thumb.webp (12 KB 300x300 cover)');
    } else if (step.id === 'icons') {
      addLog('info', 'Minifying 17 SVG icons with SVGO multipass plugin...');
      await new Promise((r) => setTimeout(r, 250));
      addLog('debug', 'Sanitized xmlns & viewBox 0 0 24 24 for all 17 glyphs');
      addLog('success', 'Sprite generated: Dessert-icons.svg (17 symbols, 9.4 KB)');
      addLog('info', 'Rendering multi-resolution PNG fallbacks...');
      await new Promise((r) => setTimeout(r, 250));
      addLog('success', '   Dessert-home exported in 4 sizes (16, 32, 64, 128px)');
      addLog('success', '   Dessert-user exported in 4 sizes (16, 32, 64, 128px)');
      addLog('success', '   Dessert-cart exported in 4 sizes (16, 32, 64, 128px)');
    } else if (step.id === 'favicon') {
      addLog('info', 'Source: Dessert-logo-icon-512.png');
      await new Promise((r) => setTimeout(r, 250));
      addLog('success', '   Dessert-favicon-16x16.png (820 B)');
      addLog('success', '   Dessert-favicon-32x32.png (1.4 KB)');
      addLog('success', '   Dessert-apple-touch-icon-180x180.png (11.2 KB)');
      addLog('success', '   Dessert-android-chrome-192.png (14.2 KB)');
      addLog('success', '   Dessert-android-chrome-512.png (38.6 KB)');
      addLog('success', '   Dessert-mstile-150x150.png (9.8 KB)');
      addLog('success', '   site.webmanifest generated');
      addLog('success', '   browserconfig.xml generated');
    } else if (step.id === 'logos') {
      addLog('info', 'Processing vector brand marks with density: 300...');
      await new Promise((r) => setTimeout(r, 200));
      addLog('success', '   Dessert-logo-full-256.png (18 KB)');
      addLog('success', '   Dessert-logo-full-512.png (42 KB)');
      addLog('success', '   Dessert-logo-full-1024.png (96 KB)');
      addLog('success', '   Dessert-logo-icon-512.png (31 KB)');
      addLog('success', '   Dessert-logo-transparent.png (28 KB)');
    } else if (step.id === 'video') {
      addLog('info', 'Encoding master video: Dessert-intro.mov via ffmpeg...');
      await new Promise((r) => setTimeout(r, 400));
      addLog('success', '   Dessert-intro.mp4 (H.264 CRF 23, faststart enabled)');
      addLog('success', '   Dessert-intro.webm (VP9 CRF 30, Opus audio)');
      addLog('success', '   Dessert-intro-poster.jpg (1280x720 extracted at 00:00:01)');
    } else if (step.id === 'audio') {
      addLog('info', 'Transcoding sound effect masters to web formats...');
      await new Promise((r) => setTimeout(r, 250));
      addLog('success', '   Dessert-notif.mp3 (192 kbps)');
      addLog('success', '   Dessert-notif.ogg (Vorbis q6)');
      addLog('success', '   Dessert-click.mp3 (192 kbps)');
      addLog('success', '   Dessert-success.mp3 (192 kbps)');
      addLog('success', '   Dessert-error.mp3 (192 kbps)');
      addLog('item', 'Preserved master lossless WAV files in media/audio/');
    } else if (step.id === 'css') {
      addLog('info', 'Scanning fonts/web for .woff2 and .woff files...');
      await new Promise((r) => setTimeout(r, 150));
      addLog('success', '   Dessert-Regular (@font-face normal 400)');
      addLog('success', '   Dessert-Bold (@font-face normal 700)');
      addLog('success', '   Dessert-Italic (@font-face italic 400)');
      addLog('success', '   Dessert-BoldItalic (@font-face italic 700)');
      addLog('success', 'fonts.css generated at fonts/web/fonts.css');
    }
  };

  // Run all steps sequentially (npm run build)
  const runBuildAll = async () => {
    if (isRunning) return;

    setIsRunning(true);
    if (soundEnabled) playDessertSound('click');

    addLog('banner', '🍰 DESSERT ASSETS BUILD');
    const masterStart = Date.now();
    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (let i = 0; i < BUILD_STEPS.length; i++) {
      const step = BUILD_STEPS[i];
      setActiveStepIndex(i);
      addLog('progress', `Building ${step.name}...`, {
        step: `${i + 1}/${BUILD_STEPS.length}`,
      });

      const stepStart = Date.now();
      await simulateStepWork(step);
      const stepDuration = ((Date.now() - stepStart) / 1000).toFixed(2);

      addLog('success', `${step.name} done in ${stepDuration}s`);
      addLog('blank', '');
      successCount++;
      if (soundEnabled) playDessertSound('click');
      await new Promise((r) => setTimeout(r, 150));
    }

    setActiveStepIndex(null);
    const totalDuration = ((Date.now() - masterStart) / 1000).toFixed(2);

    addLog('banner', '📊 BUILD SUMMARY');
    addLog('info', `Total compilation time: ${totalDuration}s`);
    addLog('info', `Successful modules:     ${successCount}/${BUILD_STEPS.length}`);
    addLog('info', `Skipped modules:        ${skipCount}/${BUILD_STEPS.length}`);
    addLog('info', `Failed modules:         ${failCount}/${BUILD_STEPS.length}`);
    addLog('blank', '');
    addLog('success', '🎉 All assets built successfully! Production-ready.');
    addLog('blank', '');

    if (soundEnabled) playDessertSound('success');
    onIncrementBuildCount();
    setIsRunning(false);
  };

  const copyTerminalLogs = () => {
    const text = logs
      .map((l) => {
        if (l.type === 'blank') return '';
        if (l.type === 'banner') return `=== ${l.text} ===`;
        return `[${l.timestamp}] ${l.text}`;
      })
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopiedLogs(true);
    setTimeout(() => setCopiedLogs(false), 2000);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Command Center */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20">
                <TerminalIcon className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-stone-100 tracking-tight">
                Dessert Assets Build Pipeline Runner
              </h2>
            </div>
            <p className="text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
              Automated execution engine that validates, compiles, and optimizes all typography, images, icons, favicons, logos, media, and CSS in strict order.
            </p>
          </div>

          {/* Master trigger buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-run-all-build"
              onClick={runBuildAll}
              disabled={isRunning}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md ${
                isRunning
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700'
                  : 'bg-pink-400 hover:bg-pink-300 text-stone-950 shadow-pink-500/10 hover:shadow-pink-400/20 active:scale-95'
              }`}
            >
              {isRunning ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin text-stone-500" />
                  <span>Compiling Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>npm run build</span>
                </>
              )}
            </button>

            <button
              id="btn-clean-assets"
              onClick={() => runSingleStep('clean')}
              disabled={isRunning}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-stone-300 bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 transition-all hover:text-stone-100 active:scale-95 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>clean</span>
            </button>

            <button
              id="btn-toggle-watch"
              onClick={() => {
                setIsWatchMode(!isWatchMode);
                addLog('banner', isWatchMode ? 'WATCH MODE STOPPED' : '👁️  WATCH MODE ACTIVE');
                addLog('info', isWatchMode ? 'File watcher disconnected.' : 'Watching fonts/raw, images/raw, icons/svg for live changes...');
                if (soundEnabled) playDessertSound('notif');
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
                isWatchMode
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-stone-800/80 text-stone-300 border-stone-700/80 hover:bg-stone-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isWatchMode ? 'Watching (Active)' : 'watch.js'}</span>
            </button>

            <button
              id="btn-toggle-sound"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className="p-2.5 rounded-xl text-stone-400 hover:text-stone-200 bg-stone-800/80 border border-stone-700/80 transition-all"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-pink-300" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Step pills grid */}
        <div className="mt-5 pt-5 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {BUILD_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                id={`btn-step-${step.id}`}
                onClick={() => runSingleStep(step.id)}
                disabled={isRunning}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                  isActive
                    ? 'bg-pink-500/15 border-pink-400 text-pink-200 ring-1 ring-pink-400/30 animate-pulse'
                    : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-800/60 hover:border-stone-700 disabled:opacity-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-[10px] text-stone-500 font-semibold">
                    0{idx + 1}
                  </span>
                  {step.required ? (
                    <span className="text-[9px] px-1 py-0.2 rounded font-medium bg-red-500/10 text-red-300 border border-red-500/20">
                      Req
                    </span>
                  ) : (
                    <span className="text-[9px] px-1 py-0.2 rounded font-medium bg-stone-800 text-stone-400">
                      Opt
                    </span>
                  )}
                </div>
                <div className="font-semibold text-stone-100 mt-1">{step.name}</div>
                <div className="text-[10px] text-stone-500 font-mono truncate mt-0.5">
                  {step.script}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="rounded-2xl border border-stone-800 bg-stone-950 shadow-2xl overflow-hidden font-mono">
        {/* Terminal Titlebar */}
        <div className="bg-stone-900/90 border-b border-stone-800 px-4 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="ml-2 text-stone-400 font-medium text-xs">
              bash — assets/scripts/build-all.js (node v20.x)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`px-2 py-1 rounded text-[11px] border transition-all ${
                autoScroll
                  ? 'bg-stone-800 text-pink-300 border-stone-700'
                  : 'text-stone-500 border-transparent hover:text-stone-300'
              }`}
            >
              Auto-scroll: {autoScroll ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={copyTerminalLogs}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-all"
            >
              {copiedLogs ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLogs ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={clearLogs}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-all"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Terminal Content Body */}
        <div className="p-4 sm:p-6 text-xs sm:text-sm min-h-[380px] max-h-[550px] overflow-y-auto space-y-1 select-text bg-[#111111]">
          {logs.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-stone-600">
              <TerminalIcon className="w-10 h-10 mb-3 opacity-30 text-pink-400" />
              <p className="font-semibold text-stone-400">Pipeline Idle</p>
              <p className="text-xs text-stone-600 mt-1">
                Click <span className="text-pink-300 font-mono">npm run build</span> or select a specific script above to execute the pipeline.
              </p>
            </div>
          ) : (
            logs.map((log) => {
              if (log.type === 'blank') {
                return <div key={log.id} className="h-2"></div>;
              }

              if (log.type === 'banner') {
                const border = '═'.repeat(Math.min(log.text.length + 8, 48));
                return (
                  <div key={log.id} className="my-2 font-bold text-pink-300 select-none">
                    <div>╔{border}╗</div>
                    <div>║   {log.text}   ║</div>
                    <div>╚{border}╝</div>
                  </div>
                );
              }

              if (log.type === 'header') {
                return (
                  <div key={log.id} className="my-2 pt-1">
                    <span className="bg-pink-200 text-stone-950 font-bold px-2.5 py-0.5 rounded text-xs tracking-wide">
                      {log.text}
                    </span>
                  </div>
                );
              }

              return (
                <div key={log.id} className="flex items-start gap-2 leading-relaxed font-mono">
                  <span className="text-stone-600 select-none shrink-0 font-normal">
                    [{log.timestamp}]
                  </span>

                  {log.type === 'info' && (
                    <span className="text-blue-400 select-none shrink-0">ℹ</span>
                  )}
                  {log.type === 'success' && (
                    <span className="text-emerald-400 select-none shrink-0">✅</span>
                  )}
                  {log.type === 'warn' && (
                    <span className="text-amber-400 select-none shrink-0">⚠️</span>
                  )}
                  {log.type === 'error' && (
                    <span className="text-red-400 select-none shrink-0">❌</span>
                  )}
                  {log.type === 'debug' && (
                    <span className="text-purple-400 select-none shrink-0">🐛</span>
                  )}
                  {log.type === 'item' && (
                    <span className="text-stone-500 select-none shrink-0 ml-4">→</span>
                  )}
                  {log.type === 'progress' && (
                    <span className="text-cyan-400 select-none shrink-0 font-bold">
                      {log.meta?.step ? `[${log.meta.step}]` : '•'}
                    </span>
                  )}

                  <span
                    className={`${
                      log.type === 'error'
                        ? 'text-red-300 font-semibold'
                        : log.type === 'warn'
                        ? 'text-amber-300'
                        : log.type === 'success'
                        ? 'text-emerald-300'
                        : log.type === 'item'
                        ? 'text-stone-400'
                        : log.type === 'debug'
                        ? 'text-stone-500'
                        : 'text-stone-200'
                    }`}
                  >
                    {log.text}
                  </span>
                </div>
              );
            })
          )}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

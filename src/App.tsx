/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, TerminalLogLine } from './types';
import { Navbar } from './components/Navbar';
import { PipelineRunner } from './components/PipelineRunner';
import { FileExplorer } from './components/FileExplorer';
import { AssetShowroom } from './components/AssetShowroom';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { DocsViewer } from './components/DocsViewer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pipeline');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalBuildsCount, setTotalBuildsCount] = useState<number>(1);

  // Initial seed logs showcasing a clean previous build run
  const [logs, setLogs] = useState<TerminalLogLine[]>([
    {
      id: 'init-1',
      timestamp: '06:00:01',
      type: 'banner',
      text: '🍰 DESSERT ASSETS BUILD',
    },
    {
      id: 'init-2',
      timestamp: '06:00:02',
      type: 'progress',
      text: 'Building Fonts...',
      meta: { step: '1/8' },
    },
    {
      id: 'init-3',
      timestamp: '06:00:03',
      type: 'success',
      text: 'Fonts done in 1.42s',
    },
    {
      id: 'init-4',
      timestamp: '06:00:03',
      type: 'progress',
      text: 'Building Images...',
      meta: { step: '2/8' },
    },
    {
      id: 'init-5',
      timestamp: '06:00:05',
      type: 'success',
      text: 'Images done in 1.86s',
    },
    {
      id: 'init-6',
      timestamp: '06:00:05',
      type: 'progress',
      text: 'Building Icons...',
      meta: { step: '3/8' },
    },
    {
      id: 'init-7',
      timestamp: '06:00:06',
      type: 'success',
      text: 'Icons done in 1.15s',
    },
    {
      id: 'init-8',
      timestamp: '06:00:06',
      type: 'progress',
      text: 'Building Favicon...',
      meta: { step: '4/8' },
    },
    {
      id: 'init-9',
      timestamp: '06:00:07',
      type: 'success',
      text: 'Favicon done in 0.98s',
    },
    {
      id: 'init-10',
      timestamp: '06:00:07',
      type: 'progress',
      text: 'Building Logos...',
      meta: { step: '5/8' },
    },
    {
      id: 'init-11',
      timestamp: '06:00:08',
      type: 'success',
      text: 'Logos done in 0.84s',
    },
    {
      id: 'init-12',
      timestamp: '06:00:08',
      type: 'progress',
      text: 'Building Video...',
      meta: { step: '6/8' },
    },
    {
      id: 'init-13',
      timestamp: '06:00:10',
      type: 'success',
      text: 'Video done in 2.12s',
    },
    {
      id: 'init-14',
      timestamp: '06:00:10',
      type: 'progress',
      text: 'Building Audio...',
      meta: { step: '7/8' },
    },
    {
      id: 'init-15',
      timestamp: '06:00:11',
      type: 'success',
      text: 'Audio done in 0.92s',
    },
    {
      id: 'init-16',
      timestamp: '06:00:11',
      type: 'progress',
      text: 'Building CSS...',
      meta: { step: '8/8' },
    },
    {
      id: 'init-17',
      timestamp: '06:00:11',
      type: 'success',
      text: 'CSS done in 0.35s',
    },
    {
      id: 'init-18',
      timestamp: '06:00:12',
      type: 'banner',
      text: '📊 BUILD SUMMARY',
    },
    {
      id: 'init-19',
      timestamp: '06:00:12',
      type: 'info',
      text: 'Total time:  9.64s',
    },
    {
      id: 'init-20',
      timestamp: '06:00:12',
      type: 'info',
      text: 'Successful:  8/8',
    },
    {
      id: 'init-21',
      timestamp: '06:00:12',
      type: 'info',
      text: 'Skipped:     0/8',
    },
    {
      id: 'init-22',
      timestamp: '06:00:12',
      type: 'info',
      text: 'Failed:      0/8',
    },
    {
      id: 'init-23',
      timestamp: '06:00:12',
      type: 'blank',
      text: '',
    },
    {
      id: 'init-24',
      timestamp: '06:00:12',
      type: 'success',
      text: '🎉 All assets built successfully! Ready for production deployment.',
    },
  ]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-pink-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isRunning={isRunning}
        totalBuildsCount={totalBuildsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeTab === 'pipeline' && (
          <PipelineRunner
            logs={logs}
            setLogs={setLogs}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            onIncrementBuildCount={() => setTotalBuildsCount((c) => c + 1)}
          />
        )}

        {activeTab === 'explorer' && <FileExplorer />}

        {activeTab === 'showroom' && <AssetShowroom />}

        {activeTab === 'architecture' && <ArchitectureFlow />}

        {activeTab === 'docs' && <DocsViewer />}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 px-4 lg:px-8 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-pink-300 font-bold">🍰 Dessert Assets Pipeline</span>
            <span>•</span>
            <span>Version 1.0.0</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>npm run build</span>
            <span>•</span>
            <span>fontmin • sharp • svgo • ffmpeg</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

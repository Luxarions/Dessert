import React from 'react';
import { ActiveTab } from '../types';
import { Play, FolderTree, Sparkles, GitFork, BookOpen, Terminal, CheckCircle2, Package } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isRunning: boolean;
  totalBuildsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isRunning,
  totalBuildsCount,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'npm', label: '📦 NPM Stage (Focus)', icon: <Package className="w-4 h-4" /> },
    { id: 'pipeline', label: 'Build Pipeline', icon: <Terminal className="w-4 h-4" /> },
    { id: 'explorer', label: 'File & Script Tree', icon: <FolderTree className="w-4 h-4" /> },
    { id: 'showroom', label: 'Asset Showroom', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'architecture', label: 'Architecture Flow', icon: <GitFork className="w-4 h-4" /> },
    { id: 'docs', label: 'Documentation (README)', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-stone-800 bg-stone-950/90 backdrop-blur-md px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-pink-300 text-stone-950 font-bold flex items-center justify-center text-xl shadow-md shadow-pink-500/10 ring-1 ring-pink-200/50">
              🍰
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-100 tracking-tight text-base font-sans">
                  Dessert Assets
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
                  v1.0.0 Pipeline
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                node scripts/build-all.js
              </p>
            </div>
          </div>

          {/* Quick status pill */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
            {isRunning ? (
              <span className="flex items-center gap-1.5 text-pink-300 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                Compiling assets...
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Pipeline Ready ({totalBuildsCount} runs)
              </span>
            )}
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-1 p-1 bg-stone-900/80 rounded-xl border border-stone-800 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-800 text-pink-200 shadow-sm border border-stone-700/80'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

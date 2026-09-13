import React, { useState } from 'react';
import { FILE_TREE_DATA } from '../data/fileTreeData';
import { FileTreeItem } from '../types';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  Image as ImageIcon,
  Music,
  Video,
  Type,
  Copy,
  Check,
  Search,
  ChevronRight,
  ChevronDown,
  Download,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const FileExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileTreeItem>(() => {
    // Default to build-all.js
    const scripts = FILE_TREE_DATA.children?.find((c) => c.name === 'scripts');
    const buildAll = scripts?.children?.find((c) => c.name === 'build-all.js');
    return buildAll || FILE_TREE_DATA;
  });

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'assets-root': true,
    'scripts-dir': true,
    'utils-dir': true,
    'fonts-dir': false,
    'images-dir': false,
    'icons-dir': false,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const getFileIcon = (item: FileTreeItem) => {
    if (item.type === 'folder') {
      return expandedFolders[item.id] ? (
        <FolderOpen className="w-4 h-4 text-pink-300" />
      ) : (
        <Folder className="w-4 h-4 text-stone-400" />
      );
    }
    if (item.extension === 'js') return <FileCode className="w-4 h-4 text-amber-300" />;
    if (item.extension === 'json') return <FileJson className="w-4 h-4 text-emerald-300" />;
    if (item.extension === 'md' || item.extension === 'txt')
      return <FileText className="w-4 h-4 text-stone-300" />;
    if (item.previewType === 'font') return <Type className="w-4 h-4 text-cyan-300" />;
    if (item.previewType === 'image' || item.previewType === 'svg')
      return <ImageIcon className="w-4 h-4 text-rose-300" />;
    if (item.previewType === 'video') return <Video className="w-4 h-4 text-purple-300" />;
    if (item.previewType === 'audio') return <Music className="w-4 h-4 text-pink-400" />;
    return <FileCode className="w-4 h-4 text-stone-400" />;
  };

  const copyCode = () => {
    if (selectedFile.content) {
      navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderTree = (node: FileTreeItem, depth = 0) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.id];
    const isSelected = selectedFile.id === node.id;

    // Filter logic
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesSelf = node.name.toLowerCase().includes(q);
      const hasMatchingChild =
        isFolder &&
        node.children?.some(function checkMatch(c): boolean {
          return c.name.toLowerCase().includes(q) || (c.children?.some(checkMatch) ?? false);
        });

      if (!matchesSelf && !hasMatchingChild) {
        return null;
      }
    }

    return (
      <div key={node.id} className="select-none">
        <div
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.id);
            } else {
              setSelectedFile(node);
            }
          }}
          style={{ paddingLeft: `${depth * 14 + 8}px` }}
          className={`flex items-center justify-between py-1.5 pr-2 rounded-lg cursor-pointer text-xs font-mono transition-all group ${
            isSelected
              ? 'bg-pink-500/15 text-pink-200 font-semibold border-l-2 border-pink-400'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
          }`}
        >
          <div className="flex items-center gap-1.5 truncate">
            {isFolder && (
              <span className="text-stone-600 group-hover:text-stone-400">
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </span>
            )}
            {!isFolder && <span className="w-3.5" />}
            {getFileIcon(node)}
            <span className="truncate">{node.name}</span>
          </div>

          {node.size && (
            <span className="text-[10px] text-stone-600 font-sans group-hover:text-stone-500">
              {node.size}
            </span>
          )}
        </div>

        {isFolder && isExpanded && node.children && (
          <div>{node.children.map((child) => renderTree(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[620px]">
      {/* File Tree Left Pane */}
      <div className="lg:col-span-4 bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col shadow-lg">
        <div className="pb-3 border-b border-stone-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-300 font-mono flex items-center gap-2">
              <Folder className="w-4 h-4 text-pink-300" />
              assets/ File Explorer
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">
              28 files
            </span>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
            <input
              type="text"
              placeholder="Search scripts, configs, media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-600 focus:outline-none focus:border-pink-400 transition-all font-mono"
            />
          </div>
        </div>

        {/* Tree container */}
        <div className="flex-1 overflow-y-auto mt-3 pr-1 space-y-0.5 max-h-[520px]">
          {renderTree(FILE_TREE_DATA)}
        </div>
      </div>

      {/* Code / Content Viewer Right Pane */}
      <div className="lg:col-span-8 bg-stone-900 border border-stone-800 rounded-2xl flex flex-col shadow-lg overflow-hidden">
        {/* Top bar */}
        <div className="bg-stone-950/80 border-b border-stone-800 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-stone-500">assets/</span>
            <span className="text-pink-300 font-semibold">{selectedFile.path}</span>
            {selectedFile.size && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-stone-800/80 text-stone-400 border border-stone-700/60 font-sans">
                {selectedFile.size}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedFile.content && (
              <button
                id="btn-copy-file-content"
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            )}
          </div>
        </div>

        {/* File Description if any */}
        {selectedFile.description && (
          <div className="bg-stone-950/40 px-5 py-2.5 border-b border-stone-800/60 text-xs text-stone-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-300 shrink-0" />
            <span>{selectedFile.description}</span>
          </div>
        )}

        {/* File Content Body */}
        <div className="flex-1 p-5 overflow-auto max-h-[500px] bg-[#121212] font-mono text-xs leading-relaxed text-stone-300">
          {selectedFile.content ? (
            <div className="relative flex">
              {/* Line numbers */}
              <div className="select-none pr-4 text-stone-600 text-right font-mono shrink-0 border-r border-stone-800/80 mr-4">
                {selectedFile.content.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code text */}
              <pre className="overflow-x-auto whitespace-pre font-mono text-stone-200">
                {selectedFile.content}
              </pre>
            </div>
          ) : selectedFile.previewType === 'font' ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <Type className="w-12 h-12 text-cyan-300 opacity-60" />
              <p className="font-semibold text-stone-200">{selectedFile.name}</p>
              <p className="text-xs text-stone-500 max-w-sm">
                Binary font file format. View rendered specimens in the <strong>Asset Showroom</strong> tab.
              </p>
            </div>
          ) : selectedFile.previewType === 'image' || selectedFile.previewType === 'svg' ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <ImageIcon className="w-12 h-12 text-rose-300 opacity-60" />
              <p className="font-semibold text-stone-200">{selectedFile.name}</p>
              <p className="text-xs text-stone-500 max-w-sm">
                Optimized visual graphic asset. Preview vector symbols & high-res exports in the <strong>Asset Showroom</strong> tab.
              </p>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-stone-500">
              <Folder className="w-12 h-12 text-stone-700 mb-2" />
              <p className="font-semibold text-stone-300">{selectedFile.name}</p>
              <p className="text-xs text-stone-600">Select a file from the tree to view its source code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

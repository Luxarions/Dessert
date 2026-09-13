export type BuildStepId =
  | 'all'
  | 'fonts'
  | 'images'
  | 'icons'
  | 'favicon'
  | 'logos'
  | 'video'
  | 'audio'
  | 'css'
  | 'clean'
  | 'watch';

export interface BuildStepInfo {
  id: BuildStepId;
  name: string;
  script: string;
  required: boolean;
  command: string;
  description: string;
  inputs: string[];
  outputs: string[];
  estimatedDurationMs: number;
}

export interface TerminalLogLine {
  id: string;
  timestamp: string;
  type: 'header' | 'info' | 'success' | 'warn' | 'error' | 'debug' | 'item' | 'banner' | 'blank' | 'progress';
  text: string;
  meta?: {
    step?: string;
    file?: string;
    size?: string;
    duration?: string;
  };
}

export interface FileTreeItem {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  category?: 'script' | 'config' | 'doc' | 'font' | 'image' | 'icon' | 'favicon' | 'logo' | 'media';
  extension?: string;
  size?: string;
  description?: string;
  children?: FileTreeItem[];
  content?: string;
  previewType?: 'code' | 'image' | 'svg' | 'font' | 'audio' | 'video' | 'json';
}

export interface DessertIcon {
  id: string;
  name: string;
  symbolId: string;
  filename: string;
  category: 'navigation' | 'actions' | 'status' | 'system';
  svgPath: string;
  description: string;
}

export interface DessertFontVariant {
  weight: number;
  style: 'normal' | 'italic';
  name: string;
  fileTtf: string;
  fileWoff: string;
  fileWoff2: string;
  sampleText: string;
}

export type ActiveTab = 'pipeline' | 'explorer' | 'showroom' | 'architecture' | 'docs';

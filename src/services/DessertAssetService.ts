/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Dessert Asset Manager Service
 *
 * Provides encapsulated, type-safe internal methods to access and resolve Dessert brand assets.
 * Uses private methods/properties to protect internal path resolution and fallback mechanisms,
 * and exposes a strictly typed public API for UI components.
 */

export type DessertIconId =
  | 'home'
  | 'user'
  | 'search'
  | 'cart'
  | 'menu'
  | 'close'
  | 'arrow-left'
  | 'arrow-right'
  | 'heart'
  | 'star'
  | 'check'
  | 'info'
  | 'warning'
  | 'error'
  | 'settings'
  | 'mail'
  | 'phone';

export type LogoVariant =
  | 'full'
  | 'icon'
  | 'horizontal'
  | 'vertical'
  | 'mono-black'
  | 'mono-white'
  | 'gradient'
  | 'transparent';

export type ImageName = 'hero' | 'product' | 'banner' | 'about';
export type ImageFormat = 'webp' | 'avif' | 'jpg';
export type AudioCue = 'notif' | 'click' | 'success' | 'error';
export type VideoFormat = 'mp4' | 'webm' | 'ogv';

class DessertAssetManager {
  // Private members
  private readonly _baseAssetPath: string = '/assets';
  private readonly _brandPrefix: string = 'Dessert';
  private _audioContext: AudioContext | null = null;
  private readonly _resolvedCache = new Map<string, string>();

  /**
   * Private Helper: builds clean path with prefix
   */
  private _buildPath(...segments: string[]): string {
    const raw = [this._baseAssetPath, ...segments].join('/').replace(/\/+/g, '/');
    return raw;
  }

  /**
   * Private Helper: get or create Web Audio Context for audio synthesis fallback
   */
  private _getAudioContext(): AudioContext {
    if (!this._audioContext) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this._audioContext = new AudioCtx();
    }
    if (this._audioContext.state === 'suspended') {
      this._audioContext.resume();
    }
    return this._audioContext;
  }

  // =========================================================================
  // PUBLIC API: FONTS
  // =========================================================================

  /**
   * Returns the path to the auto-generated fonts.css stylesheet
   */
  public getFontCssUrl(): string {
    return this._buildPath('fonts', 'web', 'fonts.css');
  }

  /**
   * Returns font binary URL for a specific weight and format
   */
  public getFontUrl(weight: 'Regular' | 'Bold' | 'Italic' | 'BoldItalic', format: 'woff' | 'woff2'): string {
    return this._buildPath('fonts', 'web', `${this._brandPrefix}-${weight}.${format}`);
  }

  /**
   * Returns language subset font binary URL
   */
  public getSubsetFontUrl(subset: 'latin-basic' | 'latin-extended' | 'cyrillic' | 'symbols'): string {
    return this._buildPath('fonts', 'subset', `${this._brandPrefix}-${subset}.woff2`);
  }

  // =========================================================================
  // PUBLIC API: ICONS
  // =========================================================================

  /**
   * Returns path to an individual optimized SVG icon
   */
  public getIconSvgUrl(iconId: DessertIconId): string {
    return this._buildPath('icons', 'svg', `${this._brandPrefix}-${iconId}.svg`);
  }

  /**
   * Returns full SVG `<symbol>` sprite reference for inline `<use href="...">` usage
   */
  public getIconSpriteHref(iconId: DessertIconId): string {
    const spritePath = this._buildPath('icons', 'sprite', `${this._brandPrefix}-icons.svg`);
    return `${spritePath}#${iconId}`;
  }

  /**
   * Returns multi-resolution PNG raster icon URL
   */
  public getIconPngUrl(iconId: 'home' | 'user' | 'cart', size: 16 | 32 | 64 | 128): string {
    return this._buildPath('icons', 'png', `${this._brandPrefix}-${iconId}-${size}.png`);
  }

  // =========================================================================
  // PUBLIC API: LOGOS
  // =========================================================================

  /**
   * Returns the vector SVG logo mark
   */
  public getLogoSvgUrl(variant: LogoVariant = 'full'): string {
    return this._buildPath('logos', 'svg', `${this._brandPrefix}-logo-${variant}.svg`);
  }

  /**
   * Returns raster PNG logo with requested size
   */
  public getLogoPngUrl(size: 256 | 512 | 1024 = 512, isIconOnly = false): string {
    if (isIconOnly) {
      return this._buildPath('logos', 'png', `${this._brandPrefix}-logo-icon-${Math.min(size, 512)}.png`);
    }
    return this._buildPath('logos', 'png', `${this._brandPrefix}-logo-full-${size}.png`);
  }

  // =========================================================================
  // PUBLIC API: IMAGES
  // =========================================================================

  /**
   * Resolves optimized photograph (WebP, AVIF, or fallback JPG)
   */
  public getImageUrl(name: ImageName, format: ImageFormat = 'webp'): string {
    return this._buildPath('images', 'optimized', `${this._brandPrefix}-${name}.${format}`);
  }

  /**
   * Returns 300x300 center-cropped WebP thumbnail
   */
  public getImageThumbUrl(name: ImageName): string {
    return this._buildPath('images', 'thumbnails', `${this._brandPrefix}-${name}-thumb.webp`);
  }

  /**
   * Returns decorative pattern or texture
   */
  public getBackgroundUrl(type: 'pattern' | 'texture' | 'gradient' | 'dots'): string {
    const ext = type === 'texture' ? 'webp' : 'svg';
    return this._buildPath('images', 'backgrounds', `${this._brandPrefix}-${type}.${ext}`);
  }

  // =========================================================================
  // PUBLIC API: FAVICON & PWA
  // =========================================================================

  /**
   * Returns standard .ico or PNG favicon
   */
  public getFaviconUrl(size: 16 | 32 | 48 | 96 | 144 | 'ico' = 'ico'): string {
    if (size === 'ico') {
      return this._buildPath('favicon', `${this._brandPrefix}-favicon.ico`);
    }
    return this._buildPath('favicon', `${this._brandPrefix}-favicon-${size}x${size}.png`);
  }

  /**
   * Returns Apple Touch Icon URL
   */
  public getAppleTouchIconUrl(size: 152 | 180 | 'default' = 'default'): string {
    if (size === 'default') {
      return this._buildPath('favicon', `${this._brandPrefix}-apple-touch-icon.png`);
    }
    return this._buildPath('favicon', `${this._brandPrefix}-apple-touch-icon-${size}x${size}.png`);
  }

  /**
   * Returns Web App Manifest URL
   */
  public getWebManifestUrl(): string {
    return this._buildPath('favicon', 'site.webmanifest');
  }

  // =========================================================================
  // PUBLIC API: MEDIA & AUDIO
  // =========================================================================

  /**
   * Returns audio sound cue file URL
   */
  public getAudioUrl(cue: AudioCue, format: 'mp3' | 'ogg' | 'wav' = 'mp3'): string {
    return this._buildPath('media', 'audio', `${this._brandPrefix}-${cue}.${format}`);
  }

  /**
   * Plays sound cue with Web Audio synthesis fallback if browser blocks or file is a development stub
   */
  public async playAudioCue(cue: AudioCue): Promise<void> {
    try {
      const url = this.getAudioUrl(cue, 'mp3');
      const audio = new Audio(url);
      audio.volume = 0.5;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Playback failed or file is stub; fall back to Web Audio synthesis
          this._playSyntheticTone(cue);
        });
      }
    } catch {
      this._playSyntheticTone(cue);
    }
  }

  /**
   * Private Audio Synthesizer for pleasant pastel cues
   */
  private _playSyntheticTone(cue: AudioCue): void {
    try {
      const ctx = this._getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.12, now);

      switch (cue) {
        case 'click':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;

        case 'success':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
          osc.frequency.setValueAtTime(1046.5, now + 0.24); // C6
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          osc.start(now);
          osc.stop(now + 0.45);
          break;

        case 'error':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.setValueAtTime(180, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;

        case 'notif':
        default:
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, now); // D5
          osc.frequency.setValueAtTime(880.0, now + 0.1); // A5
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
          break;
      }
    } catch {
      // AudioContext unavailable in silent/strict environments
    }
  }

  // =========================================================================
  // PUBLIC API: DOCUMENTS
  // =========================================================================

  /**
   * Returns document download path
   */
  public getDocumentUrl(docName: string): string {
    return this._buildPath('docs', docName);
  }
}

// Export singleton instance as well as class
export const dessertAssets = new DessertAssetManager();
export default dessertAssets;

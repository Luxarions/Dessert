/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DessertAssetPaths {
  root: string;
  fonts: string;
  fontsCss: string;
  images: string;
  icons: string;
  iconSprite: string;
  favicon: string;
  webmanifest: string;
  logos: string;
  media: string;
  docs: string;
}

export declare const name: string;
export declare const version: string;
export declare const paths: DessertAssetPaths;
export declare function resolveIconSpriteHref(iconId: string): string;
export declare function resolveFavicon(size?: number | 'ico'): string;
export declare function resolveLogo(variant?: string, ext?: 'svg' | 'png'): string;

declare const _default: {
  name: string;
  version: string;
  paths: DessertAssetPaths;
  resolveIconSpriteHref: typeof resolveIconSpriteHref;
  resolveFavicon: typeof resolveFavicon;
  resolveLogo: typeof resolveLogo;
};

export default _default;

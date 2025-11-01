/**
 * Supported size units for SVG dimensions
 */
export type SizeUnit = 'px' | 'rem' | 'em' | '%' | 'vw' | 'vh';

/**
 * Size configuration for SVG
 * Can be a number (interpreted as px), a string with units, or an object with width/height
 */
export type SvgSize = number | string | {
  width: number | string;
  height: number | string;
};

/**
 * Color configuration for SVG
 * Supports CSS color values including currentColor
 */
export type SvgColor = string;

/**
 * Configuration interface for SVGFlex
 */
export interface SvgFlexConfig {
  /**
   * Path or URL to the SVG file
   */
  src: string;

  /**
   * Color for the SVG (defaults to 'currentColor' for CSS inheritance)
   */
  color?: SvgColor;

  /**
   * Size for the SVG
   */
  size?: SvgSize;

  /**
   * Additional CSS classes to apply
   */
  class?: string;

  /**
   * Accessibility label
   */
  ariaLabel?: string;

  /**
   * Whether to inline the SVG content (default: true)
   * When true, fetches and embeds the SVG content for full style control
   */
  inline?: boolean;
}

/**
 * Internal processed configuration
 */
export interface ProcessedSvgConfig {
  src: string;
  color: string;
  width: string;
  height: string;
  class: string;
  ariaLabel?: string;
  inline: boolean;
}

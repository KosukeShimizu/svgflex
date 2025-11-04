import { SvgFlexConfig, ProcessedSvgConfig, SvgSize } from '../types/svgflex-config';

/**
 * Default configuration values
 */
const DEFAULT_CONFIG = {
  color: 'currentColor',
  size: 24,
  inline: true,
  class: '',
  replaceColors: true
};

/**
 * Processes size value into width and height strings
 */
export function processSize(size: SvgSize | undefined): { width: string; height: string } {
  const defaultSize = `${DEFAULT_CONFIG.size}px`;

  if (!size) {
    return { width: defaultSize, height: defaultSize };
  }

  // If it's a number, convert to px
  if (typeof size === 'number') {
    const sizeStr = `${size}px`;
    return { width: sizeStr, height: sizeStr };
  }

  // If it's a string, use it for both width and height
  if (typeof size === 'string') {
    return { width: size, height: size };
  }

  // If it's an object with width/height
  const width = typeof size.width === 'number' ? `${size.width}px` : size.width;
  const height = typeof size.height === 'number' ? `${size.height}px` : size.height;

  return { width, height };
}

/**
 * Processes the SVGFlex configuration into a standardized format
 */
export function processSvgConfig(config: SvgFlexConfig): ProcessedSvgConfig {
  const { width, height } = processSize(config.size);

  return {
    src: config.src,
    color: config.color || DEFAULT_CONFIG.color,
    width,
    height,
    class: config.class || DEFAULT_CONFIG.class,
    ariaLabel: config.ariaLabel,
    inline: config.inline !== undefined ? config.inline : DEFAULT_CONFIG.inline,
    replaceColors: config.replaceColors !== undefined ? config.replaceColors : DEFAULT_CONFIG.replaceColors
  };
}

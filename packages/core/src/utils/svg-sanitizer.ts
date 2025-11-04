/**
 * Replaces hardcoded colors in SVG with currentColor
 * This allows the SVG to inherit color from CSS
 *
 * @param svgContent - SVG content with hardcoded colors
 * @returns SVG content with currentColor
 */
export function replaceColorsWithCurrentColor(svgContent: string): string {
  let result = svgContent;

  // Replace fill attributes with hex colors, rgb, rgba, named colors, etc.
  // But preserve fill="none" and fill="transparent"
  result = result.replace(
    /fill\s*=\s*["'](?!none["']|transparent["']|currentColor["']|url\()/gi,
    'fill="currentColor'
  );

  // Replace stroke attributes with hex colors, rgb, rgba, named colors, etc.
  // But preserve stroke="none" and stroke="transparent"
  result = result.replace(
    /stroke\s*=\s*["'](?!none["']|transparent["']|currentColor["']|url\()/gi,
    'stroke="currentColor'
  );

  return result;
}

/**
 * Sanitizes SVG content by removing potentially harmful elements
 *
 * @param svgContent - Raw SVG content
 * @param replaceColors - Whether to replace hardcoded colors with currentColor (default: false)
 * @returns Sanitized SVG content
 */
export function sanitizeSvg(svgContent: string, replaceColors: boolean = false): string {
  // Remove script tags and event handlers for security
  let sanitized = svgContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove common event handlers
  const eventHandlers = [
    'onclick', 'onload', 'onerror', 'onmouseover', 'onmouseout',
    'onmousemove', 'onmousedown', 'onmouseup', 'onfocus', 'onblur'
  ];

  eventHandlers.forEach(handler => {
    const regex = new RegExp(`${handler}\\s*=\\s*["'][^"']*["']`, 'gi');
    sanitized = sanitized.replace(regex, '');
  });

  // Replace hardcoded colors if requested
  if (replaceColors) {
    sanitized = replaceColorsWithCurrentColor(sanitized);
  }

  return sanitized;
}

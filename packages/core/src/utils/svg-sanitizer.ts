/**
 * Sanitizes SVG content by removing potentially harmful elements
 *
 * @param svgContent - Raw SVG content
 * @returns Sanitized SVG content
 */
export function sanitizeSvg(svgContent: string): string {
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

  return sanitized;
}

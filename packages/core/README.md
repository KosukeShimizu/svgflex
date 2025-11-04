# @svgflex/core

Framework-agnostic core library for SVGFlex. This package contains shared types, utilities, and sanitization logic used across all SVGFlex framework implementations.

## Overview

This package is intended to be used by framework-specific implementations (e.g., `@svgflex/angular`, `@svgflex/react`, `@svgflex/vue`) and is not typically installed directly by end users.

## Features

- Framework-agnostic type definitions
- SVG sanitization utilities (removes scripts and event handlers)
- Automatic color replacement for hardcoded SVG colors
- Configuration processors for size and color handling
- Shared utilities for SVG manipulation

## Exports

### Types

```typescript
import type {
  SvgFlexConfig,
  SvgSize,
  SvgColor,
  SizeConfig
} from '@svgflex/core';
```

### Utilities

```typescript
import {
  processSvgConfig,
  sanitizeSvg
} from '@svgflex/core';
```

## API

### `processSvgConfig(config: SvgFlexConfig)`

Processes SVG configuration and returns normalized size and color values.

**Parameters:**
- `config.size` - Size value (number, string, or {width, height} object)
- `config.color` - Color value (CSS color string)

**Returns:**
```typescript
{
  width: string | null;
  height: string | null;
  color: string;
}
```

### `sanitizeSvg(svgContent: string, replaceColors?: boolean): string`

Sanitizes SVG content by removing potentially dangerous elements and attributes. Optionally replaces hardcoded colors with `currentColor` to enable dynamic color control.

**Parameters:**
- `svgContent` - Raw SVG string
- `replaceColors` - Whether to replace hardcoded colors with `currentColor` (default: `false`)

**Returns:**
- Sanitized SVG string with scripts and event handlers removed, and optionally with colors replaced

**Example:**
```typescript
// Basic sanitization
const safeSvg = sanitizeSvg(rawSvgContent);

// Sanitization with color replacement
const safeSvgWithColors = sanitizeSvg(rawSvgContent, true);
// This will convert fill="#4E7079" to fill="currentColor"
```

### `replaceColorsWithCurrentColor(svgContent: string): string`

Replaces all hardcoded colors in SVG attributes (`fill` and `stroke`) with `currentColor`, while preserving `none`, `transparent`, `currentColor`, and `url()` references.

**Parameters:**
- `svgContent` - SVG string with hardcoded colors

**Returns:**
- SVG string with colors replaced by `currentColor`

**Example:**
```typescript
const svgWithHardcodedColor = '<svg><path fill="#FF0000" stroke="blue" /></svg>';
const svgWithCurrentColor = replaceColorsWithCurrentColor(svgWithHardcodedColor);
// Result: '<svg><path fill="currentColor" stroke="currentColor" /></svg>'
```

## Usage in Framework Implementations

```typescript
import { sanitizeSvg, processSvgConfig } from '@svgflex/core';

// Sanitize SVG content
const safeSvg = sanitizeSvg(rawSvgContent);

// Process configuration
const { width, height, color } = processSvgConfig({
  size: '24px',
  color: 'currentColor'
});
```

## License

MIT

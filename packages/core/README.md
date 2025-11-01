# @svgflex/core

Framework-agnostic core library for SVGFlex. This package contains shared types, utilities, and sanitization logic used across all SVGFlex framework implementations.

## Overview

This package is intended to be used by framework-specific implementations (e.g., `@svgflex/angular`, `@svgflex/react`, `@svgflex/vue`) and is not typically installed directly by end users.

## Features

- Framework-agnostic type definitions
- SVG sanitization utilities (removes scripts and event handlers)
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

### `sanitizeSvg(svgContent: string): string`

Sanitizes SVG content by removing potentially dangerous elements and attributes.

**Parameters:**
- `svgContent` - Raw SVG string

**Returns:**
- Sanitized SVG string with scripts and event handlers removed

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

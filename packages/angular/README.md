# @svgflex/angular

SVG icons with easy color and size customization for Angular.

## Features

- Easy color and size customization using `currentColor`
- Support for inline SVG (full style control) or external references
- TypeScript support with full type definitions
- Flexible sizing: numbers (px), strings with units, or width/height objects
- SCSS/CSS class support
- Accessibility features (ARIA labels)

## Installation

```bash
npm install @svgflex/angular
```

## Usage

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { SvgflexComponent } from '@svgflex/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SvgflexComponent],
  template: `
    <svgflex src="assets/icons/home.svg"></svgflex>
  `
})
export class AppComponent {}
```

### With Color and Size

```html
<!-- Using currentColor (inherits from parent text color) -->
<svgflex src="assets/icons/home.svg" color="currentColor" size="24"></svgflex>

<!-- Custom color -->
<svgflex src="assets/icons/star.svg" color="#ff0000" size="32"></svgflex>

<!-- Size with units -->
<svgflex src="assets/icons/user.svg" color="blue" size="2rem"></svgflex>

<!-- Different width and height -->
<svgflex
  src="assets/icons/logo.svg"
  [size]="{width: '100px', height: '50px'}"
></svgflex>
```

### With CSS Classes

```html
<svgflex
  src="assets/icons/heart.svg"
  class="icon-large text-red"
></svgflex>
```

```scss
.icon-large {
  width: 48px;
  height: 48px;
}

.text-red {
  color: red;
}
```

### Accessibility

```html
<svgflex
  src="assets/icons/close.svg"
  ariaLabel="Close dialog"
></svgflex>
```

## API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `src` | `string` | *required* | Path or URL to the SVG file |
| `color` | `string` | `'currentColor'` | CSS color value |
| `size` | `number \| string \| {width, height}` | `24` | Size in px, or with units, or object |
| `class` | `string` | `''` | Additional CSS classes |
| `ariaLabel` | `string` | `undefined` | Accessibility label |
| `inline` | `boolean` | `true` | Whether to inline SVG content |

## License

MIT

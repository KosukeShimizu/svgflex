# SVGFlex

[![CI](https://github.com/KosukeShimizu/svgflex/actions/workflows/ci.yml/badge.svg)](https://github.com/KosukeShimizu/svgflex/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@svgflex%2Fangular.svg)](https://www.npmjs.com/package/@svgflex/angular)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful library for SVG icons with easy color and size customization, built with extensibility in mind.

## 🎯 Features

- **Easy customization**: Change SVG colors and sizes with simple props
- **currentColor support**: Seamlessly integrate with your design system using CSS color inheritance
- **Flexible sizing**: Support for px, rem, em, %, vw, vh, and custom width/height
- **TypeScript**: Fully typed for excellent developer experience
- **Framework support**: Currently supports Angular, with plans for React, Vue, and more
- **Lightweight**: Minimal bundle size with tree-shaking support
- **Accessibility**: Built-in ARIA label support

## 📦 Packages

This is a monorepo containing multiple packages:

- **[@svgflex/core](./packages/core)** - Framework-agnostic core library
- **[@svgflex/angular](./packages/angular)** - Angular implementation
- **@svgflex/react** - React support (planned)
- **@svgflex/vue** - Vue support (planned)

## 🚀 Quick Start

### Installation

```bash
npm install @svgflex/angular
```

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { SvgflexComponent } from '@svgflex/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SvgflexComponent],
  template: `
    <svgflex
      src="assets/icons/home.svg"
      color="currentColor"
      size="24"
    ></svgflex>
  `
})
export class AppComponent {}
```

## 📖 Documentation

### Color Customization

```html
<!-- Use currentColor for CSS inheritance -->
<div class="text-red-500">
  <svgflex src="assets/icons/heart.svg" color="currentColor"></svgflex>
</div>

<!-- Direct color values -->
<svgflex src="assets/icons/star.svg" color="#ff0000"></svgflex>
<svgflex src="assets/icons/home.svg" color="rgb(33, 150, 243)"></svgflex>
```

### Size Options

```html
<!-- Number (interpreted as px) -->
<svgflex src="assets/icons/user.svg" size="32"></svgflex>

<!-- String with units -->
<svgflex src="assets/icons/user.svg" size="2rem"></svgflex>
<svgflex src="assets/icons/user.svg" size="3em"></svgflex>

<!-- Custom width and height -->
<svgflex
  src="assets/icons/logo.svg"
  [size]="{width: '100px', height: '50px'}"
></svgflex>
```

### SCSS Integration

```html
<svgflex
  src="assets/icons/heart.svg"
  class="icon-large text-primary"
></svgflex>
```

```scss
.icon-large {
  width: 48px;
  height: 48px;
}

.text-primary {
  color: #667eea;
}
```

## 🎨 Demo

To run the demo application:

```bash
npm install
npm start
```

Then open [http://localhost:4200](http://localhost:4200) in your browser.

## 🏗️ Development

### Build the library

```bash
npm run build
```

### Run tests

```bash
npm test
```

### Watch mode

```bash
npm run watch
```

## 🗺️ Roadmap

- [x] Framework-agnostic core (@svgflex/core)
- [x] Angular support (@svgflex/angular)
- [ ] React support (@svgflex/react)
- [ ] Vue support (@svgflex/vue)
- [ ] Svelte support (@svgflex/svelte)
- [ ] Icon library presets
- [ ] Animation support
- [ ] SVG sprite optimization

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📮 Support

If you have any questions or issues, please [open an issue](https://github.com/KosukeShimizu/svgflex/issues).

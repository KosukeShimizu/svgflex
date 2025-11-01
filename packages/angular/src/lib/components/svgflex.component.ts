import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  HostBinding,
  inject
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SvgLoaderService } from '../services/svg-loader.service';
import { processSvgConfig, SvgFlexConfig, SvgSize, SvgColor } from '@svgflex/core';

/**
 * SVGFlex Component
 *
 * Renders SVG icons with customizable color and size.
 * Supports both inline SVG (for full style control) and external references.
 *
 * @example
 * <svgflex src="assets/icons/home.svg" color="red" size="32"></svgflex>
 * <svgflex src="assets/icons/user.svg" color="currentColor" [size]="{width: '2rem', height: '2rem'}"></svgflex>
 */
@Component({
  selector: 'svgflex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svgflex.component.html',
  styleUrls: ['./svgflex.component.scss']
})
export class SvgflexComponent implements OnChanges {
  private svgLoader = inject(SvgLoaderService);
  private sanitizer = inject(DomSanitizer);

  /** Path or URL to the SVG file */
  @Input({ required: true }) src!: string;

  /** Color for the SVG (defaults to 'currentColor') */
  @Input() color?: SvgColor;

  /** Size for the SVG (number in px, string with units, or {width, height} object) */
  @Input() size?: SvgSize;

  /** Additional CSS classes */
  @Input() class?: string;

  /** Accessibility label */
  @Input() ariaLabel?: string;

  /** Whether to inline the SVG (default: true) */
  @Input() inline: boolean = true;

  // Processed values
  protected width: string = '24px';
  protected height: string = '24px';
  protected processedColor: string = 'currentColor';
  protected svgContent: any = null;

  // Apply CSS classes to :host element
  @HostBinding('class')
  get hostClasses(): string {
    return this.class || '';
  }

  // Apply inline styles to :host element when size is specified
  @HostBinding('style.width')
  get hostWidth(): string | null {
    return this.size ? this.width : null;
  }

  @HostBinding('style.height')
  get hostHeight(): string | null {
    return this.size ? this.height : null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const config: SvgFlexConfig = {
      src: this.src,
      color: this.color,
      size: this.size,
      class: this.class,
      ariaLabel: this.ariaLabel,
      inline: this.inline
    };

    const processed = processSvgConfig(config);

    this.width = processed.width;
    this.height = processed.height;
    this.processedColor = processed.color;
    this.ariaLabel = processed.ariaLabel;

    console.log('[SvgflexComponent] Processed config:', {
      width: this.width,
      height: this.height,
      color: this.processedColor,
      src: this.src
    });

    // Load SVG content if inline mode is enabled
    // Check if src or inline changed, or if it's the first change (firstChange)
    if (this.inline && (changes['src'] || changes['inline'] || Object.keys(changes).length > 0)) {
      this.loadSvgContent();
    }
  }

  private loadSvgContent(): void {
    console.log('[SvgflexComponent] loadSvgContent called, src:', this.src, 'inline:', this.inline);

    if (!this.src) {
      console.log('[SvgflexComponent] No src provided, skipping load');
      return;
    }

    this.svgLoader.loadSvg(this.src).subscribe((content: string) => {
      console.log('[SvgflexComponent] Received SVG content, length:', content.length);
      if (content) {
        // SVG is already sanitized by SvgLoaderService
        // Directly bypass security and trust the HTML
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(content);
        console.log('[SvgflexComponent] SVG content set successfully');
      } else {
        console.log('[SvgflexComponent] Received empty content');
      }
    });
  }
}

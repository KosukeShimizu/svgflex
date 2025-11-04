import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { sanitizeSvg } from '@svgflex/core';

/**
 * Service for loading and caching SVG content
 */
@Injectable({
  providedIn: 'root'
})
export class SvgLoaderService {
  private cache = new Map<string, Map<boolean, Observable<string>>>();

  constructor(private http: HttpClient) {}

  /**
   * Loads SVG content from a URL with caching
   * @param url - URL to load the SVG from
   * @param replaceColors - Whether to replace hardcoded colors with currentColor (default: true)
   */
  loadSvg(url: string, replaceColors: boolean = true): Observable<string> {
    console.log('[SvgLoaderService] Loading SVG from:', url, 'replaceColors:', replaceColors);

    // Check cache with both url and replaceColors as key
    if (!this.cache.has(url)) {
      this.cache.set(url, new Map());
    }

    const urlCache = this.cache.get(url)!;
    if (urlCache.has(replaceColors)) {
      console.log('[SvgLoaderService] Returning cached SVG for:', url, 'replaceColors:', replaceColors);
      return urlCache.get(replaceColors)!;
    }

    const svg$ = this.http.get(url, { responseType: 'text' }).pipe(
      map(svgContent => {
        console.log('[SvgLoaderService] Successfully loaded SVG from:', url, 'Length:', svgContent.length);
        return sanitizeSvg(svgContent, replaceColors);
      }),
      catchError(error => {
        console.error(`[SvgLoaderService] Failed to load SVG from ${url}:`, error);
        return of('');
      }),
      shareReplay(1)
    );

    urlCache.set(replaceColors, svg$);
    return svg$;
  }

  /**
   * Clears the SVG cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

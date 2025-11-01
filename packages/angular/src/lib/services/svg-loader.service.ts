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
  private cache = new Map<string, Observable<string>>();

  constructor(private http: HttpClient) {}

  /**
   * Loads SVG content from a URL with caching
   */
  loadSvg(url: string): Observable<string> {
    console.log('[SvgLoaderService] Loading SVG from:', url);

    if (this.cache.has(url)) {
      console.log('[SvgLoaderService] Returning cached SVG for:', url);
      return this.cache.get(url)!;
    }

    const svg$ = this.http.get(url, { responseType: 'text' }).pipe(
      map(svgContent => {
        console.log('[SvgLoaderService] Successfully loaded SVG from:', url, 'Length:', svgContent.length);
        return sanitizeSvg(svgContent);
      }),
      catchError(error => {
        console.error(`[SvgLoaderService] Failed to load SVG from ${url}:`, error);
        return of('');
      }),
      shareReplay(1)
    );

    this.cache.set(url, svg$);
    return svg$;
  }

  /**
   * Clears the SVG cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

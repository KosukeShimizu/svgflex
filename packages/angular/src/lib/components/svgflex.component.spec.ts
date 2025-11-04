import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SvgflexComponent } from './svgflex.component';
import { replaceColorsWithCurrentColor } from '@svgflex/core';

describe('SvgflexComponent', () => {
  let component: SvgflexComponent;
  let fixture: ComponentFixture<SvgflexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgflexComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SvgflexComponent);
    component = fixture.componentInstance;
    component.src = 'test.svg';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default size when not provided', () => {
    expect(component['width']).toBe('24px');
    expect(component['height']).toBe('24px');
  });

  it('should process number size to px', () => {
    component.size = 32;
    component.ngOnChanges({
      size: {
        currentValue: 32,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(component['width']).toBe('32px');
    expect(component['height']).toBe('32px');
  });

  it('should process string size', () => {
    component.size = '2rem';
    component.ngOnChanges({
      size: {
        currentValue: '2rem',
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(component['width']).toBe('2rem');
    expect(component['height']).toBe('2rem');
  });

  it('should have undefined color by default', () => {
    component.ngOnChanges({});
    expect(component.color).toBeUndefined();
  });

  it('should apply custom color', () => {
    component.color = '#ff0000';
    component.ngOnChanges({
      color: {
        currentValue: '#ff0000',
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    expect(component.color).toBe('#ff0000');
  });
});

describe('replaceColorsWithCurrentColor', () => {
  it('should replace fill colors with currentColor', () => {
    const input = '<path fill="#ff0000" d="M10 10"/>';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('fill="currentColor"');
  });

  it('should replace stroke colors with currentColor', () => {
    const input = '<path stroke="#0000ff" d="M10 10"/>';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('stroke="currentColor"');
  });

  it('should preserve fill="none"', () => {
    const input = '<path fill="none" stroke="#0000ff" d="M10 10"/>';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('fill="none"');
  });

  it('should add fill="none" to path with stroke but no fill', () => {
    const input = '<path stroke="#0000ff" d="M10 10"/>';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('fill="none"');
    expect(result).toContain('stroke="currentColor"');
  });

  it('should add fill="none" to self-closing path with stroke but no fill', () => {
    const input = '<path stroke="#0000ff" d="M10 10" />';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('fill="none"');
    expect(result).toContain('stroke="currentColor"');
  });

  it('should not add fill="none" if fill attribute already exists', () => {
    const input = '<path stroke="#0000ff" fill="#ff0000" d="M10 10"/>';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('fill="currentColor"');
    expect(result).toContain('stroke="currentColor"');
    // Should not have duplicate fill attributes
    const fillMatches = result.match(/fill=/g);
    expect(fillMatches?.length).toBe(1);
  });

  it('should handle multiple path elements correctly', () => {
    const input = `
      <path stroke="#0000ff" d="M10 10"/>
      <path fill="#ff0000" d="M20 20"/>
      <path stroke="#00ff00" d="M30 30"/>
    `;
    const result = replaceColorsWithCurrentColor(input);

    // First and third paths should have fill="none" added
    const fillNoneMatches = result.match(/fill="none"/g);
    expect(fillNoneMatches?.length).toBe(2);

    // Second path should have fill="currentColor"
    expect(result).toContain('fill="currentColor"');
  });

  it('should not affect elements other than path', () => {
    const input = '<circle stroke="#0000ff" r="10"/>';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('stroke="currentColor"');
    expect(result).not.toContain('fill="none"');
  });

  it('should preserve fill="transparent"', () => {
    const input = '<path fill="transparent" stroke="#0000ff" d="M10 10"/>';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('fill="transparent"');
  });

  it('should preserve fill="currentColor"', () => {
    const input = '<path fill="currentColor" stroke="#0000ff" d="M10 10"/>';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('fill="currentColor"');
    // Should not have duplicate fill attributes
    const fillMatches = result.match(/fill=/g);
    expect(fillMatches?.length).toBe(1);
  });

  it('should preserve fill with url reference', () => {
    const input = '<path fill="url(#gradient)" stroke="#0000ff" d="M10 10"/>';
    const result = replaceColorsWithCurrentColor(input);
    expect(result).toContain('fill="url(#gradient)"');
  });

  it('should handle paths with stroke but no fill in complex SVG', () => {
    const input = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path stroke="#000" stroke-width="2" d="M3 3L21 21"/>
        <circle fill="#ff0000" cx="12" cy="12" r="5"/>
        <path stroke="#0000ff" stroke-linecap="round" d="M5 12L19 12"/>
      </svg>
    `;
    const result = replaceColorsWithCurrentColor(input);

    // Both path elements should have fill="none" added
    const fillNoneMatches = result.match(/fill="none"/g);
    expect(fillNoneMatches?.length).toBe(2);

    // Circle should have fill="currentColor"
    expect(result).toContain('fill="currentColor"');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SvgflexComponent } from './svgflex.component';

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

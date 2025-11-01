import { Component } from '@angular/core';
import { SvgflexComponent } from '@svgflex/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SvgflexComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SVGFlex Demo';
}

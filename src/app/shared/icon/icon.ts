import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <span
      class="icon-base"
      [style.mask-image]="'url(assets/icons/' + name() + '.svg)'"
      [style.background-color]="color()"
      [style.width.px]="size()"
      [style.height.px]="size()"
    >
    </span>
  `,
  styles: [
    `
      .icon-base {
        display: inline-block;
        mask-repeat: no-repeat;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
      }
    `,
  ],
})
export class IconComponent {
  // Using the new Signal Inputs (Angular 17.1+)
  name = input.required<string>();
  color = input<string>('currentColor'); // Defaults to text color
  size = input<number>(24); // Defaults to 24px
}


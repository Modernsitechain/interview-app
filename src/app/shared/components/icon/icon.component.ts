import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import * as IconsaxOutline from '@ng-icons/iconsax/outline';
import * as IconsaxBold from '@ng-icons/iconsax/bold';
import * as MaterialIconsBaseline from '@ng-icons/material-icons/baseline';

export type IconName =
  | keyof typeof IconsaxOutline
  | keyof typeof IconsaxBold
  | keyof typeof MaterialIconsBaseline;

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgIconComponent],
  template: `<ng-icon [name]="name()" />`,
  styles: `
    :host {
      line-height: 0;
      font-size: inherit;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      ...IconsaxOutline,
      ...IconsaxBold,
      ...MaterialIconsBaseline
    })
  ]
})
export class IconComponent {
  public readonly name = input.required<IconName>();
}

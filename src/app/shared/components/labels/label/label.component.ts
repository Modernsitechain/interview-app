import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IconComponent,
  IconName
} from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {
  public readonly icon = input<IconName>();
  public readonly iconPosition = input<'left' | 'right'>('left');
  public readonly iconOnly = input<boolean>(false);

  @Input()
  @HostBinding('style.gap.rem')
  public gap = 0.25;
}

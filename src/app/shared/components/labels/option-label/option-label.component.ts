import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { LabelComponent } from '../label/label.component';
import { OptionInterface } from '@core/interfaces';

@Component({
  selector: 'app-option-label',
  standalone: true,
  imports: [CommonModule, TranslateModule, IconComponent, LabelComponent],
  templateUrl: './option-label.component.html',
  styleUrls: ['./option-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionLabelComponent {
  public readonly choosed = input<boolean>(false);
  public readonly checkbox = input<boolean>(false);
  public readonly radio = input<boolean>(false);

  @Input()
  public option!: OptionInterface;
}

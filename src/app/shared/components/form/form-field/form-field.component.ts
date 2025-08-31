import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InputBaseClass } from '@core/classes';
import { TranslateModule } from '@ngx-translate/core';
import {
  InfoMessageComponent,
} from '@shared/components/message/info-message/info-message.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [InfoMessageComponent, TranslateModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent extends InputBaseClass {
  public readonly label = input<string | undefined>(undefined);
  public readonly required = input<boolean>(false);
  public readonly infoText = input<string|undefined>(undefined);
}

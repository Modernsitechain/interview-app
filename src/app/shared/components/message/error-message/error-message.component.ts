import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent {
  public readonly show = input<boolean>(true);
  public readonly message = input<string|undefined>(undefined);
}

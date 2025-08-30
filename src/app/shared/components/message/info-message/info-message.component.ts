import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoMessageComponent {
  public readonly show = input<boolean>(true);
  public readonly message = input<string|undefined>(undefined);
}

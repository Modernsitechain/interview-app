import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ButtonDirective } from '@shared/directives';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [ButtonDirective, IconComponent],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewComponent {

}

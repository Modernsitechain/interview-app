import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewComponent {

}

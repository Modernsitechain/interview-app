import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-no-data-state',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './table-no-data-state.component.html',
  styleUrl: './table-no-data-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableNoDataStateComponent {}

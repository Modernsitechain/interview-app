import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-table-loading-state',
  standalone: true,
  imports: [],
  templateUrl: './table-loading-state.component.html',
  styleUrl: './table-loading-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableLoadingStateComponent {}

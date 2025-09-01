import { Component, input } from '@angular/core';
import { TableValueType } from '@core/types';
import { environment } from '@env/environment';

@Component({
  selector: 'app-table-data-value',
  standalone: true,
  imports: [],
  templateUrl: './table-data-value.component.html',
  styleUrl: './table-data-value.component.scss'
})
export class TableDataValueComponent {
  public value = input.required<string>();
  public type = input<TableValueType>('text');

  protected baseMediaURL = environment.BASE_URL.MEDIA_URL;
}

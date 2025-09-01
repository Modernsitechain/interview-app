import { Component, input, output } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
  selector: 'app-table-action-data-value',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './table-action-data-value.component.html',
  styleUrl: './table-action-data-value.component.scss'
})
export class TableActionDataValueComponent {
  public readonly viewDetail = output<void>();
  public readonly showViewDetail = input(true);
  public readonly disableViewDetail = input(false);

  public readonly update = output<void>();
  public readonly showUpdate = input(true);
  public readonly disableUpdate = input(false);

  public readonly delete = output<void>();
  public readonly showDelete = input(true);
  public readonly disableDelete = input(false);

  public viewContentDetail() {
    this.viewDetail.emit();
  }

  public updateContent() {
    this.update.emit();
  }

  public deleteContent() {
    this.delete.emit();
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Component,
  output,
  input,
  viewChild,
  model,
  OnChanges
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { TableValueType } from '@core/types';

import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

import { OptionInterface } from '@core/interfaces/option.interface';
import { TableDataValueComponent } from '../table-data-value/table-data-value.component';
import { TableActionDataValueComponent } from '../table-action-data-value/table-action-data-value.component';
import { IconComponent } from '@shared/components/icon/icon.component';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TranslateModule,
    MatTableModule,
    MatInputModule,
    TableDataValueComponent,
    TableActionDataValueComponent,
    MatSort,
    MatSortModule,
    IconComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges {
  private sort = viewChild.required<MatSort>(MatSort);

  public dataSource = input.required<MatTableDataSource<any>>();
  public headers = input.required<OptionInterface[]>();
  public uniqueValues = input.required<OptionInterface<TableValueType>[]>();
  public contentName = input.required<string>();
  public readonly viewDetail = output<any>();
  public readonly showViewDetai = input(true);
  public readonly update = output<any>();
  public readonly delete = output<any>();

  // disable action button
  public readonly disableViewDetail = input(false);
  public readonly disableUpdate = input(false);
  public readonly disableDelete = input(false);

  public selectedData = model<any[]>([]);
  public loading = model<boolean>(false);
  public error = model<boolean>(false);

  ngOnChanges() {
    this.dataSource().sort = this.sort();
    const sortState: Sort = { active: 'updatedAt', direction: 'desc' };
    this.sort().active = sortState.active;
    this.sort().direction = sortState.direction;
    this.sort().sortChange.emit(sortState);
  }

  public viewContentDetail(data: any) {
    this.viewDetail.emit(data);
  }

  public updateContent(data: any) {
    this.update.emit(data);
  }

  public deleteContent(data: any) {
    this.delete.emit(data);
  }

  public getValueType(columnName: string): TableValueType {
    const { value } = this.uniqueValues().find(
      (value) => value.name === columnName
    ) || { value: 'text' };

    return value;
  }

  public getTableValue(header: string, value: any) {
    return value;
  }

  public getColumns(headers: OptionInterface[]) {
    return headers.map((header) => header.value) as string[];
  }

  public getHeader(column: string) {
    const header = this.headers().find((item) => item.value === column);

    if (header) {
      return header.name;
    }

    return column;
  }

  public setSelectedData(data: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedData.update((currentData) => [...currentData, data]);
    } else {
      this.selectedData.update((currentData) =>
        currentData.filter((item) => item !== data)
      );
    }
  }
}

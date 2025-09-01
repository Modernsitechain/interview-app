/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldComponent } from '@shared/components/form';
import { InputComponent } from '@shared/components/input/input/input.component';
import { IconComponent } from '../../icon/icon.component';
import { ButtonDirective } from '@shared/directives';

@Component({
  selector: 'app-table-filter-bar',
  standalone: true,
  imports: [
    TranslateModule,
    FormFieldComponent,
    InputComponent,
    IconComponent,
    ButtonDirective
  ],
  templateUrl: './table-filter-bar.component.html',
  styleUrl: './table-filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFilterBarComponent {
  public totalData = model.required<string | number>();
  public searchKey = model<string>();
  public readonly searchKeyChange = output<string>();
  public selectedData = model.required<any>();
  public readonly deleteAll = output<any>();
  public searchPlaceholder = input<string>();
  public showSelectedChip = input<boolean>(true);

  public showSearchField = input<boolean>(true);

  //button handling
  public showButton = input(false);
  public buttonLabel = input<string>();
  public buttonClicked = output<void>();

  public search(e: Event): void {
    const searchValue = (e.target as HTMLInputElement).value;

    this.searchKey.set(searchValue);
    this.searchKeyChange.emit(searchValue ?? '');
  }

  public onButtonClicked() {
    this.buttonClicked.emit();
  }

  public onDeleteAll(data: any) {
    this.deleteAll.emit(data);
  }

  public onClearData(): void {}
}

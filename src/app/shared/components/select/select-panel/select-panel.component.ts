import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  OnDestroy,
  OnInit,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InputComponent } from '../../input/input/input.component';
import { LazyloadDirective } from '@shared/directives/lazyload/lazyload.directive';
import { TranslateModule } from '@ngx-translate/core';
import { OptionInterface } from '@core/interfaces';
import { OptionLabelComponent } from '@shared/components/labels';

@Component({
  selector: 'app-select-panel',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    LazyloadDirective,
    OptionLabelComponent,
    TranslateModule
  ],
  templateUrl: './select-panel.component.html',
  styleUrls: ['./select-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPanelComponent implements OnInit, OnDestroy {
  public readonly filterable = input<boolean>(false);
  public readonly filterPlaceholder = input<string>('Search');
  public readonly multipleChoice = input<boolean>(false);
  public readonly multipleChoiceValues = input<unknown[]>([]);
  public reachBottomOutput = output<void>();

  public readonly filterIcon = 'saxSearchNormal1Outline';

  @Input()
  public control = new FormControl();

  @Input()
  public options: Array<OptionInterface> = [];

  @Input()
  public filterThreshold = 7;

  public readonly selectOutput = output<OptionInterface>();

  public readonly queryControl = new FormControl<string>('');

  public filteredOptions: Array<OptionInterface> = [];

  private subs: Array<Subscription> = [];

  public ngOnInit(): void {
    this.filterOptions();
    this.subs.push(
      this.queryControl.valueChanges.subscribe(() => {
        this.filterOptions();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  public onReachBottom(): void {
    this.reachBottomOutput.emit();
  }

  public onSelect(option: OptionInterface): void {
    // In multiple choice mode, do not mutate the single-value control here.
    // Emit the clicked option so parent can toggle selection externally.
    if (this.multipleChoice()) {
      this.selectOutput.emit(option);
      return;
    }

    this.control.setValue(option.value);
    this.control.markAsTouched();
    this.control.markAsDirty();
    this.selectOutput.emit(option);
  }

  public resetQuery(): void {
    this.queryControl.setValue(null);
  }

  private filterOptions(): void {
    const options = this.queryControl.value
      ? this.options?.filter((o) => {
          const nameFiltered = o.name
            .toLowerCase()
            .includes((this.queryControl.value as string).toLowerCase());

          return nameFiltered;
        })
      : this.options;

    this.filteredOptions = this.orderOptions(options);
  }

  private orderOptions(
    options?: Array<OptionInterface> | null
  ): Array<OptionInterface> {
    return options as Array<OptionInterface>;
  }
}

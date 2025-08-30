import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { OptionInterface } from '@core/interfaces';
import { IconName } from '@shared/components/icon/icon.component';
import {
  ButtonDirective,
  DropdownComponent,
  DropdownDirective
} from '@shared/directives';
import { IconComponent } from '@shared/components/icon/icon.component';
import { SelectPanelComponent } from '@shared/components/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-multi-select-input',
  standalone: true,
  imports: [
    TranslateModule,
    DropdownDirective,
    IconComponent,
    DropdownComponent,
    SelectPanelComponent,
    ButtonDirective
  ],
  templateUrl: './multi-select-input.component.html',
  styleUrl: './multi-select-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectInputComponent {
  public readonly dropdown = viewChild<DropdownDirective>(DropdownDirective);

  public readonly options = input.required<OptionInterface<string>[]>();
  public readonly placeholder = input<string>('Select');
  public readonly filter = input<boolean>(true);
  public readonly color = input<'primary' | 'secondary' | 'default'>('default');
  public readonly roundedFull = input<boolean>(false);
  public readonly truncate = input<boolean>(false);
  public readonly leftIcon = input<IconName>('saxSetting4Outline');
  public readonly panelWidth = input<number>(300);
  public readonly showChevron = input<boolean>(true);

  public control = new FormControl<string[]>([]);
  public readonly selectionChange = output<string[]>();

  private showDropdown = signal<boolean>(false);

  public panelState = computed(() =>
    this.showDropdown() ? 'opened' : 'closed'
  );

  public get selectedLabels(): string {
    const selected = this.control.value || [];
    if (!selected.length) return this.placeholder();
    const count = selected.length;
    return count === 1 ? '1 company selected' : `${count} companies selected`;
  }

  public onOpen(): void {
    this.showDropdown.set(true);
  }

  public onClose(): void {
    this.showDropdown.set(false);
  }

  public onToggle(option: OptionInterface): void {
    const current = [...(this.control.value || [])];
    const value = option.value as string;
    const idx = current.findIndex((v) => v === value);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      current.push(value);
    }
    this.control.setValue(current);
    this.control.markAsTouched();
    this.control.markAsDirty();
    this.selectionChange.emit(current);
  }
}

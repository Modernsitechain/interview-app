import {
  ChangeDetectionStrategy,
  Component,
  input,
  computed,
  signal,
  viewChild
} from '@angular/core';
import { InputBaseClass } from '@core/classes';
import { OptionInterface } from '@core/interfaces';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { SelectPanelComponent } from '@shared/components/select';
import { dropdownMenuAnimations } from '@shared/animations';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
import { DropdownComponent, DropdownDirective } from '@shared/directives';

@Component({
  selector: 'app-single-select-input',
  standalone: true,
  imports: [
    TranslateModule,
    DropdownDirective,
    IconComponent,
    DropdownComponent,
    SelectPanelComponent,
    SkeletonComponent
  ],
  templateUrl: './single-select-input.component.html',
  styleUrl: './single-select-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [dropdownMenuAnimations.indicatorRotate]
})
export class SingleSelectInputComponent extends InputBaseClass {
  public readonly dropdown = viewChild<DropdownDirective>(DropdownDirective);

  private showDropdown = signal<boolean>(false);

  public readonly options = input.required<OptionInterface[]>();
  public readonly parentType = input<'availability' | 'media-device'>();
  public readonly color = input<'primary' | 'secondary' | 'default'>('default');
  public readonly filter = input<boolean>(false);
  public readonly stretch = input<boolean>(false);
  public readonly disabled = input<boolean>(false);
  public readonly roundedFull = input<boolean>(false);
  public readonly truncate = input<boolean>(false);

  public panelState = computed(() =>
    this.showDropdown() ? 'opened' : 'closed'
  );

  public get selectedOption(): OptionInterface | undefined {
    return this.options()?.find((o) => o.value === this.control.value);
  }

  constructor() {
    super();
  }

  public onOpen(): void {
    this.showDropdown.set(true);
  }

  public onClose(): void {
    this.showDropdown.set(false);
  }

  public onSelect(): void {
    this.showDropdown.set(false);
    this.dropdown()?.close();
  }
}

import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  viewChild
} from '@angular/core';
import { I18nService } from '@core/i18n';
import { I18nLocale } from '@core/i18n/enums/i18n.enum';
import { LangParamsService } from '@core/services/language-params/lang-params.service';
import { TranslateModule } from '@ngx-translate/core';
import { dropdownMenuAnimations } from '@shared/animations';
import { IconComponent } from '@shared/components/icon/icon.component';
import { LabelComponent } from '@shared/components/labels';
import {
  ButtonDirective,
  DropdownComponent,
  DropdownDirective
} from '@shared/directives';
import { map } from 'rxjs';

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonDirective,
    TranslateModule,
    DropdownDirective,
    DropdownComponent,
    IconComponent,
    LabelComponent
  ],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [dropdownMenuAnimations.indicatorRotate]
})
export class LanguageDropdownComponent {
  public readonly dropdown = viewChild<DropdownDirective>(DropdownDirective);

  private readonly i18nService = inject(I18nService);
  private readonly langParamsService = inject(LangParamsService);

  private showDropdown = signal<boolean>(false);
  public readonly square = input(false);

  public currentLanguage = this.i18nService.currentLocale$.pipe(
    map((locale: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      return this.i18nService.getLanguages().find((l) => l.locale === locale);
    })
  );

  public languages = this.i18nService.getLanguages();

  public panelState = computed(() =>
    this.showDropdown() ? 'opened' : 'closed'
  );

  public onOpen(): void {
    this.showDropdown.set(true);
  }

  public onClose(): void {
    this.showDropdown.set(false);
  }

  public useLanguage(language: unknown): void {
    if (this.i18nService.getCurrentLocale() !== language) {
      void this.i18nService.useLanguage(language as I18nLocale).then(() => {
        this.langParamsService.setLanguageParams(
          this.i18nService.getCurrentLang() as string
        );
      });
      this.dropdown()?.close();
    }
  }
}

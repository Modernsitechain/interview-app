import { Injectable, Optional, SkipSelf } from '@angular/core';
import { I18nLocale } from '../enums/i18n.enum';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKey } from '@core/enums';
import { I18nLanguage } from '../interfaces/i18n.interface';
import { LocalStorageService } from '@core/services';

const languages: Array<I18nLanguage> = [
  { locale: I18nLocale.en_US, label: 'language.english', countryCode: 'US' },
  {
    locale: I18nLocale.nl_NL,
    label: 'language.dutch',
    countryCode: 'NL'
  }
];
@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private readonly _currentLocale = new BehaviorSubject<I18nLocale>(
    I18nLocale.en_US
  );

  public readonly currentLocale$ = this._currentLocale.asObservable();

  constructor(
    @Optional() @SkipSelf() private singleton: I18nService,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    if (this.singleton) {
      throw new Error(
        'LocalizationService is already provided by the root module'
      );
    }

    translateService.addLangs(languages.map((e) => e.locale));
    this.translateService.setDefaultLang(I18nLocale.en_US);
  }

  public getCurrentLocale(): I18nLocale {
    return this._currentLocale.getValue();
  }

  public getCurrentLocaleCode(): string {
    return this.getCurrentLocale().split('_')[0];
  }

  public getCurrentLang(): string | undefined {
    return languages.find((e) => e.locale === this.getCurrentLocale())
      ?.countryCode;
  }

  public initService(): Promise<unknown> {
    const localeInStorage = this.localStorageService.get(
      LocalStorageKey.Locale
    );
    let fromLocalStorage = false;

    if (localeInStorage) {
      this._currentLocale.next(localeInStorage as I18nLocale);
      fromLocalStorage = true;
    }

    void this.useLanguage(this.getCurrentLocale(), fromLocalStorage);
    return Promise.resolve();
  }

  public checkCountryCodeValidity(lang: string) {
    return languages.some(
      (e) => e.countryCode.toLowerCase() === lang.toLowerCase()
    );
  }

  public getLocaleByCountryCode(countryCode: string) {
    const langObject = languages.find(
      (e) => e.countryCode.toLowerCase() === countryCode.toLowerCase()
    );

    return langObject?.locale;
  }

  public async useLanguage(
    lang: I18nLocale,
    fromLocalStorage?: boolean
  ): Promise<unknown> {
    return lastValueFrom(this.translateService.use(lang))
      .then(() => {
        this.localStorageService.set(LocalStorageKey.Locale, lang);
        this._currentLocale.next(lang);
      })
      .catch(() => {
        if (fromLocalStorage) {
          this.localStorageService.remove(LocalStorageKey.Locale);
        }
      });
  }

  public translate(
    key: string | string[],
    interpolateParams?: Record<string, unknown>
  ): string {
    return this.translateService.instant(key, interpolateParams) as string;
  }

  public getLanguages() {
    return languages;
  }
}

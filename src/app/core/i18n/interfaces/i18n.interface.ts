import { I18nLocale } from '../enums/i18n.enum';

export interface I18nConfigInterface {
  locale: I18nLocale;
}

export interface I18nLanguage {
  locale: I18nLocale;
  label: string;
  countryCode: string;
}

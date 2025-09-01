import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from './service/i18n.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule.forChild()]
})
export class I18nModule {
  public static forRoot(): ModuleWithProviders<I18nModule> {
    return {
      ngModule: I18nModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initI18nService,
          deps: [I18nService],
          multi: true
        },
        I18nService
      ]
    };
  }
}

export function initI18nService(service: I18nService) {
  return (): Promise<unknown> => service.initService();
}

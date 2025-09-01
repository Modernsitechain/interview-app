import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { I18nService } from '@app/core/i18n';
import { I18nLocale } from '@app/core/i18n/enums/i18n.enum';
import { filter, Subscription, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangParamsService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private i18nService: I18nService
  ) {}

  private routerSubscription!: Subscription;

  initialize() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    this.routerSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        this.activatedRoute.root.queryParams.subscribe((params) => {
          const lang = params['lang'];

          if (lang && this.i18nService.checkCountryCodeValidity(lang)) {
            void this.i18nService.useLanguage(
              this.i18nService.getLocaleByCountryCode(lang) as I18nLocale
            );
          } else {
            this.setLanguageParams(this.i18nService.getCurrentLang() as string);
          }
        });
      });
  }

  public setLanguageParams(lang: string) {
    const currentUrlTree = this.router.parseUrl(this.router.url);
    currentUrlTree.queryParams['lang'] = lang.toLowerCase();

    const newUrlTree = this.router.createUrlTree([], {
      queryParams: currentUrlTree.queryParams,
      fragment: currentUrlTree.fragment as string,
      preserveFragment: true
    });

    // Navigate to the new URL tree
    void this.router.navigateByUrl(newUrlTree);
  }
}

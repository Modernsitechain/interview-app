import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { sidebarMenus } from '@core/datas';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ButtonDirective } from '@shared/directives';
@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [ButtonDirective, IconComponent, TranslateModule, RouterLink],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarMenuComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  private routeSub!: Subscription;

  public readonly sidebarMenus = sidebarMenus;
  public currentUrl: string = '';

  public openedMenu = signal<string[]>([]);

  constructor() {}

  ngOnInit(): void {
    if (this.router.url.includes('database'))
      this.openedMenu.update((res) => [...res, 'text.menu-database']);

    this.currentUrl = this.router.url;
    this.routeSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl = event.urlAfterRedirects;
        this.cdr.markForCheck(); // trigger view update
      });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  public openDropdownMenu(menu: string) {
    const isMenuOpened = this.openedMenu().includes(menu);

    if (isMenuOpened) {
      this.openedMenu.update((res) => res.filter((menu) => menu != menu));
    } else {
      this.openedMenu.update((res) => [...res, menu]);
    }
  }

  protected isActiveMenu(route: string): boolean {
    if (this.router.url.includes(route)) {
      return true;
    }

    return false;
  }
}

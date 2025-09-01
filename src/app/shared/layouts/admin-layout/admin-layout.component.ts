import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageDropdownComponent } from '@shared/components/dropdowns/language-dropdown/language-dropdown.component';
import { NavbarComponent } from '@shared/components/layouts/navbar/navbar.component';
import { SidebarMenuComponent } from '@shared/components/layouts/sidebar-menu/sidebar-menu.component';
import { SidebarComponent } from '@shared/components/layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    LanguageDropdownComponent,
    SidebarComponent,
    SidebarMenuComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent {}

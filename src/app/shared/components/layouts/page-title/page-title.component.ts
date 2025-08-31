import { Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ButtonDirective } from '@shared/directives';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [TranslateModule, ButtonDirective, IconComponent],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
  public title = input.required<string>();
  public onBack = output<void>();

  public handleRedirectToList(): void {
    this.onBack.emit();
  }
}

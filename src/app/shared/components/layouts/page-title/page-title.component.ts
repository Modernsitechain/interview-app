import { Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonDirective } from '@shared/directives';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [TranslateModule, ButtonDirective],
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

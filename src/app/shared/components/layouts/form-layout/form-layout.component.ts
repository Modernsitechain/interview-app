import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output
} from '@angular/core';
import { PageTitleComponent } from '../page-title/page-title.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonDirective } from '@shared/directives';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [PageTitleComponent, TranslateModule, ButtonDirective],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent {
  private readonly router = inject(Router);

  public formTitle = input.required<string>();
  public formDisabled = input<boolean>(false);
  public formBackPath = input.required<string>();
  public submit = output<void>();

  public onSubmit(): void {
    return this.submit.emit();
  }

  public onBack(){
    return this.router.navigate([this.formBackPath()])
  }
}

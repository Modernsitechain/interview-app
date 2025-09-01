import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';
import { PageTitleComponent } from '../page-title/page-title.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonDirective } from '@shared/directives';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [PageTitleComponent, TranslateModule, ButtonDirective],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent {
  public formTitle = input.required<string>();
  public formDisabled = input<boolean>(false);

  // output
  public submit = output<void>();
  public back = output<void>();

  public onSubmit(): void {
    return this.submit.emit();
  }
  
  public onBack(){
    return this.back.emit();
  }
}

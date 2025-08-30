import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { InputBaseClass } from '@core/classes';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [InputComponent, IconComponent],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordInputComponent extends InputBaseClass{

  public visible = signal(false);

  public toggleVisibility(): void{
    this.visible.set(!this.visible());  
  }

}

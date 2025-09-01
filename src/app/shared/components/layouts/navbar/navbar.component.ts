import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppEnvironmentEnum } from '@core/enums';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone:  true,
  imports: [TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  public readonly environment = environment.ENV;
  public readonly appEnvironmentEnum = AppEnvironmentEnum;
}

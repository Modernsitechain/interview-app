import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@core/classes';
import { Observable } from 'rxjs';
import { TodoPriorityType } from '../../models';
import { FormComponent, FormFieldComponent } from '@shared/components/form';
import { InputComponent } from '@shared/components/input/input/input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonDirective } from '@shared/directives';
import { SingleSelectInputComponent } from '@shared/components/input/single-select-input/single-select-input.component';
import { TodoService } from '@core/services';
import { PageTitleComponent } from '@shared/components/layouts/page-title/page-title.component';
import { FormLayoutComponent } from '@shared/components/layouts/form-layout/form-layout.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    FormComponent,
    FormFieldComponent,
    InputComponent,
    TranslateModule,
    ButtonDirective,
    SingleSelectInputComponent,
    PageTitleComponent,
    FormLayoutComponent
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent extends FormBase<any, any> implements OnInit {
  public readonly todoService = inject(TodoService);
  public override form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    priority: new FormControl<TodoPriorityType>('high')
  });

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public onCreateTodo(): void{
    
  }

  protected override onSubmit(item: any): Observable<any> {
    console.log('item', item);
    throw new Error('Method not implemented.');
  }
}

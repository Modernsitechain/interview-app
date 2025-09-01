import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@core/classes';
import { Observable } from 'rxjs';
import { TodoPriorityType } from '../../models';
import { FormComponent, FormFieldComponent } from '@shared/components/form';
import { InputComponent } from '@shared/components/input/input/input.component';
import { TranslateModule } from '@ngx-translate/core';
import { SingleSelectInputComponent } from '@shared/components/input/single-select-input/single-select-input.component';
import { TodoService } from '@core/services';
import { FormLayoutComponent } from '@shared/components/layouts/form-layout/form-layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    FormComponent,
    FormFieldComponent,
    InputComponent,
    TranslateModule,
    SingleSelectInputComponent,
    FormLayoutComponent
  ],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent extends FormBase<any, any> {
  public readonly todoService = inject(TodoService);
  private readonly router = inject(Router);

  public override form = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null),
    priority: new FormControl<TodoPriorityType | null>(null, [
      Validators.required
    ])
  });

  public onCreateTodo(): void {
    if (this.form.valid) {
      console.log('this.form', this.form.value);
    }
  }

  public onBack(): void {
    this.router.navigate(['/admin/todo']);
  }

  protected override onSubmit(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
}

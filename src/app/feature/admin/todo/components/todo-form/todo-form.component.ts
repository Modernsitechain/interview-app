import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@core/classes';
import { Observable } from 'rxjs';
import { Todo, TodoPriorityType } from '../../models';
import { FormComponent, FormFieldComponent } from '@shared/components/form';
import { InputComponent } from '@shared/components/input/input/input.component';
import { TranslateModule } from '@ngx-translate/core';
import { SingleSelectInputComponent } from '@shared/components/input/single-select-input/single-select-input.component';
import { ToastService, TodoService } from '@core/services';
import { FormLayoutComponent } from '@shared/components/layouts/form-layout/form-layout.component';
import { ActivatedRoute, Router } from '@angular/router';
import dayjs from 'dayjs';

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
export class TodoFormComponent extends FormBase<any, any> implements OnInit {
  public readonly todoService = inject(TodoService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastService = inject(ToastService);

  public override form = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null),
    priority: new FormControl<TodoPriorityType | null>(null, [
      Validators.required
    ])
  });

  public readonly isCreateForm = signal(true);
  public tempTodo = signal<Todo | null>(null);

  ngOnInit(): void {
    const todoId = this.activatedRoute.snapshot.paramMap.get('id') || null;

    if (!todoId) {
      this.isCreateForm.set(true);
    } else {
      this.isCreateForm.set(false);
      this.setDataForm(todoId);
    }
  }

  public onCreateTodo(): void {
    if (this.form.valid) {
      const id = dayjs().unix().toString();
      const title = this.form.controls.title.value || '';
      const priority = this.form.controls.priority.value || 'high';
      const description = this.form.controls.description.value;

      this.todoService.addTodo({
        id: id,
        title: title,
        description: description,
        completed: false,
        createdAt: dayjs().toISOString(),
        priority: priority,
        updatedAt: null,
        dueDate: null
      });

      this.toastService.success.set('Todo successfully created!');
      setTimeout(() => {
        this.onBack();
      }, 1500);
    }
  }

  public onUpdateTodo(): void {
    if (this.form.valid && this.tempTodo()) {
      const id = this.tempTodo()!.id;
      const title = this.form.controls.title.value || '';
      const priority = this.form.controls.priority.value || 'high';
      const description = this.form.controls.description.value;

      this.todoService.updateTodo({
        id: id,
        title: title,
        description: description,
        completed: false,
        createdAt: this.tempTodo()!.createdAt,
        priority: priority,
        updatedAt: dayjs().toISOString(),
        dueDate: null
      });

      this.toastService.success.set('Todo successfully updated!');
      setTimeout(() => {
        this.onBack();
      }, 1500);
    }
  }

  public onBack(): void {
    this.router.navigate(['/admin/todo']);
  }

  protected override onSubmit(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  private setDataForm(todoId: string) {
    const todo = this.todoService.getTodoById(todoId);

    if (!todo) return;

    this.tempTodo.set(todo);

    const title = todo.title || null;
    const description = todo.description || null;
    const priority = todo.priority || null;

    this.form.controls.title.setValue(title);
    this.form.controls.description.setValue(description);
    this.form.controls.priority.setValue(priority);
  }
}

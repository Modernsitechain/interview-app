import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBase } from '@core/classes';
import { Observable } from 'rxjs';
import { TodoPriorityType } from '../../models';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent extends FormBase<any, any> implements OnInit {
  public override form = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    priority: new FormControl<TodoPriorityType>('high')
  });

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  protected override onSubmit(item: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
}

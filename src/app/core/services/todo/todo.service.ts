import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { TodoPriorityOptions } from '@feature/admin/todo/models';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends BaseService {

  public readonly todoPriorityOptions = TodoPriorityOptions;
  public getTodos() {}
}

import { computed, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageKey } from '@core/enums';
import { Observable, of } from 'rxjs';
import dayjs from 'dayjs';
import { Todo, TodoPriorityOptions } from '@feature/admin/todo/models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public readonly todoPriorityOptions = TodoPriorityOptions;

  private todos = signal<Todo[] | null>(null);
  private readonly localStorageService = inject(LocalStorageService);

  public todoList = computed<Todo[]>(() => {
    if (this.todos()) {
      return this.todos()!
        .filter((todo) => todo.completed === false)
        .sort((a, b) => {
          return dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf();
        });
    }

    return [];
  });

  public completedTodoList = computed<Todo[]>(() => {
    if (this.todos()) {
      return this.todos()!
        .filter((todo) => todo.completed === true)
        .sort((a, b) => {
          return dayjs(b.updatedAt).valueOf() - dayjs(a.updatedAt).valueOf();
        });
    }

    return [];
  });

  constructor() {
    this.checkTodos();
  }

  public checkTodos() {
    const listTodos = this.localStorageService.get(LocalStorageKey.MY_TODOS);

    if (Array.isArray(listTodos)) {
      this.todos.set(listTodos);
    }
  }

  public getTodos(): Observable<Todo[]> {
    const data: Todo[] | undefined = this.localStorageService.get(
      LocalStorageKey.MY_TODOS
    );

    if (data) {
      this.todos.set(data);
      return of(data);
    }
    return of([]);
  }
  public addTodo(data: Todo) {
    const currentTodos: Todo[] | undefined = this.localStorageService.get(
      LocalStorageKey.MY_TODOS
    );

    if (Array.isArray(currentTodos)) {
      this.todos.set([...currentTodos, data]);
    } else {
      this.todos.set([data]);
    }
    this.localStorageService.set(LocalStorageKey.MY_TODOS, this.todos());
  }

  public getTodoById(id: string): Todo | null {
    const currentTodos = this.todos();

    if (Array.isArray(currentTodos)) {
      const selectedTodo = currentTodos.find((todo) => todo.id === id);

      if (selectedTodo) return selectedTodo;
    }
    return null;
  }

  public deleteTodoById(id: string) {
    const currentTodos: Todo[] | undefined = this.localStorageService.get(
      LocalStorageKey.MY_TODOS
    );

    if (Array.isArray(currentTodos)) {
      const filteredTodos = currentTodos.filter((item) => item.id !== id);
      this.todos.set(filteredTodos);
      this.localStorageService.set(LocalStorageKey.MY_TODOS, this.todos());
    }
  }

  public completeTodoById(id: string) {
    const currentTodos = this.todos();

    if (Array.isArray(currentTodos)) {
      const updated = currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: true, updatedAt: dayjs().format() }
          : todo
      );

      this.todos.set(updated);
      this.localStorageService.set(LocalStorageKey.MY_TODOS, updated);
    }
  }

  public uncompleteTodoById(id: string): void {
    const currentTodos = this.todos();

    if (Array.isArray(currentTodos)) {
      const updated = currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: false, updatedAt: dayjs().format() }
          : todo
      );

      this.todos.set(updated);
      this.localStorageService.set(LocalStorageKey.MY_TODOS, updated);
    }
  }

  public updateTodo(todo: Todo): void {
    const currentTodos = this.todos();

    if (Array.isArray(currentTodos)) {
      const updated = currentTodos.map((t) =>
        t.id === todo.id ? { ...t, ...todo } : t
      );

      this.todos.set(updated);
      this.localStorageService.set(LocalStorageKey.MY_TODOS, updated);
    }
  }
}

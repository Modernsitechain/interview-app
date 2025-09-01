import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import {
  TodoTable,
  TodoTableHeaders,
  TodoTableUniqueValue
} from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService, TodoService } from '@core/services';
import { finalize, map, Observable } from 'rxjs';
import { TableLoadingStateComponent } from '@shared/components/tables/table-loading-state/table-loading-state.component';
import { TableComponent } from '@shared/components/tables/table/table.component';
import { TableNoDataStateComponent } from '@shared/components/tables/table-no-data-state/table-no-data-state.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableFilterBarComponent } from '@shared/components/tables/table-filter-bar/table-filter-bar.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonDirective } from '@shared/directives';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TableLoadingStateComponent,
    TableComponent,
    TableNoDataStateComponent,
    MatPaginatorModule,
    TableFilterBarComponent,
    TranslateModule,
    ButtonDirective
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  private readonly todoService = inject(TodoService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  public dataSource = signal<MatTableDataSource<TodoTable>>(
    new MatTableDataSource()
  );

  protected modelSelectedData = signal<TodoTable[]>([]);
  protected modelSearchKey = signal<string>('');
  public readonly headers = TodoTableHeaders;
  public readonly uniqueTableValue = TodoTableUniqueValue;
  public isLoading = signal<boolean>(false);
  public isError = signal<boolean>(false);

  ngOnInit(): void {
    this.fetchData()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (todos) => {
          this.dataSource.set(new MatTableDataSource(todos));
        }
      });
  }

  public search(value: string | undefined): void {
    this.dataSource().filter = value || '';
    this.modelSearchKey.set(value ?? '');
  }

  protected onCreateTodo(): void {
    this.router.navigate(['admin/todo/create']);
  }

  protected onDeleteTodo(data: TodoTable){
    this.todoService.deleteTodoById(data.id);
    this.fetchData()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (todos) => {
          this.dataSource.set(new MatTableDataSource(todos));
          this.toastService.success.set(`Todo ${data.id} successfully deleted!`);
        }
      });
  }

  private fetchData(): Observable<TodoTable[]> {
    this.isLoading.set(true);
    return this.todoService.getTodos().pipe(
      map((res) => {
        return res.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          completed: item.completed,
          createdAt: item.createdAt,
          priority: item.priority,
          updatedAt: item.updatedAt || '-',
          dueDate: item.dueDate || '-'
        }));
      })
    );
  }
}

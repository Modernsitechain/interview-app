import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TodoTable, TodoTableHeaders, TodoTableUniqueValue } from '../../models';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  public dataSource = signal<MatTableDataSource<TodoTable>>(
    new MatTableDataSource()
  );

  public readonly headers = TodoTableHeaders;
  public readonly uniqueTableValue = TodoTableUniqueValue;
}

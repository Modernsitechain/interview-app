import { Routes } from '@angular/router';
import { TodoComponent } from './todo/pages/todo/todo.component';
import { TODO_ROUTES } from './todo/todo.routes';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'todo',
    component: TodoComponent,
    loadChildren: () => TODO_ROUTES
  },
  { path: '', pathMatch: 'full', redirectTo: 'todo' },
  { path: '**', redirectTo: 'todo' }
];

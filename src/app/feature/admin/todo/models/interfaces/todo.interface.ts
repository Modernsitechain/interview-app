import { TodoPriorityType } from '../types/todo.type';

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  priority: TodoPriorityType;
  updatedAt: string | null;
  dueDate: string | null;
}

export interface TodoTable {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  priority: TodoPriorityType;
  updatedAt: string | null;
  dueDate: string | null;
}

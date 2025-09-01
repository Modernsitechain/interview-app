import { TodoPriorityType } from '../types/todo.type';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: TodoPriorityType;
  updatedAt?: string;
  dueDate?: string;
}

export interface TodoTable {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: TodoPriorityType;
  updatedAt: string;
  dueDate: string;
}

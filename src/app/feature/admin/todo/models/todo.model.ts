import { OptionInterface } from '@core/interfaces';
import { Todo } from './interfaces/todo.interface';
import { TableValueType } from '@core/types';

export const TodoTableHeaders: OptionInterface<
  keyof Todo | 'select' | 'action'
>[] = [
  {
    name: 'table.header-select',
    value: 'select'
  },
  {
    name: 'Id',
    value: 'id'
  },
  {
    name: 'Title',
    value: 'title'
  },
  {
    name: 'Description',
    value: 'description'
  },
  {
    name: 'Completed',
    value: 'completed'
  },
  {
    name: 'Created At',
    value: 'createdAt'
  },
  {
    name: 'Priority',
    value: 'priority'
  },
  {
    name: 'Updated At',
    value: 'updatedAt'
  },
  {
    name: 'Due Date',
    value: 'dueDate'
  },
  {
    name: 'Action',
    value: 'action'
  }
];

export const TodoTableUniqueValue: OptionInterface<TableValueType>[] =
  [];

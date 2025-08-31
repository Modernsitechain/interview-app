import { OptionInterface } from '@core/interfaces';

export type TodoPriorityType = 'low' | 'high';

export const TodoPriorityOptions: OptionInterface<TodoPriorityType>[] = [
  {
    name: 'Low',
    value: 'low'
  },
  {
    name: 'High',
    value: 'high'
  }
];

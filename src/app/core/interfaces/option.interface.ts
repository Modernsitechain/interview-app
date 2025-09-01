import { IconName } from '@shared/components/icon/icon.component';

export interface OptionInterface<T = unknown> {
  name: string;
  value: T;
  translate?: boolean;
  country?: string;
  icon?: IconName;
}

export interface DialogOption<T = string> {
  label: string;
  key: T;
}

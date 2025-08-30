import { IconName } from '@shared/components/icon/icon.component';

export interface MenuInterface<T = void, R = void> {
  label: string;
  icon?: IconName;
  action?: (args: T) => R;
  isDisabled?: boolean;
}

export interface SidebarMenuOption {
  icon: IconName;
  text: string;
  url?: string;
  children?: SideMenuChildrenOption[];
}

export interface SideMenuChildrenOption {
  text: string;
  url: string;
}

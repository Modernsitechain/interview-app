import { SidebarMenuOption } from '@app/core/interfaces';

export const sidebarMenus: SidebarMenuOption[] = [
  {
    icon: 'saxUserEditOutline',
    text: 'text.menu-todo',
    url: '/admin/todo'
  },
  {
    icon: 'saxDataOutline',
    text: 'text.menu-database',
    children: [
      {
        text: 'text.menu-database-companies',
        url: '/admin/database/companies'
      },
      {
        text: 'text.menu-database-users',
        url: '/admin/database/users'
      },
      {
        text: 'text.menu-database-sessions',
        url: '/admin/database/sessions'
      }
    ]
  }
];

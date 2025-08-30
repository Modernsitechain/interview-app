import { SidebarMenuOption } from '@app/core/interfaces';

export const sidebarMenus: SidebarMenuOption[] = [
  {
    icon: 'saxHome2Outline',
    text: 'text.menu-dashboard',
    url: '/admin/dashboard'
  },
  {
    icon: 'saxBuildingsOutline',
    text: 'text.menu-manage-companies',
    url: '/admin/manage-companies'
  },
  {
    icon: 'saxPeopleOutline',
    text: 'text.menu-manage-users',
    url: '/admin/manage-users'
  },
  {
    icon: 'saxDataOutline',
    text: 'text.menu-database',
    children: [
      // {
      //   text: 'text.menu-database-companies',
      //   url: '/admin/database/companies'
      // },
      // {
      //   text: 'text.menu-database-users',
      //   url: '/admin/database/users'
      // },
      {
        text: 'text.menu-database-sessions',
        url: '/admin/database/sessions'
      }
    ]
  },
  {
    icon: 'saxUserEditOutline',
    text: 'text.menu-manage-account',
    url: '/admin/manage-account'
  }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADMIN_ROUTES } from '@feature/admin/admin.routes';
import { AdminLayoutComponent } from '@shared/layouts';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [],
    component: AdminLayoutComponent,
    loadChildren: () => ADMIN_ROUTES
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin'
  },
  {
    path: '**',
    redirectTo: 'admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

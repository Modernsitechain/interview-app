import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewComponent } from '@feature/interview/interview.component';

const routes: Routes = [
  {
    path: 'interview',
    component: InterviewComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'interview'
  },
  {
    path: '**',
    redirectTo: 'interview'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoFormComponent } from './forms/info-form/info-form.component';
import { UserDetailsListComponent } from '../app/user-details-list/user-details-list.component';
import { InfoUpdateFormComponent } from './forms/info-update-form/info-update-form.component';
import { UserDetailTableComponent } from './user-detail-table/user-detail-table.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'main', component:DashboardComponent},
      { path: 'personal-details', component: UserDetailTableComponent },
      { path: 'form', component: InfoFormComponent },
      { path: 'user-details-list/:id', component: UserDetailsListComponent },
      { path: 'form-update/:id', component: InfoUpdateFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoFormComponent } from './forms/info-form/info-form.component';
import { UserDetailsListComponent } from '../app/user-details-list/user-details-list.component';
import { InfoUpdateFormComponent } from './forms/info-update-form/info-update-form.component';
import { UserDetailTableComponent } from './user-detail-table/user-detail-table.component';

const routes: Routes = [
  {path: '', redirectTo:'/form', pathMatch:'full'},
  {path: 'form', component: InfoFormComponent},
  {path: 'user-details-list/:id', component: UserDetailsListComponent},
  {path: 'form-update/:id', component: InfoUpdateFormComponent},
  {path: 'user-detail', component:UserDetailTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

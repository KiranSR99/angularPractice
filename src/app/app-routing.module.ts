import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoFormComponent } from './forms/info-form/info-form.component';
import { UserDetailsListComponent } from '../app/user-details-list/user-details-list.component';

const routes: Routes = [
  {path: 'form', component: InfoFormComponent},
  {path: 'user-details-list', component: UserDetailsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

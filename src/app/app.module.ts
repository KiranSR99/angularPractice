import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TdfComponent } from './forms/tdf/tdf.component';
import { ReactiveFormComponent } from './forms/reactive-form/reactive-form.component';
import { UserDetailsFormComponent } from './forms/user-details-form/user-details-form.component';
import { FamilyDetailsComponent } from './forms/family-details/family-details.component';
import { UserDetailsListComponent } from './user-details-list/user-details-list.component';

@NgModule({
  declarations: [AppComponent, TdfComponent, ReactiveFormComponent, UserDetailsFormComponent, FamilyDetailsComponent, UserDetailsListComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}

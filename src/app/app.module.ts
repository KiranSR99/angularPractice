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
import { InfoFormComponent } from './forms/info-form/info-form.component';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InfoUpdateFormComponent } from './forms/info-update-form/info-update-form.component';
import { NepaliFontPipe } from './pipes/nepali-font.pipe';
import { AgeFormatPipe } from './pipes/age-format.pipe';
import { UserDetailTableComponent } from './user-detail-table/user-detail-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TdfComponent,
    ReactiveFormComponent,
    UserDetailsFormComponent,
    FamilyDetailsComponent,
    UserDetailsListComponent,
    InfoFormComponent,
    InfoUpdateFormComponent,
    NepaliFontPipe,
    AgeFormatPipe,
    UserDetailTableComponent,
    HeaderComponent,
    FooterComponent,
    SideNavbarComponent,
    MainComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: "toast-top-center",
      preventDuplicates:true,
      timeOut: 3000
    }),
  ],
  providers: [provideClientHydration(), DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

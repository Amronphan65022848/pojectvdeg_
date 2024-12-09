import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarousalComponent } from './home/component/carousal/carousal.component';
import { CurrentActivitiesCarousalComponent } from './home/component/current-activities-carousal/current-activities-carousal.component';
import { UpcomingActivitiesCarousalComponent } from './home/component/upcoming-activities-carousal/upcoming-activities-carousal.component';
import { PastActivitiesCarousalComponent } from './home/component/past-activities-carousal/past-activities-carousal.component';
import { CurrentActivitiesComponent } from './Activities/current-activities/current-activities.component';
import { ActivitySignupComponent } from './Activities/activity-signup/activity-signup.component';
import { FormComponent } from './Activities/activity-signup/component/form/form.component';
import { ActivityClosedSignupComponent } from './Activities/activity-closed-signup/activity-closed-signup.component';
import { ActivityCreationAdminComponent } from './admins/activity-creation-admin/activity-creation-admin.component';
import { SearchBarComponent } from './admins/componets/search-bar/search-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './profile/component/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuestComponent } from './login-guest/login-guest.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarsComponent } from './admin-list/components/search-bars/search-bars.component';
import { ActivitySignupListComponent } from './Activities/activity-signup-list/activity-signup-list.component';
import { SearchComponent } from './Activities/activity-signup-list/components/search/search.component';
import { DonationComponent } from './donation/donation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivityFilesComponent } from './Activities/activity-files/activity-files.component';
import { RegistrationHistoryComponent } from './registration-history/registration-history.component';
import { ActivityInformationComponent } from './Activities/activity-information/activity-information.component';
import { AddActivityInformationComponent } from './Activities/add-activity-information/add-activity-information.component';
import { PopupComponent } from './popup/popup.component'; // Import FormsModule her
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormcontrolComponent } from './formcontrol/formcontrol.component';
import { ActivitySignupFinComponent } from './Activities/activity-signup-fin/activity-signup-fin.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarousalComponent,
    CurrentActivitiesCarousalComponent,
    UpcomingActivitiesCarousalComponent,
    PastActivitiesCarousalComponent,
    CurrentActivitiesComponent,
    ActivitySignupComponent,
    FormComponent,
    ActivityClosedSignupComponent,
    ActivityCreationAdminComponent,
    SearchBarComponent,
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,
    NavbarComponent,
    ProfileComponent,
    FooterComponent,
    LoginGuestComponent,
    AdminListComponent,
    SearchBarsComponent,
    ActivitySignupListComponent,
    SearchComponent,
    DonationComponent,
    ActivityFilesComponent,
    RegistrationHistoryComponent,
    ActivityInformationComponent,
    AddActivityInformationComponent,
    PopupComponent,
    FormcontrolComponent,
    ActivitySignupFinComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule // Add FormsModule to the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

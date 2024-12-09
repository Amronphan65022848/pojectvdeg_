import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurrentActivitiesComponent } from './Activities/current-activities/current-activities.component';
import { ActivitySignupComponent } from './Activities/activity-signup/activity-signup.component';
import { ActivityClosedSignupComponent } from './Activities/activity-closed-signup/activity-closed-signup.component';
import { ActivityCreationAdminComponent } from './admins/activity-creation-admin/activity-creation-admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuestComponent } from './login-guest/login-guest.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ActivitySignupListComponent } from './Activities/activity-signup-list/activity-signup-list.component';
import { DonationComponent } from './donation/donation.component';
import { ActivityFilesComponent } from './Activities/activity-files/activity-files.component';
import { RegistrationHistoryComponent } from './registration-history/registration-history.component';
import { ActivityInformationComponent } from './Activities/activity-information/activity-information.component';
import { AddActivityInformationComponent } from './Activities/add-activity-information/add-activity-information.component';
import { FormcontrolComponent } from './formcontrol/formcontrol.component';
import { ActivitySignupFinComponent } from './Activities/activity-signup-fin/activity-signup-fin.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // เปลี่ยนเส้นทางเริ่มต้นเป็นหน้า login
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetpasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'activity', component: CurrentActivitiesComponent },
  { path: 'activity-signup/:activityId', component: ActivitySignupComponent },
  { path: 'activity-close/:activityId', component: ActivityClosedSignupComponent },
  { path: 'activity-sinup-list/:activityId', component: ActivitySignupListComponent },
  { path: 'admin', component: ActivityCreationAdminComponent },
  { path: 'admin-list', component: AdminListComponent },
  { path: 'donation/:activityId', component: DonationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login-guest', component: LoginGuestComponent },
  { path: 'activity-files/:activityId', component: ActivityFilesComponent },
  { path: 'registartion', component: RegistrationHistoryComponent },
  { path: 'activity-infor/:activityId', component: ActivityInformationComponent },
  // { path: 'add-information', component: AddActivityInformationComponent },
  // { path: 'add-information', component: AddActivityInformationComponent },
  { path: 'formcontrol/:activityId', component: FormcontrolComponent },
  { path: 'activity-fin/:activityId', component: ActivitySignupFinComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

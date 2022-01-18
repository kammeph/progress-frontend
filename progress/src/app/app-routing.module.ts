import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { RegistrationComponent } from './screens/registration/registration.component';
import { StrengthValuesComponent } from './screens/strength-values/strength-values.component';
import { UserComponent } from './screens/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', component: UserComponent},
  { path: 'strength-values', component: StrengthValuesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { authGGuard } from './guard/auth-g.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'signup', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

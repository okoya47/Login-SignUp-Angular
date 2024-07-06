import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetComponent } from './components/reset/reset.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

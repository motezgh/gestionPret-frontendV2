import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { NouisliderModule } from 'ng2-nouislider';
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import {  NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./datepicker/ngb-date-fr-parser-formatter"

import { Ng2SearchPipeModule } from "ng2-search-filter";


import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

//import { registerLocaleData } from '@angular/common';
//import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
//registerLocaleData(localeFr, 'fr');

import { JwtModule } from '@auth0/angular-jwt';


import { authInterceptorProviders } from "./services/auth.interceptor";
import { AuthService } from "./services/auth.service";
import { EmailService } from "./services/email.service";
import { PretService } from "./services/pret.service";
import { TokenStorageService } from "./services/token-storage.service";
import { UserService } from "./services/user.service";
import { ToastService } from "./services/toast.service";
import { StatService } from "./services/stat.service";
import { NotificationService } from "./services/notification.service";

import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EmployesComponent } from './components/employes/employes.component';
import { AjouterEmployeComponent } from './components/ajouter-employe/ajouter-employe.component';
import { EmployeDetailsComponent } from './components/employe-details/employe-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CreatePretComponent } from './components/create-pret/create-pret.component';
import { PretDetailsComponent } from './components/pret-details/pret-details.component';
import { PretsComponent } from './components/prets/prets.component';
import { PretsArchiverComponent } from './components/prets-archiver/prets-archiver.component';
import { ArchivePretsEmployeComponent } from './components/archive-prets-employe/archive-prets-employe.component';
import { ArchiverPretsComponent } from './components/archiver-prets/archiver-prets.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SearchEmployeComponent } from './components/search-employe/search-employe.component';
import { NotificationComponent } from './components/notification/notification.component';



@NgModule({
  declarations: [
    AppComponent,
    
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SettingsComponent,
    EmployesComponent,
    AjouterEmployeComponent,
    EmployeDetailsComponent,
    PageNotFoundComponent,
    CreatePretComponent,
    PretDetailsComponent,
    PretsComponent,
    PretsArchiverComponent,
    ArchivePretsEmployeComponent,
    ArchiverPretsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SearchEmployeComponent,
    NotificationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgbModule,
    FormsModule,
    RouterModule,
    CommonModule,
    // JwBootstrapSwitchNg2Module,
    // NouisliderModule,

    ReactiveFormsModule,
    HttpClientModule,

    Ng2SearchPipeModule
  ],
  providers: [
    AuthService,
    UserService,
    PretService,
    TokenStorageService,
    authInterceptorProviders,
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    EmailService,
    ToastService,
    StatService,
    NotificationService
    //{provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

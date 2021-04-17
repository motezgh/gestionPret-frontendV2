import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterEmployeComponent } from './components/ajouter-employe/ajouter-employe.component';
import { ArchivePretsEmployeComponent } from './components/archive-prets-employe/archive-prets-employe.component';
import { ArchiverPretsComponent } from './components/archiver-prets/archiver-prets.component';
import { CreatePretComponent } from './components/create-pret/create-pret.component';
import { EmployeDetailsComponent } from './components/employe-details/employe-details.component';
import { EmployesComponent } from './components/employes/employes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PretDetailsComponent } from './components/pret-details/pret-details.component';
import { PretsArchiverComponent } from './components/prets-archiver/prets-archiver.component';
import { PretsComponent } from './components/prets/prets.component';

import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { AuthGuard } from "./guards/auth.guard";
import { Erole } from "./model/erole";

const routes: Routes = [
  { path: 'login',  component: LoginComponent  },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]  },
  { path: 'profil', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: 'employes', component: EmployesComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH]}},
  { path: 'ajouter-employe', component: AjouterEmployeComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH]}},
  { path: 'employesDetails/:id', component: EmployeDetailsComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH]}},
  
  { path: 'prets',  component: PretsComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH]  }},
  { path: 'pretsDetails/:id',  component: PretDetailsComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH] }},
  { path: 'createPret',  component: CreatePretComponent , canActivate: [AuthGuard] },

  { path: 'archive',  component: PretsArchiverComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH] }},
  { path: 'pretsAarchiver',  component: ArchiverPretsComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH] }},
  { path: 'archivePretsEmploye',  component: ArchivePretsEmployeComponent , canActivate: [AuthGuard] },

  { path: 'search/:keyword' , component:EmployesComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH] }},

  { path: 'reset',  component: ResetPasswordComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

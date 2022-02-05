import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { CarpoolsComponent } from './carpools/carpools.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapPOCComponent } from './map-poc/map-poc.component';
import { ModerationComponent } from './moderation/moderation.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'carpools', component: MapPOCComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'moderation', component: ModerationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

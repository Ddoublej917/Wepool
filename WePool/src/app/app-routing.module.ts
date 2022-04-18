import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarpoolsComponent } from './carpool-files/carpools/carpools.component';
import { HomeComponent } from './home-files/home/home.component';
import { LoginComponent } from './account-files/login/login.component';
import { ModerationComponent } from './moderation-files/moderation/moderation.component';
import { AuthenticationGuard } from './account-files/authguard/authentication.guard';
import { ModGuard } from './account-files/authguard/mod_auth.guard';
import { ProfileComponent } from './profile-files/profile.component';
import { JoinGroupComponent } from './join-group-files/join-group/join-group.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'carpools', component: CarpoolsComponent, canActivate: [AuthenticationGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard] },
  { path: 'joinGroup', component: JoinGroupComponent, canActivate: [AuthenticationGuard] },
  { path: 'moderation', component: ModerationComponent, canActivate: [AuthenticationGuard, ModGuard] },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthenticationGuard] },
  { path: 'browse', redirectTo: '/administration', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
